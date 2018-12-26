import * as React from 'react';
import { GenericProps } from '../interfaces/GenericProps.interface';
import { I18nextProvider, translate } from 'react-i18next';
import Login from '../pages/Login';
import { Switch, Route } from 'react-router';
import Logout from '../pages/Logout';
import ForgotPassword from '../pages/ForgotPassword';
import Page404 from '../pages/Page404';
import ProfileComplete from '../pages/ProfileComplete';
import InitUser from '../pages/InitUser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export interface LoginLayoutProps extends GenericProps {
}
@translate()
class LoginLayout extends React.Component<LoginLayoutProps, any> {

  render(): React.ReactNode {
    const { t } = this.props;

    return [
      <Switch key="routes">
        <Route exact path="/auth/login" component={Login} />
        <Route exact path="/auth/logout" component={Logout} />
        <Route exact path="/auth/forgot" component={ForgotPassword} />
        <Route path="/auth/signUpByCode" component={InitUser}/>
        <Route component={Page404} />
      </Switch>,
      <ToastContainer key="toast" autoClose={5000} position="top-center" />,
    ];
  }
}

export default LoginLayout;
