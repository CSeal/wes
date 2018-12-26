import { observable, action, runInAction, computed, reaction } from 'mobx';
import { lazyObservable, ILazyObservable } from 'mobx-utils';
import { meApiService, statisticsService } from '../services';
import { User, StatisticCountersMonth, StatisticEvaluations, StatisticOwed, UsersStatistic, Message } from '../services/api';
import UserStore from './User.store';
import AuthStore from './Auth.store';
import { AuthService } from '../services/Auth.service';

declare var window: any;

interface MessageExtended extends Message {
    recipient: User;
}

export interface MessageList {
    [userId: number]: Message[];
}

interface AvailableUsers {
    [userId: number]: User;
}

export class ChatStore {

    @observable messages: MessageList = {};
    @observable currentReceipentId: number;
    @observable meId: number;
    @observable message: string;

    /**
     * Releated to me users, which are avaialble for chating with me
     */
    @observable users$: ILazyObservable<User[]> = lazyObservable((sink) => {
        this.meApi().meRelationsGet().then((response) => {
            if (!response.data.length) {
                sink(response.data);
                return;
            }
            this.setCurrentReceipentId(response.data[0].id);
            runInAction(() => {
                response.data.forEach((el) => this.availableUsers[el.id] = el);
            });
            sink(response.data);
        });
    });

    @observable private availableUsers: AvailableUsers = {};

    constructor (
        protected meApi = meApiService,
        protected statisticsApi = statisticsService,
        protected authService = AuthService(),
    ) {

    }

    @action wsInit(meId: number): void {
        this.meId = meId;
        window.io = require('socket.io-client');
        const Echo = require('laravel-echo');

        const EchoClient = new Echo({
            broadcaster: 'socket.io',
            host: window.location.hostname + ':6001',
            auth: {
                headers: {
                    Authorization: 'Bearer ' + this.authService.token,
                },
            },
        });

        EchoClient.private('messages.' + meId)
            .listen('.MessageSent', (e: any) => {
                // console.log(e);
            // here we should call some @action
                this.addMessage(e.message);
            });
    }

    /**
     * Action for loading chat history for all users
     */
    @action('loadAllMessages') async loadAllMessages(): Promise<void> {
        this.meApi().meMessagesHistoryGet().then((response) => {
            runInAction(() => {
                response.data.forEach((message) =>
                    this.messages[message.recipient_id] ?  this.messages[message.recipient_id].push(message) : this.messages[message.recipient_id] = [message]
                );
            });
        });
    }
    /**
     * Action for loading chat history with specific recipient
     * @param recipientId
     */
    @action('loadMessages') async loadMessages(recipientId: number): Promise<void> {
        this.meApi().meMessagesHistoryGet(recipientId).then((response) => {
            runInAction(() => {
                this.messages[recipientId] = response.data;
            });
        });
    }

    /**
     * Post message to some user
     * @param recipientId userID
     * @param content message text
     */
    @action('postMessage') async postMessage(recipientId: number, content: string): Promise<void> {
        const message = (await this.meApi().meMessagesPost({ recipient_id: recipientId, content })).data;
        this.addMessage(message);
    }

    /**
     * Post message to some user
     * @param recipientId userID
     * @param content message text
     */
    @action('addMessage') addMessage(message: Message): void {
        this.messages[message.recipient_id === this.meId ? message.user_id : message.recipient_id] =
            (this.messages[message.recipient_id === this.meId ? message.user_id : message.recipient_id] || [])
            .concat([message]);
    }

    /**
     * Set current receipent id
     * @param id userID
     * @returns {void}
     */
    @action('setCurrentReceipentId') setCurrentReceipentId(id: number): void {
        this.currentReceipentId = id;
        this.loadMessages(id);
    }

    /**
     * Set message text
     * @param value message text
     * @returns {void}
     */
    @action('setMessageValue') setMessageValue(value: string): void {
        this.message = value;
    }

    /**
     * Send message to receipent user
     * @returns {void}
     */
    @action('sendMessage') async sendMessage(): Promise<void> {
        await this.postMessage(this.currentReceipentId, this.message).then(() => {
            runInAction(() => this.message = '');
        });
    }

    /**
     * Send message to receipent user
     * @returns {void}
     */
    @action('readMessage') async readMessages(messages: Message[]): Promise<void> {
        await this.meApi().meMessagesReadPut({
            messages: messages.map((message) => message.id),
        });
        messages.forEach((message) => message.read = Date.now());
    }
    /**
     * Returns current receipent user
     * @returns {User}
     */
    @computed get receipentUser(): User {
        return this.currentReceipentId && this.availableUsers[this.currentReceipentId];
    }

    /**
     * Returns current messages list
     * @returns {Array} Array of Message
     */
    @computed get currentMessagesList(): Message[] {
        return this.messages[this.currentReceipentId] && this.messages[this.currentReceipentId].slice().reverse();
        // return this.currentReceipentId
        //     ? this.messages[this.currentReceipentId]
        //     : [];
    }

    @computed get unreadFlag(): boolean {
        return Object.keys(this.messages).some(
            (key) => this.messages[parseInt(key, 10)].some((m) => m.read === 0),
        );
    }

}
const chatStore = new ChatStore();
export default chatStore;

reaction(() => UserStore.meId, (meId: number) => {
    chatStore.wsInit(meId);
});
