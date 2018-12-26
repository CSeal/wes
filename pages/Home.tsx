import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router';
import transl from '../utils/t.decorator';
import { GenericProps } from '../interfaces/GenericProps.interface';
import { UserEx } from '../stores/User.store';

export interface HomeProps extends GenericProps {
}

@transl()
@inject('userStore')
@observer
export default class Home extends React.Component<HomeProps> {
    render(): React.ReactNode {
        const { userStore } = this.props;
        const me: UserEx = userStore.me$.current();

        return (
            me
                ? <Redirect to={`/${me.roles.role.toLowerCase()}/`} push={true} />
                : <div />
        );
    }
}
