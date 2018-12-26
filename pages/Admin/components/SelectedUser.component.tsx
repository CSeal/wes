import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import transl from '../../../utils/t.decorator';
import { UserProfile } from '../../../stores/Profiles.store';
import { SelectedUserContent } from './SelectedUserContent.component';
import PartnerDetailsComponent from './PartnerDetails.component';
import StudentDetailsComponent from '../../Partner/components/StudentDetails.component';
import TeacherDetailsComponent from './TeacherDetails.component';
import AdminDetailsComponent from './AdminDetails.component';

export interface SelectedUserProps extends GenericProps {
}
export interface SelectedUserState {
}

@transl()
@inject('userStore')
@inject('profilesStore')
@observer
export class SelectedUser extends React.Component<SelectedUserProps, SelectedUserState> {

    render(): React.ReactNode {
        const { profilesStore } = this.props;
        const { currentRole } = profilesStore;

        switch (currentRole) {
            case 'PARTNER': {
                return (
                    <SelectedUserContent>
                        <PartnerDetailsComponent />
                    </SelectedUserContent>
                );
            }

            case 'STUDENT': {
                return (
                    <SelectedUserContent>
                        <StudentDetailsComponent />
                    </SelectedUserContent>
                );
            }

            case 'TEACHER': {
                return (
                    <SelectedUserContent>
                        <TeacherDetailsComponent />
                    </SelectedUserContent>
                );
            }

            case 'ADMIN': {
                return (
                    <SelectedUserContent>
                        <AdminDetailsComponent />
                    </SelectedUserContent>
                );
            }

            default: {
                return (
                    <div />
                );
            }
        }
    }
}
