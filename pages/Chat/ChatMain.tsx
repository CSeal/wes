import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { GenericProps } from '../../interfaces/GenericProps.interface';
import transl from '../../utils/t.decorator';
import { ChatStore } from '../../stores/Chat.store';
import { ChatMainContactList } from './components/ChatMainContactList/ChatMainContactList';
import { ChatMainMessenger } from './components/ChatMainMessenger/ChatMainMessenger';
import { Link } from 'react-router-dom';

export interface ChatMainProps extends GenericProps {
    chatStore?: ChatStore;
}

@transl()
@inject('userStore')
@inject('chatStore')
@observer
export class ChatMainPage extends React.Component<ChatMainProps> {
    render(): React.ReactNode {
        const { t, userStore, chatStore } = this.props;

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <header className="heading">
                            <h1>{t('Chat')}</h1>
                            {
                                this.props.userStore.meRoleLowerCase !== 'admin'
                                ?
                                <Link to={'/' + userStore.me$.current().roles.role.toLowerCase() + '/schedule/'} className="btn btn-primary">{t('GO TO CALENDAR')}</Link>
                                :
                                []
                            }
                        </header>
                    </div>
                    <div className="col-md-12">
                        <div className="chat">
                            <div className="block">
                                <ChatMainContactList />
                                <ChatMainMessenger />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
