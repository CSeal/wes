import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { GenericProps } from '../../../../interfaces/GenericProps.interface';
import { Message } from '../../../../services/api';
import WesDate from '../../../../components/WesDate';
import transl from '../../../../utils/t.decorator';
import UserThumbComponent from '../../../components/UserThumb.component';

export interface ChatMainMessageAnswerProps extends GenericProps {
    message: Message;
}

@transl()
@inject('userStore')
@observer
export class ChatMainMessageAnswer extends React.Component<ChatMainMessageAnswerProps> {
    render(): React.ReactNode {
        const { message, userStore, t } = this.props;
        const { meWithRoles } = userStore;

        return (
            <div className="notice answer">
                <span className="avatar">
                    <a href="#">
                        <UserThumbComponent user={meWithRoles} />
                    </a>
                </span>
                <div className="post">
                    <p className="item">{message.content}</p>
                    <div className="clear" />
                    <em className="time">
                        <WesDate date={message.created_at} format="MMM D" />
                        {t(' at ')}
                        <WesDate date={message.created_at} format="HH:mm" />
                    </em>
                </div>
            </div>
        );
    }
}
