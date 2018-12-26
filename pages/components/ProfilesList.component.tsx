import * as React from 'react';
import { GenericProps } from '../../interfaces/GenericProps.interface';
import { observer, inject } from 'mobx-react';
import transl from '../../utils/t.decorator';
import LazyLoad from '../../components/LazyLoad';
import UserThumbComponent from './UserThumb.component';
import { UsersExtended, User } from '../../services/api';

export interface ProfilesListComponentProps extends GenericProps {
    users: User[];
}
export interface ProfilesListComponentState {
}

@transl()
@inject('profilesStore')
@observer
export default class ProfilesListComponent extends React.Component<ProfilesListComponentProps, ProfilesListComponentState> {
    render(): React.ReactNode {
        const { profilesStore, users, t } = this.props;
        const listUsers = () => {
            return users.map((user) => {
                    return (
                        <li
                            key={user.id}
                            onClick={() => {this.props.profilesStore.changeProfile(user).then(() => this.setState({})); }}
                            className={profilesStore.currentProfile.id === user.id ? 'active' : ''}
                        >
                            <a>
                                <span className="icon"><UserThumbComponent user={user} width="62" height="62" /></span>
                                <span className="info">
                                    <strong>{user.name}</strong>
                                    <em>{profilesStore.currentRole === 'PARTNER' ? user.company_name : user.country}</em>
                                </span>
                            </a>
                        </li>
                    );
                });
        };
        return (
            <LazyLoad $={users} noItems={t('no students')}>
                   {() => <ul className="aside-students-list">{listUsers()}</ul>}
            </LazyLoad>
        );
    }

}
