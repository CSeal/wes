import { observable, action, computed } from 'mobx';
import { ILazyObservable, lazyObservable } from 'mobx-utils';

import { notificationApiService } from '../services';
import { Notification, User } from '../services/api';

export interface NotificationToast extends Notification {
}

export interface NotificationUser extends Notification {
    notifiable: User;
    involved: User;
    actions: NotificationActions;
}
interface NotificationActions {
    [actionName: string]: {
        style: 'primary' | 'default',
        title: string;
    };
}

export class NotificationStore {
    @observable notifications$: ILazyObservable<NotificationUser[]> = lazyObservable((sink) =>
        this.notificationApi()
        .notificationsGet(0, 3, undefined, undefined, undefined, undefined, undefined , undefined, undefined, true)
        .then((response) => (
            sink(response.data as NotificationUser[])),
        ),
    );

    @observable notificationsRegular$: ILazyObservable<NotificationUser[]> = lazyObservable((sink) =>
        this.notificationApi()
        .notificationsGet(0, 30, undefined, 'created_at', 'desc', 'notifiable,involved', undefined , undefined, 'REGULAR')
        .then((response) => (
            sink(response.data as NotificationUser[])),
        ),
    );
    @observable notificationsAlert$: ILazyObservable<NotificationUser[]> = lazyObservable((sink) =>
        this.notificationApi()
        .notificationsGet(0, 30, undefined, 'created_at' , 'desc', 'notifiable,involved', undefined , undefined, 'ALERT')
        .then((response) => (
            sink(response.data as NotificationUser[])),
        ),
    );

    @observable notificationsInviteUser$: ILazyObservable<NotificationUser[]> = lazyObservable((sink) =>
        this.notificationApi()
        .notificationsGet(0, 30, undefined, 'created_at' , 'desc', 'notifiable,involved', undefined , undefined, 'INVITE_USER')
        .then((response) => (
            sink(response.data as NotificationUser[])),
        ),
    );

    @computed get unreadFlag(): boolean {
        return this.notifications$.current() && this.notifications$.current().length > 0;
    }

    constructor(
        protected notificationApi = notificationApiService,
    ) {}

    @action('makeAction') async makeAction(notification: NotificationUser, actionCode: string, payload = {}): Promise<void> {
        await this.notificationApi().notificationsIdHandleActionPost(notification.id, actionCode, payload);
        await this.notifications$.refresh();
    }

    @action('makeRead') async makeRead(notifications: NotificationUser[]): Promise<void> {
        await Promise.all(
            notifications
                .filter((notification) => notification.read_at === null)
                .map((notification) => this.notificationApi().notificationsIdReadPost(notification.id)),
        );
    }
}
const notificationStore = new NotificationStore();

export default notificationStore;
