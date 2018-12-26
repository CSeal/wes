import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { GenericProps } from '../../../../interfaces/GenericProps.interface';
import transl from '../../../../utils/t.decorator';
import { UsersAvailability } from '../../../../services/api';
import AvailabilityStore, { IIntervals, ITimeInterval } from './store/availability.store';
import TeacherAvailabilityTimeBlock from './components/TeacherAvailabilityTimeBlock';
import { westoast } from '../../../../utils/westoast';

interface TeacherProfileAvailabilityProps extends GenericProps {
}

@transl()
@inject('profilesStore')
@observer
export default class TeacherProfileAvailabilityComponent extends React.Component<TeacherProfileAvailabilityProps> {
    counter: number = 0;

    setAvailability(): void {
        const availability: UsersAvailability[] = this.props.profilesStore.availability$.current();
        const intervals: IIntervals[] = AvailabilityStore.timeIntervals;

        if (availability && this.counter < availability.length) {
            availability.map((el: UsersAvailability) => {
                intervals.map((interval) => {
                    if (interval.day.toUpperCase() === el.day_of_week.toString()) {
                        interval.times.map((time) => {
                            // First
                            if (time.time * 60 === el.date) {
                                const timeRange: ITimeInterval[] = AvailabilityStore.selectedTime.slice();
                                const startEl: ITimeInterval[] = AvailabilityStore.start.slice();

                                if (!AvailabilityStore.startElement) {
                                    startEl.push(time);
                                    time.active = true;

                                    if (AvailabilityStore.checkPrev(time)) {
                                        AvailabilityStore.checkPrev(time).last = false;
                                    } else {
                                        time.first = true;
                                    }

                                    if (timeRange.indexOf(time) === -1) {
                                        timeRange.push(time);
                                    }
                                }
                            }
                            // Last
                            if (time.time * 60  === el.date + el.duration - 30 * 60) {
                                if (AvailabilityStore.checkNext(time)) {
                                    AvailabilityStore.checkNext(time).first = false;
                                } else {
                                    time.last = true;
                                }
                                AvailabilityStore.getFirst(time);
                            }
                        });
                    }
                });
            });
            this.counter++;
        }
    }

    renderTimeBlocks(): React.ReactNode {
        const timeIntervals: IIntervals[] = AvailabilityStore.timeIntervals;

        return timeIntervals.map((element: IIntervals, idx: number) => (
            <div className="col day" key={idx}>
                <div className="item title">
                    <span>{element.day}</span>
                </div>
                <div className="item empty" />
                {element.times.map((el: ITimeInterval) => (
                    <div
                        key={el.id + el.day}
                        className="item"
                        style={{ height: '35px', borderBottomWidth: 0 }}
                        children={<TeacherAvailabilityTimeBlock element={el} />}
                    />
                ))}
            </div>
        ));
    }

    componentWillReact(): void {
        this.setAvailability();
    }

    render(): React.ReactNode {
        const { t } = this.props;
        this.props.profilesStore.availability$.current();

        return (
            <div id="content" className="col-md-9 col-md-offset-3">
                <div className="col-md-12">
                    <div className="profile-page">
                        <fieldset>
                            <div className="row">
                                <div className="col-md-12">
                                    <legend>{t('Availability')}</legend>
                                    <ol>
                                        <li>{t('Click on empty slot to add an availability hours')}</li>
                                        <li>{t('Drag on the bottom edge to scale a time slot')}</li>
                                        <li>{t('Click on the filled time slot to delete it')}</li>
                                    </ol>
                                </div>
                            </div>
                            <div className="block">
                                <div className="availability">
                                    <div className="col time">
                                        <div className="item title" />
                                        <div className="item empty" />
                                        <div className="item">0:00</div>
                                        <div className="item">01:00</div>
                                        <div className="item">02:00</div>
                                        <div className="item">03:00</div>
                                        <div className="item">04:00</div>
                                        <div className="item">05:00</div>
                                        <div className="item">06:00</div>
                                        <div className="item">07:00</div>
                                        <div className="item">08:00</div>
                                        <div className="item">09:00</div>
                                        <div className="item">10:00</div>
                                        <div className="item">11:00</div>
                                        <div className="item">12:00</div>
                                        <div className="item">13:00</div>
                                        <div className="item">14:00</div>
                                        <div className="item">15:00</div>
                                        <div className="item">16:00</div>
                                        <div className="item">17:00</div>
                                        <div className="item">18:00</div>
                                        <div className="item">19:00</div>
                                        <div className="item">20:00</div>
                                        <div className="item">21:00</div>
                                        <div className="item">22:00</div>
                                        <div className="item">23:00</div>
                                        <div className="item">24:00</div>
                                    </div>
                                    {this.renderTimeBlocks()}
                                </div>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <button
                                            onClick={() => this.handleSubmit()}
                                            className="btn btn-primary"
                                            children={t('SUBMIT')}
                                        />
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
       );
    }

    handleSubmit = (): void => {
        westoast(
            this.props.profilesStore.addAvailability(AvailabilityStore.availableTime),
            { entityName: 'Teacher\'s Availability' },
        );
    }
}
