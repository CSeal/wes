import * as React from 'react';
import { TranslationFunction } from 'react-i18next';
import transl from '../../../../utils/t.decorator';
import { PackageCreateSelectPlanComponent } from '../PackageCreateSelectPlan.component';
import { Form, FormRenderProps } from 'react-final-form';
import { PackageCreateStore, CreatePackageWizardFormStep1 } from '../../../../stores/PackageCreate.store';
import { inject, observer } from 'mobx-react';
import { NewPackage, NewPackageWithLessons } from '../../../../services/api';
import NewPackageType = NewPackage.TypeEnum;

import Validator = require('validatorjs');
import moment = require('moment');
import { westoast } from '../../../../utils/westoast';
import { Redirect } from 'react-router';
import { PackageCreatePlanEvaluation } from '../planEvaluation/PackageCreatePlanEvaluation';
import { PackageCreatePlanGroup } from '../planGroup/PackageCreatePlanGroup';
import { PackageCreatePlanTrial } from '../planTrial/PackageCreatePlanTrial';
import { PackageCreatePlanIndividual } from '../planIndividual/PackageCreatePlanIndividual';
import userStore, { UserStore } from '../../../../stores/User.store';

interface PackageCreateStepOneComponentProps {
  t?: TranslationFunction;
  packageCreateStore: PackageCreateStore;
  userStore: UserStore;
}
@transl()
@inject('packageCreateStore')
@inject('userStore')
@observer
export class PackageCreateStepOneComponent extends React.Component<PackageCreateStepOneComponentProps> {
  componentWillMount() {
    this.props.packageCreateStore.clearCreatePackageStore();
  }
  render(): React.ReactNode {
    const { t, packageCreateStore } = this.props;
    const { selectedPlan, numberWeeks, numberHours, id } = packageCreateStore;
    const formInitialValues = {
      plan: selectedPlan,
      title: t(`My ${selectedPlan} Package`),
      startWeek: '',
      numberWeeks,
      numberHours,
    };
    if (packageCreateStore.id !== undefined && packageCreateStore.packageStepsCounter === 1) {
      return <Redirect to={`/packages/create/${packageCreateStore.id}/schedule`} />;
    }
    return (
      <div className="package-form col-md-12">
        <legend>{t('Select a Plan')}</legend>
        <Form
          onSubmit={this.handleSubmit}
          initialValues={formInitialValues}
          validate={this.validate}
          render={({ handleSubmit, values, reset, pristine, invalid }: FormRenderProps) => {
            return (
              <form onSubmit={handleSubmit}>
                <fieldset>
                  <PackageCreateSelectPlanComponent />
                  {this.componentFactory(this.props.packageCreateStore.selectedPlan)}
                  <div className="text-center" style={{ marginBottom: '10px' }}>
                    <button disabled={invalid} type="submit" className="btn btn-default" data-dismiss="modal">
                      {t('NEXT')}
                    </button>
                  </div>
                </fieldset>
              </form>
            );
          }}
        />
      </div>
    );
  }

  componentFactory(selectedPlan: NewPackage.TypeEnum): React.ReactNode {
    const { EVALUATION, GROUP, TRIAL, INDIVIDUAL } = NewPackage.TypeEnum;

    switch (selectedPlan) {
        case (EVALUATION): {
            return <PackageCreatePlanEvaluation />;
        }
        case (GROUP): {
            return <PackageCreatePlanGroup />;
        }
        case (TRIAL): {
            return <PackageCreatePlanTrial />;
        }
        case (INDIVIDUAL): {
            return <PackageCreatePlanIndividual />;
        }
        default: {
            return <div />;
        }
    }
  }

  validate = (values: CreatePackageWizardFormStep1): Validator.ValidationErrors => {
    const { packageStepsCounter, selectedPlan, selectedStudentsId, needToChooseLessonsCount } = this.props.packageCreateStore;
    const { EVALUATION, GROUP, INDIVIDUAL, TRIAL } = NewPackageType;

    switch (selectedPlan) {
      case GROUP: {
        const step1: Validator.Validator<CreatePackageWizardFormStep1> = new Validator(values, {
          plan: 'required',
          title: 'required',
          startWeek: 'required|string|date',
          students: 'required|array|between:2,6',
          numberWeeks: 'required|numeric|min:1|max:30',
          numberHours: 'required|numeric|min:1|max:20',
        });
        step1.check();
        return step1.errors.all();
      }

      case EVALUATION: {
        const step1: Validator.Validator<CreatePackageWizardFormStep1> = new Validator(values, {
          plan: 'required',
          title: 'required',
          startWeek: 'required|string|date',
          student: 'required',
          numberWeeks: 'required|numeric|min:1|max:30',
          numberHours: 'required|numeric|min:1|max:20',
        });
        step1.check();
        return step1.errors.all();
      }

      case INDIVIDUAL: {
        const step1: Validator.Validator<CreatePackageWizardFormStep1> = new Validator(values, {
          plan: 'required',
          title: 'required',
          startWeek: 'required|string|date',
          student: 'required',
          numberWeeks: 'required|numeric|min:1|max:30',
          numberHours: 'required|numeric|min:1|max:20',
        });
        step1.check();
        return step1.errors.all();
      }

      case TRIAL: {
        const step1: Validator.Validator<CreatePackageWizardFormStep1> = new Validator(values, {
          plan: 'required',
          title: 'required',
          students: 'required|array|between:1,6',
        });
        step1.check();
        return step1.errors.all();
      }

      default:
        return {};
    }
  };

  handleSubmit = (data: CreatePackageWizardFormStep1): void => {
    const { packageCreateStore, t } = this.props;
    const { name, selectedStudents, startWeek, numberHours, numberWeeks, userId } = packageCreateStore;
    const { plan } = data;

    const newPackage: NewPackage = {
        name: name || data.title,
        start: moment(startWeek).unix(),
        ends: moment(startWeek).add(numberWeeks + 2, 'week').unix(),
        number_of_weeks: numberWeeks,
        number_of_hours: numberHours,
        type: plan,
        user_id: this.props.userStore.meId,
        students: selectedStudents,
    };

    westoast(this.props.packageCreateStore.createPackage(newPackage), {entityName: t('Package')});
  };
}
