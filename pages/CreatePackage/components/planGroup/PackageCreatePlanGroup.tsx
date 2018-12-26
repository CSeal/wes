import * as React from 'react';
import { FormFieldNameTitleComponent } from '../../components/formFields/FormFieldNameTitle.component';
import { FormFieldNameStartWeekComponent } from '../../components/formFields/FormFieldNameStartWeek.component';
import { FormFieldNameNumberWeekComponent } from '../../components/formFields/FormFieldNameNumberWeek.component';
import { FormFieldNameStudentsComponent } from '../formFields/FormFieldNameStudents.component';
import { PackageCreateChoosedStudentsComponent } from '../PackageCreateChoosedStudents.component';
import { FormFieldNameNumberHoursComponent } from '../formFields/FormFieldNameNumberHours.component';

interface PackageCreatePlanGroupProps {
}
interface PackageCreatePlanGroupState {
}

export class PackageCreatePlanGroup extends React.Component<PackageCreatePlanGroupProps, PackageCreatePlanGroupState> {
    render(): React.ReactNode {
        return [
            <div className="row" key="title">
                <FormFieldNameTitleComponent col="col-md-6" />
                <FormFieldNameStartWeekComponent col="col-md-3" />
                <FormFieldNameNumberHoursComponent col="col-md-3" />
            </div>,
            <div className="row" key="students">
                <FormFieldNameStudentsComponent col="col-md-6" />
                <FormFieldNameNumberWeekComponent col="col-md-6" />
            </div>,
            <PackageCreateChoosedStudentsComponent key="choosed" />,
        ];
    }
}
