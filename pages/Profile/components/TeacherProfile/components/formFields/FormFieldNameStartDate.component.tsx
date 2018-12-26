import * as React from 'react';
import * as moment from 'moment';
import * as classnames from 'classnames';
import { Field, FieldRenderProps } from 'react-final-form';
import { TranslationFunction } from 'react-i18next';
import DatePicker from 'react-datepicker';
import transl from '../../../../../../utils/t.decorator';

interface FormFieldNameStartDateComponentProps {
    t?: TranslationFunction;
}

@transl()
export class FormFieldNameStartDateComponent extends React.Component<FormFieldNameStartDateComponentProps> {
    render(): React.ReactNode {
        return (
            <Field name="startDate" render={this.renderFormField} />
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
                        <legend>{t('Contract Details')}</legend>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <div className={classNames}>
                            <label>{t('Start Date')}</label>
                            <DatePicker
                                {...input}
                                autoComplete="off"
                                className="form-control"
                                dateFormat="L"
                                onChange={(value) => this.changeDateHandler(value, fieldRenderProps)}
                                value={input.value !== '' ? input.value : null}
                            />
                            {hasError && <span className="help-block">{meta.error}</span>}
                        </div>
                    </div>
                </div>
            </fieldset>
        );
    }

    changeDateHandler = (value: moment.Moment, fieldRenderProps: FieldRenderProps): void => {
        const dateFormat: string = 'MMM DD YYYY';
        const formattedDate: string = value.format(dateFormat);

        fieldRenderProps.input.onChange(formattedDate);
    }
}
