import * as React from 'react';
import { GenericProps } from '../../interfaces/GenericProps.interface';
import { observer, inject } from 'mobx-react';
import transl from '../../utils/t.decorator';
import { Link } from 'react-router-dom';
import * as Validator from 'validatorjs';
import { NewUser, NewUsersEvaluation } from '../../services/api';
import { Field, Form } from 'react-final-form';
import { IEvaluate } from '../../stores/Profiles.store';
import { westoast } from '../../utils/westoast';
import classNames = require('classnames');
import MaskedInput from 'react-text-mask';

export interface TeacherEvaluateProps extends GenericProps {
}
export interface TeacherEvaluateState {
}
// tslint:max-line-length

@transl()
@inject('evaluationStore')
@observer
export class TeacherEvaluatePage extends React.Component<TeacherEvaluateProps, TeacherEvaluateState> {
    evaluateStudent = (data: IEvaluate) => {
        const { t } = this.props;

        westoast(Promise.all([
            this.props.evaluationStore.saveResults(undefined, NewUsersEvaluation.TypeEnum.GRAMMAR, data.grammar, data.grammarComment),
            this.props.evaluationStore.saveResults(undefined, NewUsersEvaluation.TypeEnum.WRITING, data.writing, data.writingComment),
            this.props.evaluationStore.saveResults(undefined, NewUsersEvaluation.TypeEnum.LISTENING, data.listening, data.listeningComment),
            this.props.evaluationStore.saveResults(undefined, NewUsersEvaluation.TypeEnum.SPEAKING, data.speaking, data.speakingComment),
        ]), {entityName: t('evaluations') });
    };
    render(): JSX.Element {
        const { t, evaluationStore } = this.props;
        return (
            <section id="main">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <header className="heading">
                                <Link to="/teacher/students" className="back">
                                    <svg width="20px" height="14px" viewBox="0 0 20 14" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                        <g id="WES-Full-Statistics-–-1366px" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(-109.000000, -187.000000)">
                                            <g id="body" transform="translate(-43.000000, -1.000000)" fill="#888888">
                                                <g id="-g-left-arrow" transform="translate(152.000000, 188.000000)">
                                                    <g id="Shape">
                                                        <path d="M6.52410322,0.210559595 C6.80605498,-0.0701865318 7.24993848,-0.0701865318 7.53189024,0.210559595 C7.80431659,0.481821056 7.80431659,0.933291179 7.53189024,1.20392033 L2.42183221,6.29212773 L19.2843252,6.29212773 C19.6774066,6.29212773 20,6.60322479 20,6.99462536 C20,7.38602592 19.6774066,7.70723996 19.2843252,7.70723996 L2.42183221,7.70723996 L7.53189024,12.7859627 C7.80431659,13.0667088 7.80431659,13.5188113 7.53189024,13.7894404 C7.24993848,14.0701865 6.80605498,14.0701865 6.52410322,13.7894404 L0.204319768,7.49668037 C-0.0681065892,7.22541891 -0.0681065892,6.77394878 0.204319768,6.50331963 L6.52410322,0.210559595 Z" fillRule="nonzero"></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </Link>
                                <h1>{t('Evaluate a student')}</h1>
                                <p className="text-center">{t('Please, evaluate a student due to 5 categories')}. <br />
                                    {t('You can evaluate a student from 1 to 12. If you feel that using integers is not')} <br />
                                    {t('enough, feel free to evaluate by decimal numbers, for example, 5.5, 6.3, 11.2 etc')}.</p>
                            </header>
                        </div>
                        <div className="row">
                            <div className="col-md-8 col-md-offset-2">
                                <div className="block">
                                    <div className="evaluate-block">
                                        {/* <div className="score">
                                            <h2>{t('Last Score')}:</h2>
                                            <strong>6.2</strong>
                                        </div> */}
                                        <Form
                                            // validateOnBlur
                                            onSubmit={this.evaluateStudent}
                                            initialValues={{
                                                grammarComment: '',
                                                writingComment: t('This is a work in progress and will require more practice'),
                                                speakingComment: '',
                                                listeningComment: '',
                                            }}
                                            validate={(values: NewUser) => {
                                                const v = new Validator(values, {
                                                    grammar: 'required|numeric|min:0|max:12',
                                                    grammarComment: 'string',
                                                    writing: 'required|numeric|min:0|max:12',
                                                    writingComment: 'string',
                                                    speaking: 'required|numeric|min:0|max:12',
                                                    speakingComment: 'string',
                                                    listening: 'required|numeric|min:0|max:12',
                                                    listeningComment: 'string',
                                                });
                                                v.check();
                                                return v.errors.all();
                                            }}
                                            render={ ({ handleSubmit, values, reset, pristine, invalid  }) => (
                                                <form onSubmit={handleSubmit}>
                                                    <fieldset>
                                                    <Field
                                                        name="grammar"
                                                        render={({ input, meta }) => (
                                                                <div className={classNames('form-group', {'has-error': meta.touched && meta.error}, {'has-success': meta.touched && !meta.error})} >
                                                                    <label>{t('Grammar')}</label>
                                                                    <MaskedInput
                                                                        {...input}
                                                                        mask={[/\d/, '.', /\d/]}
                                                                        className="form-control"
                                                                        placeholder="0.0"
                                                                        guide={true}
                                                                    />
                                                                    {meta.touched && meta.error && <span className="help-block">{meta.error}</span>}
                                                                </div>
                                                            )}
                                                    />
                                                <div className="form-group">
                                                    <Field
                                                        name="grammarComment"
                                                        render={({ input, meta }) => (
                                                            <textarea {...input} className="form-control"  placeholder={t('Leave a comment')}></textarea>
                                                            )}
                                                    />
                                                </div>
                                                <Field
                                                        name="writing"
                                                        render={({ input, meta }) => (
                                                                <div className={classNames('form-group', {'has-error': meta.touched && meta.error}, {'has-success': meta.touched && !meta.error})} >
                                                                    <label>{t('Writing')}</label>
                                                                    <MaskedInput
                                                                        {...input}
                                                                        mask={[/\d/, '.', /\d/]}
                                                                        className="form-control"
                                                                        placeholder="0.0"
                                                                        guide={true}
                                                                    />
                                                                    {meta.touched && meta.error && <span className="help-block">{meta.error}</span>}
                                                                </div>
                                                            )}
                                                />
                                                <div className="form-group">
                                                    <Field
                                                        name="writingComment"
                                                        render={({ input, meta }) => (
                                                            <textarea {...input} className="form-control" placeholder={t('Leave a comment')}>
                                                            </textarea>
                                                        )}
                                                    />
                                                </div>
                                                <Field
                                                        name="speaking"
                                                        render={({ input, meta }) => (
                                                                <div className={classNames('form-group', {'has-error': meta.touched && meta.error}, {'has-success': meta.touched && !meta.error})} >
                                                                    <label>{t('Speaking')}</label>
                                                                    <MaskedInput
                                                                        {...input}
                                                                        mask={[/\d/, '.', /\d/]}
                                                                        className="form-control"
                                                                        placeholder="0.0"
                                                                        guide={true}
                                                                    />
                                                                    {meta.touched && meta.error && <span className="help-block">{meta.error}</span>}
                                                                </div>
                                                            )}
                                                />
                                                <div className="form-group">
                                                    <Field
                                                        name="speakingComment"
                                                        render={({ input, meta }) => (
                                                            <textarea {...input} className="form-control" placeholder={t('Leave a comment')}>
                                                            </textarea>
                                                        )}
                                                    />
                                                </div>
                                                <Field
                                                        name="listening"
                                                        render={({ input, meta }) => (
                                                                <div className={classNames('form-group', {'has-error': meta.touched && meta.error}, {'has-success': meta.touched && !meta.error})} >
                                                                    <label>{t('Listening')}</label>
                                                                    <MaskedInput
                                                                        {...input}
                                                                        mask={[/\d/, '.', /\d/]}
                                                                        className="form-control"
                                                                        placeholder="0.0"
                                                                        guide={true}
                                                                    />
                                                                    {meta.touched && meta.error && <span className="help-block">{meta.error}</span>}
                                                                </div>
                                                            )}
                                                />
                                                <div className="form-group">
                                                    <Field
                                                        name="listeningComment"
                                                        render={({ input, meta }) => (
                                                            <textarea {...input} className="form-control" placeholder={t('Leave a comment')}>
                                                            </textarea>
                                                        )}
                                                    />
                                                </div>
                                                <div className="form-action">
                                                    <button type="submit" disabled={pristine || invalid} className="btn btn-primary">{t('SEND')}</button>
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
                </div>
            </section>
        );
    }
}
