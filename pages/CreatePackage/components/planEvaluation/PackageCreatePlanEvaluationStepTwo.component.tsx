import * as React from 'react';
import { PackageCreateAvailabilityChoiseComponent } from '../PackageCreateAvailabilityChoise.component';
import { FormFieldNameTeacherComponent } from '../formFields/FormFieldNameTeacher.component';
import transl from '../../../../utils/t.decorator';
import { GenericProps } from '../../../../interfaces/GenericProps.interface';
import { FormFieldNameLessonsCountComponent } from '../formFields/FormFieldNameLessonsCount.component';

interface PlanEvaluationStepTwoProps extends GenericProps {
}
interface PlanEvaluationStepTwoState {
}

@transl()
export class PackageCreatePlanEvaluationStepTwoComponent extends React.Component<PlanEvaluationStepTwoProps, PlanEvaluationStepTwoState> {
    render(): React.ReactNode {
        const { t } = this.props;

        return (
            <div className="package-form col-md-12">
                <div className="row">
                    <FormFieldNameTeacherComponent col="col-md-6" />
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <label className="text-size9">{t('Choose a scheduled time')}</label>
                    </div>
                    <PackageCreateAvailabilityChoiseComponent />
                    <FormFieldNameLessonsCountComponent />
                </div>
            </div>
        );
    }
}
