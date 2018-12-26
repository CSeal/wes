import * as React from 'react';
import * as classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import { Field } from 'react-final-form';
import TimezonePicker from 'react-bootstrap-timezone-picker';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import transl from '../../../utils/t.decorator';
import { UserEx } from '../../../stores/User.store';
import UserThumbComponent from '../../components/UserThumb.component';
import { CommonProfileFormFieldComponent } from './CommonProfileFormField/CommonProfileFormFieldComponent';
import 'react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css';
import { CommonProfileCountryComponent } from './CommonProfileFormField/CommonProfileCountryComponent';

interface CommonProfileProps extends GenericProps {
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

@transl()
@inject('userStore')
@observer
export default class CommonProfile extends React.Component<CommonProfileProps> {
    refTz: TimezonePicker;
    render(): React.ReactNode {
        const { t, userStore } = this.props;
        const { avatarPreviewUrl } = this.props.userStore;
        const me: UserEx = userStore.me$.current();

        const $imagePreview: React.ReactElement<HTMLImageElement> = (
            avatarPreviewUrl
                ? <img src={avatarPreviewUrl} style={{ width: '53px', height: '53px' }} />
                : <UserThumbComponent user={me} />
        );

        const timezonePickerDefaultValue: string = (
            userStore.me$.current()
                ? userStore.me$.current().timezone && userStore.me$.current().timezone.toString()
                : 'Europe/Moscow'
        );

        return (
            <React.Fragment>
                <fieldset>
                    <div className="row">
                        <div className="col-md-12">
                            <legend>{t('Personal')}</legend>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Field
                                name="photo"
                                render={() => (
                                    <div className="form-group">
                                        <div className="avatar">{$imagePreview}</div>
                                        <div className="control">
                                            <label>{userStore.isRole('PARTNER') ? t('Upload logo') : t('Upload photo')}</label>
                                            <input type="file"  accept="image/x-png,image/jpeg" onChange={(e) => this.props.handleImageChange(e)} />
                                        </div>
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <CommonProfileFormFieldComponent
                                label={t('Name')}
                                name="name"
                                value={me === undefined ? '' : me.name}
                            />
                        </div>
                        <div className="col-md-3">
                            <CommonProfileFormFieldComponent
                                label={t('Last name')}
                                name="last_name"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <CommonProfileFormFieldComponent
                                name="email"
                                label={t('Email')}
                                type="email"
                            />
                        </div>
                        <div className="col-md-3">
                            <CommonProfileFormFieldComponent
                                name="password"
                                label={t('Password')}
                                type="password"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <CommonProfileFormFieldComponent
                                name="phone"
                                label={t('Phone')}
                            />
                        </div>
                    </div>
                </fieldset>
                {/* <fieldset>
                    <div className="row">
                        <div className="col-md-12">
                            <legend>{t('Sync with social media')}</legend>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <CommonProfileFormFieldComponent
                                name="facebook_url"
                                label={t('Facebook')}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <CommonProfileFormFieldComponent
                                name="google_url"
                                label={t('Google')}
                            />
                        </div>
                    </div>
                </fieldset> */}
                <fieldset>
                    <div className="row">
                        <div className="col-md-12">
                            <legend>{t('Location')}</legend>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <CommonProfileCountryComponent
                                name="country"
                                label={t('Country')}
                            />
                        </div>
                        <div className="col-md-3">
                            <CommonProfileFormFieldComponent
                                name="city"
                                label={t('City')}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <Field
                                name="timezone"
                                render={({ input, meta }) => (
                                    <div className={classNames('form-group', { 'has-error': meta.touched && meta.error }, { 'has-success': meta.touched && !meta.error })}>
                                        <label>{t('Timezone')}</label> <br />
                                        <TimezonePicker
                                            ref={(c) => { this.refTz = c; }}
                                            style={{width: '100%'}}
                                            value={timezonePickerDefaultValue}
                                            placeholder={t('Choose timezone from a list')}
                                            onChange={(e) => {input.onChange(e)}}
                                            onBlur={(e) => {input.onBlur(); input.onChange(this.refTz.state.value); }}
                                        />
                                        {meta.touched && meta.error && <span className="help-block">{meta.error}</span>}
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                </fieldset>
            </React.Fragment>
        );
    }
}
