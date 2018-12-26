import * as React from 'react';
import {GenericProps} from '../../interfaces/GenericProps.interface';
import RoleOutput from '../RoleOutput';

interface RoleOutputAdminProps extends GenericProps {
}

export default class RoleOutputAdmin extends React.Component<RoleOutputAdminProps> {
    render() {
        return <RoleOutput {...this.props} roles={['admin']}>
            {this.props.children}
        </RoleOutput>;
    }
}
