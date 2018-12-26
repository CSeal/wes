import * as React from 'react';
import {inject, observer} from 'mobx-react';
import {GenericProps} from '../../interfaces/GenericProps.interface';
import RoleOutput from '../RoleOutput';

interface RoleOutputPartnerProps extends GenericProps {
}

export default class RoleOutputPartner extends React.Component<RoleOutputPartnerProps> {
    render() {
        return <RoleOutput {...this.props} roles={['partner']}>
            {this.props.children}
        </RoleOutput>;
    }
}
