import * as React from 'react';
import { GenericProps } from '../../interfaces/GenericProps.interface';
import { observer, inject } from 'mobx-react';
import transl from '../../utils/t.decorator';
import { ModelPackage } from '../../services/api';
import LazyLoad from '../../components/LazyLoad';
import WesDate from '../../components/WesDate';
import { ModelPackageExtended } from '../../stores/Package.store';
import { westoast } from '../../utils/westoast';

export interface PackagesListComponentProps extends GenericProps {
    packages: ModelPackageExtended[];
}
export interface PackagesListComponentState {
}

@transl()
@inject('packageStore')
@observer
export default class PackagesListComponent extends React.Component<PackagesListComponentProps, PackagesListComponentState> {

    render(): React.ReactNode {
        const {t} = this.props;
        return (
            <div className="row">
            <div className="col-md-12">
                <header className="heading">
                    <h1>{t('Packages')}</h1>
                    {/* <div className="dropdown">
                        <span className="">{t('Lasted')} <span className="glyphicon glyphicon-menu-down"></span></span>
                        <ul className="dropdown-menu">
                            <li><a href="#">Action</a></li>
                            <li className="active"><a href="#">Active state</a></li>
                            <li><a href="#">Something else here</a></li>
                            <li><a href="#">Separated link</a></li>
                        </ul>
                    </div> */}
                </header>
            </div>
            <div className="col-md-12">
                <div className="block">
                    <LazyLoad $={this.props.packages}>
                        {() => this.renderPackageList(this.props.packages)}
                    </LazyLoad>
                </div>
            </div>
        </div>

        );
    }
    renderPackageList(packages: ModelPackageExtended[]): React.ReactNode {
        const {t} = this.props;

        return (
            <div className="table-responsive no-padding">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>{t('Name')}</th>
                        <th>{t('Start of')} <br />{t('package')}</th>
                        <th>{t('End of')} <br />{t('package')}</th>
                        <th>{t('Type')}</th>
                        <th>{t('Students')}</th>
                        <th>{t('Status')}</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {packages.map((item) => this.renderPackageItem(item))}
                </tbody>
            </table>
        </div>
        );
    }
    renderPackageItem(packageItem: ModelPackageExtended): React.ReactNode {
        const {t, packageStore} = this.props;
        return (
            <tr key={packageItem.id}>
                <td>{packageItem.name}</td>
                <td><WesDate date={packageItem.start} /></td>
                <td><WesDate date={packageItem.ends} /></td>
                <td>{packageItem.type.toString().toLowerCase()}</td>
                <td>{packageItem.students.map((student) => <span key={student.id}>{student.name}<br/></span>)}</td>
                <td><span className="badge active">{t('Active')}</span></td>
                <td>
                    {
                        (packageItem.start <= Date.now() / 1000 - 3600 * 24)
                        ? <span className="badge">started</span>
                        : <a href="#" className="glyphicon glyphicon-remove" onClick={(e) => { e.preventDefault(); this.deletePackage(packageItem); }}></a>
                    }
                </td>
            </tr>
        );
    }

    deletePackage = (packageItem: ModelPackage): void => {
        const {t, packageStore} = this.props;
        const deleteConfirmation = confirm(t('Do you want to delete this package?'));
        if (deleteConfirmation) {
            westoast(
                packageStore.removePackage(packageItem.id),
                {
                    successMessage: t('The package was deleted'),
                    entityName: t('Package'),
                },
            );
        }

    }
}
