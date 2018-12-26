import * as React from 'react';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import {inject, observer} from 'mobx-react';
import { User } from '../../../services/api';
import LazyLoad from '../../../components/LazyLoad';
import transl from '../../../utils/t.decorator';
import { Form, Field } from 'react-final-form';
import Validator = require('validatorjs');
import classNames = require('classnames');
import { westoast } from '../../../utils/westoast';
import { userApiService } from '../../../services';
import { DetailsPartnerStore } from '../../../stores/DetailsPartner.store';
import { action } from 'mobx';


export interface AddUserFundsFormComponentProps extends GenericProps {
    detailsPartnerStore?: DetailsPartnerStore;
    user: User;
    onComplete: () => void;
}
interface IAddUserFundsFormComponentForm {
    amount: number;
}
@transl()
@inject('userStore')
@inject('detailsPartnerStore')
@observer
export default class AddUserFundsFormComponent extends React.Component<AddUserFundsFormComponentProps> {

    onSubmitFrom = (values: IAddUserFundsFormComponentForm): void => {
        const {user, t} = this.props;
        westoast(
            this.props.detailsPartnerStore.addBalance(values.amount)
                .then(() => this.props.onComplete()),
            {processingMessage: t('Adding funds to user balance'), successMessage: values.amount + t('$ were added to user balance') },
        );
      };
    render() {
        const {user, t} = this.props;

        return (
            <LazyLoad $={user}>
                { () =>
                    <div className="row">
                        <div className="col-md-offset-3 col-md-6 text-center">
                            <Form
                                // validateOnBlur
                                onSubmit={this.onSubmitFrom}
                                initialValues={{
                                    amount: '',
                                }}
                                validate={(values: IAddUserFundsFormComponentForm) => {
                                    const v = new Validator(values, {
                                        amount: 'required|integer|min:0',
                                    });
                                    v.check();
                                    return v.errors.all();
                                }}
                                render={ ({ handleSubmit, values, reset, pristine, invalid  }) => (
                                    <form onSubmit={handleSubmit}>
                                        <fieldset>
                                            <div className="row">
                                            <Field
                                                name="amount"
                                                render={({ input, meta }) => (
                                                    <div
                                                        className={classNames('form-group',
                                                        { 'has-error': meta.touched && meta.error },
                                                        { 'has-success': meta.touched && !meta.error },
                                                        )}
                                                    >
                                                        <label>{t('Amount, $')}</label>
                                                        <input
                                                            {...input}
                                                            type="number"
                                                            className="form-control"
                                                            placeholder="0.00"
                                                        />
                                                        {meta.touched &&
                                                            meta.error && (
                                                            <span className="help-block">
                                                                {meta.error}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            />
                                            </div>
                                            <div className="form-action">
                                                <button type="submit" className="btn btn-default" data-dismiss="modal" disabled={pristine || invalid} >{t('Add funds')}</button>
                                            </div>
                                            <br />
                                        </fieldset>
                                    </form>
                                )}
                            />
                        </div>
                    </div>
                }
            </LazyLoad>
        );
    }
}
