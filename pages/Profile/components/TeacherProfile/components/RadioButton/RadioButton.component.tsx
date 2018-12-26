import * as React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import * as classnames from 'classnames';
import { TranslationFunction } from 'react-i18next';

interface RadioButtonComponentProps {
    t?: TranslationFunction;
    styles?: React.CSSProperties;
    title: string;
    name: string;
    value: string;
}

export class RadioButtonComponent extends React.Component<RadioButtonComponentProps> {
    render(): React.ReactNode {
        const { name, value } = this.props;

        return (
            <Field
                name={name}
                render={this.renderRadioButton}
                type="radio"
                value={value}
            />
        );
    }

    renderRadioButton = (fieldRenderProps: FieldRenderProps): React.ReactNode => {
        const { title, styles } = this.props;
        const { input } = fieldRenderProps;

        return (
            <div className={classnames('radio', { 'active-state': input.checked })} style={styles}>
                <label>
                    <input
                        {...input}
                        type="radio"
                    />
                    {' '}{title}
                </label>
            </div>
        );
    }
}
