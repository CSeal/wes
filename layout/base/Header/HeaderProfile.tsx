import * as React from 'react';

import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import transl from '../../../utils/t.decorator';
import LazyLoad from '../../../components/LazyLoad';
import WesDate from '../../../components/WesDate';
import * as moment from 'moment';
import UserThumbComponent from '../../../pages/components/UserThumb.component';
import { UserEx } from '../../../stores/User.store';
import HeaderProfileBalance from './HeaderProfile/HeaderProfileBalance';

interface HeaderProfileProps extends GenericProps {
}

@transl()
@inject('userStore')
@observer
export default class HeaderProfile extends React.Component<HeaderProfileProps> {
  render(): React.ReactNode {
    const { t, userStore } = this.props;
    const me: UserEx = userStore.me$.current();

    return (
      <LazyLoad $={me}>
        {() => (
          <div className="profile">
            <Link to="/profile">
              <span className="icon"><UserThumbComponent user={me} /></span>
              <span>{me === undefined ? '...' : me.name}</span>
              <span className="glyphicon glyphicon-menu-down" />
            </Link>
            <ul className="profile-dropdown">
                <li className="static">
                  <HeaderProfileBalance />
                </li>
              <li><Link to="/profile">{t('Profile Settings')}</Link></li>
              <li><Link to="/auth/logout">{t('Log Out')}</Link></li>
            </ul>
          </div>
        )}
      </LazyLoad>
    );
  }
}
