import * as React from 'react';
import { GenericProps } from '../../interfaces/GenericProps.interface';
import { observer, inject } from 'mobx-react';
import transl from '../../utils/t.decorator';
import DeleteUser from '../components/DeleteUser/DeleteUser.component';
import ProfilesListComponent from '../components/ProfilesList.component';
import { UserProfile } from '../../stores/Profiles.store';
import LazyLoad from '../../components/LazyLoad';
import moment = require('moment');
import { SelectedUser } from './components/SelectedUser.component';
import { UserRole } from '../../interfaces/UserRole.interface';
import { User } from '../../services/api';
import InviteUserButtonComponent from './components/InviteUserButton.component';

export interface AdminProfilesProps extends GenericProps {
}
export interface AdminProfilesState {
}

@transl()
@inject('userStore')
@inject('profilesStore')
@observer
export class AdminProfilesPage extends React.Component<AdminProfilesProps, AdminProfilesState> {

    render(): React.ReactNode {
        const { t, profilesStore } = this.props;
        const { currentRole } = profilesStore;
        const users: User[] = profilesStore.users$.current();

        return (
            <section id="main">
                <div className="container-fluid">
                    <div className="row">
                        <div className="aside">
                            <div className="heading">
                                <h2>{t('Profiles')}</h2>
                                <LazyLoad $={currentRole}>
                                    { () => (
                                        <div className="dropdown">
                                            <span>{t(currentRole)} <span className="glyphicon glyphicon-menu-down"></span></span>
                                            <ul className="dropdown-menu">
                                                {this.renderDropdownMenuItem('ADMIN', 'Admins')}
                                                {this.renderDropdownMenuItem('PARTNER', 'Partners')}
                                                {this.renderDropdownMenuItem('TEACHER', 'Teacher')}
                                                {this.renderDropdownMenuItem('STUDENT', 'Students')}
                                            </ul>
                                        </div>
                                    )}
                                </LazyLoad>
                                &nbsp; {currentRole !== 'STUDENT' && <InviteUserButtonComponent userType={currentRole} />}
                            </div>
                            <ProfilesListComponent users={users} />
                        </div>
                        <SelectedUser />
                    </div>
                </div>
            </section>
        );
    }

    renderDropdownMenuItem(userRole: UserRole, title: string): React.ReactNode {
        const { t, profilesStore } = this.props;
        const { currentRole } = profilesStore;

        return (
            <li className={currentRole === userRole ? 'active' : ''}>
                <a onClick={(e) => { this.handleChange(e, userRole); }}>
                    {t(title)}
                </a>
            </li>
        );
    }

    handleChange(event: React.SyntheticEvent<HTMLAnchorElement>, userRole: UserRole): void {
        const { profilesStore } = this.props;

        event.preventDefault();
        profilesStore.changeRole(userRole);
    }
}
