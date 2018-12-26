import * as React from 'react';
import { GenericProps } from '../interfaces/GenericProps.interface';
import { Switch, Route } from 'react-router';
import { ChatMainPage } from './Chat/ChatMain';

export interface ChatPageProps extends GenericProps {
}
export interface ChatPageState {
}

export class ChatPage extends React.Component<ChatPageProps, ChatPageState> {
    render(): JSX.Element {
        return (
            <Switch>
                <Route exact path="/chat/" component={ChatMainPage}/>
            </Switch>
        );
    }
}
