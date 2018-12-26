import * as React from 'react';

import { Header } from './base/Header';
import Main from './base/Main';
import { Footer } from './base/Footer';
import { Redirect } from 'react-router-dom';
import { GenericProps } from '../interfaces/GenericProps.interface';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DevTools from 'mobx-react-devtools';

export interface BaseLayoutProps extends GenericProps {
}
export default class BaseLayout extends React.Component<BaseLayoutProps, any> {
  render() {
    return (
      <div id="wrapper">
        <Header />
        <ToastContainer autoClose={5000} position="top-center" />
        <Main />
        <Footer />
        {process.env.NODE_ENV === 'dev' &&  <DevTools />}
      </div>
    );
  }
}
