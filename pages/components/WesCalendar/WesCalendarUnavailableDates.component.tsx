import * as React from 'react';
import { computed, observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import transl from '../../../utils/t.decorator';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import { UsersAvailability } from '../../../services/api';

interface WesCalendarUnavailableDatesComponentProps extends GenericProps {
}

@transl()
@inject('rescheduleStore')
@inject('packageCreateStore')
@observer
export class WesCalendarUnavailableDatesComponent extends React.Component<WesCalendarUnavailableDatesComponentProps> {
    private availability: string[] = [];

    @computed get diff(): string[] {
        const { selectedTime } = this.props.packageCreateStore;

        if (!selectedTime.length) {
            return [];
        }
        return selectedTime.filter((item) => this.availability.indexOf(item) < 0);
    }

    render(): React.ReactNode {
        const { availability$ } = this.props.rescheduleStore;
        const availability = availability$.current();

        if (!availability || !this.diff.length) {
            return <div />;
        }

        availability.forEach(this.getUsersAvailability);

        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="form-group">
                        {this.diff.map((data) => {
                            const [ hours, minutes, dayOfWeek ] = data.split(':');
                            return (
                                <div key={data} className="warning">
                                    Sorry, {dayOfWeek}, at {`${hours}:${minutes}`} seems unavailable.
                                    Please choose another date and time to schedule a lesson.
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    getUsersAvailability = (usersAvailability: UsersAvailability): void => {
        const lessonsDuration = this.props.rescheduleStore.lesson.duration;

        const { date, duration, day_of_week } = usersAvailability;
        const SECONDS_IN_HOUR: number = 3600;
        const MINUTES_IN_HOUR: number = 60;
        const intervals: string[] = [];

        for (let i = date; i < date + duration; i += lessonsDuration * SECONDS_IN_HOUR) {
            const hours: number = Math.floor(i / SECONDS_IN_HOUR);
            const minutes: string = (
                (i % SECONDS_IN_HOUR > 9)
                    ? (`${i % SECONDS_IN_HOUR / MINUTES_IN_HOUR}`)
                    : (`${i % SECONDS_IN_HOUR / MINUTES_IN_HOUR}0`)
            );
            const HHmm: string = `${hours}:${minutes}:${day_of_week}`;
            intervals.push(HHmm);
        }

        this.availability = this.availability.concat(intervals);
    }
}
