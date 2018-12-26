import * as React from 'react';
import { GenericProps } from '../interfaces/GenericProps.interface';
import { translate } from 'react-i18next';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router';
import transl from '../utils/t.decorator';

export interface LogoutProps extends GenericProps {
}
@transl()
@inject('authStore')
@observer
class Logout extends React.Component<LogoutProps, any> {

  componentWillMount?(): void {
    this.props.authStore.signOut();
  }

  render(): React.ReactNode {
    const { t, authStore } = this.props;
    if (authStore.isAuthorized === undefined) {
      return <div>...</div>;
    }
    if (authStore.isAuthorized === false) {
      // return <span>{t('Logout cannot be executed because you are not signed in')}</span>;
      return <Redirect to="/auth/login" />;
    }
    return <div>...</div>;
  }
}

export default Logout;
