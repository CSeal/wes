import * as React from 'react';
import * as Validator from 'validatorjs';
import * as classNames from 'classnames';
import * as $ from 'jquery';
import { inject, observer } from 'mobx-react';
import { Field, Form } from 'react-final-form';
import CommonProfile from '../CommonProfile.component';
import { GenericProps } from '../../../../interfaces/GenericProps.interface';
import transl from '../../../../utils/t.decorator';
import QuizComponent from '../Quiz.component';
import { NewUser, NewUsersDocument, NewUsersQuiz, UpdateUsersDocument } from '../../../../services/api/index';
import { IForm } from '../PartnerProfile.component';
import { ChainSVG } from '../../../../components/ButtonsSVG/Chain';
import { TeacherProfileVideoInstructionsComponent } from './components/TeacherProfileVideoInstructions/TeacherProfileVideoInstructions.component';
import { westoast } from '../../../../utils/westoast';

interface ProfileProps extends GenericProps {}
interface ProfileState {
    video?: string;
    videoName?: string;
}

// tslint:disable:max-line-length
@transl()
@inject('userStore')
@inject('profilesStore')
@observer
export default class TeacherProfileMainComponent extends React.Component<ProfileProps, ProfileState> {

    handleImageChange = (e: any): void => {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onloadend = () => {
            this.props.userStore.changeAvatar(file, reader.result);
        };

        reader.readAsDataURL(file);
    };
    onSubmitFrom = (values: IForm) => {
        values.photo = this.props.userStore.avatarPreviewUrl || '';

        westoast(
            this.props.userStore.updateMe(values),
            { entityName: 'profile' },
        );

        Object.keys(values).map((key: any) => {
            if (key.indexOf('quiz') > -1) {
                const quizId: number = Number.parseInt(key.replace('quiz', ''));
                const answer: string =  values[key as keyof typeof values] ? values[key as keyof typeof values].toString() : '';
                const quiz: NewUsersQuiz = {quiz_id: quizId, answer};
                westoast(
                    this.props.userStore.addQuiz(quiz),
                    { entityName: 'quiz' },
                );
            }
        });
    };
    handleVideoChange(e: any) {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            const url = URL.createObjectURL(file);
            this.setState({video: url, videoName: file.name});
            const $source: any = $('#video_here');
            $source.parent()[0].load();
        };

        reader.readAsDataURL(file);
    }

    render() {
        const { t, userStore, profilesStore } = this.props;
        return (
            <div id="content" className="col-md-9 col-md-offset-3">
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
                                payment: 'Paypal',
                                photo: userStore.me$.current() ? userStore.me$.current().photo : '',
                                city: userStore.me$.current() ? userStore.me$.current().city : '',
                                country: userStore.me$.current() ? userStore.me$.current().country : '',
                                facebook_url: userStore.me$.current() ? userStore.me$.current().facebook_url : '',
                                google_url: userStore.me$.current() ? userStore.me$.current().google_url : '',
                                timezone: userStore.me$.current() ? userStore.me$.current().timezone : '',
                                youtube_url: userStore.me$.current() ? userStore.me$.current().youtube_url : '',
                            }}
                            validate={(values: NewUser) => {
                                const v: Validator.Validator<NewUser> = new Validator(values, {
                                    name: 'required',
                                    last_name: 'required',
                                    email: 'required|email',
                                    password: 'string|min:3',
                                    phone: 'string',
                                    facebook_url: 'string',
                                    google_url: 'string',
                                    country: 'string',
                                    city: 'string',
                                    timezone: 'required|string',
                                    company_name: 'string',
                                    company_website: 'string',
                                    work: 'string',
                                    payment: 'required',
                                    paypalEmail: 'string',
                                    youtube_url: 'string',
                                });
                                v.check();
                                return v.errors.all();
                            }}
                            render={ ({ handleSubmit, values, reset, pristine, invalid  }) => (
                                <form onSubmit={handleSubmit}>
                                    <CommonProfile handleImageChange={this.handleImageChange} />
                                    <div className="row">
                                        <div className="col-md-12">
                                            <legend>{t('Payment')}</legend>
                                        </div>
                                    </div>
                                    <Field
                                        name="payment"
                                        render={({ input, meta }) => (
                                            <fieldset>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label>{t('Choose a payment method')}</label>
                                                            <div className="radio-group">
                                                                <div className={classNames('radio', {'active-state': input.value === 'Paypal'})} style={{marginLeft: '22px'}}>
                                                                    <label>
                                                                        <input {...input} value="Paypal" type="radio" checked={input.value === 'Paypal'}/>
                                                                        {t('Paypal')}
                                                                    </label>
                                                                </div>
                                                                <div className={classNames('radio', {'active-state': input.value === 'Stripe'})}>
                                                                    <label>
                                                                        <input {...input} value="Stripe" type="radio" />
                                                                        {t('Stripe')}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                            )}
                                    />
                                    <Field
                                        name="paypalEmail"
                                        render={({ input, meta }) => (
                                            <fieldset>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label>{t('PayPal Email')}</label>
                                                            <input {...input} type="email" className="form-control" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        )}
                                    />
                                    <QuizComponent ref={(instance) => { this.context = instance; }} />
                                    <TeacherProfileVideoInstructionsComponent />

                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <button type="submit" disabled={invalid} className="btn btn-primary">{t('SUBMIT')}</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            )}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
