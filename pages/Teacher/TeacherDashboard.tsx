import * as React from 'react';
import { GenericProps } from '../../interfaces/GenericProps.interface';
import { observer, inject } from 'mobx-react';
import transl from '../../utils/t.decorator';
import { Link } from 'react-router-dom';
import LazyLoad from '../../components/LazyLoad';
import { Lesson } from '../../services/api';
import WesDate from '../../components/WesDate';
import NotificationToastComponent from '../components/NotificationToast.component';
import StudentsComponent from '../components/Students.component';
import { LessonExtended } from '../../stores/Lesson.store';
import Moment from 'react-moment';
import LessonRescheduleMarker from '../components/LessonReshedule/LessonRescheduleMarker';

export interface TeacherDashboardProps extends GenericProps {
}
export interface TeacherDashboardState {
}
@transl()
@inject('lessonStore')
@observer
export class TeacherDashboardPage extends React.Component<TeacherDashboardProps, TeacherDashboardState> {
    renderLessonsList(lessons: LessonExtended[]): React.ReactNode {
        const { t } = this.props;

        return (
            <div className="table-responsive no-padding">
                <table className="upcoming-table table-striped">
                    <thead>
                    <tr>
                        <th>{t('Name of')} <br />{t('package')}</th>
                        <th>{t('Name of')} <br />{t('lesson')}</th>
                        <th>{t('Students')} </th>
                        <th>{t('Type of')}<br />{t('package')}</th>
                        <th>{t('Date')}</th>
                        <th>{t('Time')}</th>
                        <th>{t('Reschedule')}</th>
                    </tr>
                    </thead>
                    <tbody>
                        {lessons.map((lesson) => (
                            <tr key={lesson.date}>
                                <td><strong>{lesson.package.name}</strong></td>
                                <td>{lesson.title}</td>
                                <td>{lesson.students.map((student) => <div key={student.id}>{student.name}</div>)}</td>
                                <td>{lesson.package.type}</td>
                                <td><WesDate date={lesson.date} /></td>
                                <td><Moment format="ha" date={lesson.date} /> - <Moment format="ha" date={lesson.date + lesson.duration * 1000} /></td>
                                <td><LessonRescheduleMarker lesson={lesson} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    render(): JSX.Element {
        const {t, lessonStore} = this.props;
        return (
            <section id="main">
                <div className="container-fluid">

                    {/* <NotificationToastComponent notification={{content: 'some test notification'}} /> */}
                    <div className="row">
                        <div className="col-md-12">
                            <h1>{t('My Dashboard')}</h1>
                        </div>
                        <div className="statistics">
                            <div className="col-md-12">
                                <header>
                                    <h2>{t('Upcoming Lessons')}</h2>
                                </header>
                                <div className="block">
                                    <LazyLoad $={lessonStore.lessonsList$.current()}>
                                        {() => this.renderLessonsList(lessonStore.lessonsList$.current())}
                                    </LazyLoad>
                                </div>
                            </div>
                        </div>
                        <StudentsComponent />
                    </div>
                </div>
            </section>
        );
    }
}
