import * as React from 'react';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import { observer, inject } from 'mobx-react';
import transl from '../../../utils/t.decorator';
import { Link, Redirect } from 'react-router-dom';
import * as classNames from 'classnames';
import LazyLoad from '../../../components/LazyLoad';
import { Form, Field } from 'react-final-form';
import Validator = require('validatorjs');
import { NewUsersEvaluation } from '../../../services/api';

// tslint:disable:max-line-length
interface IForm {
    text: string;
}
export interface EvaluationWritingComponentProps extends GenericProps {
}
export interface EvaluationWritingComponentState {
}
@transl()
@inject('evaluationStore')
@observer
export class EvaluationWritingComponent extends React.Component<EvaluationWritingComponentProps, EvaluationWritingComponentState> {
    onSubmitFrom = (values: IForm) => {
        this.props.evaluationStore.saveResults(values.text, NewUsersEvaluation.TypeEnum.WRITING);
    };
    render(): JSX.Element {
        const { t, evaluationStore } = this.props;
        // if we finalized evaluation than redirect to next stage
        if (evaluationStore.isWritingFinished) {
            return <Redirect to="/student/evaluation/complete" />;
        }

        return this.renderWriting();
    }

    renderWriting(): JSX.Element {
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
                                    <li>1. Grammar</li>
                                    <li className="active">2. Writing</li>
                                </ul>
                            </div>
                            <div className="test-question">Write about the following topic</div>
                            <div className="test-text">
                                <p>A person’s worth nowadays seems to be judged according to social status and material possessions. Old-fashioned values, such as honour, kindness and trust, no longer seem
                                important.</p>

                                <p>To what extent do you agree or disagree with this opinion?</p>

                                <p>Give reasons for your answer and include any relevant examples from your own
                                knowledge or experience.</p>

                                <p>Write at least 250 words. </p>
                            </div>
                            <Form
                                // validateOnBlur
                                onSubmit={this.onSubmitFrom}
                                initialValues={{
                                    text: '',
                                }}
                                validate={(values: IForm) => {
                                    const v = new Validator(values, {
                                        text: 'required|min:250',
                                    });
                                    v.check();
                                    return v.errors.all();
                                }}
                                render={ ({ handleSubmit, values, reset, pristine, invalid  }) => (
                                    <form onSubmit={handleSubmit}>
                                        <fieldset>
                                            <div className="row">
                                            <Field
                                                name="text"
                                                render={({ input, meta }) => (
                                                    <textarea {...input} className="form-control"></textarea>
                                                )}
                                            />
                                            </div>
                                            <div className="form-action">
                                                <button type="submit" className="btn btn-default" data-dismiss="modal" disabled={pristine || invalid} >{t('SEND')}</button>
                                            </div>
                                        </fieldset>
                                    </form>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }

}
