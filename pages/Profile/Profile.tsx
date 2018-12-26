import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { GenericProps } from '../../interfaces/GenericProps.interface';
import TeacherProfileComponent from './components/TeacherProfile.component';
import PartnerProfileComponent from './components/PartnerProfile.component';
import RoleOutputAdmin from '../../components/RoleOutput/RoleOutputAdmin';
import RoleOutputPartner from '../../components/RoleOutput/RoleOutputPartner';
import RoleOutputTeacher from '../../components/RoleOutput/RoleOutputTeacher';
import RoleOutputStudent from '../../components/RoleOutput/RoleOutputStudent';
import AdminProfileComponent from './components/AdminProfile.component';
import StudentProfileComponent from './components/StudentProfile.component';

interface ProfileProps extends GenericProps {
}
@inject('userStore')
@observer
export default class Profile extends React.Component<ProfileProps> {
    render() {
        return <div>
            <RoleOutputAdmin>
                <AdminProfileComponent/>
            </RoleOutputAdmin>
            <RoleOutputTeacher>
                <TeacherProfileComponent/>
            </RoleOutputTeacher>
            <RoleOutputPartner>
                <PartnerProfileComponent/>
            </RoleOutputPartner>
            <RoleOutputStudent>
                <StudentProfileComponent/>
            </RoleOutputStudent>
        </div>;
    }
}
