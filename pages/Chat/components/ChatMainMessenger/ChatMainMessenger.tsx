import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { ChatMainMessageNotice } from '../ChatMainMessageNotice/ChatMainMessageNotice';
import { ChatMainMessageSendForm } from '../ChatMainMessageSendForm/ChatMainMessageSendForm';
import { ChatMainMessageAnswer } from '../ChatMainMessageAnswer/ChatMainMessageAnswer';
import { GenericProps } from '../../../../interfaces/GenericProps.interface';
import transl from '../../../../utils/t.decorator';
import LazyLoad from '../../../../components/LazyLoad';
import { UsersExtended, User, Message } from '../../../../services/api';

export interface ChatMainMessengerProps extends GenericProps {
}

@transl()
@inject('chatStore')
@observer
export class ChatMainMessenger extends React.Component<ChatMainMessengerProps> {
    render(): React.ReactNode {
        const { chatStore } = this.props;
        const { receipentUser, currentMessagesList } = chatStore;

        return (
            <section className="messenger">
                <LazyLoad $={receipentUser}>
                    {() => (
                        <React.Fragment>
                            {this.renderChatHead(receipentUser)}
                            {this.renderMessages(receipentUser, currentMessagesList)}
                        </React.Fragment>
                    )}
                </LazyLoad>
                <ChatMainMessageSendForm />
            </section>
        );
    }

    renderChatHead = (user: User): React.ReactNode => {
        return (
            <div className="chat-head">
                <span className="interlocutor">{user.name}</span>
                {/* <span className="activity">Last seen Nov 7</span>  */}
                {/* TODO: add last seen */}
            </div>
        );
    }

    renderMessages = (user: User, currentMessagesList: Message[]): React.ReactNode => {
        return (
            <div className="messages">
                <LazyLoad $={currentMessagesList} noItems="no messages">
                    {() => (
                        currentMessagesList.sort(this.sortMessagesByCreatedAt).map((message) => (
                            (user.id === message.user_id)
                                ? <ChatMainMessageNotice key={message.id} message={message} />
                                : <ChatMainMessageAnswer key={message.id} message={message} />
                        )))
                    }
                </LazyLoad>
            </div>

        );
    }

    sortMessagesByCreatedAt = (first: Message, second: Message): number => {
        if (first.created_at > second.created_at) {
            return -1;
        }
        if (first.created_at < second.created_at) {
            return 1;
        }
        return 0;
      }
}
