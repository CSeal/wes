import * as React from 'react';
import { GenericProps } from '../../interfaces/GenericProps.interface';
import { observer, inject } from 'mobx-react';
import transl from '../../utils/t.decorator';
import DeleteUser from '../components/DeleteUser/DeleteUser.component';
import StudentDetailsComponent from './components/StudentDetails.component';
import ProfilesListComponent from '../components/ProfilesList.component';
import { UserProfile } from '../../stores/Profiles.store';
import {UsersExtended} from '../../services/api';
import moment = require('moment');
import StudentsComponent from '../components/Students.component';
import { Link } from 'react-router-dom';

export interface PartnerStudentsProps extends GenericProps {
}
export interface PartnerStudentsState {
}
@transl()
@inject('profilesStore')
@observer
export class PartnerStudentsPage extends React.Component<PartnerStudentsProps, PartnerStudentsState> {

  render(): JSX.Element {
    const { t, profilesStore } = this.props;
    return (
          <div className="row">
            <div className="aside">
              <h2>
                {t('My Students')} &amp; {t('Groups')}
              </h2>
              <ProfilesListComponent users={profilesStore.relatedUsers$.current()} />
            </div>
            <div id="content" className="col-md-9 col-md-offset-3">
                { profilesStore.currentProfile &&
                <StudentDetailsComponent
                  actions={
                    () =>
                      <ul className="action" style={{marginTop: '30px'}}>
                        <li>
                        <Link to={`/partner/students/statistic/${profilesStore.currentProfile.id}`} className="btn btn-default">
                            {t('view full statistics')}
                          </Link>
                        </li>
                        <li>
                          <DeleteUser user={profilesStore.currentProfile}>
                            <a className="btn btn-default">{t('delete a student')}</a>
                          </DeleteUser>
                        </li>
                      </ul>
                    }
                />
                }
            </div>
          </div>
    );
  }
}
