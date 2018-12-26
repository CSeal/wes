import * as React from 'react';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import { User } from '../../../services/api';
import SignInAsUserComponent from './SignInAsUser.component';
import DeleteUser from '../../components/DeleteUser/DeleteUser.component';
import transl from '../../../utils/t.decorator';
import { LoginAsButtonSVG } from '../../../components/ButtonsSVG/LoginAsButton';
import { DeleteButtonSVG } from '../../../components/ButtonsSVG/DeleteButton';
import { SuspendButtonSVG } from '../../../components/ButtonsSVG/SuspendButton';
import { MoreButtonSVG } from '../../../components/ButtonsSVG/MoreButton';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';

interface AdminActionsListProps extends GenericProps {
    user: User;
}

@transl()
@inject('userStore')
@observer
export default class AdminActionsList extends React.Component<AdminActionsListProps> {

    @observable isActive: boolean = false;

    menuClick = (event: React.SyntheticEvent<HTMLAnchorElement>): void => {
        event.preventDefault();
        this.isActive = !this.isActive;
    }

    render(): React.ReactNode {
        const {t, user, userStore} = this.props;
        const me = userStore.me$.current();
        if (me && me.roles.role !== 'ADMIN') {
            return [];
        }

        return (
            <div className="admin-controls">
                <div className="more-holder">
                    <a href="#" className="btn-more" onClick={this.menuClick}>
                        <MoreButtonSVG />
                    </a>
                </div>
                <div className="icons-row" style={{display: this.isActive ? 'block' : 'none'}}>
                    <div className="icons-row__wrap">
                        {/* <a href="#" className="icons-row__item">
                            <div className="icons-row__icon">
                                <SuspendButtonSVG />
                            </div>
                            <div className="icons-row__text">
                                {t('Suspend')}
                            </div>
                        </a> */}
                        <SignInAsUserComponent user={user}>
                        <span className="icons-row__item">
                            <div className="icons-row__icon">
                                <LoginAsButtonSVG />
                            </div>
                            <div className="icons-row__text">
                                {t('Login as')}
                            </div>
                        </span>
                        </SignInAsUserComponent>
                        <DeleteUser user={user}>
                            <span className="icons-row__item">
                                <div className="icons-row__icon">
                                    <DeleteButtonSVG />
                                </div>
                                <div className="icons-row__text">
                                    {t('Delete')}
                                </div>
                            </span>
                        </DeleteUser>
                    </div>
                </div>
            </div>
        );
    }
}
