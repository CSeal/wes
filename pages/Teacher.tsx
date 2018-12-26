import * as React from 'react';
import { GenericProps } from '../interfaces/GenericProps.interface';
import { Switch, Route } from 'react-router';
import { TeacherDashboardPage } from './Teacher/TeacherDashboard';
import { TeacherStudentsPage } from './Teacher/TeacherStudents';
import { TeacherSchedulePage } from './Teacher/TeacherSchedule';
import { TeacherWelcomePage } from './Teacher/TeacherWelcome';
import { TeacherEvaluatePage } from './Teacher/TeacherEvaluate';
import { TeacherStudentsEvaluationsPage } from './Teacher/TeacherStudentsEvaluations';
import Page404 from './Page404';

export interface TeacherPageProps extends GenericProps {
}
export interface TeacherPageState {
}

export class TeacherPage extends React.Component<TeacherPageProps, TeacherPageState> {
    render(): JSX.Element {
        return (
            <Switch>
                <Route exact path="/teacher/" component={TeacherDashboardPage}/>
                <Route exact path="/teacher/students" component={TeacherStudentsPage}/>
                <Route exact path="/teacher/schedule" component={TeacherSchedulePage}/>
                <Route exact path="/teacher/welcome" component={TeacherWelcomePage}/>
                <Route exact path="/teacher/evaluate" component={TeacherEvaluatePage}/>
                <Route exact path="/teacher/students/evaluations/:id" component={TeacherStudentsEvaluationsPage}/>
                <Route path="/teacher/schedule" component={TeacherSchedulePage}/>

                <Route component={Page404} />

            </Switch>
        );
    }
}
