import * as React from 'react';
import * as classnames from 'classnames';
import { TranslationFunction } from 'react-i18next';
import { Field, FieldRenderProps } from 'react-final-form';
import transl from '../../../../../../utils/t.decorator';

interface TeacherProfileVideoInstructionsProps {
    t?: TranslationFunction;
}

@transl()
export class TeacherProfileVideoInstructionsComponent extends React.Component<TeacherProfileVideoInstructionsProps> {
    render(): React.ReactNode {
        return (
            <Field name="youtube_url" render={this.renderFormField} />
        );
    }

    renderFormField = (fieldRenderProps: FieldRenderProps): React.ReactNode => {
        const { t } = this.props;
        const { input, meta } = fieldRenderProps;
        const hasError: boolean = meta.touched && meta.error;

        const classNames: string = classnames('form-group', {
            'has-error': hasError,
            'has-success': meta.touched && !meta.error,
        });

        return (
            <fieldset>
                <div className="row">
                    <div className="col-md-12">
                        <legend>{t('Add video introduction')}</legend>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <div className={classNames}>
                            <input {...input} type="text" className="form-control" />
                            {hasError && <span className="help-block">{meta.error}</span>}
                        </div>
                    </div>
                </div>
            </fieldset>
        );
    }
}
