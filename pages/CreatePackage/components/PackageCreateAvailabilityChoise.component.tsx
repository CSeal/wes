import * as React from 'react';
import { observer, inject } from 'mobx-react';
import * as classnames from 'classnames';
import * as moment from 'moment';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import transl from '../../../utils/t.decorator';
import { UsersAvailability } from '../../../services/api';
import NewPackageType = UsersAvailability.TypeEnum;
import DayOfWeekEnum = UsersAvailability.DayOfWeekEnum;
import { lazyObservable } from 'mobx-utils';
import LazyLoad from '../../../components/LazyLoad';

interface AvailabilityChoiseProps extends GenericProps {
    availableTime?: UsersAvailability[];
    subHeaders?: React.ReactNode[];
    lessonsDuration?: number;
    rescheduleLessonCount?: number;
    onSelect?: (time: string) => void;
}

@transl()
@inject('packageStore')
@inject('packageCreateStore')
@inject('userStore')
@observer
export class PackageCreateAvailabilityChoiseComponent extends React.Component<AvailabilityChoiseProps> {
    static defaultProps = {
        subHeaders: [
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat',
            'Sun',
        ],
    };
    render(): React.ReactNode {
        const { packageCreateStore, userStore, t } = this.props;
        const availableTime: UsersAvailability[] = this.props.availableTime || packageCreateStore.availableTime$.current();
        if (packageCreateStore.userId === undefined && availableTime === undefined) {
            return <div className="row text-center">{t('Select teacher to see his schedule first')}</div>;
        }
        if (this.props.rescheduleLessonCount !== undefined && this.props.rescheduleLessonCount >= 0) {
            this.props.packageCreateStore.setNeedToChooseLessonsCount(this.props.rescheduleLessonCount);
        }
        return this.renderAvailableTimeContainer(availableTime);
        // return (
        //     <LazyLoad $={availableTime}>
        //         {() => this.renderAvailableTimeContainer(availableTime)}
        //     </LazyLoad>);
    }

    renderAvailableTimeContainer = (availableTime: UsersAvailability[]) => {
        const { t } = this.props;
        const { MON, TUE, WED, THU, FRI, SAT, SUN } = DayOfWeekEnum;
        return (
            <div className="row">
                <div className="form-group col-md-12">
                    <div className="scheduled-table">
                        <div className="col">
                            <div className="title">
                                {this.props.subHeaders && this.props.subHeaders[0]}
                            </div>
                            {availableTime && this.renderAvailableTime(availableTime, MON)}
                        </div>
                        <div className="col">
                            <div className="title">
                                {this.props.subHeaders && this.props.subHeaders[1]}
                            </div>
                            {availableTime && this.renderAvailableTime(availableTime, TUE)}
                        </div>
                        <div className="col">
                            <div className="title">
                                {this.props.subHeaders && this.props.subHeaders[2]}
                            </div>
                            {availableTime && this.renderAvailableTime(availableTime, WED)}
                        </div>
                        <div className="col">
                            <div className="title">
                                {this.props.subHeaders && this.props.subHeaders[3]}
                            </div>
                            {availableTime && this.renderAvailableTime(availableTime, THU)}
                        </div>
                        <div className="col">
                            <div className="title">
                                {this.props.subHeaders && this.props.subHeaders[4]}
                            </div>
                            {availableTime && this.renderAvailableTime(availableTime, FRI)}
                        </div>
                        <div className="col">
                            <div className="title">
                                {this.props.subHeaders && this.props.subHeaders[5]}
                            </div>
                            {availableTime && this.renderAvailableTime(availableTime, SAT)}
                        </div>
                        <div className="col">
                            <div className="title">
                                {this.props.subHeaders && this.props.subHeaders[6]}
                            </div>
                            {availableTime && this.renderAvailableTime(availableTime, SUN)}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    renderAvailableTime = (time: UsersAvailability[], day: DayOfWeekEnum): React.ReactNode => {
        const times: UsersAvailability[] = [];

        time.map((el) => {
            if (el.type === NewPackageType.DAYOFWEEK && el.day_of_week === day) {
               times.push(el);
            }
        });
        return times.sort((a, b) => (a.date - b.date)).map(this.getUsersAvailability);
    };

    getUsersAvailability = (usersAvailability: UsersAvailability) => {
        const { selectedTime } = this.props.packageCreateStore;
        const lessonsDuration = this.props.lessonsDuration || this.props.packageCreateStore.lessonsDuration;

        const { date, duration, day_of_week, type, id } = usersAvailability;
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
            const HHmm: string = `${hours}:${minutes}`;
            intervals.push(HHmm);
        }

        return intervals.map((interval, index) => {
            const time: string = `${interval}:${day_of_week}`;
            const classNames: string = classnames('item', {
                active: selectedTime.indexOf(time) !== -1,
            });

            return (
                <div key={index} className={classNames}>
                    <a href="#" onClick={(e) => { this.handleClickTime(e, time); }}>
                        {interval}
                    </a>
                </div>
            );
        });
    }

    handleClickTime = (event: React.SyntheticEvent<HTMLAnchorElement>, time: string): void => {
        event.preventDefault();
        this.props.packageCreateStore.selectTime(time);
        if (this.props.onSelect) {
            this.props.onSelect(time);
        }
    }
}
