import * as React from 'react';
import { TranslationFunction } from 'react-i18next';
import transl from '../../../../utils/t.decorator';

interface PackageCreatePlanIndividualStepTreeProps {
    t?: TranslationFunction;
}
interface PackageCreatePlanIndividualStepTreeState {
}

@transl()
export class PackageCreatePlanIndividualStepTree extends React.Component<PackageCreatePlanIndividualStepTreeProps, PackageCreatePlanIndividualStepTreeState> {
    render(): React.ReactNode {
        const { t } = this.props;

        return (
            <div className="package-form col-md-12">
                <p>
                    {t('After your student confirm a package, you’ll receive')}
                    <br />
                    {t('an invoice on your email with following instructions')}.
                </p>
            </div>
        );
    }
}
