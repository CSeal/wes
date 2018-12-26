import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { GenericProps } from '../interfaces/GenericProps.interface';
import { UserEx } from '../stores/User.store';

type UserRole = 'admin' | 'partner' | 'student' | 'teacher';

interface RoleOutputProps extends GenericProps {
    roles: UserRole[];
}

@inject('userStore')
@observer
export default class RoleOutput extends React.Component<RoleOutputProps> {
    render(): React.ReactNode {
        const { roles, userStore } = this.props;
        const me: UserEx = userStore.me$.current(); // {roles: {role: 'student'}};

        return (
            me
                ? ((roles as string[]).includes(me.roles.role.toLowerCase()) ? this.props.children : <div />)
                : <div />
        );
    }
}
