import * as React from 'react';
import { GenericProps } from '../interfaces/GenericProps.interface';
import { Switch, Route } from 'react-router';
import { ChatMainPage } from './Chat/ChatMain';
import { InvoiceMainPage } from './Invoice/InvoiceMain';
import { InvoiceActPage } from './Invoice/InvoiceAct';

export interface InvoicePageProps extends GenericProps {
}

export class InvoicePage extends React.Component<InvoicePageProps> {
    render(): JSX.Element {
        return (
            <Switch>
                <Route exact path="/simple/invoice/:id" component={InvoiceMainPage}/>
                <Route exact path="/simple/invoice/:id/act" component={InvoiceActPage}/>
            </Switch>
        );
    }
}
