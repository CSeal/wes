import * as React from 'react';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import { observer, inject } from 'mobx-react';
import transl from '../../../utils/t.decorator';
import { Link } from 'react-router-dom';
import { InviteUser } from '../../../services/api';

export interface InvitedUsersListComponentProps extends GenericProps {
}
export interface InvitedUsersListComponentState {
}

@transl()
@inject('userStore')
@observer
export default class InvitedUsersListComponent extends React.Component<InvitedUsersListComponentProps, InvitedUsersListComponentState> {

    item = (el: InviteUser, idx: number): JSX.Element => {
        return (
            <div className="confirmation invited" key={idx}>
                <strong>{el.email}</strong>
                <span className="status">Invited Not yet responded</span>
                <span className="icon">
                    <svg width="15px" height="12px" viewBox="0 0 15 12" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <defs></defs>
                        <g id="Boostrap3-grid-system-layouts" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                            <g id="WES-Invite-Students-3-–-1366px" transform="translate(-814.000000, -497.000000)" stroke="#D2D2D2" strokeWidth="2">
                                <g id="STUDENTS-INVITE" transform="translate(0.000000, -6.000000)">
                                    <g id="INVITE-STUDENTS-3" transform="translate(401.000000, 379.000000)">
                                        <g id="content" transform="translate(132.000000, 59.000000)">
                                            <g id="-g-success" transform="translate(276.000000, 59.000000)">
                                                <polyline id="Shape" points="19 7 11 17 6 12.5555556"></polyline>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                </span>
            </div>
        );
    }

    render(): React.ReactNode {
        const { t, userStore } = this.props;
        return userStore.invitedUsers.map((el, idx) => this.item(el, idx));
    }
}
