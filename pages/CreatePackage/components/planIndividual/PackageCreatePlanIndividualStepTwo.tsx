import * as React from 'react';
import { TranslationFunction } from 'react-i18next';
import transl from '../../../../utils/t.decorator';
import { FormFieldNameTeacherComponent } from '../formFields/FormFieldNameTeacher.component';
import { FormFieldNameLessonsDurationComponent } from '../formFields/FormFieldNameLessonsDuration.component';
import { PackageCreateAvailabilityChoiseComponent } from '../PackageCreateAvailabilityChoise.component';
import { FormFieldNameLessonsCountComponent } from '../formFields/FormFieldNameLessonsCount.component';
import { PackageCreatePriceCalcComponent } from '../PackageCreatePriceCalc.component';

interface PackageCreatePlanIndividualStepTwoProps {
    t?: TranslationFunction;
}
interface PackageCreatePlanIndividualStepTwoState {
}

@transl()
export class PackageCreatePlanIndividualStepTwo extends React.Component<PackageCreatePlanIndividualStepTwoProps, PackageCreatePlanIndividualStepTwoState> {
    render(): React.ReactNode {
        const { t } = this.props;

        return [
            <div className="row" key="teacher">
                <FormFieldNameTeacherComponent col="col-md-6" label={true} />
            </div>,
            <FormFieldNameLessonsDurationComponent key="lessonDuration" />,
            <div className="row"  key="availability">
                <div className="col-md-12">
                    <label className="text-size9">{t('Choose a scheduled time')}</label>
                </div>
                <PackageCreateAvailabilityChoiseComponent />
                <FormFieldNameLessonsCountComponent />
            </div>,
            // <PackageCreatePriceCalcComponent key="total" />,
        ];
    }
}
