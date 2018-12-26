import * as React from 'react';
import { observable, action } from 'mobx';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, Redirect } from 'react-router';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import transl from '../../../utils/t.decorator';
import ModalLayout from '../../../layout/modal';
import { RescheduleStore } from '../../../stores/Reshedule.store';
import { PackageCreateAvailabilityChoiseComponent } from '../../CreatePackage/components/PackageCreateAvailabilityChoise.component';
import { UsersAvailability, NewLessonsForPackageAvailability } from '../../../services/api';
import { WesCalendarUnavailableDatesComponent } from './WesCalendarUnavailableDates.component';
import { westoast } from '../../../utils/westoast';

interface WesCalendarResheduleAllComponentProps extends GenericProps, RouteComponentProps<{id: number}> {
    rescheduleStore: RescheduleStore;
}

@transl()
@inject('rescheduleStore')
@inject('packageCreateStore')
@inject('lessonStore')
@observer
export default class WesCalendarResheduleAllComponent extends React.Component<WesCalendarResheduleAllComponentProps> {
    @observable showDialog: boolean = true;
    @observable startDate: string;
    @observable calendarDates: React.ReactNode[];
    @observable comment: string;

    @observable dayOfWeeks: UsersAvailability.DayOfWeekEnum[] = [
        UsersAvailability.DayOfWeekEnum.MON,
        UsersAvailability.DayOfWeekEnum.TUE,
        UsersAvailability.DayOfWeekEnum.WED,
        UsersAvailability.DayOfWeekEnum.THU,
        UsersAvailability.DayOfWeekEnum.FRI,
        UsersAvailability.DayOfWeekEnum.SAT,
        UsersAvailability.DayOfWeekEnum.SUN,
    ];

    @observable lessonsCountToReschedule: number = null;

    @action getLessonsCountToReschedule(): void {
        const { selectedTime } = this.props.packageCreateStore;
        const { lessonsCountToReschedule } = this.props.lessonStore;
        const count: number = lessonsCountToReschedule - selectedTime.length;

        if (count >= 0) {
            this.lessonsCountToReschedule = count;
        }
    }

    submit = (): void => {
        const availability: NewLessonsForPackageAvailability[] = [];
        const time: string[] = this.props.packageCreateStore.selectedTime;
        const lessonsDuration: number = this.props.rescheduleStore.lesson.duration;
        const SECONDS_IN_HOUR: number = 3600;
        const MINUTES_IN_HOUR: number = 60;

        time.forEach((selectedTime) => {
            const [ hours, minutes, dayOfWeek ] = selectedTime.split(':');
            const hoursInSeconds: number = Number.parseInt(hours) * SECONDS_IN_HOUR;
            const minutesInSeconds: number = Number.parseInt(minutes) * MINUTES_IN_HOUR;
            const start: number = hoursInSeconds + minutesInSeconds;
            const end: number = start + lessonsDuration;
            const lastInterval: NewLessonsForPackageAvailability = availability[availability.length - 1];

            if (!lastInterval || lastInterval.day_of_week !== dayOfWeek) {
                availability.push({ start, end, day_of_week: dayOfWeek });
            } else if (lastInterval && lastInterval.day_of_week === dayOfWeek && lastInterval.end === start) {
                lastInterval.end = end;
            }
        });
        westoast(
            this.props.rescheduleStore.saveRescheduleAll(availability, this.comment).then(() => {
                this.showDialog = false;
            }),
        );

    };

    render(): React.ReactNode {
        const { t, rescheduleStore } = this.props;
        const availableTime: UsersAvailability[] = [];

        if (this.showDialog === false) {
            return <Redirect to="../../../" />;
        }

        if (rescheduleStore.rescheduledDatesAll) {
            return <Redirect to="done" />;
        }

        if (this.lessonsCountToReschedule === null) {
            this.getLessonsCountToReschedule();
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
                        <p>{t('Please choose the most suitable days to reschedule a lesson')}</p>
                        <div className="package-form col-md-12">
                            <form action="#">
                                <fieldset>
                                    <PackageCreateAvailabilityChoiseComponent
                                        availableTime={availableTime}
                                        lessonsDuration={rescheduleStore.lesson.duration}
                                        subHeaders={this.calendarDates}
                                        rescheduleLessonCount={this.lessonsCountToReschedule}
                                        onSelect={() => { this.getLessonsCountToReschedule(); }}
                                    />
                                    <WesCalendarUnavailableDatesComponent />
                                    {!!this.lessonsCountToReschedule && (
                                        <div className="form-group">
                                            <label>{t('Need to choose lessons')}: {this.lessonsCountToReschedule}</label>
                                        </div>
                                    )}
                                    <div className="form-group">
                                        <label>{t('Leave a personal message for a teacher to notify him about lesson’s rescheduling')}</label>
                                        <textarea
                                            className="form-control"
                                            placeholder="Leave a message here"
                                            onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>) => this.comment = ev.target.value}
                                        />
                                    </div>
                                    <div className="text-center">
                                        <button disabled={!!this.lessonsCountToReschedule} type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.submit}>
                                            {t('SUBMIT')}
                                        </button>
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
