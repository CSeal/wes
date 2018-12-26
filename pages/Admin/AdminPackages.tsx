import * as React from 'react';
import { GenericProps } from '../../interfaces/GenericProps.interface';
import { observer, inject } from 'mobx-react';
import transl from '../../utils/t.decorator';
import { Switch, Route } from 'react-router';
import PackagesListComponent from '../components/PackagesList.component';

export interface AdminPackagesProps extends GenericProps {
}
export interface AdminPackagesState {
}
@transl()
@inject('userStore')
@inject('packageStore')
@observer
export class AdminPackagesPage extends React.Component<AdminPackagesProps, AdminPackagesState> {
    render(): JSX.Element {
        const {t} = this.props;
        const packagesList = this.props.packageStore.packagesExtended$.current();
        return (
                <PackagesListComponent packages={packagesList} />
        );
    }
}
