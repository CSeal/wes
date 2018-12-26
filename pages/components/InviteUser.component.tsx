import * as React from 'react';
import * as cx from 'classnames';
import { GenericProps } from '../../interfaces/GenericProps.interface';
import transl from '../../utils/t.decorator';
import { inject, observer } from 'mobx-react';
import LazyLoad from '../../components/LazyLoad';
import * as moment from 'moment';
import ModalLayout from '../../layout/modal';
import { observable, runInAction } from 'mobx';
import { RouteComponentProps, Redirect } from 'react-router';
import { Form, Field, FieldRenderProps, FormRenderProps } from 'react-final-form';
import InvitedUsersListComponent from './InviteUser/InvitedUsersList.component';
import Validator = require('validatorjs');
import { UserRole } from '../../interfaces/UserRole.interface';
import { FormApi } from 'final-form';
import { westoast } from '../../utils/westoast';

interface InviteUserComponentProps extends GenericProps {
    userType: UserRole;
}
interface IForm {
    email: string;
}
@transl()
@inject('userStore')
@observer
export default class InviteUserComponent extends React.Component<InviteUserComponentProps> {
    static defaultProps = {
        userType: 'PARTNER',
    };

    @observable showDialog: boolean = true;
    @observable isProcessing: boolean = false;

    formSubmitHandler = (values: IForm, form: FormApi): void => {
        const { t } = this.props;
        this.isProcessing = true;
        westoast(
        this.props.userStore.invite({ email: values.email, role: this.props.userType }).then(() => {
            this.isProcessing = false;
            form.reset();
            runInAction(() => this.showDialog = false);
        }), {processingMessage: t('Sending invitation to ') + values.email, successMessage: 'The email was sent successfully'});
    };

    render(): React.ReactNode {
        return (
            <div className="modal-body">
                <InvitedUsersListComponent />
                {this.renderReactFinalForm()}
            </div>
        );
    }

    renderReactFinalForm = (): React.ReactNode => {
        return (
            <Form
                onSubmit={this.formSubmitHandler}
                initialValues={{ email: '' }}
                validate={this.formValidation}
                render={this.renderHTMLFormElement}
            />
        );
    }

    formValidation = (values: IForm): Validator.ValidationErrors => {
        const v: Validator.Validator<IForm> = new Validator(values, {
            email: 'required|email',
        });
        v.check();
        return v.errors.all();
    }

    renderHTMLFormElement = ({ handleSubmit }: FormRenderProps): React.ReactNode => {
        const { t } = this.props;
        return (
            <form onSubmit={(event) => { event.preventDefault(); handleSubmit(event); }}>
                <fieldset>
                    <Field name="email" render={this.renderFormField} />
                    <div className="form-action">
                        <button
                            type="submit"
                            disabled={this.isProcessing}
                            className="btn btn-default"
                            data-dismiss="modal"
                            children={t(`Add a ${this.props.userType.toLowerCase()}`)}
                        />
                    </div>
                </fieldset>
            </form>
        );
    }

    renderFormField = (args: FieldRenderProps): React.ReactNode => {
        const { t } = this.props;
        const { input, meta } = args;
        const hasError: boolean = meta.touched && meta.error;
        const hasSuccess: boolean = meta.touched && !meta.error;
        const classNames: string = cx('form-group', {
            'has-error': hasError,
            'has-success': hasSuccess,
        });
        return (
            <div className={classNames} >
                <input
                    {...input}
                    className="form-control"
                    type="email"
                    placeholder={t('Invite by email address')}
                />
                {hasError && <span className="help-block">{meta.error}</span>}
            </div>
        );
    }
}
