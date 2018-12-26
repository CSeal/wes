import * as React from 'react';
import { Link } from 'react-router-dom';
import HeaderMenuBarTeacher from './HeaderMenuBar/HeaderMenuBarTeacher';
import RoleOutputTeacher from '../../../components/RoleOutput/RoleOutputTeacher';
import RoleOutputAdmin from '../../../components/RoleOutput/RoleOutputAdmin';
import RoleOutputPartner from '../../../components/RoleOutput/RoleOutputPartner';
import RoleOutputStudent from '../../../components/RoleOutput/RoleOutputStudent';
import HeaderMenuBarAdmin from './HeaderMenuBar/HeaderMenuBarAdmin';
import HeaderMenuBarPartner from './HeaderMenuBar/HeaderMenuBarPartner';
import HeaderMenuBarStudent from './HeaderMenuBar/HeaderMenuBarStudent';

// tslint:disable:max-line-length

export default class HeaderMenuBar extends React.Component<{}, any> {
    render() {
        return (
            <div>
            <RoleOutputAdmin>
                <HeaderMenuBarAdmin/>
            </RoleOutputAdmin>
            <RoleOutputTeacher>
                <HeaderMenuBarTeacher/>
            </RoleOutputTeacher>
            <RoleOutputPartner>
                <HeaderMenuBarPartner/>
            </RoleOutputPartner>
            <RoleOutputStudent>
                <HeaderMenuBarStudent/>
            </RoleOutputStudent>
            </div>
        );
    }
}
