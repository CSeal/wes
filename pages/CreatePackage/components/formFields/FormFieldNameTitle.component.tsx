import * as React from 'react';
import * as classnames from 'classnames';
import { Field, FieldRenderProps } from 'react-final-form';
import { TranslationFunction } from 'react-i18next';
import transl from '../../../../utils/t.decorator';
import { GenericProps } from '../../../../interfaces/GenericProps.interface';
import { inject } from 'mobx-react';

interface FormFieldNameTitleComponentProps extends GenericProps {
    t?: TranslationFunction;
    col: string;
}
interface FormFieldNameTitleComponentState {
}

@transl()
@inject('packageCreateStore')
export class FormFieldNameTitleComponent extends React.Component<FormFieldNameTitleComponentProps, FormFieldNameTitleComponentState> {
    render(): React.ReactNode {
        return (
            <Field name="title" render={this.renderFormField} />
        );
    }

    renderFormField = (args: FieldRenderProps): React.ReactNode => {
        const { t, col } = this.props;
        const { input, meta } = args;
        const { touched, error } = meta;
        const hasError: boolean = touched && error;
        const hasSuccess: boolean = touched && !error;
        const classNames: string = classnames({
            ['form-group']: true,
            [col]: true,
            ['has-error']: hasError,
            ['has-success']: hasSuccess,
        });

        return (
            <div className={classNames}>
                <label htmlFor="title">{t('Package Title')}</label>
                <input {...input} id="title" className="form-control" type="text" placeholder="" onChange={(e) => { this.onChangeHandler(e, args); }}/>
                {hasError && <span className="help-block">{error}</span>}
            </div>
        );
    }

    onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, fieldRenderProps: FieldRenderProps): void => {
        const { packageCreateStore } = this.props;
        const { value } = event.currentTarget;

        packageCreateStore.setName(value);
        fieldRenderProps.input.onChange(value);
    }
}
