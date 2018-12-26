import * as React from 'react';
import { GenericProps } from '../interfaces/GenericProps.interface';
import { observer, inject } from 'mobx-react';
import { Redirect, RouteComponentProps } from 'react-router';
import transl from '../utils/t.decorator';
import { westoast } from '../utils/westoast';
import { toast } from 'react-toastify';
import { observable, runInAction } from 'mobx';

export interface InitUserProps extends GenericProps, RouteComponentProps<{}> {
}
@transl()
@inject('authStore')
@observer
class InitUser extends React.Component<InitUserProps> {
    @observable initCheckPass: boolean;
    componentWillMount() {
        const { location, authStore, t } = this.props;
        const code = location.search.replace('?code=', '');
        if (location.search) {
            authStore.initUser(code).then((res) => {
                runInAction(() => this.initCheckPass = true);
            }).catch((err) => {
                toast(t('Wrong invite code ') + code, {type: 'error'});
                setTimeout(() => runInAction(() => this.initCheckPass = false), 4000);
            });
        }
    }
    componentWillUpdate() {
        // console.log(this.props.authStore.isAuthorized);
    }
    render(): React.ReactNode {
        const { t, authStore } = this.props;

        if (authStore.isAuthorized === undefined) {
            return <div>{t('Loading...')}</div>;
        }
        if (authStore.isAuthorized === true) {
            return <Redirect to="/plain/profile/complete" />;
        }
        if (this.initCheckPass === false) {
            return <Redirect to="/auth/login" />;
        }
        return <div>{t('Initializing...')}</div>;
    }
}

export default InitUser;
