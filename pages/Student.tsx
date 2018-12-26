import * as React from 'react';
import { GenericProps } from '../interfaces/GenericProps.interface';
import { Switch, Route, Redirect } from 'react-router';
import { StudentDashboardPage } from './Student/StudentDashboard';
import { StudentTeachersPage } from './Student/StudentTeachers';
import { StudentSchedulePage } from './Student/StudentSchedule';
import { StudentWelcomePage } from './Student/StudentWelcome';
import { StudentEvaluationPage } from './Student/StudentEvaluation';
import {PartnerSchedulePage} from './Partner/PartnerSchedule';
import Page404 from './Page404';
import { PartnerStudentsStatisticPage } from './Partner/PartnerStudentsStatistic';

export interface StudentPageProps extends GenericProps {
}
export interface StudentPageState {
}

export class StudentPage extends React.Component<StudentPageProps, StudentPageState> {
    render(): JSX.Element {
        return (
            <Switch>
                <Route exact path="/student/" component={StudentDashboardPage}/>
                <Route exact path="/student/teachers" component={StudentTeachersPage}/>
                <Route exact path="/student/schedule" component={StudentSchedulePage}/>
                <Route exact path="/student/welcome" component={StudentWelcomePage}/>
                <Route path="/student/evaluation" component={StudentEvaluationPage}/>
                <Route path="/student/schedule" component={StudentSchedulePage}/>
                <Route exact path="/student/statistic/:id" component={PartnerStudentsStatisticPage}/>
                <Redirect from="/student/packages" to="/student/schedule/"/>

                <Route component={Page404} />

            </Switch>
        );
    }
}
