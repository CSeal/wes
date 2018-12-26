import * as React from 'react';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import { observer, inject } from 'mobx-react';
import transl from '../../../utils/t.decorator';
import { Link, Redirect } from 'react-router-dom';

// tslint:disable:max-line-length

export interface EvaluationGrammarResultsComponentProps extends GenericProps {
}
export interface EvaluationGrammarResultsComponentState {
}
@transl()
@inject('evaluationStore')
@observer
export class EvaluationGrammarResultsComponent extends React.Component<EvaluationGrammarResultsComponentProps, EvaluationGrammarResultsComponentState> {

    render(): JSX.Element {
        return this.renderResults();
    }

    renderResults(): JSX.Element {
        const { t, evaluationStore } = this.props;
        return (
            <div className="modal test-dialog fade" role="dialog" style={{display: 'block', opacity: 1, position: 'relative', overflow: 'visible', background: 'none'}}>
                <div className="modal-dialog  size-2" style={{transform: 'none'}}>
                    <div className="modal-content">
                        <div className="modal-content">
                        <div className="modal-body">
                            <div className="progress">
                                <div className="progress-bar progress-bar-warning" role="progressbar" style={{width: '100%'}}>
                                </div>
                            </div>
                            <div className="package-steps">
                                <ul>
                                    <li className="active">1. Grammar</li>
                                    <li>2. Writing</li>
                                </ul>
                            </div>
                            <div className="results">
                                <div className="image">
                                    <svg width="80px" height="44px" viewBox="0 0 80 44" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                        <g id="Boostrap3-grid-system-layouts" stroke="none" stroke-width="1" fill="none" fillRule="evenodd">
                                            <g id="WES-Students--Grammar-Results-–-1366px" transform="translate(-643.000000, -359.000000)" fillRule="nonzero">
                                                <g id="start-a-test-copy" transform="translate(302.000000, 253.000000)">
                                                    <g id="garlands" transform="translate(341.000000, 106.000000)">
                                                        <rect id="Rectangle-path" fill="#00E8F2" x="20" y="5" width="5" height="5"></rect>
                                                        <rect id="Rectangle-path" fill="#FF9A00" x="39" y="13" width="5" height="5"></rect>
                                                        <rect id="Rectangle-path" fill="#006EF5" x="55" y="0" width="5" height="5"></rect>
                                                        <polygon id="Shape" fill="#FD715E" points="49 24 49 44 40.1341965 39.2923096 40.1276503 39.2954621 31 43.9054269 31 24"></polygon>
                                                        <polygon id="Shape" fill="#FFAE50" points="21.7675353 23.3933025 21.7675353 23.3931515 9.86030696 18.8515661 9.86030696 18.8515661 7.62784222 18 0 35.6720738 10.0765333 34.7453028 16.3364949 42 24 24.2448687"></polygon>
                                                        <polygon id="Shape" fill="#293EAD" points="72.3721578 18 70.139693 18.8515661 70.139693 18.8515661 58.2324647 23.3931515 58.2324647 23.3931515 56 24.2448687 63.6635051 42 69.9234667 34.7453028 80 35.6720738"></polygon>
                                                        <polygon id="Shape" fill="#FD715E" points="48 24 48 44 40.0059025 39.2923096 40 39.2954621 40 24"></polygon>
                                                        <path d="M80,9 L80,15.8477662 C74.1937173,20.8761248 62.5328651,26.9779637 40.1218888,27 L40,27 C17.5093272,27 5.81722148,20.8855689 0,15.8477662 L0,9 C1.03121057,10.4070149 3.01721679,12.6087515 6.5046431,14.8012015 C11.9265073,18.2133582 22.1390704,22.278575 40,22.278575 L40.1218888,22.278575 C57.9078099,22.2596868 68.0859941,18.2054881 73.4953569,14.8012015 C76.9812205,12.6089089 78.9687894,10.4070149 80,9 Z" id="Shape" fill="#32D1FF"></path>
                                                        <path d="M80,9 L80,15.8477662 C74.1759702,20.8761248 62.4794762,26.9779637 40,27 L40,22.2784176 C57.8402843,22.2595294 68.0495786,18.2053307 73.4754752,14.8010441 C76.9719935,12.6089089 78.9656375,10.4070149 80,9 Z" id="Shape" fill="#32D1FF"></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                                <h4>Your grade is {evaluationStore.resultsRate} / {evaluationStore.totalSteps}!</h4>
                                <p>To finish a test we’d like to ask you to pass the writing part as well. Our qualified teacher will check it and you’ll get your final score.</p>
                            </div>
                            <form action="#">
                                <fieldset>
                                    <div className="form-action">
                                        <Link type="button" className="btn btn-default" data-dismiss="modal" to="/student/evaluation/writing">{t('PROCEED TO WRITING')}</Link>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }

}
