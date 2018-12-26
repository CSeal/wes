import * as React from 'react';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import { observer, inject } from 'mobx-react';
import transl from '../../../utils/t.decorator';
import { Link } from 'react-router-dom';

// tslint:disable:max-line-length

export interface EvaluationCompleteComponentProps extends GenericProps {
}
export interface EvaluationCompleteComponentState {
}
@transl()
@observer
export class EvaluationCompleteComponent extends React.Component<EvaluationCompleteComponentProps, EvaluationCompleteComponentState> {
    render(): JSX.Element {
        const { t } = this.props;

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
                                    <li>1. Grammar</li>
                                    <li className="active">2. Writing</li>
                                </ul>
                            </div>
                            <div className="results">
                                <div className="image">
                                    <svg width="80px" height="78px" viewBox="0 0 80 78" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                        <defs></defs>
                                        <g id="Boostrap3-grid-system-layouts" stroke="none" stroke-width="1" fill="none" fillRule="evenodd">
                                            <g id="WES-Students-Test-Results-–-1366px" transform="translate(-643.000000, -320.000000)" fillRule="nonzero">
                                                <g id="start-a-test-copy" transform="translate(302.000000, 230.000000)">
                                                    <g id="medal-(2)" transform="translate(341.000000, 90.000000)">
                                                        <path d="M78,39 C78,35.8995 76.55193,33.13869 74.295975,31.353465 C73.27515,30.545775 72.910305,29.18409 73.390395,27.974115 C74.451585,25.30008 74.325225,22.18515 72.774975,19.5 C71.224725,16.81485 68.590275,15.14799 65.74386,14.72991 C64.455885,14.54076 63.459045,13.54392 63.269895,12.255945 C62.852205,9.409725 61.18515,6.775275 58.5,5.225025 C55.81485,3.674775 52.69992,3.548415 50.025885,4.609605 C48.81591,5.08989 47.454225,4.725045 46.646535,3.704025 C44.86131,1.44807 42.1005,0 39,0 C35.8995,0 33.13869,1.44807 31.353465,3.704025 C30.545775,4.72485 29.18409,5.089695 27.974115,4.609605 C25.30008,3.548415 22.18515,3.674775 19.5,5.225025 C16.81485,6.775275 15.14799,9.409725 14.72991,12.25614 C14.54076,13.544115 13.54392,14.540955 12.255945,14.730105 C9.409725,15.14799 6.775275,16.81485 5.225025,19.5 C3.674775,22.18515 3.548415,25.30008 4.609605,27.974115 C5.08989,29.18409 4.725045,30.545775 3.704025,31.353465 C1.44807,33.13869 0,35.8995 0,39 C0,42.1005 1.44807,44.86131 3.704025,46.646535 C4.72485,47.454225 5.089695,48.81591 4.609605,50.025885 C3.548415,52.69992 3.674775,55.81485 5.225025,58.5 C6.775275,61.18515 9.409725,62.85201 12.25614,63.27009 C13.544115,63.45924 14.540955,64.45608 14.730105,65.744055 C15.14799,68.59047 16.815045,71.22492 19.500195,72.77517 C22.185345,74.32542 25.300275,74.45178 27.97431,73.39059 C29.184285,72.910305 30.54597,73.27515 31.35366,74.29617 C33.13869,76.55193 35.8995,78 39,78 C42.1005,78 44.86131,76.55193 46.646535,74.295975 C47.454225,73.27515 48.81591,72.910305 50.025885,73.390395 C52.69992,74.451585 55.81485,74.325225 58.5,72.774975 C61.18515,71.224725 62.852205,68.590275 63.27009,65.74386 C63.45924,64.455885 64.45608,63.459045 65.744055,63.269895 C68.59047,62.85201 71.22492,61.184955 72.77517,58.499805 C74.32542,55.814655 74.45178,52.699725 73.39059,50.02569 C72.910305,48.815715 73.27515,47.45403 74.29617,46.64634 C76.55193,44.86131 78,42.1005 78,39 Z" id="Shape" fill="#8AE25E"></path>
                                                        <path d="M76.201,31.353465 C75.154,30.545775 74.7798,29.18409 75.2722,27.974115 C76.3606,25.30008 76.231,22.18515 74.641,19.5 C73.051,16.81485 70.349,15.147795 67.4296,14.72991 C66.1086,14.54076 65.0862,13.54392 64.8922,12.255945 C64.4636,9.409725 62.754,6.775275 60,5.225025 C57.246,3.674775 54.0512,3.548415 51.3086,4.609605 C50.0676,5.08989 48.671,4.725045 47.8426,3.704025 C46.0116,1.44807 43.18,0 40,0 L40,78 C43.18,78 46.0116,76.55193 47.8426,74.295975 C48.671,73.27515 50.0676,72.910305 51.3086,73.390395 C54.0512,74.451585 57.246,74.325225 60,72.774975 C62.754,71.224725 64.4638,68.590275 64.8924,65.74386 C65.0864,64.455885 66.1088,63.459045 67.4298,63.27009 C70.3492,62.852205 73.0512,61.18515 74.6412,58.5 C76.2312,55.81485 76.3608,52.69992 75.2724,50.025885 C74.7798,48.81591 75.154,47.454225 76.2012,46.646535 C78.5148,44.86131 80,42.1005 80,39 C80,35.8995 78.5148,33.13869 76.201,31.353465 Z" id="Shape" fill="#8AE25E"></path>
                                                        <path d="M39.5,68 C23.7851,68 11,55.2149 11,39.5 C11,23.7851 23.7851,11 39.5,11 C55.2149,11 68,23.7851 68,39.5 C68,55.2149 55.2149,68 39.5,68 Z M39.5,16.8965517 C27.0364586,16.8965517 16.8965517,27.0364586 16.8965517,39.5 C16.8965517,51.9635414 27.0364586,62.1034483 39.5,62.1034483 C51.9635414,62.1034483 62.1034483,51.9635414 62.1034483,39.5 C62.1034483,27.0364586 51.9635414,16.8965517 39.5,16.8965517 Z" id="Shape" fill="#FFFFFF"></path>
                                                        <path d="M40,11 L40,16.8965517 C52.2448828,16.8965517 62.2068966,27.0364586 62.2068966,39.5 C62.2068966,51.9635414 52.2448828,62.1034483 40,62.1034483 L40,68 C55.4392,68 68,55.2149 68,39.5 C68,23.7851 55.4392,11 40,11 Z" id="Shape" fill="#FFFFFF"></path>
                                                        <polygon id="Shape" fill="#FFFFFF" points="36.3879398 49 28 40.5977769 32.0909451 36.4155942 36.3557627 40.6878113 45.8768778 31 50 35.1494252"></polygon>
                                                        <polygon id="Shape" fill="#FFFFFF" points="40 47 51 35.3272988 46.8768415 31 40 38.2971259"></polygon>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                                <h4>Congratulations</h4>
                                <p>Thank you for passing a test. We’ve already sent your writing to our teacher. Your final results will be available very soon.</p>
                            </div>
                            <form action="#">
                                <fieldset>
                                    <div className="form-action">
                                        <Link type="button" className="btn btn-default" data-dismiss="modal" to="/student/schedule">{t('SCHEDULE A LESSON')}</Link>
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
