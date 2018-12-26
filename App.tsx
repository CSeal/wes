import * as React from 'react';
import { hot } from 'react-hot-loader';

import './resources/js/imports.js';

import 'bootstrap-loader';
import LoginLayout from './layout/login';
import BaseLayout from './layout/base';
import SimpleLayout from './layout/simple';
import PlainLayout from './layout/plain';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { I18nextProvider } from 'react-i18next'; // as we build ourself via webpack
import i18n from './i18n';

import storesProvider from './stores/index';

import PrivateRoute from './utils/PrivateRoute';

const App = () => (
    <Provider {...storesProvider}>
      <I18nextProvider i18n={i18n} initialLanguage="en">
        <Router>
          <Switch>
            <Route path="/auth" component={LoginLayout} />
            <PrivateRoute path="/simple" component={SimpleLayout} />
            <PrivateRoute path="/plain" component={PlainLayout} />
            <PrivateRoute component={BaseLayout} />
          </Switch>
        </Router>
      </I18nextProvider>
    </Provider>
);

export default hot(module)(App);
