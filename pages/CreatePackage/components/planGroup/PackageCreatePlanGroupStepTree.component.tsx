import * as React from 'react';
import { TranslationFunction } from 'react-i18next';
import transl from '../../../../utils/t.decorator';

interface PlanGroupStepTreeProps {
    t?: TranslationFunction;
}
interface PlanGroupStepTreeState {
}

@transl()
export class PackageCreatePlanGroupStepTreeComponent extends React.Component<PlanGroupStepTreeProps, PlanGroupStepTreeState> {
    render(): React.ReactNode {
        const { t } = this.props;

        return (
            <div className="package-form col-md-12">
                <p>{t('Get an an invoice on your email with following instructions')}.</p>
            </div>
        );
    }
}
