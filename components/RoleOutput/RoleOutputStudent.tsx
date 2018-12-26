import * as React from 'react';
import {inject, observer} from 'mobx-react';
import {GenericProps} from '../../interfaces/GenericProps.interface';
import RoleOutput from '../RoleOutput';

interface RoleOutputStudentProps extends GenericProps {
}

export default class RoleOutputStudent extends React.Component<RoleOutputStudentProps> {
    render() {
        return <RoleOutput {...this.props} roles={['student']}>
            {this.props.children}
        </RoleOutput>;
    }
}
