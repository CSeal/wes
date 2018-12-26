import * as React from 'react';
import { FormFieldNameTitleComponent } from '../formFields/FormFieldNameTitle.component';
import { FormFieldNameStudentsComponent } from '../formFields/FormFieldNameStudents.component';
import { PackageCreateChoosedStudentsComponent } from '../PackageCreateChoosedStudents.component';
import { FormFieldNameStartWeekComponent } from '../formFields/FormFieldNameStartWeek.component';
import { FormFieldNameNumberHoursComponent } from '../formFields/FormFieldNameNumberHours.component';
import { FormFieldNameNumberWeekComponent } from '../formFields/FormFieldNameNumberWeek.component';
import { PackageCreateStore } from '../../../../stores/PackageCreate.store';
import transl from '../../../../utils/t.decorator';
import { GenericProps } from '../../../../interfaces/GenericProps.interface';
import { inject, observer } from 'mobx-react';
interface PackageCreatePlanTrialProps extends GenericProps {
    packageCreateStore?: PackageCreateStore;
}

@transl()
@inject('packageCreateStore')
@observer
export class PackageCreatePlanTrial extends React.Component<PackageCreatePlanTrialProps> {
    render(): React.ReactNode {
        const { t, packageCreateStore} = this.props;
        if (!packageCreateStore.trialAvailable) {
            return <div className="row text-center" key="title"><p>{t('Your trial packages quota exceeded')}</p></div>;
        }
        return [
            <div className="row" key="title">
                <FormFieldNameTitleComponent col="col-md-6" />
                <FormFieldNameStudentsComponent col="col-md-6" />
            </div>,
            <PackageCreateChoosedStudentsComponent key="choosed" />,
        ];
    }
}
