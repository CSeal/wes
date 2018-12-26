import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';
import transl from '../../../../utils/t.decorator';
import { GenericProps } from '../../../../interfaces/GenericProps.interface';
import InviteUserButtonComponent from '../../../../pages/Admin/components/InviteUserButton.component';

// tslint:disable:max-line-length
@transl()
export default class HeaderButtonsBarPartner extends React.Component<GenericProps, any> {
    render() {
        const { t } = this.props;
        return (
            <div>
                <Link to="/packages/create" className="btn btn-primary">{t('Create a package')}</Link>
                {/* <Link to="/partner/students/invite" className="btn btn-primary white">{}</Link> */}
                <InviteUserButtonComponent userType="STUDENT" buttonText={t('Invite a student')}/>
            </div>
        );
    }
}
