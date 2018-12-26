import * as React from 'react';
import * as classnames from 'classnames';
import { Field, FieldRenderProps } from 'react-final-form';

interface CommonProfileFormFieldComponentProps {
    label: string;
    type?: string;
    name: string;
    value?: string;
}

export class CommonProfileFormFieldComponent extends React.Component<CommonProfileFormFieldComponentProps> {
    render(): React.ReactNode {
        const { name, value = '' } = this.props;

        return (
            <Field
                name={name}
                render={this.renderFormField}
                value={value}
            />
        );
    }

    renderFormField = (fieldRenderProps: FieldRenderProps): React.ReactNode => {
        const { label, type = 'text' } = this.props;
        const { input, meta } = fieldRenderProps;
        const hasError: boolean = meta.touched && meta.error;
        const hasSuccess: boolean = meta.touched && !meta.error;

        const className: string = classnames('form-group', {
            'has-error': hasError,
            'has-success': hasSuccess,
        });

        return (
            <div className={className}>
                <label>{label}</label>
                <input
                    {...input}
                    type={type}
                    className="form-control"
                />
                {hasError && <span className="help-block">{meta.error}</span>}
            </div>
        );
    }
}
