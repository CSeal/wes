import * as React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import transl from '../../../utils/t.decorator';
import LazyLoad from '../../../components/LazyLoad';
import WesDate from '../../../components/WesDate';
import { DetailsPartnerStore } from '../../../stores/DetailsPartner.store';
import { UsersExtended, UsersBalance, User, UsersMarker } from '../../../services/api';
import DeleteUser from '../../components/DeleteUser/DeleteUser.component';
import UserThumbComponent from '../../components/UserThumb.component';
import { MoreButtonSVG } from '../../../components/ButtonsSVG/MoreButton';
import { LoginAsButtonSVG } from '../../../components/ButtonsSVG/LoginAsButton';
import { DeleteButtonSVG } from '../../../components/ButtonsSVG/DeleteButton';
import { AutoPayButtonSVG } from '../../../components/ButtonsSVG/AutoPayButton';
import { SuspendButtonSVG } from '../../../components/ButtonsSVG/SuspendButton';
import { DetailsTeacherStore, UsersQuizExtended } from '../../../stores/DetailsTeacher.store';
import AdminActionsList from './AdminActionsList.component';
import {Checkbox} from 'react-icheck';
import classNames = require('classnames');
import YouTube from 'react-youtube';
import TeacherDetailsCheckboxComponent from './TeacherDetailsCheckbox.component';

export interface TeacherDetailsComponentProps extends GenericProps {
    detailsTeacherStore?: DetailsTeacherStore;
}
export interface TeacherDetailsComponentState {
}

@transl()
@inject('userStore')
@inject('profilesStore')
@inject('detailsTeacherStore')
@observer
export default class TeacherDetailsComponent extends React.Component<TeacherDetailsComponentProps, TeacherDetailsComponentState> {
    render(): React.ReactNode {
        const { profilesStore } = this.props;

        if (profilesStore.currentProfile === undefined) {
            return <div />;
        }

        return this.renderSelectedUser();
    }

    renderSelectedUser(): React.ReactNode {
        const { profilesStore, detailsTeacherStore } = this.props;
        const user: User = profilesStore.currentProfile;
        const quizzes: UsersQuizExtended[] = detailsTeacherStore.quizzes$.current();
        const userMarkers: UsersMarker[] = profilesStore.userMarkers$.current();

        return (
            user
                ? [
                    this.renderProfile(user, userMarkers),
                    this.renderQuizzes(quizzes, user),
                ] : []
        );
    }

    renderProfile(user: User, markers: UsersMarker[]): React.ReactNode {
        const { t, profilesStore, userStore } = this.props;
        const { currentRole } = profilesStore;
        const { country, city, email, phone, timezone, name } = user;
        const userLocation: string = `${country ? country : ''} ${city ? city : ''}`;

        return (
            <div id="profile" key="profile">
                <div className="photo">
                    <UserThumbComponent user={user} width="165" height="165" />
                </div>
                <div className="info">
                    <AdminActionsList user={user} />
                    <strong className="name">{name}</strong>
                    <dl>
                        <dt>{t('Time Zone')}:</dt>
                        <dd>{timezone}</dd>
                        <dt>{t('Country')}:</dt>
                        <dd>{userLocation}</dd>
                        <dt className="no-float">{t('Choose teacher for')}:</dt>
                        <dd>
                            <div className="form-group">
                                <TeacherDetailsCheckboxComponent code="Evaluation" />
                                <TeacherDetailsCheckboxComponent code="Group" />
                                <TeacherDetailsCheckboxComponent code="Individual" />
                                <TeacherDetailsCheckboxComponent code="Trial" />
                            </div>
                        </dd>
                    </dl>
                </div>
            </div>
        );
    }

    renderQuizzes(quizzes: UsersQuizExtended[], user: User): React.ReactNode {
        const getYouTubeID = require('get-youtube-id');

        return (
            <LazyLoad $={quizzes && user} key="quizzes">
                {() => (
                    <div>
                        {quizzes.map((quiz, index) => {
                            return [
                                <div className="heading" key={quiz.quiz_id}>
                                    <h2>{quiz.quiz.title}</h2>
                                </div>,
                                <div className="block" key={quiz.quiz_id.toString() + 'val'}>
                                    <p>{quiz.answer}</p>
                                    {index === 0 && user.youtube_url && user.youtube_url !== '' &&
                                            <YouTube
                                              videoId={getYouTubeID(user.youtube_url)}
                                              opts={{
                                                    height: '390',
                                                    width: '640',
                                                    playerVars: { // https://developers.google.com/youtube/player_parameters
                                                        // autoplay: 1,
                                                    },
                                                }}
                                            />
                                         }
                                </div>,
                            ];
                        })}
                    </div>
                )}
            </LazyLoad>
        );
    }

    checkboxChangeHandler = (event: React.SyntheticEvent<HTMLInputElement>): void => {
        const { profilesStore } = this.props;
        const markerCode: string = event.currentTarget.name.toUpperCase();
        event.currentTarget.checked
            ? profilesStore.addUserIdMarker({ code: markerCode, type: 'ts', value: 'enabled' })
            : profilesStore.deleteUserIdMarker(markerCode);
    }
}
