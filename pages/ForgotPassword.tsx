import * as React from 'react';
import { GenericProps } from '../interfaces/GenericProps.interface';
import { observer, inject } from 'mobx-react';
import transl from '../utils/t.decorator';
import Login from './Login';
import * as Validator from 'validatorjs';
import {Field, Form} from 'react-final-form';
import * as classNames from 'classnames';
import {Link} from 'react-router-dom';
import { westoast } from '../utils/westoast';

interface IForm {
    email: string;
}
export interface ForgotPasswordProps extends GenericProps {
}
@transl()
@inject('userStore')
@observer
export default class ForgotPassword extends React.Component<ForgotPasswordProps> {

    onSubmitFrom = (values: IForm) => {
        const { t } = this.props;
        westoast(
            this.props.userStore.forgotPassword(values.email),
            {processingMessage: t('Recovering password'), successMessage: t('The email with recovery information was sent')}
        );
    };
    render(): React.ReactNode {
        const { t, userStore } = this.props;

        return (
                <Login >
                    <div className="modal fade" role="dialog" style={{display: 'block', opacity: 1}}>
                        <div className="modal-dialog" style={{transform: 'none'}}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <Link to="/auth/login">
                                        <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
                                    </Link>
                                    {t('Forgot a password?')}
                                    <p>{t('Enter your email and we’ll send you further instructions.')}</p>
                                </div>
                                <div className="modal-body">
                                    <Form
                                        // validateOnBlur
                                        onSubmit={this.onSubmitFrom}
                                        initialValues={{email: userStore.me$.current() ? userStore.me$.current().email : ''}}
                                        validate={(values: IForm) => {
                                            const v = new Validator(values, { email: 'required|email' });
                                            v.check();
                                            return v.errors.all();
                                        }}
                                        render={ ({ handleSubmit, values, reset, pristine, invalid  }) => (
                                            <form onSubmit={handleSubmit}>
                                                <fieldset>
                                                    <Field
                                                        name="email"
                                                        render={({ input, meta }) => (
                                                 <div className={classNames('form-group', {'has-error': meta.touched && meta.error}, {'has-success': meta.touched && !meta.error})}>
                                                        <label>{t('Email')}</label>
                                                        <input {...input} className="form-control" type="email" />
                                                        {meta.touched && meta.error && <span className="help-block">{meta.error}</span>}
                                                    </div>
                                                        )}
                                                    />
                                                    <div className="form-action">
                                                        <button type="submit" disabled={invalid} className="btn btn-default" data-dismiss="modal">{t('SEND')}</button>
                                                    </div>
                                                </fieldset>
                                            </form>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Login>
        );
    }
}
