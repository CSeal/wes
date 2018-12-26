
import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import { GenericProps } from '../../../../interfaces/GenericProps.interface';
import { inject, observer } from 'mobx-react';
import { Form, FormRenderProps } from 'react-final-form';
import { CreatePackageWizardFormStep2, PackageCreateStore } from '../../../../stores/PackageCreate.store';
import { NewPackage, NewLessonsForPackageAvailability } from '../../../../services/api';
import Validator = require('validatorjs');
import { westoast } from '../../../../utils/westoast';
import { TranslationFunction } from 'react-i18next';
import transl from '../../../../utils/t.decorator';
import { PackageCreatePlanEvaluationStepTwoComponent } from '../planEvaluation/PackageCreatePlanEvaluationStepTwo.component';
import { PackageCreatePlanGroupStepTwoComponent } from '../planGroup/PackageCreatePlanGroupStepTwo.component';
import { PackageCreatePlanTrialStepTwoComponent } from '../planTrial/PackageCreatePlanTrialStepTwo.component';
import { PackageCreatePlanIndividualStepTwo } from '../planIndividual/PackageCreatePlanIndividualStepTwo';
import { PackageCreatePlanIndividualStepTwoPartner } from '../planIndividual/PackageCreatePlanIndividualStepTwoPartner';
import { PackageCreatePlanEvaluationStepTwoPartnerComponent } from '../planEvaluation/PackageCreatePlanEvaluationStepTwoPartner.component';
import { Link } from 'react-router-dom';
import LazyLoad from '../../../../components/LazyLoad';

interface PackageCreateStepTwoComponentProps extends GenericProps, RouteComponentProps<{id: number}> {
    t?: TranslationFunction;
    packageCreateStore?: PackageCreateStore;
  }
@transl()
@inject('packageCreateStore')
@inject('userStore')
@observer
export class PackageCreateStepTwoComponent extends React.Component<PackageCreateStepTwoComponentProps> {
    componentWillMount() {
        this.props.packageCreateStore.loadPackage(this.props.match.params.id);
        this.props.packageCreateStore.setPackageStepsCounter(1);
    }
    render(): React.ReactNode {
        const { t, packageCreateStore } = this.props;

        if (packageCreateStore.packageStepsCounter === 2) {
            return <Redirect to={`/packages/create/${packageCreateStore.id}/success`} />;
        }
        return (
            <LazyLoad $={packageCreateStore.id}>
            {
            () => <div className="package-form col-md-12">
                <Form
                    onSubmit={this.handleSubmit}
                    // initialValues={formInitialValues}
                    validate={this.validate}
                    render={({ handleSubmit, values, reset, pristine, invalid }: FormRenderProps) => {
                        return (
                        <form onSubmit={handleSubmit}>
                            <fieldset>
                                {this.componentFactory(this.props.packageCreateStore.selectedPlan)}
                                {this.buttonFactory(this.props.packageCreateStore.selectedPlan, invalid)}

                            </fieldset>
                        </form>
                        );
                    }}
                />
            </div>
            }
            </LazyLoad>
        );
    }

    componentFactory(selectedPlan: NewPackage.TypeEnum): React.ReactNode {
        const { EVALUATION, GROUP, TRIAL, INDIVIDUAL } = NewPackage.TypeEnum;
        const { userStore } = this.props;

        switch (selectedPlan) {
            case (EVALUATION): {
                return userStore.isRole('PARTNER') ? <PackageCreatePlanEvaluationStepTwoPartnerComponent /> : <PackageCreatePlanEvaluationStepTwoComponent />;
            }
            case (GROUP): {
                return <PackageCreatePlanGroupStepTwoComponent />;
            }
            case (TRIAL): {
                return <PackageCreatePlanTrialStepTwoComponent />;
            }
            case (INDIVIDUAL): {
                return  userStore.isRole('PARTNER') ? <PackageCreatePlanIndividualStepTwoPartner /> : <PackageCreatePlanIndividualStepTwo />;
            }
            default: {
                return <div />;
            }
        }
    }

    buttonFactory(selectedPlan: NewPackage.TypeEnum, disabled: boolean): React.ReactNode {
        const { EVALUATION, GROUP, TRIAL, INDIVIDUAL } = NewPackage.TypeEnum;
        const { t, userStore, packageCreateStore } = this.props;
        const nextFormButton =
            <div className="text-center" style={{ marginBottom: '10px' }}>
                <button disabled={disabled} type="submit" className="btn btn-default" data-dismiss="modal">
                    {t('NEXT')}
                </button>
            </div>;
        const nextLink =
            <div className="text-center" style={{ marginBottom: '10px' }}>
                <Link to={`/packages/create/${packageCreateStore.id}/success`} className="btn btn-default" data-dismiss="modal">
                    {t('NEXT')}
                </Link>
            </div>;
        switch (selectedPlan) {
            case (EVALUATION): {
                return userStore.isRole('PARTNER') ? nextLink : nextFormButton;
            }
            case (GROUP): {
                return nextFormButton;
            }
            case (TRIAL): {
                return nextFormButton;
            }
            case (INDIVIDUAL): {
                return  userStore.isRole('PARTNER') ? nextLink : nextFormButton;
            }
            default: {
                return <div />;
            }
        }
    }

    validate = (values: CreatePackageWizardFormStep2): Validator.ValidationErrors => {
        const { packageStepsCounter, selectedPlan, selectedStudentsId, needToChooseLessonsCount } = this.props.packageCreateStore;
        const { EVALUATION, GROUP, INDIVIDUAL, TRIAL } = NewPackage.TypeEnum;

        switch (selectedPlan) {
            case EVALUATION:
            case GROUP:
            case INDIVIDUAL:
            case TRIAL: {
                const step1: Validator.Validator<CreatePackageWizardFormStep2> = new Validator(values, {
                    teacher: 'required',
                });
                step1.check();
                return step1.errors.all();
            }
            default:
                return {};
        }
    }

    handleSubmit = (data: CreatePackageWizardFormStep2): void => {
        const { packageCreateStore, t } = this.props;
        const { name, isLastPageInStepper, selectedStudents, startWeek, numberHours, numberWeeks, lessonsDuration, userId } = packageCreateStore;

        const time: string[] = this.props.packageCreateStore.selectedTime;
        const intervals: NewLessonsForPackageAvailability[] = [];
        const SECONDS_IN_HOUR: number = 3600;
        const MINUTES_IN_HOUR: number = 60;

        time.forEach((el) => {
            const [ hours, minutes, dayOfWeek ] = el.split(':');
            const lessonsDurationInSeconds: number = lessonsDuration * SECONDS_IN_HOUR;
            const hoursInSeconds: number = Number.parseInt(hours) * SECONDS_IN_HOUR;
            const minutesInSeconds: number = Number.parseInt(minutes) * MINUTES_IN_HOUR;
            const start: number = hoursInSeconds + minutesInSeconds;
            const end: number = start + lessonsDurationInSeconds;
            const lastInterval: NewLessonsForPackageAvailability = intervals[intervals.length - 1];

            if (!lastInterval || lastInterval.day_of_week !== dayOfWeek) {
                intervals.push({ start, end, day_of_week: dayOfWeek });
            } else if (lastInterval && lastInterval.day_of_week === dayOfWeek && lastInterval.end === start) {
                lastInterval.end = end;
            }
        });

        westoast(
            this.props.packageCreateStore.schedulePackage(intervals),
            {entityName: t('Package schedule')},
        );
    };
}
