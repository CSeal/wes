import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router';
import * as Validator from 'validatorjs';
import * as classNames from 'classnames';
import { Form, Field, FormRenderProps } from 'react-final-form';
import { GenericProps } from '../interfaces/GenericProps.interface';
import transl from '../utils/t.decorator';

export interface ProfileCompleteProps extends GenericProps {}

interface IForm {
  name: string;
  email: string;
  password: string;
}

@transl()
@inject('userStore')
@inject('authStore')
@observer
class ProfileComplete extends React.Component<ProfileCompleteProps> {
  onSubmitFrom = (values: IForm): void => {
    this.props.userStore
      .updateMe({
        email: values.email,
        name: values.name,
        password: values.password,
      })
      .then(() => {
        this.props.authStore.isInit = true;
      });
  };

  render(): React.ReactNode {
    const { t, userStore, authStore } = this.props;

    return authStore.isInit ? (
      <Redirect
        to={`/${userStore.me$.current().roles.role.toLowerCase()}/welcome`}
        push={true}
      />
    ) : (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <header className="heading">
            <h1>{t('Complete Profile')}</h1>
            <p>{t('Please add your name, email and create a password to have an access to your account.')}</p>
          </header>
        </div>
        <div className="col-md-6 col-md-offset-3">
          <div className="profile-page">
            <Form
              // validateOnBlur
              onSubmit={this.onSubmitFrom}
              initialValues={{
                email: userStore.me$.current()
                  ? userStore.me$.current().email
                  : '',
                name: userStore.me$.current()
                  ? userStore.me$.current().name
                  : '',
              }}
              validate={(values: IForm) => {
                const v = new Validator(values, {
                  name: 'required',
                  email: 'required|email',
                  password: 'required|min:6',
                });
                v.check();
                return v.errors.all();
              }}
              render={({ handleSubmit, values, reset, pristine, invalid }) => (
                <form onSubmit={handleSubmit}>
                  <fieldset>
                    <div className="row">
                      <div className="col-md-6">
                        <Field
                          name="name"
                          render={({ input, meta }) => (
                            <div
                              className={classNames('form-group',
                                { 'has-error': meta.touched && meta.error },
                                { 'has-success': meta.touched && !meta.error },
                              )}
                            >
                              <label>{t('Name')}</label>
                              <input
                                {...input}
                                type="text"
                                className="form-control"
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
                      <div className="col-md-6">
                        <Field
                          name="email"
                          render={({ input, meta }) => (
                            <div
                              className={classNames(
                                'form-group',
                                { 'has-error': meta.touched && meta.error },
                                { 'has-success': meta.touched && !meta.error },
                              )}
                            >
                              <label>{t('Email')}</label>
                              <input
                                {...input}
                                type="email"
                                className="form-control"
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
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <Field
                          name="password"
                          render={({ input, meta }) => (
                            <div
                              className={classNames(
                                'form-group',
                                { 'has-error': meta.touched && meta.error },
                                { 'has-success': meta.touched && !meta.error },
                              )}
                            >
                              <label>{t('Create a password')}</label>
                              <input
                                {...input}
                                type="password"
                                className="form-control"
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
                    </div>
                    <div className="row">
                      <div className="col-md-12 text-center">
                        <div className="form-group">
                          <button
                            type="submit"
                            disabled={pristine || invalid}
                            className="btn btn-primary"
                          >
                            {t('SUBMIT')}
                          </button>
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

export default ProfileComplete;
