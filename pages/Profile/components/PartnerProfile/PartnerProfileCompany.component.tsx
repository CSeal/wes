import * as React from 'react';
import * as Validator from 'validatorjs';
import * as moment from 'moment';
import { inject, observer } from 'mobx-react';
import { Form, FormRenderProps } from 'react-final-form';
import { GenericProps } from '../../../../interfaces/GenericProps.interface';
import transl from '../../../../utils/t.decorator';
import LazyLoad from '../../../../components/LazyLoad';
import { CommonProfileFormFieldComponent } from '../CommonProfileFormField/CommonProfileFormFieldComponent';

interface PartnerProfileCompanyProps extends GenericProps {
}

@transl()
@inject('userStore')
@observer
export default class PartnerProfileCompanyComponent extends React.Component<PartnerProfileCompanyProps> {
    render(): React.ReactNode {

        return (
            this.renderForm()
        );
    }

    renderForm = (): React.ReactNode => {
        const { t } = this.props;
        return (
                <fieldset>
                    <div className="row">
                        <div className="col-md-12">
                            <legend>Company</legend>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="form-group">
                                <CommonProfileFormFieldComponent
                                    label={t('Company Name')}
                                    name="company_name"
                                />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <CommonProfileFormFieldComponent
                                    label={t('Company Website')}
                                    name="company_website"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <CommonProfileFormFieldComponent
                                    label={t('Company Address')}
                                    name="company_address"
                                />
                            </div>
                        </div>
                    </div>
                    {/* <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Enter industry you’re working in</label>
                                <input type="text" className="form-control">
                            </div>
                        </div>
                    </div> */}
                </fieldset>
        );
    }
}
