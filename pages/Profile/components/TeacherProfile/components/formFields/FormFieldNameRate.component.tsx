import * as React from 'react';
import * as classnames from 'classnames';
import { Field, FieldRenderProps } from 'react-final-form';
import { TranslationFunction } from 'react-i18next';
import transl from '../../../../../../utils/t.decorator';

interface FormFieldNameRateComponentProps {
    t?: TranslationFunction;
}

@transl()
export class FormFieldNameRateComponent extends React.Component<FormFieldNameRateComponentProps> {
    render(): React.ReactNode {
        return (
            <Field name="rate" render={this.renderFormField} />
        );
    }

    renderFormField = (fieldRenderProps: FieldRenderProps): React.ReactNode => {
        const { t } = this.props;
        const { input, meta } = fieldRenderProps;
        const hasError: boolean = meta.touched && meta.error;

        const className: string = classnames('form-group', {
            'has-error': hasError,
            'has-success': meta.touched && !meta.error,
        });

        return (
            <fieldset>
                <div className="row">
                    <div className="col-md-8">
                        <div className={className}>
                            <label>{t('Rate per hour')}: ${input.value}</label>
                            <input {...input} readOnly={true} type="hidden" className="form-control" placeholder="$"/>
                            {hasError && <span className="help-block">{meta.error}</span>}
                        </div>
                    </div>
                </div>
            </fieldset>
        );
    }
}
