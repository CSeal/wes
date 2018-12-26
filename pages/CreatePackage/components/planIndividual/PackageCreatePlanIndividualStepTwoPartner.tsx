import * as React from 'react';
import { TranslationFunction } from 'react-i18next';
import transl from '../../../../utils/t.decorator';
import { FormFieldNameTeacherComponent } from '../formFields/FormFieldNameTeacher.component';
import { FormFieldNameLessonsDurationComponent } from '../formFields/FormFieldNameLessonsDuration.component';
import { PackageCreateAvailabilityChoiseComponent } from '../PackageCreateAvailabilityChoise.component';
import { FormFieldNameLessonsCountComponent } from '../formFields/FormFieldNameLessonsCount.component';
import { PackageCreatePriceCalcComponent } from '../PackageCreatePriceCalc.component';

interface PackageCreatePlanIndividualStepTwoPartnerProps {
    t?: TranslationFunction;
}

@transl()
export class PackageCreatePlanIndividualStepTwoPartner extends React.Component<PackageCreatePlanIndividualStepTwoPartnerProps> {
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
