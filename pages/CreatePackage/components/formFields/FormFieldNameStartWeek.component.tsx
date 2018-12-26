import * as React from 'react';
import * as classnames from 'classnames';
import DatePicker from 'react-datepicker';
import { Field, FieldRenderProps } from 'react-final-form';
import * as moment from 'moment';
import { inject } from 'mobx-react';
import transl from '../../../../utils/t.decorator';
import { GenericProps } from '../../../../interfaces/GenericProps.interface';

interface FormFieldNameStartWeekComponentProps extends GenericProps {
    col: string;
}
interface FormFieldNameStartWeekComponentState {
}

@transl()
@inject('packageCreateStore')
export class FormFieldNameStartWeekComponent extends React.Component<FormFieldNameStartWeekComponentProps, FormFieldNameStartWeekComponentState> {
    render(): React.ReactNode {
        return (
            <Field name="startWeek" render={this.renderFormField} />
        );
    }

    renderFormField = (args: FieldRenderProps): React.ReactNode => {
        const { t, col } = this.props;
        const { input, meta } = args;
        const { touched, error } = meta;
        const emptyString: string = '';
        const hasError: boolean = touched && error;
        const hasSuccess: boolean = touched && !error;
        const classNames: string = classnames({
            ['form-group']: true,
            [col]: true,
            ['has-error']: hasError,
            ['has-success']: hasSuccess,
        });
        const formFieldValue: string = (input.value !== emptyString) ? input.value : null;

        return (
            <div className={classNames}>
                <label htmlFor="start-week">{t('Starting week')}</label>
                <DatePicker
                    {...input}
                    autoComplete="off"
                    id="start-week"
                    className="form-control"
                    placeholderText={t('Click to select a date')}
                    dateFormat="L"
                    value={formFieldValue}
                    onChange={(value) => this.changeDateHandler(value, args)}
                    minDate={moment()}
                    showDisabledMonthNavigation
                    showWeekNumbers
                />
                {hasError && <span className="help-block">{error}</span>}
            </div>
        );
    }

    changeDateHandler = (value: moment.Moment, fieldRenderProps: FieldRenderProps): void => {
        const dateFormat: string = 'MMM DD YYYY';
        const formattedDate: string = value.format(dateFormat);

        fieldRenderProps.input.onChange(formattedDate);
        this.props.packageCreateStore.setStartWeek(formattedDate);
    }
}
