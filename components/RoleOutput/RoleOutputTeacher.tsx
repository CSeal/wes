import * as React from 'react';
import {GenericProps} from '../../interfaces/GenericProps.interface';
import RoleOutput from '../RoleOutput';

interface RoleOutputTeacherProps extends GenericProps {
}

export default class RoleOutputTeacher extends React.Component<RoleOutputTeacherProps> {
    render() {
        return <RoleOutput {...this.props} roles={['teacher']}>
            {this.props.children}
        </RoleOutput>;
    }
}
