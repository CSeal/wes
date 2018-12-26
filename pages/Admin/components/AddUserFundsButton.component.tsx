import * as React from 'react';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import { User } from '../../../services/api';
import transl from '../../../utils/t.decorator';
import DialogElementComponent from '../../components/DialogElement.component';
import AddUserFundsFormComponent from './AddUserFundsForm.component';

export interface AddUserFundsButtonComponentProps extends GenericProps {
  user: User;
  buttonText?: string;
}
@transl()
export default class AddUserFundsButtonComponent extends React.Component<
  AddUserFundsButtonComponentProps
> {
  static defaultProps = {
    buttonText: 'Add funds',
  };
  dialogRef: DialogElementComponent;

  render() {
    const { t } = this.props;
    const Button = (props: {}) => (
      <button {...props} type="button" className="btn btn-primary">
        {this.props.buttonText}
      </button>
    );

    return (
      <DialogElementComponent
        ref={(ref) => (this.dialogRef = ref)}
        Element={Button}
        title={t('Add funds to ') + this.props.user.name}
      >
        <AddUserFundsFormComponent user={this.props.user} onComplete={() => this.dialogRef.switchDialog(false)} />
      </DialogElementComponent>
    );
  }
}
