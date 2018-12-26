import * as React from 'react';
import CommonProfile from './CommonProfile.component';
import {NewUser} from '../../../services/api';
import * as Validator from 'validatorjs';
import * as classNames from 'classnames';
import { Form } from 'react-final-form';
import transl from '../../../utils/t.decorator';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import { inject, observer } from 'mobx-react';
import { CommonProfileUploadComponent } from './CommonProfileFormField/CommonProfileUploadComponent';
import PartnerProfileCompanyComponent from './PartnerProfile/PartnerProfileCompany.component';
import { westoast } from '../../../utils/westoast';
interface PartnerProfileProps extends GenericProps {
}
interface PartnerProfileState {
}
export interface IForm extends NewUser {
    photo: string;
    name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
    facebook_url: string;
    google_url: string;
    country: string;
    city: string;
    timezone: string;
    company_name: string;
    company_website: string;
    company_address: string;
    work: string;
}
@transl()
@inject('userStore')
@observer
export default class PartnerProfileComponent extends React.Component<PartnerProfileProps, PartnerProfileState>  {
    constructor(props: PartnerProfileProps) {
        super(props);
    }
    onSubmitFrom = (values: IForm) => {
        values.photo = this.props.userStore.avatarPreviewUrl || '';
        westoast(
            this.props.userStore.updateMe(values),
            { entityName: 'profile' },
        );
    };
    handleImageChange = (e: any): void => {
        e.preventDefault();

        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onloadend = () => {
            this.props.userStore.changeAvatar(file, reader.result);
        };

        reader.readAsDataURL(file);
    };
    render() {
        const { t, userStore } = this.props;
        return (
            <div className="row">
                <div className="col-md-12">
                    <header className="heading">
                        <h1>{t('Profile')}</h1>
                    </header>
                </div>
                <div className="col-md-12">
                    <div className="profile-page">
                        <Form
                            // validateOnBlur
                            onSubmit={this.onSubmitFrom}
                            initialValues={{
                                email: userStore.me$.current() ? userStore.me$.current().email : '',
                                name: userStore.me$.current() ? userStore.me$.current().name : '',
                                last_name: userStore.me$.current() ? userStore.me$.current().last_name : '',
                                phone: userStore.me$.current() ? userStore.me$.current().phone : '',
                                city: userStore.me$.current() ? userStore.me$.current().city : '',
                                country: userStore.me$.current() ? userStore.me$.current().country : '',
                                facebook_url: userStore.me$.current() ? userStore.me$.current().facebook_url : '',
                                google_url: userStore.me$.current() ? userStore.me$.current().google_url : '',
                                timezone: userStore.me$.current() ? userStore.me$.current().timezone : '',
                                company_name: userStore.me$.current() ? userStore.me$.current().company_name : '',
                                company_website: userStore.me$.current() ? userStore.me$.current().company_website : '',
                                company_address: userStore.me$.current() ? userStore.me$.current().company_address : '',
                            }}
                            validate={(values: NewUser) => {
                                const v = new Validator(values, {
                                    name: 'required',
                                    last_name: 'required',
                                    email: 'required|email',
                                    password: 'min:3',
                                    phone: 'required|string',
                                    facebook_url: 'string',
                                    google_url: 'string',
                                    country: 'string',
                                    city: 'string',
                                    timezone: 'required|string',
                                    company_name: 'required|string',
                                    company_website: 'string',
                                    company_address: 'required|string',
                                    work: 'string',
                                });
                                v.check();
                                return v.errors.all();
                            }}
                            render={ ({ handleSubmit, values, reset, pristine, invalid  }) => (
                                <form onSubmit={handleSubmit}>
                                    <fieldset>
                                        <CommonProfile handleImageChange={this.handleImageChange}/>
                                        <PartnerProfileCompanyComponent />
                                        <CommonProfileUploadComponent />
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <button type="submit" disabled={invalid} className="btn btn-primary">{t('SUBMIT')}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </form>
                            )}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
