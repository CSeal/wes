import * as React from 'react';
import * as classnames from 'classnames';
import { inject, observer } from 'mobx-react';
import { Field, FieldRenderProps } from 'react-final-form';
import transl from '../../../../utils/t.decorator';
import { GenericProps } from '../../../../interfaces/GenericProps.interface';
import { User } from '../../../../services/api/api';

interface FormFieldNameStudentComponentProps extends GenericProps {
    col: string;
}
interface FormFieldNameStudentComponentState {
}

@transl()
@inject('packageStore')
@inject('packageCreateStore')
@observer
export class FormFieldNameStudentComponent extends React.Component<FormFieldNameStudentComponentProps, FormFieldNameStudentComponentState> {
    render(): React.ReactNode {
        return (
            <Field name="student" render={this.renderFormField} />
        );
    }

    renderFormField = (args: FieldRenderProps): React.ReactNode => {
        const { t, packageCreateStore, col } = this.props;
        const students$: User[] = packageCreateStore.students$.current();
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
                <label htmlFor="student">{t('Add Student')}</label>
                <select {...input} id="student" className="form-control" onChange={(e) => { this.onChangeHandler(e, args); }}>
                    <option className="fs-dropdown-item_placeholder">{t('Choose student from a list')}:</option>
                    {students$ && students$.map((el) => <option key={el.id} value={el.id}>{el.name}</option>)}
                </select>
            </div>
        );
    }

    onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>, fieldRenderProps: FieldRenderProps): void => {
        const { packageStore, packageCreateStore } = this.props;
        const { input } = fieldRenderProps;
        const { value } = event.currentTarget;
        const userId: number = Number.parseInt(value);

        input.onChange(value);
        packageStore.setUserId(userId);
        packageCreateStore.clearSelectedStudents();
        packageCreateStore.setStudentAsSelected(userId);
    }
}
