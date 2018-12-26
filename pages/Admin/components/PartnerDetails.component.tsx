import * as React from 'react';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import { observer, inject } from 'mobx-react';
import transl from '../../../utils/t.decorator';
import { Link } from 'react-router-dom';
import LazyLoad from '../../../components/LazyLoad';
import WesDate from '../../../components/WesDate';
import Moment from 'react-moment';
import {DetailsPartnerStore, UsersBalanceExtended} from '../../../stores/DetailsPartner.store';
import { UsersExtended, UsersBalance, User } from '../../../services/api';
import DeleteUser from '../../components/DeleteUser/DeleteUser.component';
import UserThumbComponent from '../../components/UserThumb.component';
import SignInAsUserComponent from './SignInAsUser.component';
import AdminActionsList from './AdminActionsList.component';
import AddUserFundsButtonComponent from './AddUserFundsButton.component';

export interface PartnerDetailsComponentProps extends GenericProps {
    detailsPartnerStore?: DetailsPartnerStore;
}
export interface PartnerDetailsComponentState {
}

@transl()
@inject('profilesStore')
@inject('detailsPartnerStore')
@observer
export default class PartnerDetailsComponent extends React.Component<PartnerDetailsComponentProps, PartnerDetailsComponentState> {
    renderPackages(user: UsersExtended): string[] {
        return user.active_packages.map((el, idx) => {
            return el.name + (idx === user.active_packages.length - 1 ? '' : ', ');
        });
    }
    renderSelectedUser() {
        const {t, profilesStore} = this.props;
        const user: User = profilesStore.currentProfile;
        return user ? (
                <div id="profile">
                    <div className="photo">
                        <UserThumbComponent user={user} width="165" height="165" />
                    </div>
                    <div className="info">
                        <AdminActionsList user={user} />
                        <strong className="name">{user.name}</strong>
                        <dl>
                            <dt>{t('Time Zone')}:</dt>
                            <dd>{user.timezone || '...'}</dd>
                            <dt>{t('Phone')}:</dt>
                            <dd>{user.phone || '...'}</dd>
                            <dt>{t('Email')}:</dt>
                            <dd>{user.email || '...'}</dd>
                            <dt>{t('Active Packages')}:</dt>
                            <dd><span>{this.renderPackages(user)}</span></dd>
                        </dl>
                    </div>
                </div>
        ) : <div></div>;
    }
    render(): React.ReactNode {
        const {t, profilesStore, detailsPartnerStore} = this.props;
        const balances = detailsPartnerStore.balances$.current();
        if (profilesStore.currentProfile === undefined) {
            return <div></div>;
        }
        return (
            <div>
                {this.renderSelectedUser()}
                <div className="heading">
                    <h2>{t('Payment History')}</h2>
                </div>

                <div className="block">
                    <LazyLoad $={balances}>
                        {() => this.renderBalances(balances)}
                    </LazyLoad>
                    <div className="text-center">
                        <AddUserFundsButtonComponent user={profilesStore.currentProfile} />
                    </div>
                </div>
            </div>

        );
    }
    renderBalances(balances: UsersBalanceExtended[]): React.ReactNode {
        const {t} = this.props;
        return <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>{t('Date')}</th>
                            <th>{t('Amount, USD')}</th>
                            <th>{t('Balance, USD')}</th>
                            <th>{t('Receipt')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {balances.map(({id, balance, transaction}) =>
                            <tr key={transaction.id}>
                                <td><Moment date={transaction.created_at} format="DD MMM YYYY" /></td>
                                <td>{transaction.total}</td>
                                <td>{balance}</td>
                                <td>
                                    {
                                        transaction.type === 'partner_monthly_pay'
                                        ?
                                        [
                                            <Link key={`invoice-` + transaction.id} to={'/simple/invoice/' + transaction.id} target="_blank">{t('Receipt')} #{transaction.id}</Link>,
                                            <Link key={`act-` + transaction.id} to={'/simple/invoice/' + transaction.id + '/act'} target="_blank"> #{transaction.id}-A</Link>,
                                        ]
                                        :
                                        ''
                                    }
                                </td>
                            </tr>,
                        )}
                    </tbody>
            </table>;
    }

}
