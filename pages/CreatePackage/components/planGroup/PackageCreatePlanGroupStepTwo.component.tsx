import * as React from 'react';
import { FormFieldNameTeacherComponent } from '../formFields/FormFieldNameTeacher.component';
import { FormFieldNameLessonsDurationComponent } from '../formFields/FormFieldNameLessonsDuration.component';
import { PackageCreateAvailabilityChoiseComponent } from '../PackageCreateAvailabilityChoise.component';
import { PackageCreatePriceCalcComponent } from '../PackageCreatePriceCalc.component';
import { FormFieldNameLessonsCountComponent } from '../formFields/FormFieldNameLessonsCount.component';
import { GenericProps } from '../../../../interfaces/GenericProps.interface';
import transl from '../../../../utils/t.decorator';
import { PackageCreateFirstLessonCalcComponent } from '../PackageCreateFirstLessonCalc.component';

interface PlanGroupStepTwoProps extends GenericProps {
}
interface PlanGroupStepTwoState {
}

@transl()
export class PackageCreatePlanGroupStepTwoComponent extends React.Component<PlanGroupStepTwoProps, PlanGroupStepTwoState> {
    render(): React.ReactNode {
        const { t } = this.props;

        return [
            <div className="row" key="teacher">
                <FormFieldNameTeacherComponent col="col-md-6" label={true} />
            </div>,
            <div className="row"  key="duration">
                <div className="col-md-8">
                    <FormFieldNameLessonsDurationComponent key="lessonDuration" />
                </div>
                <div className="col-md-4">
                    <PackageCreateFirstLessonCalcComponent key="firstLesson" />
                </div>
            </div>,
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
