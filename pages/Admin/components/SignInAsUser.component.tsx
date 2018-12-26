import * as React from 'react';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import { UserProfile } from '../../../stores/Profiles.store';
import {inject, observer} from 'mobx-react';
import { User } from '../../../services/api';

export interface SignInAsUserComponentProps extends GenericProps {
    user: User;
}

@inject('authStore')
@observer
export default class SignInAsUserComponent extends React.Component<SignInAsUserComponentProps> {
    signInAs = (): void => {
        const {user} = this.props;
        this.props.authStore.signInAs(user.id).then(() => {
            // console.log('signInAs ok');
        });
    };
    render() {
        return (
            <div onClick={this.signInAs}>
                {this.props.children}
            </div>
        );
    }
}
