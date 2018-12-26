import * as React from 'react';
import { FormFieldNameTitleComponent } from '../../components/formFields/FormFieldNameTitle.component';
import { FormFieldNameStudentComponent } from '../../components/formFields/FormFieldNameStudent.component';
import { FormFieldNameStartWeekComponent } from '../formFields/FormFieldNameStartWeek.component';
import { FormFieldNameNumberHoursComponent } from '../formFields/FormFieldNameNumberHours.component';
import { FormFieldNameNumberWeekComponent } from '../formFields/FormFieldNameNumberWeek.component';

interface PackageCreatePlanEvaluationProps {
}
interface PackageCreatePlanEvaluationState {
}

export class PackageCreatePlanEvaluation extends React.Component<PackageCreatePlanEvaluationProps, PackageCreatePlanEvaluationState> {
    render(): React.ReactNode {
        return [
            <div className="row" key="title">
                <FormFieldNameTitleComponent col="col-md-6" />
                <FormFieldNameStartWeekComponent col="col-md-3" />
                {/* <FormFieldNameNumberHoursComponent col="col-md-3" /> */}
            </div>,
            <div className="row" key="students">
                <FormFieldNameStudentComponent col="col-md-6" />
                {/* <FormFieldNameNumberWeekComponent col="col-md-6" /> */}
            </div>,
        ];
    }
}
