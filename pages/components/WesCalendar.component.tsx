import * as React from 'react';
import { GenericProps } from '../../interfaces/GenericProps.interface';
import { observer, inject } from 'mobx-react';
import transl from '../../utils/t.decorator';
import LazyLoad from '../../components/LazyLoad';
import moment = require('moment');
import { Moment, unitOfTime } from 'moment';
import * as classNames from 'classnames';
import { UserLessonWithLessons, UserEx } from '../../stores/User.store';
import { LessonExtended } from '../../stores/Lesson.store';
import { Lesson } from '../../services/api';
import WesCalendarResheduleHintComponent from './WesCalendar/WesCalendarResheduleHint.component';
import WesCalendarResheduleRouterComponent from './WesCalendar/WesCalendarResheduleRouter.component';
import DateRangeComponent from './WesCalendar/DateRange.component';
import WesCalendarSyncButtonComponent from './WesCalendar/WesCalendarSyncButton.component';
import { RescheduleIconRedLabelSVG } from '../../components/ButtonsSVG/RescheduleIconRedLabel';
import { RescheduleIconSVG } from '../../components/ButtonsSVG/RescheduleIcon';
import LessonRescheduleMarker from './LessonReshedule/LessonRescheduleMarker';

export interface WesCalendarComponentProps extends GenericProps {
}
export interface WesCalendarComponentState {
    currentDate: Moment;
    startDate: string;
    endDate: string;
}
// tslint:disable:max-line-length

@transl()
@inject('userStore')
@inject('lessonStore')
@observer
export default class WesCalendarComponent extends React.Component<WesCalendarComponentProps, WesCalendarComponentState> {
    constructor(props: WesCalendarComponentProps) {
        super(props);
        this.state = {
            currentDate: moment(),
            startDate: moment().startOf('isoweek' as unitOfTime.StartOf).format('LL'),
            endDate: moment().endOf('isoweek' as unitOfTime.StartOf).format('LL'),
        };
    }
    componentWillMount() {
        this.props.lessonStore.lessonsList$.refresh();
    }
    changeDate(start: string, end: string) {
        this.setState({
            startDate: start,
            endDate: end,
        });
    }
    renderSelectDate(): React.ReactNode {
        return (
            <DateRangeComponent onDateChange={(s, e) => this.changeDate(s, e)}/>
         );
    }
    getLessonDuration(date: number, duration: number): string {
        const start = moment(date * 1000);
        const end =  moment((date + duration) * 1000); // start.add(duration, 'seconds');
        return start.format('HH:mm') + ' - ' + end.format('HH:mm');
    }
    renderLesson(lessons: LessonExtended[], day: Moment, time: number): React.ReactNode {
        const {t} = this.props;
        return lessons.map((el: LessonExtended) => {
            const lessonTime = moment(el.date * 1000);
            if (lessonTime.format('l') === day.format('l')) {
                const sec = lessonTime.hours() * 3600 + lessonTime.minutes() * 60;
                if (sec >= (time) * 3600 && sec < (time + 1) * 3600) {
                    return <div key={el.id} className={classNames('lesson', {warning: el.date * 1000 < Date.now()})} data-hours="1" style={{height: el.duration / 60, marginTop: ((time) * 3600 - sec) / 60}}>
                        {el.date * 1000 > Date.now() && <LessonRescheduleMarker lesson={el} />}
                        <strong className="lesson-description">{el.title || t('Lesson')} </strong>
                        <span className="lesson-title">{el.type}</span>
                        <span className="lesson-time">{this.getLessonDuration(el.date, el.duration)}</span>
                    </div>;
                } else {
                    return [];
                }
            }
        });
    }
    renderTimeOfDay(lessons: LessonExtended[], day: Moment): React.ReactNode {
        const timeIntervals = Array.from({length: 24}, (v, k) => k);

        return timeIntervals.map((el, idx) => {
           return (
               <div className="item" key={idx}>
                   <div className={classNames({'first-half': el % 2 !== 0}, {'second-half': el % 2 === 0})} style={{borderBottom: el % 2 !== 0 ? '1px solid #E9E8E8' : '1px dashed #E9E8E8'}}>
                       {lessons && this.renderLesson(lessons, day, el)}
                   </div>
               </div>
           );
        });
    }
    renderDayOfWeek(lessons: LessonExtended[]): React.ReactNode {
        const days = Array.from({length: 7}, (v, k) => k);

        return days.map((el) => {
            const day = moment(this.state.startDate).add(el, 'days');
            return (
                <div className={classNames('col day', {active: day.format('L') === this.state.currentDate.format('L')})} key={el}>
                    <div className="item title">{day.format('ddd')} <span>{day.format('DD')}</span></div>
                    <div className="item empty"></div>
                    <LazyLoad $={lessons}  noItems={false}>
                        {() => this.renderTimeOfDay(lessons, day)}
                    </LazyLoad>
                </div>
            );
        });
    }
    render(): React.ReactNode {
        const { t, userStore, lessonStore } = this.props;
        const lessons: LessonExtended[] = lessonStore.lessonsList$.current();
        const me: UserEx = userStore.me$.current();

        return (

            <LazyLoad $={me && lessons} noItems={false}>
                {() =>
                    <div className="row">
                        <div className="col-md-12">
                            <header className="heading">
                                <h1>{t('Calendar')}</h1>
                                <WesCalendarSyncButtonComponent buttonText={t('SYNC WITH GOOGLE CALENDAR')} />
                            </header>
                        </div>
                        <div className="col-md-12">
                            <section className="calendar">
                                <div className="head">
                                    <ul className="hints">
                                        <li>
                                            <span className="icon">
                                                <RescheduleIconRedLabelSVG />
                                            </span>
                                            <span className="text">
                                                {t('Teacher or student asks')} <br />
                                                {t('for rescheduling')}
                                            </span>
                                        </li>
                                        <li>
                                            <span className="icon">
                                                <RescheduleIconSVG />
                                            </span>
                                            <span className="text">
                                                {t('Reschedule a lesson')}
                                            </span>
                                        </li>
                                    </ul>
                                    {this.renderSelectDate()}
                                </div>
                                <div className="block">
                                    <div className="schedule">
                                        <div className="col time">
                                            <div className="item title"></div>
                                            <div className="item empty"></div>
                                            <div className="item"></div>
                                            <div className="item">1am</div>
                                            <div className="item">2am</div>
                                            <div className="item">3am</div>
                                            <div className="item">4am</div>
                                            <div className="item">5am</div>
                                            <div className="item">6am</div>
                                            <div className="item">7am</div>
                                            <div className="item">8am</div>
                                            <div className="item">9am</div>
                                            <div className="item">10am</div>
                                            <div className="item">11am</div>
                                            <div className="item">12pm</div>
                                            <div className="item">1pm</div>
                                            <div className="item">2pm</div>
                                            <div className="item">3pm</div>
                                            <div className="item">4pm</div>
                                            <div className="item">5pm</div>
                                            <div className="item">6pm</div>
                                            <div className="item">7pm</div>
                                            <div className="item">8pm</div>
                                            <div className="item">9pm</div>
                                            <div className="item">10pm</div>
                                            <div className="item">11pm</div>
                                            <div className="item"></div>
                                        </div>
                                        {this.renderDayOfWeek(lessons)}
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                }
            </LazyLoad>
        );
    }
}
