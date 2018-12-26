import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import transl from '../../../utils/t.decorator';

interface PackageCreatePriceCalcComponentProps extends GenericProps {
}
interface PackageCreatePriceCalcComponentState {
}

@transl()
@inject('packageCreateStore')
@observer
export class PackageCreatePriceCalcComponent extends React.Component<PackageCreatePriceCalcComponentProps, PackageCreatePriceCalcComponentState> {
    render(): React.ReactNode {
        const { t, packageCreateStore, packageStore } = this.props;
        const { totalPackagePriceCalc } = packageCreateStore;

        return (
            <div className="row">
                <div className="form-group text-center">
                    <strong className="total">{t('Total')}: <span>${totalPackagePriceCalc}.-</span></strong>
                </div>
            </div>
        );
    }
}
