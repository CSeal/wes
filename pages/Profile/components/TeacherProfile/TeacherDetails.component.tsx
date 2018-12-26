import * as React from 'react';
import * as Validator from 'validatorjs';
import * as moment from 'moment';
import { inject, observer } from 'mobx-react';
import { Form, FormRenderProps } from 'react-final-form';
import { GenericProps } from '../../../../interfaces/GenericProps.interface';
import transl from '../../../../utils/t.decorator';
import { FormFieldNameStartDateComponent } from './components/formFields/FormFieldNameStartDate.component';
import { FormFieldNameOvertimeComponent } from './components/formFields/FormFieldNameOvertime.component';
import { FormFieldNameHoursWeekComponent } from './components/formFields/FormFieldNameHoursWeek.component';
import { FormFieldNameMonthComponent } from './components/formFields/FormFieldNameMonth.component';
import { FormFieldNameRateComponent } from './components/formFields/FormFieldNameRate.component';
import { FormSubmitBtnBtnPrimary } from './components/formFields/FormSubmitBtnBtnPrimary';
import { TeacherProfileDetailsFormValues, Overtime, HoursPerWeekEnum, Months } from '../../../../stores/User.store';
import { NewUsersRate } from '../../../../services/api';
import 'react-datepicker/dist/react-datepicker.css';
import LazyLoad from '../../../../components/LazyLoad';
import { westoast } from '../../../../utils/westoast';

interface TeacherDetailsProfileProps extends GenericProps {}

@transl()
@inject('userStore')
@observer
export default class TeacherProfileDetailsComponent extends React.Component<TeacherDetailsProfileProps> {
    render(): React.ReactNode {
        const { meRate$ } = this.props.userStore;

        return (
            <div id="content" className="col-md-9 col-md-offset-3">
                <div className="col-md-12">
                    <div className="profile-page">
                        <LazyLoad $={meRate$.current()}>
                            {() => {
                                const initialValues = {
                                    startDate: meRate$.current().start_date || '',
                                    overtime: Overtime[meRate$.current().allow_overtime] || Overtime[1],
                                    hoursWeek: meRate$.current().hours_per_week ? '' + meRate$.current().hours_per_week : HoursPerWeekEnum.THREE,
                                    month: meRate$.current().months ? '' + meRate$.current().months : Months.FOUR,
                                    rate: meRate$.current().individual_rate ? '' + meRate$.current().individual_rate : '',
                                };
                                return (
                                    <Form
                                        onSubmit={this.formOnSubmitHandler}
                                        initialValues={initialValues}
                                        validate={this.validateFormValues}
                                        render={this.renderForm}
                                    />
                                );
                            }}
                        </LazyLoad>
                    </div>
                </div>
            </div>
        );
    }

    renderForm = (formRenderProps: FormRenderProps): React.ReactNode => {
        const { handleSubmit, pristine, invalid } = formRenderProps;

        return (
            <form onSubmit={handleSubmit}>
                <FormFieldNameStartDateComponent />
                <FormFieldNameOvertimeComponent />
                <FormFieldNameHoursWeekComponent />
                <FormFieldNameMonthComponent />
                <FormFieldNameRateComponent />
                <FormSubmitBtnBtnPrimary disabled={pristine || invalid} />
            </form>
        );
    }

    formOnSubmitHandler = (values: TeacherProfileDetailsFormValues): void => {
        const { hoursWeek, month, overtime, rate, startDate } = values;

        const postUserIdRate: NewUsersRate = {
            individual_rate: +rate,
            start_date: moment(startDate).format('YYYY-MM-DD HH:mm:ss'),
            allow_overtime: +Overtime[overtime],
            hours_per_week: +hoursWeek,
            months: +month,
        };
        westoast(
            this.props.userStore.usersIdRatePost(postUserIdRate),
            { entityName: 'Teacher\'s rates' },
        );
    }

    validateFormValues = (values: TeacherProfileDetailsFormValues): Validator.ValidationErrors => {
        const v = new Validator(values, {
            startDate: 'required',
            overtime: 'required|string',
            hoursWeek: 'required|string',
            month: 'required|string',
            rate: 'required|string',
        });

        v.check();
        return v.errors.all();
    }
}
