import * as React from 'react';
import transl from '../../../../utils/t.decorator';
import { TranslationFunction } from 'react-i18next';
import { PackageCreateStore } from '../../../../stores/PackageCreate.store';
import { inject, observer } from 'mobx-react';

interface PlanEvaluationStepTreeProps {
    t?: TranslationFunction;
    packageCreateStore?: PackageCreateStore;
}

@transl()
@inject('packageCreateStore')
@observer
export class PackageCreatePlanEvaluationStepTreeComponent extends React.Component<PlanEvaluationStepTreeProps> {
    render(): React.ReactNode {
        const { t } = this.props;
        const {selectedPlan} = this.props.packageCreateStore;

        return (
            <div className="package-form col-md-12">
                <p>{t(`We will notify your employees about a ${selectedPlan.toString().toLowerCase()} package you created`)}.</p>
            </div>
        );
    }
}
