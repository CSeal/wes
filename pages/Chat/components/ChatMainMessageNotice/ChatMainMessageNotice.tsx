import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { GenericProps } from '../../../../interfaces/GenericProps.interface';
import { Message } from '../../../../services/api';
import WesDate from '../../../../components/WesDate';

export interface ChatMainMessageNoticeProps extends GenericProps {
    message: Message;
}

@inject('chatStore')
@observer
export class ChatMainMessageNotice extends React.Component<ChatMainMessageNoticeProps> {
    componentWillMount() {
        this.props.chatStore.readMessages([this.props.message]);
    }
    render(): React.ReactNode {
        const { message, chatStore } = this.props;
        const { receipentUser } = chatStore;

        if (!receipentUser) {
            return null;
        }

        return (
            <div className="notice message">
                <span className="avatar">
                    <a href="#">
                        <img src={process.env.URL_BASE + process.env.AVATAR_PATH + receipentUser.photo} width="37" height="37" alt="" />
                    </a>
                </span>
                <div className="post">
                    <p className="item">{message.content}</p>
                    <div className="clear" />
                    <em className="time"><WesDate date={message.created_at} format="MMM D" /> at <WesDate date={message.created_at} format="HH:mm" /></em>
                </div>
            </div>
        );
    }
}
