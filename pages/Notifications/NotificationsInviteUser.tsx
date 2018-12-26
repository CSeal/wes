import * as React from 'react';
import { GenericProps } from '../../interfaces/GenericProps.interface';
import { observer, inject } from 'mobx-react';
import transl from '../../utils/t.decorator';
import StudentsComponent from '../components/Students.component';
import LazyLoad from '../../components/LazyLoad';
import NotificationItemComponent from './components/NotificationItem.component';
import { NotificationUser } from '../../stores/Notification.store';

export interface NotificationInviteUserProps extends GenericProps {
}
// tslint:disable:max-line-length

@transl()
@inject('notificationStore')
@observer
export class NotificationInviteUserPage extends React.Component<NotificationInviteUserProps> {

  renderItemsList(items: NotificationUser[]): React.ReactNode {
    const {t} = this.props;

    return items &&  items.map((item) => <NotificationItemComponent key={item.id} notification={item} />);
  }
  render(): React.ReactNode {
        const {t, notificationStore} = this.props;
        return (
          <div className="row">
              <div className="col-md-12">
                <section className="notification-list">
                  <LazyLoad $={notificationStore.notificationsInviteUser$.current()}>
                    {() => this.renderItemsList(notificationStore.notificationsInviteUser$.current())}
                  </LazyLoad>
                </section>
              </div>
          </div>
        );
    }
}
