import * as React from 'react';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import transl from '../../../utils/t.decorator';
import { inject, observer } from 'mobx-react';
import ModalLayout from '../../../layout/modal';
import { observable } from 'mobx';
import { RouteComponentProps, Redirect, withRouter } from 'react-router';
import { RescheduleStore } from '../../../stores/Reshedule.store';
import { PackageCreateAvailabilityChoiseComponent } from '../../CreatePackage/components/PackageCreateAvailabilityChoise.component';
import DateRangeComponent from './DateRange.component';
import { UsersAvailability } from '../../../services/api';
import * as moment from 'moment';
import { westoast } from '../../../utils/westoast';

interface WesCalendarResheduleOneComponentProps extends GenericProps, RouteComponentProps<{id: number}> {
    rescheduleStore: RescheduleStore;
}

@transl()
@inject('rescheduleStore')
@inject('packageCreateStore')
@observer
export default class WesCalendarResheduleOneComponent extends React.Component<WesCalendarResheduleOneComponentProps> {
    @observable showDialog: boolean = true;
    @observable time: string;
    @observable startDate: string;
    @observable calendarDates: React.ReactNode[];
    @observable comment: string;

    @observable dayOfWeeks = [
        UsersAvailability.DayOfWeekEnum.MON,
        UsersAvailability.DayOfWeekEnum.TUE,
        UsersAvailability.DayOfWeekEnum.WED,
        UsersAvailability.DayOfWeekEnum.THU,
        UsersAvailability.DayOfWeekEnum.FRI,
        UsersAvailability.DayOfWeekEnum.SAT,
        UsersAvailability.DayOfWeekEnum.SUN,
    ];

    submit = (): void => {
        const date = moment(this.startDate + ' ' + this.time.split(':')[0] + ':' + this.time.split(':')[1])
            .add(this.dayOfWeeks.map((day) => day.toString()).indexOf(this.time.split(':')[2]), 'days').unix();
        westoast(
            this.props.rescheduleStore.saveReschedule(date, this.comment).then(() => this.showDialog = false)
        );
    };

    onDateChange = (start: string, end: string) => {
        this.startDate = start;
        this.calendarDates = Array.apply(null, {length: 7}).map(Number.call, Number).map(
            (day: number) => [moment(start).add(day, 'days').format('ddd'), <br key={day}/>,  moment(start).add(day, 'days').format('D')],
        );
    }

    onTimeSelect = (time: string): void => {
        this.time = time;
        this.props.packageCreateStore.setSelectedTime([time]);
    }
    render(): React.ReactNode {
        const {t, rescheduleStore} = this.props;
        const availableTime: UsersAvailability[] = [];


        if (this.showDialog === false) {
            return <Redirect to="../../../" />;
        }

        if (rescheduleStore.rescheduledDate) {
            return <Redirect to="done" />;
        }

        this.dayOfWeeks.forEach((day) => {
            for (let hour = 0; hour < 24; hour++) {
                availableTime.push({
                    day_of_week: day,
                    type: UsersAvailability.TypeEnum.DAYOFWEEK,
                    duration: rescheduleStore.lesson.duration || 3600,
                    date: hour * 3600,
                });
            }
        });

        return (
            <ModalLayout show={this.showDialog} onClose={() => this.showDialog = false} title={t('Reschedule a Lesson')}>
            <div className="modal-body">
                <div className="text-center">
                <p>
                    {t('Please choose the most suitable day and time to reschedule a lesson')}
                </p>
                <div className="package-form col-md-12">
                        <form action="#">
                            <fieldset>
                                <div className="row">
                                    <DateRangeComponent onDateChange={this.onDateChange}/>
                                </div>
                                <PackageCreateAvailabilityChoiseComponent
                                    availableTime={availableTime}
                                    lessonsDuration={rescheduleStore.lesson.duration}
                                    subHeaders={this.calendarDates}
                                    onSelect={this.onTimeSelect}
                                />
                                <div className="form-group">
                                    <label>{t('Leave a personal message for a teacher to notify him about lesson’s rescheduling')}</label>
                                    <textarea className="form-control" placeholder="Leave a message here" onChange={(ev) => this.comment = ev.target.value }></textarea>
                                </div>
                                <div className="text-center">
                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.submit}>{t('SUBMIT')}</button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
            </ModalLayout>
        );
    }
}
