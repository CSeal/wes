import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { runInAction } from 'mobx';

import { GenericProps } from '../../../../interfaces/GenericProps.interface';
import transl from '../../../../utils/t.decorator';
import { PaperPlainSubmitButtonComponent } from '../PaperPlainSubmitButton/PaperPlainSubmitButton.component';
import { observable, action } from 'mobx';

export interface ChatMainMessageSendFormProps extends GenericProps {
}

@transl()
@inject('chatStore')
@observer
export class ChatMainMessageSendForm extends React.Component<ChatMainMessageSendFormProps> {
    @observable blockInput: boolean = false;
    onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
        // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
        if (event.key === 'Enter') {
          event.preventDefault();
          event.stopPropagation();
          this.props.chatStore.sendMessage();
        }
    };
    render(): React.ReactNode {
        const { t, chatStore } = this.props;
        const { message } = chatStore;


        return (
            <form action="#" className="chat-form" onSubmit={this.sendMessage}>
                <fieldset>
                    <div className="form-action">
                        <PaperPlainSubmitButtonComponent />
                    </div>
                    <div className="form-group">
                        <textarea
                            cols={30}
                            rows={1}
                            onChange={this.onChangeHandler}
                            placeholder={t('Type your message here....')}
                            value={message}
                            onKeyDown={this.onKeyDown}
                            disabled={this.blockInput}
                        />
                    </div>
                </fieldset>
            </form>
        );
    }

    onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        this.props.chatStore.setMessageValue(event.target.value);
    }

    sendMessage = (event: React.FormEvent<any>): void => {
        runInAction(() => this.blockInput = true);
        this.props.chatStore.sendMessage().then(() => this.blockInput = false);
        event.preventDefault();
    }
}
