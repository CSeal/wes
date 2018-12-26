import * as React from 'react';
import { Link } from 'react-router-dom';
import RoleOutputTeacher from '../../../components/RoleOutput/RoleOutputTeacher';
import RoleOutputAdmin from '../../../components/RoleOutput/RoleOutputAdmin';
import RoleOutputPartner from '../../../components/RoleOutput/RoleOutputPartner';
import RoleOutputStudent from '../../../components/RoleOutput/RoleOutputStudent';
import HeaderButtonsBarPartner from './HeaderButtonsBar/HeaderMenuBarPartner';

// tslint:disable:max-line-length

export default class HeaderButtonsBar extends React.Component<{}, any> {
    render() {
        return (
            <div>
            <RoleOutputPartner>
                <HeaderButtonsBarPartner/>
            </RoleOutputPartner>
            </div>
        );
    }
}
