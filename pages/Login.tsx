import * as React from 'react';
import { GenericProps } from '../interfaces/GenericProps.interface';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router';
import transl from '../utils/t.decorator';
import { LinkedComponent } from 'valuelink';
import { Input, TextArea, Select, Radio, Checkbox } from 'valuelink/lib/tags';
import {Link} from 'react-router-dom';

export interface LoginProps extends GenericProps {
}
export interface LoginState {
  username: string;
  password: string;
}
@transl()
@inject('authStore')
@observer
class Login extends LinkedComponent<LoginProps, LoginState> {

  state: LoginState = process.env.NODE_ENV === 'dev' ? {
    username: 'welcome@wes-english.com',
    password: 'secret',
  } : {
    username: '',
    password: '',
  };

  signIn = (e: React.SyntheticEvent<HTMLFormElement>)  => {
    e.preventDefault();
    this.props.authStore.signIn(this.state.username, this.state.password);
  };
  render(): React.ReactNode {
    const { t, authStore } = this.props;
    if (authStore.isAuthorized === undefined) {
      return <div>Loading...</div>;
    }
    if (authStore.isAuthorized === true) {
      return <Redirect to="/" />;
    }

    return (
      <div id="wrapper" className="login-page">
      <section id="login">
        <strong className="logo"><img src="../images/logo_dark.svg" width="199" height="auto" alt="image description" /></strong>
        <form action="#" onSubmit={this.signIn}>
          <div className="form-group">
            <label>{t('Name')}</label>
            <Input className="form-control" type="email"  valueLink={this.linkAt('username')} name="username" placeholder="Type your corporate email"/>
          </div>
          <div className="form-group">
            <label>{t('Password')}</label>
            <Input className="form-control" valueLink={this.linkAt('password')} name="password" type="password" />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-default" data-dismiss="modal">{t('SIGN IN')}</button>
          </div>
          <div className="form-group text-center">
            <Link to="/auth/forgot">{t('Forgot password?')}</Link>
          </div>
        </form>
      </section>
      <section id="promo">
        <h1>{t('Welcome to the')} <br />{t('WES Platform')}</h1>
        <p>{t('Invite employees to learn English with our ')}<br />{t('professional native speakers.')}</p>
      </section>
          {this.props.children}
    </div>
    );
  }
}

export default Login;
