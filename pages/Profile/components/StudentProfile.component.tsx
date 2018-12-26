import * as React from 'react';
import { inject, observer} from 'mobx-react';
import transl from '../../../utils/t.decorator';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import {NewUser, NewUsersQuiz} from '../../../services/api';
import * as Validator from 'validatorjs';
import { IForm } from './PartnerProfile.component';
import { Form } from 'react-final-form';
import CommonProfile from './CommonProfile.component';
import QuizComponent from './Quiz.component';
import { westoast } from '../../../utils/westoast';

interface StudentProfileComponentProps extends GenericProps {}
interface StudentProfileComponentState {}

@transl()
@inject('userStore')
@observer
export default class StudentProfileComponent extends React.Component<StudentProfileComponentProps, StudentProfileComponentState> {
    constructor(props: StudentProfileComponentProps) {
        super(props);
    }
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
                            }}
                            validate={(values: NewUser) => {
                                const v = new Validator(values, {
                                    name: 'required',
                                    last_name: 'required',
                                    email: 'required|email',
                                    password: 'min:3',
                                    phone: 'string',
                                    facebook_url: 'string',
                                    google_url: 'string',
                                    country: 'string',
                                    city: 'string',
                                    timezone: 'required|string',
                                    company_name: 'string',
                                    company_website: 'string',
                                    work: 'string',
                                });
                                v.check();
                                return v.errors.all();
                            }}
                            render={ ({ handleSubmit, values, reset, pristine, invalid  }) => (
                                <form onSubmit={handleSubmit}>
                                    <fieldset>
                                        <CommonProfile handleImageChange={this.handleImageChange}/>
                                        <QuizComponent/>
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
