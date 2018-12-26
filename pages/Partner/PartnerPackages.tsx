import * as React from 'react';
import { GenericProps } from '../../interfaces/GenericProps.interface';
import { observer, inject } from 'mobx-react';
import transl from '../../utils/t.decorator';
import { Switch, Route } from 'react-router';
import { ModelPackage } from '../../services/api';
import PackagesListComponent from '../components/PackagesList.component';

export interface PartnerPackagesProps extends GenericProps {
}
export interface PartnerPackagesState {
}
@transl()
@inject('userStore')
@inject('packageStore')
@observer
export class PartnerPackagesPage extends React.Component<PartnerPackagesProps, PartnerPackagesState> {

    componentWillMount() {
        this.props.packageStore.packagesExtended$.refresh();
    }
    render(): JSX.Element {
        const {t} = this.props;
        const packagesList = this.props.packageStore.packagesExtended$.current();
        return (
                <PackagesListComponent packages={packagesList} />
        );
    }
}
