import * as React from 'react';
import * as classnames from 'classnames';
import { inject, observer } from 'mobx-react';
import { Field, FieldRenderProps } from 'react-final-form';
import transl from '../../../../utils/t.decorator';
import { GenericProps } from '../../../../interfaces/GenericProps.interface';
import { User } from '../../../../services/api/api';

interface FormFieldNameTeacherComponentProps extends GenericProps {
    col: string;
    label?: boolean;
}
interface FormFieldNameTeacherComponentState {
}

@transl()
@inject('packageCreateStore')
@observer
export class FormFieldNameTeacherComponent extends React.Component<FormFieldNameTeacherComponentProps, FormFieldNameTeacherComponentState> {
    render(): React.ReactNode {
        return (
            <Field name="teacher" render={this.renderFormField} />
        );
    }

    renderFormField = (args: FieldRenderProps): React.ReactNode => {
        const { t, packageCreateStore, col, label } = this.props;
        const teachers: User[] = packageCreateStore.teachers$.current();
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

        if (packageCreateStore.userId) {
            input.onChange(packageCreateStore.userId);
        }

        return (
            <div className={classNames}>
                {label && <label htmlFor="teacher">{t('Choose a teacher')}:</label>}
                <select {...input} id="teacher" className="form-control" onChange={(e) => { this.onChangeHandler(e, args); }}>
                    <option className="fs-dropdown-item_placeholder">{t('Choose a teacher from a list')}:</option>
                    {teachers && teachers.map((el) => <option key={el.id} value={el.id}>{el.name}</option>)}
                </select>
                {hasError && <span className="help-block">{error}</span>}
            </div>
        );
    }

    onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>, fieldRenderProps: FieldRenderProps): void => {
        const { packageCreateStore } = this.props;
        const { input } = fieldRenderProps;
        const { value } = event.currentTarget;
        const userId: number = Number.parseInt(value);

        input.onChange(value);
        packageCreateStore.setUserId(userId);
    }
}
