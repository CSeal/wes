import * as React from 'react';
import * as classnames from 'classnames';
import { inject, observer } from 'mobx-react';
import { Field, FieldRenderProps } from 'react-final-form';
import transl from '../../../../utils/t.decorator';
import { GenericProps } from '../../../../interfaces/GenericProps.interface';
import { User } from '../../../../services/api/api';

interface FormFieldNameStudentsComponentProps extends GenericProps {
    col: string;
}
interface FormFieldNameStudentsComponentState {
}

@transl()
@inject('packageCreateStore')
@observer
export class FormFieldNameStudentsComponent extends React.Component<FormFieldNameStudentsComponentProps, FormFieldNameStudentsComponentState> {
    render(): React.ReactNode {
        return (
            <Field name="students" render={this.renderFormField} />
        );
    }

    renderFormField = (args: FieldRenderProps): React.ReactNode => {
        const { t, col, packageCreateStore } = this.props;
        const students$: User[] = packageCreateStore.students$.current();
        const selectedStudentsId: number[] = packageCreateStore.selectedStudentsId;
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
        const filteredStudentsArr: User[] = [];

        if (students$) {
            students$.forEach((el) => {
                if (selectedStudentsId.includes(el.id)) {
                    return;
                }
                filteredStudentsArr.push(el);
            });
        }

        return (
            <div className={classNames}>
                <label htmlFor="students">{t('Add Students')}</label>
                <select {...input} id="students" className="form-control" onChange={(e) => { this.onChangeHandler(e, args); }}>
                    <option className="fs-dropdown-item_placeholder">{t('Choose students from a list')}:</option>
                    {filteredStudentsArr.map((el) => <option key={el.id} value={el.id}>{el.name}</option>)}
                </select>
                {args.meta.touched && args.meta.error && <span className="help-block">{error}</span>}
            </div>
        );
    }

    onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>, fieldRenderProps: FieldRenderProps): void => {
        const { input } = fieldRenderProps;
        const { packageCreateStore } = this.props;
        const studentId: number = parseInt(event.currentTarget.value, 10);

        packageCreateStore.setStudentAsSelected(studentId);
        input.onChange(Array.from(packageCreateStore.selectedStudentsId));
    }
}
