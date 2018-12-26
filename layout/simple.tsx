import * as React from 'react';

import { Header } from './base/Header';
import Main from './base/Main';
import { Footer } from './base/Footer';
import { Redirect } from 'react-router-dom';
import { GenericProps } from '../interfaces/GenericProps.interface';
import { inject, observer } from 'mobx-react';
import { Switch, Route } from 'react-router';
import { InvoicePage } from '../pages/Invoice';

export interface SimpleLayoutProps extends GenericProps {
}
@inject('userStore')
@observer
export default class SimpleLayout extends React.Component<SimpleLayoutProps, any> {
  render() {
    return (
      <Switch>
        <Route exact path="/simple/invoice/*" component={InvoicePage} />
      </Switch>
    );
  }
}
