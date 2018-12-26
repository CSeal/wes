import * as React from 'react';
import { GenericProps } from '../../interfaces/GenericProps.interface';
import { observer, inject } from 'mobx-react';
import transl from '../../utils/t.decorator';
import { Switch, Route, Redirect } from 'react-router';
import {UsersLesson, Lesson} from '../../services/api';
import LazyLoad from '../../components/LazyLoad';
import {Link} from 'react-router-dom';
import WesDate from '../../components/WesDate';
import { StudentDashboardChartsComponent } from './components/StudentDashboardChartsCharts.component';
import Moment from 'react-moment';
import { RescheduleIconSVG } from '../../components/ButtonsSVG/RescheduleIcon';
import { LineChartSVG } from '../../components/ButtonsSVG/LineChart';
import { LessonExtended } from '../../stores/Lesson.store';
import { RescheduleIconRedLabelSVG } from '../../components/ButtonsSVG/RescheduleIconRedLabel';
import LessonRescheduleMarker from '../components/LessonReshedule/LessonRescheduleMarker';

export interface StudentDashboardProps extends GenericProps {
}
export interface StudentDashboardState {
}
@transl()
@inject('userStore')
@inject('lessonStore')
@inject('evaluationStore')
@observer
export class StudentDashboardPage extends React.Component<StudentDashboardProps, StudentDashboardState> {
    renderLessonsList(lessons: LessonExtended[]): React.ReactNode {
        const { t } = this.props;

        return (
            <div className="block">
                <div className="table-responsive no-padding">
                    <table className="upcoming-table table-striped">
                        <thead>
                        <tr>
                            <th>{t('Name')}</th>
                            <th>{t('Date')}</th>
                            <th>{t('Time')}</th>
                            <th>{t('Reschedule')}</th>
                        </tr>
                        </thead>
                        <tbody>
                            {lessons.map((item) => this.renderLessonsItem(item))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
    renderLessonsItem(lesson: LessonExtended): React.ReactNode {
        const { t } = this.props;
        return (
            <tr key={lesson.date + lesson.title}>
                <td><strong>{t('Lesson')} {lesson.title}</strong></td>
                <td><WesDate date={lesson.date} /></td>
                <td><Moment format="ha" date={lesson.date} /> - <Moment format="ha" date={lesson.date + lesson.duration * 1000} /></td>
                <td><LessonRescheduleMarker lesson={lesson} /></td>
            </tr>
        );
    }
    render(): React.ReactNode {
        const { t, lessonStore, evaluationStore, userStore } = this.props;
        const lessonsList: LessonExtended[] = lessonStore.lessonsList$.current();

        if (
            lessonsList && lessonsList.length > 0 &&
            evaluationStore.meEvaluations$.current() && evaluationStore.meEvaluations$.current().length === 0
        ) {
            return <Redirect to="/student/welcome" />;
        }

        return (
            <section id="main">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <h1>{t('My Dashboard')}</h1>
                        </div>
                        <div className="statistics">
                            <div className="col-md-8">
                                <header>
                                    <h2>{t('Students Progress')}</h2>
                                    <Link to={`/student/statistic/${userStore.meId}`} className="btn btn-primary">
                                        <LineChartSVG />
                                        {t('View full statistics')}
                                    </Link>
                                </header>
                                <div className="block">
                                    <div className="graph">
                                        {/* <img src="/images/graph_01.png" width="100%" height="auto" alt=""/> */}
                                        <StudentDashboardChartsComponent evaluations={evaluationStore.meEvaluations$.current()} />
                                    </div>
                                </div>
                            </div>
                            <LazyLoad $={lessonsList}>
                                { () =>
                                    <div className="col-md-4">
                                        <header>
                                            <h2>{t('Upcoming Lessons')}</h2>
                                            <span>{t('Teacher:')} <strong>{lessonsList.length > 0 && lessonsList[0].teacher.name}</strong></span>
                                        </header>
                                        {this.renderLessonsList(lessonsList)}
                                    </div>
                                }
                            </LazyLoad>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
