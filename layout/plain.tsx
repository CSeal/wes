import * as React from 'react';

import { Header } from './base/Header';
import Main from './base/Main';
import { Footer } from './base/Footer';
import { Redirect } from 'react-router-dom';
import { GenericProps } from '../interfaces/GenericProps.interface';
import { inject, observer } from 'mobx-react';
import { Switch, Route } from 'react-router';
import { InvoicePage } from '../pages/Invoice';
import DevTools from 'mobx-react-devtools';
import ProfileComplete from '../pages/ProfileComplete';

export interface PlainLayoutProps extends GenericProps {
}
@inject('userStore')
@observer
export default class PlainLayout extends React.Component<PlainLayoutProps, any> {
  render() {
    return (
      <div id="wrapper">
        <Header componentHeaderButtonsBar={<div />} componentHeaderNotify={<div />} componentHeaderProfile={<div/>}   componentHeaderMenuBar={<div/>}/>
          <section id="main">
            <div className="container-fluid">
              <Switch>
                <Route exact path="/plain/profile/complete" component={ProfileComplete}/>
              </Switch>
            </div>
          </section>
        <Footer />
        {process.env.NODE_ENV === 'dev' &&  <DevTools />}
      </div>
    );
  }
}
