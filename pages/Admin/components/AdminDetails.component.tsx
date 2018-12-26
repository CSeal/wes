import * as React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import transl from '../../../utils/t.decorator';
import LazyLoad from '../../../components/LazyLoad';
import WesDate from '../../../components/WesDate';
import { DetailsPartnerStore } from '../../../stores/DetailsPartner.store';
import { UsersExtended, UsersBalance, User } from '../../../services/api';
import DeleteUser from '../../components/DeleteUser/DeleteUser.component';
import UserThumbComponent from '../../components/UserThumb.component';
import { MoreButtonSVG } from '../../../components/ButtonsSVG/MoreButton';
import { LoginAsButtonSVG } from '../../../components/ButtonsSVG/LoginAsButton';
import { DeleteButtonSVG } from '../../../components/ButtonsSVG/DeleteButton';
import AdminActionsList from './AdminActionsList.component';

export interface AdminDetailsComponentProps extends GenericProps {
    detailsPartnerStore?: DetailsPartnerStore;
}
export interface AdminDetailsComponentState {
}

export interface IDescriptionTerm {
    dt: string;
    dd: React.ReactText;
}

@transl()
@inject('userStore')
@inject('profilesStore')
@inject('detailsPartnerStore')
@observer
export default class AdminDetailsComponent extends React.Component<AdminDetailsComponentProps, AdminDetailsComponentState> {
    render(): React.ReactNode {
        const { t, profilesStore, detailsPartnerStore } = this.props;
        const balances = detailsPartnerStore.balances$.current();

        if (profilesStore.currentProfile === undefined) {
            return <div />;
        }

        return this.renderSelectedUser();
    }

    renderSelectedUser() {
        const user: User = this.props.profilesStore.currentProfile;

        return (
            user ? this.renderProfile(user) : <div />
        );
    }

    renderProfile(user: User): React.ReactNode {
        const { t, profilesStore, userStore } = this.props;
        const { currentRole } = profilesStore;
        const { country, city, email, phone, timezone } = user;
        const userLocation: string = `${country ? country : ''} ${city ? city : ''}`;

        return (
            <div id="profile">
                <div className="photo">
                    <UserThumbComponent user={user} width="165" height="165" />
                </div>
                <div className="info">
                    <AdminActionsList user={user} />
                    <strong className="name">{user.name}</strong>
                    <dl>
                        {this.renderDescriptionTerm({ dt: 'Time Zone', dd: timezone })}
                        {this.renderDescriptionTerm({ dt: 'Location', dd: userLocation })}
                        {this.renderDescriptionTerm({ dt: 'Phone', dd: phone })}
                        {this.renderDescriptionTerm({ dt: 'Email', dd: email })}
                    </dl>
                </div>
            </div>
        );
    }

    renderDescriptionTerm({ dt, dd }: IDescriptionTerm): React.ReactNode {
        const { t } = this.props;
        const computedString: string = dd ? dd.toString().trim() : '...';

        return computedString && [
            <dt key="dt">{t(dt)}</dt>,
            <dd key="dd">{dd}</dd>,
        ];
    }
}
