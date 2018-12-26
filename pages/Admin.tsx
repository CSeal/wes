import * as React from 'react';
import { GenericProps } from '../interfaces/GenericProps.interface';
import { Switch, Route } from 'react-router';
import { AdminDashboardPage } from './Admin/AdminDashboard';
import { AdminProfilesPage } from './Admin/AdminProfiles';
import { AdminDiscountsPage } from './Admin/AdminDiscounts';
import { AdminPackagesPage } from './Admin/AdminPackages';
import { AdminWelcomePage } from './Admin/AdminWelcome';
import Page404 from './Page404';

export interface AdminPageProps extends GenericProps {
}
export interface AdminPageState {
}

export class AdminPage extends React.Component<AdminPageProps, AdminPageState> {
    render(): JSX.Element {
        return (
            <Switch>
                <Route exact path="/admin/" component={AdminDashboardPage}/>
                <Route exact path="/admin/profiles" component={AdminProfilesPage}/>
                <Route exact path="/admin/packages" component={AdminPackagesPage}/>
                <Route exact path="/admin/discounts" component={AdminDiscountsPage}/>
                <Route exact path="/admin/welcome" component={AdminWelcomePage}/>
                <Route component={Page404} />

            </Switch>
        );
    }
}
