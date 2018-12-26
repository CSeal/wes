import * as React from 'react';
import { GenericProps } from '../interfaces/GenericProps.interface';
import { observer, inject } from 'mobx-react';
import transl from '../utils/t.decorator';
import { Switch, Route } from 'react-router';
import { PartnerDashboardPage } from './Partner/PartnerDashboard';
import { PartnerPaymentPage } from './Partner/PartnerPayment';
import { PartnerSchedulePage } from './Partner/PartnerSchedule';
import { PartnerPackagesPage } from './Partner/PartnerPackages';
import { PartnerStudentsPage } from './Partner/PartnerStudents';
import { PartnerInviteStudents } from './Partner/PartnerInviteStudents';
import { PartnerWelcomePage } from './Partner/PartnerWelcome';
import { PartnerStatisticsPage } from './Partner/PartnerStatistics';
import { PartnerStudentsStatisticPage } from './Partner/PartnerStudentsStatistic';
import Page404 from './Page404';

export interface PartnerPageProps extends GenericProps {
}
export interface PartnerPageState {
}
@transl()
@inject('userStore')
@observer
export class PartnerPage extends React.Component<PartnerPageProps, PartnerPageState> {
    render(): JSX.Element {
        const {t, userStore} = this.props;
        return (
            <Switch>
                <Route exact path="/partner/" component={PartnerDashboardPage}/>
                <Route exact path="/partner/welcome" component={PartnerWelcomePage}/>
                <Route exact path="/partner/statistics" component={PartnerStatisticsPage}/>
                <Route exact path="/partner/students" component={PartnerStudentsPage}/>
                <Route exact path="/partner/students/statistic/:id" component={PartnerStudentsStatisticPage}/>
                <Route exact path="/partner/students/invite" component={PartnerInviteStudents}/>
                <Route exact path="/partner/packages" component={PartnerPackagesPage}/>
                <Route path="/partner/schedule" component={PartnerSchedulePage}/>
                <Route exact path="/partner/payment" component={PartnerPaymentPage}/>

                <Route component={Page404} />

            </Switch>
        );
    }
}
