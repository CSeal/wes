import * as React from 'react';
import * as classnames from 'classnames';
import { Field, FieldRenderProps } from 'react-final-form';
import { inject } from 'mobx-react';
import transl from '../../../../utils/t.decorator';
import { GenericProps } from '../../../../interfaces/GenericProps.interface';

interface FormFieldNameNumberWeekComponentProps extends GenericProps {
    col: string;
}
interface FormFieldNameNumberWeekComponentState {
}

@transl()
@inject('packageCreateStore')
export class FormFieldNameNumberWeekComponent extends React.Component<FormFieldNameNumberWeekComponentProps, FormFieldNameNumberWeekComponentState> {
    render(): React.ReactNode {
        return (
            <Field name="numberWeeks" render={this.renderFormField} />
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
                <label htmlFor="number-week">{t('Number of weeks')}</label>
                <input
                    {...input}
                    id="number-week"
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

        packageCreateStore.setNumberWeeks(value);
        fieldRenderProps.input.onChange(value);
    }
}
