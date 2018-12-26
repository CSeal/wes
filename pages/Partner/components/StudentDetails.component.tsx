import * as React from 'react';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import { observer, inject } from 'mobx-react';
import transl from '../../../utils/t.decorator';
import { Link } from 'react-router-dom';
import { InviteUser, Lesson, UsersLesson, User, UsersEvaluation, UsersExtended } from '../../../services/api';
import LazyLoad from '../../../components/LazyLoad';
import { observable } from 'mobx';
import { ILazyObservable, lazyObservable } from 'mobx-utils';
import { DetailsStudentStore, UsersLessonExtended, UsersQuizExtended } from '../../../stores/DetailsStudent.store';
import WesDate from '../../../components/WesDate';
import Moment from 'react-moment';
import * as moment from 'moment';
import { StudentDashboardChartsComponent } from '../../Student/components/StudentDashboardChartsCharts.component';
import StudentsComponent from '../../components/Students.component';
import DeleteUser from '../../components/DeleteUser/DeleteUser.component';
import AdminActionsList from '../../Admin/components/AdminActionsList.component';
import UserThumbComponent from '../../components/UserThumb.component';

export interface StudentDetailsComponentProps extends GenericProps {
    detailsStudentStore?: DetailsStudentStore;
    actions?: () => React.ReactNode;
}
export interface StudentDetailsComponentState {
}

@transl()
@inject('userStore')
@inject('profilesStore')
@inject('detailsStudentStore')
@observer
export default class StudentDetailsComponent extends React.Component<StudentDetailsComponentProps, StudentDetailsComponentState> {
    static defaultProps = {
        actions: () => <div />,
    };

    renderLessonsList(lessons: UsersLessonExtended[]): React.ReactNode {
        const {t} = this.props;

        return (
            <div className="table-responsive no-padding">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>{t('Name')}</th>
                        <th>{t('Date')}</th>
                        <th>{t('Time')}</th>
                        <th>{t('Lessons')} <br />{t('Record')}</th>
                    </tr>
                    </thead>
                    <tbody>
                        {lessons.map((item) => this.renderLessonsItem(item))}
                    </tbody>
                </table>
            </div>
        );
    }
    renderLessonsItem(lesson: UsersLessonExtended): React.ReactNode {
        const { t } = this.props;

        /* TODO: fix error in link url  =>  lesson.lesson.zoom.record_data.recording_files[0].play_url */
        return (
            <tr key={lesson.lesson_id}>
                <td>{lesson.lesson.title}</td>
                <td><WesDate date={lesson.lesson.date} /></td>
                <td><Moment format="ha" date={lesson.lesson.date} /> - <Moment format="ha" date={lesson.lesson.date + lesson.lesson.duration * 1000} /></td>
                <td>
                    {
                        lesson.lesson.zoom && lesson.lesson.zoom.record_data
                        ? (
                          (moment(lesson.lesson.zoom.created_at).add(48, 'hour').isAfter())
                          ? <a target="_blank" title={t('zoom record link')} href={lesson.lesson.zoom.record_data.recording_files[0].play_url}>{t('Link')} {lesson.lesson.zoom.record_data.topic}</a> 
                          : <span>{t('exp. ')} {moment(lesson.lesson.zoom.created_at).add(48, 'hour').fromNow()}</span>
                          )
                        : []
                    }
                </td>
            </tr>
        );
    }
    renderPackages(user: UsersExtended): string[] {
        if (!Array.isArray(user.active_packages)) {
          return ['...'];
        }
        return user.active_packages.map((el, idx) => {
            return el.name + (idx === user.active_packages.length - 1 ? '' : ', ');
        });
    }
    renderPackageDuration(user: UsersExtended): string[] {
        if (!Array.isArray(user.active_packages)) {
          return ['...'];
        }
        return user.active_packages.map((el, idx) => {
            return moment.unix(el.start).format('L')  + '-' + moment.unix(el.ends).format('L') + (idx === user.active_packages.length - 1 ? '' : ', ');
        });
    }
    renderSelectedUser() {
        const { t} = this.props;
        const user = this.props.profilesStore.currentProfile;
        return user ? (
          <div id="profile">
            <div className="photo">
                    <UserThumbComponent user={user} width="165" height="165" />
            </div>
            <div className="info">
              <AdminActionsList user={user} />
              {this.props.actions()}
              <strong className="name">
                {user.name}
                {/* TODO: get back evaluation_score as field for user */}
                {/* {user.evaluation_score && <span className="rating">{user.evaluation_score}</span>} */}
              </strong>
              <dl>
                <dt>{t('Time Zone')}:</dt>
                  <dd>{user.timezone || '...'}</dd>
                <dt>{t('Phone')}:</dt>
                <dd>{user.phone || '...'}</dd>
                <dt>{t('Email')}:</dt>
                <dd>{user.email || '...'}</dd>
                <dt>{t('Active Packages')}:</dt>
                <dd>
                  <span>{this.renderPackages(user)}</span>
                </dd>
                <dt>{t('Package Duration')}:</dt>
                <dd>{this.renderPackageDuration(user)}</dd>
              </dl>
            </div>
          </div>
        ) : (
          <div />
        );
    }
    render(): React.ReactNode {
        const {t, profilesStore, detailsStudentStore} = this.props;
        const lessons = detailsStudentStore.lessons$.current();
        const quizzes = detailsStudentStore.quizzes$.current();
        const evaluations = detailsStudentStore.evaluations$.current();
        if (profilesStore.currentProfile === undefined) {
            return <div></div>;
        }
        return (
            <div>
                {this.renderSelectedUser()}
                <h2>{t('Overview')}</h2>
                <LazyLoad $={profilesStore.currentProfile}>
                    {() => this.renderInfo(quizzes, evaluations)}
                </LazyLoad>
                <div className="heading">
                <h2>{t('Lessons')}</h2>
                {/* <div className="dropdown">
                    <span className="">{t('Lasted')} <span className="glyphicon glyphicon-menu-down"></span></span>
                    <ul className="dropdown-menu">
                        <li><a href="#">{t('Action')}</a></li>
                        <li className="active"><a href="#">{t('Active state')}</a></li>
                        <li><a href="#">{t('Something else here')}</a></li>
                        <li><a href="#">{t('Separated link')}</a></li>
                    </ul>
                </div> */}
                </div>

                <div className="block">
                    <LazyLoad $={lessons}>
                        {() => this.renderLessonsList(lessons)}
                    </LazyLoad>
                </div>
                {this.renderGraph(evaluations)}
            </div>

        );
    }

    renderInfo(quizzes: UsersQuizExtended[] = [], evaluations: UsersEvaluation[] = []): React.ReactNode {
        const { t, detailsStudentStore } = this.props;
        // TODO: fix type at backend UserDTO
        const user: any = this.props.profilesStore.currentProfile;

        const evaluationMark = (type: string, evs: UsersEvaluation[]): number => {
            const marks = evs.filter((evaluation) => evaluation.type.toLowerCase() === type.toLowerCase());
            return marks.length > 0 ? marks[0].rate : 0;
        };
        return (
            <div className="block">
                <h3>{t('Evaluation Grades')}</h3>
                <ul className="progress-raiting">
                    <li>
                        <span className="color-blue">{t('Grammar')}</span>
                        <em>{evaluationMark('grammar', evaluations)}</em>
                    </li>
                    <li>
                        <span className="color-pink">{t('Writing')}</span>
                        <em>{evaluationMark('writing', evaluations)}</em>
                    </li>
                    <li>
                        <span className="color-rose">{t('Speaking')}</span>
                        <em>{evaluationMark('speaking', evaluations)}</em>
                    </li>
                    <li>
                        <span className="color-yellow">{t('Listening')}</span>
                        <em>{evaluationMark('listening', evaluations)}</em>
                    </li>
                </ul>
                <h3>{t('Lessons Progress')}</h3>
                <div className="progress">
                    <div className="progress-bar-info">{user.lessons_count.done}/{user.lessons_count.total} {t('lessons left')}</div>
                    <div className="progress-bar" style={{width: user.lessons_count.done / user.lessons_count.total * 100 + '%'}}></div>
                </div>
                <h3>{t('Quiz')}</h3>
                <LazyLoad $={quizzes}>
                {
                    () => this.renderQuizzesList(quizzes)
                }
                </LazyLoad>

            </div>
        );
    }

    renderQuizzesList(quizzes: UsersQuizExtended[]): React.ReactNode {
        return quizzes.map((quiz) =>
            <div key={quiz.quiz_id}>
                <h4>{quiz.quiz.content}</h4>
                <p>{quiz.answer}</p>
            </div>);
    }

    renderGraph(evaluations: UsersEvaluation[]): React.ReactNode {
        const {t, evaluationStore} = this.props;
        return (
            <div>
                <h2>{t('Student Progress')}</h2>
                <div className="block">
                    <div className="graph">
                        <StudentDashboardChartsComponent evaluations={evaluations} />
                    </div>
                </div>
            </div>
        );
    }
}
