import * as React from 'react';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import { observer, inject } from 'mobx-react';
import transl from '../../../utils/t.decorator';
import { Link } from 'react-router-dom';
import LazyLoad from '../../../components/LazyLoad';
import { NotificationUser } from '../../../stores/Notification.store';
import UserThumbComponent from '../../components/UserThumb.component';
import Moment from 'react-moment';
import * as classNames from 'classnames';
import { Notification } from '../../../services/api';

export interface NotificationItemComponentProps extends GenericProps {
    notification: NotificationUser;
}
export interface NotificationItemComponentState {
}

@transl()
@inject('notificationStore')
@observer
export default class NotificationItemComponent extends React.Component<NotificationItemComponentProps, NotificationItemComponentState> {
    async notificationAction(notification: NotificationUser, actionCode: string): Promise<void> {
        this.props.notificationStore.makeAction(notification, actionCode);
    }
    componentWillMount(): void {
        // if notification has no actions, it will be marked as read once as it was displayed
        if (this.props.notification.actions === null) {
            this.props.notificationStore.makeRead([this.props.notification]);
        }
    }
    compileMessage(notification: NotificationUser): string {
        const data = notification.data;
        let message: string  = data.content;
        Object.keys(data).filter((token) => token !== 'link' && token !== 'content')
            .forEach((token) =>
                message = message.replace(new RegExp(':' + token, 'g'), '<strong>' + data[token] + '</strong>'),
            );
        message = message.replace(new RegExp(':link', 'g'), '<a href="' + data.link  + '">link</a>');
        return message;
    }
    render(): React.ReactNode {
        const {t, notification} = this.props;
        return (
            <div className={classNames('item', {warning: notification.read_at === null})}>
                <ul className="buttons">
                    {notification.actions && Object.keys(notification.actions).map((action, index) => {
                        // tslint:disable-next-line:max-line-length
                        return <li key={action}>
                                <button className={classNames('btn', `btn-${notification.actions[action].style}`)}  onClick={() => this.notificationAction(notification, action)}>{notification.actions[action].title}</button>
                            </li>;
                    }) }
                </ul>
                <span className="icon">
                    <UserThumbComponent user={notification.involved || notification.notifiable} />
                </span>
                <div className="info">
                    <div dangerouslySetInnerHTML={{__html: this.compileMessage(notification)}} />
                    <span className="status">
                        <Moment fromNow>{notification.created_at}</Moment>
                    </span>
                </div>
            </div>
        );
    }

}
