import * as React from 'react';
import { observer, inject } from 'mobx-react';
import * as classnames from 'classnames';
import { Field, FieldRenderProps } from 'react-final-form';
import transl from '../../../utils/t.decorator';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import { PackageCreateStore } from '../../../stores/PackageCreate.store';
import { NewPackage } from '../../../services/api';
import TypeEnum = NewPackage.TypeEnum;
import {RadioGroup, Radio} from 'react-icheck';
import { PackageStore } from '../../../stores/Package.store';

interface PackageCreateSelectPlanComponentProps extends GenericProps {
    packageCreateStore?: PackageCreateStore;
}

@transl()
@inject('packageCreateStore')
@inject('userStore')
@observer
export class PackageCreateSelectPlanComponent extends React.Component<PackageCreateSelectPlanComponentProps> {
    render(): React.ReactNode {
        const { t, packageCreateStore } = this.props;
        const { trialAvailable } = packageCreateStore;
        return (
            <Field
                name="plan"
                type="radio"
                render={(args) => this.renderSelectPlan(args)}
            />
        );
    }

    renderSelectPlan(args: FieldRenderProps): React.ReactNode {
        const { t, packageCreateStore } = this.props;
        const { INDIVIDUAL, GROUP, EVALUATION, TRIAL } = TypeEnum;

        return (
            <div className="row select-plan">
                <div className="form-group col-md-3">
                    {this.renderRadioButton(TRIAL, 'Trial', `${t('Free trial lesson to')} <br /> ${t('test our platform')}`, packageCreateStore.selectedPlan === TRIAL , !packageCreateStore.trialAvailable, args)}
                </div>
                <div className="form-group col-md-3">
                    {this.renderRadioButton(INDIVIDUAL, 'Individual', `${t('Create an individual')} <br /> ${t('lesson for each')} <br /> ${t('student')}`, packageCreateStore.selectedPlan === INDIVIDUAL, this.props.userStore.trialMode, args)}
                </div>
                <div className="form-group col-md-3">
                    {this.renderRadioButton(GROUP, 'Group', `${t('Create a group lesson')} <br /> ${t('and invite your')} <br /> ${t('employees')}`, packageCreateStore.selectedPlan === GROUP, this.props.userStore.trialMode, args)}
                </div>
                <div className="form-group col-md-3">
                    {this.renderRadioButton(EVALUATION, 'Evaluation', `${t('Take an English Level')} <br /> ${t('Test for your')} <br /> ${t('employees')}`, packageCreateStore.selectedPlan === EVALUATION, this.props.userStore.trialMode, args)}
                </div>


            </div>
        );
    }

    renderRadioButton(value: TypeEnum, title: string, paragraph: string, isChecked: boolean, disabled: boolean, fieldRenderProps: FieldRenderProps): React.ReactNode {
        const { t, packageCreateStore } = this.props;
        const { selectedPlan } = packageCreateStore;
        const { input } = fieldRenderProps;
        const classNames: string = classnames({
            ['radio']: true,
            ['active-state']: !disabled && isChecked,
            ['disabled']: disabled,
        });

        return (
            <div className={classNames}>
                <label>
                    <input
                        disabled={disabled}
                        {...input}
                        type="radio"
                        checked={isChecked}
                        name="optionsRadio"
                        value={value}
                        onClick={() => { this.changeSelectedPlan(value); }}
                    /> &nbsp;
                    {t(title)}
                    <p dangerouslySetInnerHTML={{ __html: paragraph }} />
                </label>
            </div>
        );
    }

    changeSelectedPlan(value: TypeEnum): void {
        this.props.packageCreateStore.changeSelectedPlan(value);
    }
}
