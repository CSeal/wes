import * as React from 'react';
import { FormFieldNameTeacherComponent } from '../formFields/FormFieldNameTeacher.component';
import { PackageCreateAvailabilityChoiseComponent } from '../PackageCreateAvailabilityChoise.component';
import { FormFieldNameLessonsCountComponent } from '../formFields/FormFieldNameLessonsCount.component';

interface PackageCreatePlanTrialStepTwoComponentProps {
}

export class PackageCreatePlanTrialStepTwoComponent extends React.Component<PackageCreatePlanTrialStepTwoComponentProps> {
    render(): React.ReactNode {
        return (
            <React.Fragment>
                <div className="row">
                    <FormFieldNameTeacherComponent col="col-md-6" label={true} />
                </div>
                <div>
                    <PackageCreateAvailabilityChoiseComponent />
                    <FormFieldNameLessonsCountComponent />
                </div>
            </React.Fragment>
        );
    }
}
