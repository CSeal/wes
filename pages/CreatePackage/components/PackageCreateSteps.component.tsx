import * as React from 'react';
import { observer, inject } from 'mobx-react';
import * as classnames from 'classnames';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import transl from '../../../utils/t.decorator';

interface PackageCreateStepsComponentProps extends GenericProps {
}
interface PackageCreateStepsComponentState {
}

@transl()
@inject('packageCreateStore')
@observer
export class PackageCreateStepsComponent extends React.Component<PackageCreateStepsComponentProps, PackageCreateStepsComponentState> {
    render(): React.ReactNode {
        const { t, packageCreateStore } = this.props;
        const { packageStepsCounter } = packageCreateStore;
        const activeClassName: string = 'active';

        return (
            <div className="package-steps">
                <ul>
                    <li className={classnames({ [activeClassName]: packageStepsCounter === 0 })}>1. {t('Create a package')}</li>
                    <li className={classnames({ [activeClassName]: packageStepsCounter === 1 })}>2. {t('Choose dates')}</li>
                    <li className={classnames({ [activeClassName]: packageStepsCounter === 2 })}>3. {t('Complete')}</li>
                </ul>
            </div>
        );
    }
}
