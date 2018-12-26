import * as React from 'react';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import { observer, inject } from 'mobx-react';
import transl from '../../../utils/t.decorator';
import { Link, Redirect } from 'react-router-dom';
import * as classNames from 'classnames';
import LazyLoad from '../../../components/LazyLoad';
import {RadioGroup, Radio} from 'react-icheck';

// tslint:disable:max-line-length

export interface EvaluationGrammarComponentProps extends GenericProps {
}
export interface EvaluationGrammarComponentState {
    selectedAnswer: string;
}
@transl()
@inject('evaluationStore')
@observer
export class EvaluationGrammarComponent extends React.Component<EvaluationGrammarComponentProps, EvaluationGrammarComponentState> {
    constructor(props: EvaluationGrammarComponentProps) {
        super(props);
        this.state = {selectedAnswer: undefined};
    }
    next = () => {
        const { t, evaluationStore } = this.props;

        this.props.evaluationStore.answerQuestion({
            evaluations_question_id: evaluationStore.currentQuestion.id,
            rate: evaluationStore.currentQuestion.variants.filter((v) => v.title === this.state.selectedAnswer)[0].correct ? 1 : 0,
            answer: this.state.selectedAnswer,
        });
        this.setState({selectedAnswer: undefined});
    }
    finish = () => {
        const { t, evaluationStore } = this.props;

        this.next();
        this.props.evaluationStore.saveGrammarResults();
    }

    render(): JSX.Element {
        const { t, evaluationStore } = this.props;

        // if we finalized evaluation than redirect to next stage
        if (evaluationStore.isGrammarFinished) {
            return <Redirect to="/student/evaluation/grammar-results" />;
        }

        return <LazyLoad $={evaluationStore.currentQuestion}>
            {() => this.renderQuestion()}
        </LazyLoad>;
    }

    renderAnswer(answer: string): JSX.Element {
        return <Radio
            key={answer}
            labelClassName={classNames('radio', {'active-state': this.state.selectedAnswer === answer})}
            value={answer}
            radioClass="custom-radio"
            increaseArea="20%"
            label={answer}
            cursor={false}
        />;
    }
    renderQuestion(): JSX.Element {
        const { t, evaluationStore } = this.props;
        return (
            <div className="modal test-dialog fade" role="dialog" style={{display: 'block', opacity: 1, position: 'relative', overflow: 'visible', background: 'none'}}>
                <div className="modal-dialog  size-2" style={{transform: 'none'}}>
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="progress">
                            <div className="progress-bar progress-bar-warning" role="progressbar" style={{width: Math.round(evaluationStore.currentStep * 100 / evaluationStore.totalSteps) + '%'}}>
                            </div>
                            </div>
                            <div className="package-steps">
                                <ul>
                                    <li className="active">1. Grammar</li>
                                    <li>2. Writing</li>
                                </ul>
                            </div>
                            <div className="test-progress"><strong>{evaluationStore.currentStep}</strong> / {evaluationStore.totalSteps}</div>
                            <div className="test-question">{evaluationStore.currentStep}. {evaluationStore.currentQuestion.content} </div>
                            <form >
                                <RadioGroup name="radio" value={this.state.selectedAnswer} onChange={(e, v) => { this.setState({selectedAnswer: v}); }}     className="radio">
                                    {evaluationStore.currentQuestion.variants.map((v) => this.renderAnswer(v.title))}
                                </RadioGroup>
                                <div className="form-action">
                                { evaluationStore.currentStep < evaluationStore.totalSteps
                                    ? <button type="button" className="btn btn-default" data-dismiss="modal"  onClick={this.next} disabled={this.state.selectedAnswer === undefined}>{t('NEXT')}</button>
                                    : <button type="button" className="btn btn-default" data-dismiss="modal"  onClick={this.finish} disabled={this.state.selectedAnswer === undefined}>{t('FINISH')}</button>
                                }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
