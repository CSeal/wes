import * as React from 'react';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import { UserProfile } from '../../../stores/Profiles.store';
import {inject, observer} from 'mobx-react';
import DeleteConfirm from './DeleteConfirm.component';
import DeleteCompleted from './DeleteCompleted.component';

export interface DeleteUserProps extends GenericProps {
    user: UserProfile;
}
export interface DeleteUserState {
    deleteConfirm: boolean;
    deleteCompleted: boolean;
}
@inject('profilesStore')
@observer
export default class DeleteUser extends React.Component<DeleteUserProps, DeleteUserState> {
    constructor(props: DeleteUserProps) {
        super(props);
        this.state = {
            deleteConfirm: false,
            deleteCompleted: false,
        };
    }
    deleteProfile = (el: UserProfile): void => {
        this.props.profilesStore.deleteProfile(el).then(() => {
            this.setState({deleteConfirm: false, deleteCompleted: true});
        });
    };
    deleteConfirm = () => {
        this.setState({deleteConfirm: true});
    };
    cancel = () => {
        this.setState({deleteConfirm: false, deleteCompleted: false});
    };
    render() {
        const { user } = this.props;
        return (
            <div>
                <div onClick={this.deleteConfirm}>
                    {this.props.children}
                </div>
                {this.state.deleteConfirm && <DeleteConfirm user={user} deleteProfile={this.deleteProfile} cancel={this.cancel}/>}
                {this.state.deleteCompleted && <DeleteCompleted cancel={this.cancel} user={user.name}/>}
            </div>
        );
    }
}
