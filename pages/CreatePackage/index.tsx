import * as React from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { GenericProps } from '../../interfaces/GenericProps.interface';
import transl from '../../utils/t.decorator';
import { PackageCreateStepsComponent } from './components/PackageCreateSteps.component';
import { PackageCreateStepOneComponent } from './components/stepper/PackageCreateStepOne.component';
import { PackageCreateStepTwoComponent } from './components/stepper/PackageCreateStepTwo.component';
import { PackageCreateStepThreeComponent } from './components/stepper/PackageCreateStepThree.component';
import { PartnerPackagesPage } from '../Partner/PartnerPackages';
import UserStore from '../../stores/User.store';
import { Switch, Route } from 'react-router';

export interface CreatePackageProps extends GenericProps {
}

@transl()
@inject('packageCreateStore')
@observer
export default class CreatePackage extends React.Component<CreatePackageProps> {
    render(): React.ReactNode {
        const { t, packageCreateStore } = this.props;

        return (
            <React.Fragment>
                <PartnerPackagesPage />
                <div className="modal fade" role="dialog" style={{ display: 'block', opacity: 1 }}>
                    <div className="modal-dialog size-3" style={{ transform: 'none' }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <Link to={`/${UserStore.meRoleLowerCase}/packages`} onClick={() => packageCreateStore.clearCreatePackageStore()}>
                                    <button type="button" className="close" data-dismiss="modal">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </Link>
                                {t('Create a package')}
                            </div>
                            <div className="modal-body">
                                <PackageCreateStepsComponent />
                                <Switch>
                                    <Route exact path="/packages/create" component={PackageCreateStepOneComponent}/>
                                    <Route exact path="/packages/create/:id/schedule" component={PackageCreateStepTwoComponent}/>
                                    <Route exact path="/packages/create/:id/success" component={PackageCreateStepThreeComponent}/>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
