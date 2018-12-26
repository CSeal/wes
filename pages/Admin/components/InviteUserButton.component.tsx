import * as React from 'react';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import transl from '../../../utils/t.decorator';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import DialogElementComponent from '../../components/DialogElement.component';
import { UserRole } from '../../../interfaces/UserRole.interface';
import InviteUserComponent from '../../components/InviteUser.component';

interface InviteUserButtonComponentProps extends GenericProps {
    userType: UserRole;
    buttonText?: string;
}

@transl()
@observer
export default class InviteUserButtonComponent extends React.Component<InviteUserButtonComponentProps> {
    static defaultProps = {
        userType: 'PARTNER',
        buttonText: '+',
    };
    @observable showDialog: boolean = true;
    render(): React.ReactNode {
        const {userType, t} = this.props;
        const Button = (props: {}) =>
            <button {...props} type="button" className="btn btn-primary" >{this.props.buttonText}</button>;
        return (
            <DialogElementComponent Element={Button}  title={t(`Invite a ${this.props.userType.toLowerCase()} to WES`)}>
                <InviteUserComponent userType={userType} />
            </DialogElementComponent>);
    }
}
