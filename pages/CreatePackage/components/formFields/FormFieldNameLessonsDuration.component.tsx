import * as React from 'react';
import * as classnames from 'classnames';
import { observer, inject } from 'mobx-react';
import { Field, FieldRenderProps } from 'react-final-form';
import { GenericProps } from '../../../../interfaces/GenericProps.interface';
import transl from '../../../../utils/t.decorator';
import { PackageCreateStore, LessonsDurationEnum } from '../../../../stores/PackageCreate.store';

interface FormFieldNameLessonsDurationComponentProps extends GenericProps {
    packageCreateStore?: PackageCreateStore;
}
interface FormFieldNameLessonsDurationComponentState {
}

@transl()
@inject('packageCreateStore')
@observer
export class FormFieldNameLessonsDurationComponent extends React.Component<FormFieldNameLessonsDurationComponentProps, FormFieldNameLessonsDurationComponentState> {
    render(): React.ReactNode {
        return (
            <Field name="lessonsDuration" render={this.renderFormField} type="radio" />
        );
    }

    renderFormField = (args: FieldRenderProps): React.ReactNode => {
        const { t, packageCreateStore } = this.props;
        const {numberHours, numberWeeks, lessonsDuration } = packageCreateStore;
        const { HALF_HOURS, HOUR, HOUR_HALF, HOUR_TWO } = LessonsDurationEnum;

        return (
            <div className="row">
                <div className="col-md-12">
                    <label className="text-size9">{t('Lessons Duration')}</label>
                </div>
                {/* {this.renderRadioButton(HALF_HOURS, 'hours', args)} */}
                {(numberHours / numberWeeks) >= HOUR && this.renderRadioButton(HOUR, 'hour', args)}
                {(numberHours / numberWeeks) >= HOUR_HALF && this.renderRadioButton(HOUR_HALF, 'hours', args)}
                {(numberHours / numberWeeks) >= HOUR_TWO && this.renderRadioButton(HOUR_TWO, 'hours', args)}
            </div>
        );
    }

    renderRadioButton = (value: LessonsDurationEnum, title: string, fieldRenderProps: FieldRenderProps): React.ReactNode => {
        const { t, packageCreateStore } = this.props;
        const { lessonsDuration } = packageCreateStore;
        const { input } = fieldRenderProps;
        const isChecked: boolean = lessonsDuration === value;
        const classNames: string = classnames({
            ['radio']: true,
            ['active-state']: isChecked,
        });

        return (
            <div className="form-group col-md-3">
                <div className={classNames}>
                    <label>
                        <input
                            {...input}
                            type="radio"
                            checked={isChecked}
                            name="optionsRadio1"
                            value={value}
                            onClick={() => { this.changeLessonsDuration(value); }}
                        /> &nbsp;
                        {value} {t(title)}
                    </label>
                </div>
            </div>
        );
    }

    changeLessonsDuration(value: LessonsDurationEnum): void {
        this.props.packageCreateStore.changeLessonsDuration(value);
    }
}
