import * as React from 'react';
import { GenericProps } from '../../interfaces/GenericProps.interface';
import { observer, inject } from 'mobx-react';
import transl from '../../utils/t.decorator';
import { Link } from 'react-router-dom';
import { UserProfile, UserWithQuiz, UserWithQuizQuiz } from '../../stores/Profiles.store';
import LazyLoad from '../../components/LazyLoad';
import UserThumbComponent from '../components/UserThumb.component';
import YouTube from 'react-youtube';

export interface StudentTeachersProps extends GenericProps {
}

export interface StudentTeachersState {
}

@transl()
@inject('profilesStore')
@observer
export class StudentTeachersPage extends React.Component<StudentTeachersProps, StudentTeachersState> {

    render(): React.ReactNode {
        const { t, profilesStore } = this.props;
        const myTeachers: UserWithQuiz[] = profilesStore.relatedUsersWithQuiz$.current();
        const allTeachers: UserWithQuiz[] = profilesStore.teachers$.current();

        const currentUserWithQuiz: UserWithQuiz = profilesStore.currentUserWithQuiz;

        return (
            <section id="main">
                <div className="container-fluid">
                    <div className="row">
                        <div className="aside">
                            <div className="heading">
                                <h1>{t('Teachers')}</h1>
                            </div>
                            <LazyLoad $={myTeachers}>
                                {() => this.renderTeachers(myTeachers, t('My Teachers'))}
                            </LazyLoad>
                            <LazyLoad $={allTeachers}>
                                {() => this.renderTeachers(allTeachers, t('All Teachers'))}
                            </LazyLoad>
                        </div>
                        <div id="content" className="col-md-9 col-md-offset-3">
                            <LazyLoad $={currentUserWithQuiz}>
                                {
                                    () => ([
                                        this.renderSelectedTeacher(currentUserWithQuiz),
                                        this.renderQuizzes(currentUserWithQuiz),
                                    ])
                                }
                            </LazyLoad>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    renderSelectedTeacher(teacher: UserWithQuiz): React.ReactNode {
        const { t } = this.props;
        const href: string = '/student/teachers#';

        return (
            <div id="profile" key="profile">
                <div className="photo">
                    <UserThumbComponent user={teacher} width="165" height="165" />
                </div>
                <div className="info">
                    <ul className="action">
                        <Link to={href}>
                            <li>
                                <Link to="/chat/" className="btn btn-default">{t('CONTACT A TEACHER')}</Link>
                            </li>
                        </Link>
                    </ul>
                    <strong className="name">{teacher.name}</strong>
                    <dl>
                        <dt>{t('Time Zone')}:</dt>
                        <dd>{teacher.timezone}</dd>
                        <dt>{t('Country')}:</dt>
                        <dd>{teacher.country}</dd>
                    </dl>
                </div>
            </div>
        );
    }

    renderTeachers(teachers: UserWithQuiz[], header: string = 'Teachers'): React.ReactNode {
        const { t, profilesStore } = this.props;

        return [
            <h2 key="aside-students-header">{header}</h2>,
            <ul className="aside-students-list" key="aside-students-list">
                {teachers.map((userWithQuiz) => {
                    const { id, photo, name, country } = userWithQuiz;
                    const href: string = '/student/teachers';
                    return (
                        <li key={id}>
                            <Link to={href} onClick={() => { profilesStore.changeCurrentUserWithQuiz(userWithQuiz); }}>
                                <span className="icon">
                                    <UserThumbComponent user={userWithQuiz} width="62" height="62" />
                                </span>
                                <span className="info">
                                    <strong>{name}</strong>
                                    <em>{country}</em>
                                </span>
                            </Link>
                        </li>
                    );
                })}
            </ul>,
        ];
    }

    renderQuizzes(teacher: UserWithQuiz): React.ReactNode {
        const quizzes: UserWithQuizQuiz[] = teacher.quiz;
        const regExp: RegExp = /(?:\r\n|\r|\n)/g;
        const getYouTubeID = require('get-youtube-id');


        return quizzes.map(({ quiz: { title }, quiz_id, answer }, index) => [
            <div className="heading" key={`h-${quiz_id}`}>
                <h2>{title}</h2>
            </div>,
            <div className="block" key={`a-${quiz_id}`} dangerouslySetInnerHTML={{ __html: answer.replace(regExp, '<br />') }} />,
            index === 0 && teacher.youtube_url && teacher.youtube_url !== '' &&
            <div className="block text-center"> <YouTube
              videoId={getYouTubeID(teacher.youtube_url)}
              opts={{
                    height: '390',
                    width: '640',
                    playerVars: { // https://developers.google.com/youtube/player_parameters
                        // autoplay: 1,
                    },
                }}
            /></div>,
        ]);
    }
}
