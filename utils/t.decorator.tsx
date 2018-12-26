import * as React from 'react';
import {translate} from 'react-i18next';

const t = (namespaces?: string | string[]) => (WrappedComponent: any) => {
    return translate()(WrappedComponent as any) as any;
    /*
    typeof React.Component
    return class extends React.Component {
       render() {
          return <WrappedComponent {...this.props} />;
       }
    };
    */
};

export default t;
