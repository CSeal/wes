import * as React from 'react';
import { NewPackage } from '../../../../services/api';
import { inject, observer } from 'mobx-react';
import { PackageCreateStore } from '../../../../stores/PackageCreate.store';
import { PackageCreatePlanEvaluationStepTreeComponent } from '../planEvaluation/PackageCreatePlanEvaluationStepTree.component';
import { PackageCreatePlanGroupStepTreeComponent } from '../planGroup/PackageCreatePlanGroupStepTree.component';
import { PackageCreatePlanTrialStepTreeComponent } from '../planTrial/PackageCreatePlanTrialStepTree.component';
import { PackageCreatePlanIndividualStepTree } from '../planIndividual/PackageCreatePlanIndividualStepTree';
import { TranslationFunction } from 'react-i18next';
import transl from '../../../../utils/t.decorator';
import { Link } from 'react-router-dom';
import { UserStore } from '../../../../stores/User.store';

interface PackageCreateStepThreeComponentProps {
    packageCreateStore?: PackageCreateStore;
    userStore?: UserStore;
    t?: TranslationFunction;
}

@transl()
@inject('packageCreateStore')
@inject('userStore')
@observer
export class PackageCreateStepThreeComponent extends React.Component<PackageCreateStepThreeComponentProps> {
    componentWillMount() {
        this.props.packageCreateStore.setPackageStepsCounter(2);
    }
    render(): React.ReactNode {
        const { t, userStore, packageCreateStore } = this.props;

        return (
            <div className="package-form col-md-12">
                {this.componentFactory(this.props.packageCreateStore.selectedPlan)}
                <div className="text-center" style={{ marginBottom: '10px' }}>
                    <Link to={`/${userStore.meRoleLowerCase}/packages`} className="btn btn-default" data-dismiss="modal">
                        {t('COMPLETE')}
                    </Link>
                </div>
            </div>
        );
    }

    componentFactory(selectedPlan: NewPackage.TypeEnum): React.ReactNode {
        const { EVALUATION, GROUP, TRIAL, INDIVIDUAL } = NewPackage.TypeEnum;

        switch (selectedPlan) {
            case (EVALUATION): {
                return <PackageCreatePlanEvaluationStepTreeComponent />;
            }
            case (GROUP): {
                return <PackageCreatePlanGroupStepTreeComponent />;
            }
            case (TRIAL): {
                return <PackageCreatePlanTrialStepTreeComponent />;
            }
            case (INDIVIDUAL): {
                return <PackageCreatePlanIndividualStepTree />;
            }
            default: {
                return <div />;
            }
        }
    }
}
