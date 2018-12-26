import * as React from 'react';
import { Route, Redirect, RouteProps } from 'react-router';
import { GenericProps } from '../interfaces/GenericProps.interface';
import { observer, inject } from 'mobx-react';

interface PrivateRouteProps extends GenericProps, RouteProps {
}
@inject('authStore')
@observer
class PrivateRoute extends React.Component<PrivateRouteProps, any> {
  render(): React.ReactNode {
    if (this.props.authStore.isAuthorized === undefined) {
       return [];
    }
    const {component: Component, ...rest} = this.props;
    const dRoute = (cprops: {}) => (
        this.props.authStore.isAuthorized === true
        ? <Component {...cprops} />
        : <Redirect to="/auth/login" {...rest}/>);
    return <Route {...rest} render={dRoute} />;
  }
}

export default PrivateRoute;
