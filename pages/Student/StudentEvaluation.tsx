import * as React from 'react';
import { GenericProps } from '../../interfaces/GenericProps.interface';
import { Switch, Route } from 'react-router-dom';
import { EvaluationStartComponent } from './components/EvaluationStart.component';
import { EvaluationGrammarComponent } from './components/EvaluationGrammar.component';
import { EvaluationGrammarResultsComponent } from './components/EvaluationGrammarResults.component';
import { EvaluationWritingComponent } from './components/EvaluationWriting.component';
import { EvaluationCompleteComponent } from './components/EvaluationComplete.component';

// tslint:disable:max-line-length

export interface StudentEvaluationProps extends GenericProps {
}
export interface StudentEvaluationState {
}
export class StudentEvaluationPage extends React.Component<StudentEvaluationProps, StudentEvaluationState> {
    render(): JSX.Element {
        return (
            <Switch>
                <Route exact path="/student/evaluation" component={EvaluationStartComponent}/>
                <Route exact path="/student/evaluation/grammar" component={EvaluationGrammarComponent}/>
                <Route exact path="/student/evaluation/grammar-results" component={EvaluationGrammarResultsComponent}/>
                <Route exact path="/student/evaluation/writing" component={EvaluationWritingComponent}/>
                <Route exact path="/student/evaluation/complete" component={EvaluationCompleteComponent}/>
            </Switch>
        );
    }
}
