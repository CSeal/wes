import * as React from 'react';
import { TranslationFunction } from 'react-i18next';
import transl from '../../../../utils/t.decorator';
import { FormFieldNameTeacherComponent } from '../formFields/FormFieldNameTeacher.component';
import { PackageCreateAvailabilityChoiseComponent } from '../PackageCreateAvailabilityChoise.component';

interface PackageCreatePlanTrialStepTreeComponentProps {
    t?: TranslationFunction;
}
interface PackageCreatePlanTrialStepTreeComponentState {
}

@transl()
export class PackageCreatePlanTrialStepTreeComponent extends React.Component<PackageCreatePlanTrialStepTreeComponentProps, PackageCreatePlanTrialStepTreeComponentState> {
    render(): React.ReactNode {
        const { t } = this.props;

        return (
            <div className="package-form col-md-12">
                <p>{t('We will notify your employees about a trial package you created')}.</p>
            </div>
        );
    }
}
