import * as React from 'react';
import * as classnames from 'classnames';
import { Field, FieldRenderProps } from 'react-final-form';
import { TranslationFunction } from 'react-i18next';
import { inject } from 'mobx-react';
import { GenericProps } from '../../../../interfaces/GenericProps.interface';
import transl from '../../../../utils/t.decorator';

interface FormFieldNameNumberHoursComponentProps extends GenericProps {
    col: string;
}
interface FormFieldNameNumberHoursComponentState {
}

@transl()
@inject('packageCreateStore')
export class FormFieldNameNumberHoursComponent extends React.Component<FormFieldNameNumberHoursComponentProps, FormFieldNameNumberHoursComponentState> {
    render(): React.ReactNode {
        return (
            <Field name="numberHours" render={this.renderFormField} />
        );
    }

    renderFormField = (args: FieldRenderProps): React.ReactNode => {
        const { t, col } = this.props;
        const { input, meta } = args;
        const { touched, error } = meta;
        const hasError: boolean = touched && error;
        const hasSuccess: boolean = touched && !error;
        const classNames: string = classnames({
            [col]: true,
            ['form-group']: true,
            ['has-error']: hasError,
            ['has-success']: hasSuccess,
        });

        return (
            <div className={classNames}>
                <label>{t('Number of hours')}</label>
                <input
                    {...input}
                    className="form-control"
                    type="text"
                    placeholder=""
                    onChange={(e) => { this.onChangeHandler(e, args); }}
                />
                {hasError && <span className="help-block">{error}</span>}
            </div>
        );
    }

    onChangeHandler = (event: React.SyntheticEvent<HTMLInputElement>, fieldRenderProps: FieldRenderProps): void => {
        const { packageCreateStore } = this.props;
        const { value } = event.currentTarget;

        packageCreateStore.setNumberHours(value);
        fieldRenderProps.input.onChange(value);
    }
}
