import * as React from 'react';
import * as classnames from 'classnames';
import transl from '../../../../utils/t.decorator';

import { Field, FieldRenderProps } from 'react-final-form';
import { Typeahead } from 'react-bootstrap-typeahead';
import { TranslationFunction } from 'react-i18next';
import { inject, observer } from 'mobx-react';
import { UserStore } from '../../../../stores/User.store';

interface CommonProfileCountryComponentProps {
    label: string;
    type?: string;
    name: string;
    value?: string;
    t?: TranslationFunction;
    userStore?: UserStore;
}

@transl()
@inject('userStore')
@observer
export class CommonProfileCountryComponent extends React.Component<CommonProfileCountryComponentProps> {

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
        const { t, label } = this.props;
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
                <Typeahead
                    highlightOnlyResult={true}
                    selectHintOnEnter={true}
                    labelKey={label}
                    isLoading={this.props.userStore.countries$.current() === undefined}
                    options={this.props.userStore.countries$.current() && this.props.userStore.countries$.current().map((country) => country.name) || []}
                    placeholder={t('Choose a ') + label.toLowerCase() + '...'}
                    defaultInputValue={input.value}
                    onInputChange={(value) => input.onChange(value)}
                    onChange={(value) => input.onChange(value[0])}
                />
                {hasError && <span className="help-block">{meta.error}</span>}
            </div>
        );
    }
}
