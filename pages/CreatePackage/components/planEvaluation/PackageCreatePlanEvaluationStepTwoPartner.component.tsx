import * as React from 'react';
import { PackageCreateAvailabilityChoiseComponent } from '../PackageCreateAvailabilityChoise.component';
import { FormFieldNameTeacherComponent } from '../formFields/FormFieldNameTeacher.component';
import transl from '../../../../utils/t.decorator';
import { GenericProps } from '../../../../interfaces/GenericProps.interface';
import { FormFieldNameLessonsCountComponent } from '../formFields/FormFieldNameLessonsCount.component';

interface PackageCreatePlanEvaluationStepTwoPartnerComponentProps extends GenericProps {
}

@transl()
export class PackageCreatePlanEvaluationStepTwoPartnerComponent extends React.Component<PackageCreatePlanEvaluationStepTwoPartnerComponentProps> {
    render(): React.ReactNode {
        const { t } = this.props;

        return (
            <div className="package-form col-md-12">
                <p>
                    {t('We will send a notification to your students, so they could')}
                    <br />
                    {t('choose the most suitable date and time to hold a lesson')}.
                </p>
            </div>
        );
    }
}
