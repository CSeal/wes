import * as React from 'react';
import { GenericProps } from '../../interfaces/GenericProps.interface';
import { observer, inject } from 'mobx-react';
import transl from '../../utils/t.decorator';
import { Link, Redirect } from 'react-router-dom';
import * as classNames from 'classnames';
import LazyLoad from '../../components/LazyLoad';
import { LineChart, Line, XAxis, YAxis, Legend, Tooltip, CartesianGrid } from 'recharts';
import { UsersEvaluation } from '../../services/api';
import * as moment from 'moment';

export interface EvaluationsStatistic {
    period?: string;
    grammar?: number;
    writing?: number;
    speaking?: number;
    listening?: number;
}
// tslint:disable:max-line-length
export interface EvaluationsChartComponentProps extends GenericProps {
    evaluations: EvaluationsStatistic[];
}
export interface EvaluationsChartComponentState {
}
@transl()
@observer
export class EvaluationsChartComponent extends React.Component<EvaluationsChartComponentProps, EvaluationsChartComponentState> {

    render(): JSX.Element {
        const { t } = this.props;

        return <LazyLoad $={this.props.evaluations}>
            {() => this.renderBody(this.formatData(this.props.evaluations))}
        </LazyLoad>;
    }

    formatData(evaluations: EvaluationsStatistic[]): EvaluationsStatistic[] {
        const { t } = this.props;

        return this.props.evaluations && this.props.evaluations.map((ev, idx) => {
            const newEv: EvaluationsStatistic = ev;
            newEv.period = idx === 0 ? t('Initial Month') : idx + ' ' + t('Month');
            Object.keys(ev).forEach((evk: keyof EvaluationsStatistic) => {
                if (typeof ev[evk] === 'number') {
                    newEv[evk] = parseFloat((ev[evk] as number).toFixed(2));
                }
            });
            return newEv;
        });
    }

    renderBody(evaluations: EvaluationsStatistic[]): JSX.Element {
        const { t } = this.props;

        return (
                <LineChart width={700} height={220} data={evaluations} margin={{top: 15, right: 30, left: 10, bottom: 5}}>
                    <XAxis padding={{ right: 0, left: 20 }} dataKey="period" tick={{fontSize: 12, color: '#444'}}/>
                    <YAxis width={20} axisLine={false}  tick={{fontSize: 12, color: '#444'}}/>
                    <CartesianGrid strokeDasharray="5 5" vertical={false}/>
                    <Tooltip/>
                    <Legend height={10} margin={{ top: 20, left: 0, right: 0, bottom: 0 }} />
                    <Line name="Grammar" type="linear" dataKey="grammar" stroke="#b9f1ff" strokeWidth="4" legendType="square" />
                    <Line name="Writing"  type="linear" dataKey="writing" stroke="#ff85c4" strokeWidth="4" legendType="square" />
                    <Line name="Speaking"  type="linear" dataKey="speaking" stroke="#b492ff" strokeWidth="4" legendType="square" />
                    <Line name="Listening"  type="linear" dataKey="listening" stroke="#ffdb65" strokeWidth="4" legendType="square" />
                </LineChart>
        );
    }

}
