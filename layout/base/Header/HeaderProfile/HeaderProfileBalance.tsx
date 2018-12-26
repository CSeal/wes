import * as React from 'react';

import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { GenericProps } from '../../../../interfaces/GenericProps.interface';
import transl from '../../../../utils/t.decorator';
import LazyLoad from '../../../../components/LazyLoad';
import WesDate from '../../../../components/WesDate';
import * as moment from 'moment';
import UserThumbComponent from '../../../../pages/components/UserThumb.component';
import { UserEx } from '../../../../stores/User.store';

interface HeaderProfileBalanceProps extends GenericProps {
}

@transl()
@inject('userStore')
@observer
export default class HeaderProfileBalance extends React.Component<HeaderProfileBalanceProps> {
  render(): React.ReactNode {
    const { t, userStore } = this.props;
    const me: UserEx = userStore.me$.current();

    switch (userStore.meRole) {
      case 'PARTNER':
        return <div>
              <strong>{t('Account balance')}: <span>{`${me.balance.toFixed(2)}`}</span></strong>
              <em>{t('Till')} <WesDate date={moment().endOf('month').unix()} /></em>
          </div>;
      case 'TEACHER':
        return <div>
              <strong>{moment().format('MMMM')} {t('earnings')}: <span>{`${me.balance.toFixed(2)}`}</span></strong>
              <em>{t('Till')} <WesDate date={moment().endOf('month').unix()} /></em>
          </div>;

      default:
        return [];
    }
  }
}
