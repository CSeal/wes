import * as React from 'react';
import { GenericProps } from '../interfaces/GenericProps.interface';
import { Switch, Route } from 'react-router';
import { NotificationRegularPage } from './Notifications/NotificationsRegular';
import { NotificationAlertPage } from './Notifications/NotificationsAlerts';
import transl from '../utils/t.decorator';
import { NavLink } from 'react-router-dom';
import { NotificationInviteUserPage } from './Notifications/NotificationsInviteUser';
import { inject, observer } from 'mobx-react';

export interface NotificationPageProps extends GenericProps {
}
@transl()
@inject('notificationStore')
@observer
export class NotificationPage extends React.Component<NotificationPageProps> {
    componentWillMount() {
        const { notificationStore } = this.props;
        notificationStore.notificationsRegular$.refresh();

    }
    render(): JSX.Element {
        const { t , notificationStore} = this.props;

        const notificationsRegularCount = notificationStore.notificationsRegular$.current() && notificationStore.notificationsRegular$.current().length;
        return (
            <div className="row">
                <div className="col-md-12">
                    <h1>{t('Notifications')}</h1>
                    <ul className="nav nav-tabs">
                        <li>
                            <NavLink exact to="/notifications/">{t('Regular')}
                            {/* &nbsp; {notificationsRegularCount > 0 && <span className="badge">{notificationsRegularCount}</span>} */}
                            </NavLink>
                        </li>
                        <li><NavLink exact to="/notifications/alerts">{t('Alerts')}</NavLink></li>
                        <li><NavLink exact to="/notifications/invite-user">{t('Invites')}</NavLink></li>
                    </ul>
                </div>
                <div className="col-md-12">
                <section className="notification-list">
                <Switch>
                    <Route exact path="/notifications/" component={NotificationRegularPage}/>
                    <Route exact path="/notifications/alerts" component={NotificationAlertPage}/>
                    <Route exact path="/notifications/invite-user" component={NotificationInviteUserPage}/>
                </Switch>
                </section>
                </div>
            </div>

        );
    }
}
