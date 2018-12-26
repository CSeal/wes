import * as React from 'react';
import { FormFieldNameTitleComponent } from '../formFields/FormFieldNameTitle.component';
import { FormFieldNameStudentComponent } from '../formFields/FormFieldNameStudent.component';
import { FormFieldNameStartWeekComponent } from '../formFields/FormFieldNameStartWeek.component';
import { FormFieldNameNumberWeekComponent } from '../formFields/FormFieldNameNumberWeek.component';
import { FormFieldNameNumberHoursComponent } from '../formFields/FormFieldNameNumberHours.component';
import { FormFieldNameLessonsDurationComponent } from '../formFields/FormFieldNameLessonsDuration.component';

interface PackageCreatePlanIndividualProps {
}
interface PackageCreatePlanIndividualState {
}

export class PackageCreatePlanIndividual extends React.Component<PackageCreatePlanIndividualProps, PackageCreatePlanIndividualState> {
    render(): React.ReactNode {
        return [
            <div className="row" key="title">
                <FormFieldNameTitleComponent col="col-md-6" />
                <FormFieldNameStartWeekComponent col="col-md-6" />
            </div>,
            <div className="row" key="student">
                <FormFieldNameStudentComponent col="col-md-6" />
                <FormFieldNameNumberWeekComponent col="col-md-3" />
                <FormFieldNameNumberHoursComponent col="col-md-3" />
            </div>,
        ];
    }
}
