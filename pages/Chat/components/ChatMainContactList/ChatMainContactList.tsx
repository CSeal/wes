import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { GenericProps } from '../../../../interfaces/GenericProps.interface';
import transl from '../../../../utils/t.decorator';
import LazyLoad from '../../../../components/LazyLoad';
import { UsersExtended, User, Message } from '../../../../services/api';
import UserThumbComponent from '../../../components/UserThumb.component';
import Moment from 'react-moment';
import classNames = require('classnames');

export interface ChatMainContactListProps extends GenericProps {
}

@transl()
@inject('chatStore')
@observer
export class ChatMainContactList extends React.Component<ChatMainContactListProps> {
    componentWillMount() {
        this.props.chatStore.loadAllMessages();
    }
    render(): React.ReactNode {
        const { chatStore } = this.props;
        const users$: User[] = chatStore.users$.current();
        const {messages, currentReceipentId} = chatStore;

        return (
            <section className="contact-list">
                <ul>
                    <LazyLoad $={users$}>
                        {() => users$.sort((u1, u2) => u1.name.localeCompare(u2.name)).map((user) =>
                                this.renderContactListItem(user, messages[user.id], currentReceipentId),
                            )
                        }
                    </LazyLoad>
                </ul>
            </section>
        );
    }

    renderContactListItem = (user: User, messages: Message[], currentReceipentId: number = undefined): React.ReactNode => {
        const { chatStore } = this.props;
        const { name, photo, id } = user;

        return (
            <li key={id} className={classNames({active: currentReceipentId === id})}>
                <a href="#" onClick={(e) => { this.setCurrentReceipentId(e, id); }}>
                    <span className="avatar">
                        <UserThumbComponent user={user} />
                    </span>
                    <span className="info">
                        <span className="last">{messages ? <Moment unix date={messages[messages.length - 1].created_at} fromNow /> : ''}</span> {/* TODO: ADD LAST MESSAGE */}
                        <span className="name">{name}</span>
                        <span className="status">{messages && messages[messages.length - 1].content}</span> {/* TODO: ADD STATUS */}
                    </span>
                </a>
            </li>
        );
    }

    setCurrentReceipentId = (event: React.SyntheticEvent<HTMLAnchorElement>, id: number): void => {
        const { chatStore } = this.props;

        chatStore.setCurrentReceipentId(id);
        event.preventDefault();
    }
}
