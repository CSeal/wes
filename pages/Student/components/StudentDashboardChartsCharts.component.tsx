import * as React from 'react';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import { observer, inject } from 'mobx-react';
import transl from '../../../utils/t.decorator';
import { Link, Redirect } from 'react-router-dom';
import * as classNames from 'classnames';
import LazyLoad from '../../../components/LazyLoad';
import { LineChart, Line, XAxis, YAxis, Legend, Tooltip, CartesianGrid } from 'recharts';
import { UsersEvaluation } from '../../../services/api';
import * as moment from 'moment';
import { EvaluationsChartComponent } from '../../components/EvaluationsChart.component';

// tslint:disable:max-line-length
export interface StudentDashboardChartsComponentProps extends GenericProps {
    evaluations: UsersEvaluation[];
}
export interface StudentDashboardChartsComponentState {
}
@transl()
@observer
export class StudentDashboardChartsComponent extends React.Component<StudentDashboardChartsComponentProps, StudentDashboardChartsComponentState> {

    render(): JSX.Element {
        let { evaluations} = this.props;
        const graphData: any = {};
        evaluations = evaluations || [];
        evaluations.forEach((evaluation) => {
            graphData[ moment(evaluation.created_at).format('MMM.YY') ] = graphData[ moment(evaluation.created_at).format('MMM.YY') ] || {};
            graphData[ moment(evaluation.created_at).format('MMM.YY') ] [evaluation.type.toLowerCase()] = evaluation.rate;
        });
        const data = Object.keys(graphData).map((key) => {
            return { period: key, grammar: 0, writing: 0, speaking: 0, listening: 0, pronouncation: 0, ...graphData[key]} ;
        });

        return <EvaluationsChartComponent evaluations={data} />;
    }

}
