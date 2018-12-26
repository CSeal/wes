import * as React from 'react';
import { GenericProps } from '../../interfaces/GenericProps.interface';
import { observer, inject } from 'mobx-react';
import transl from '../../utils/t.decorator';
import { Link } from 'react-router-dom';

export interface PartnerWelcomeProps extends GenericProps {
}
export interface PartnerWelcomeState {
}
@transl()
@observer
export class PartnerWelcomePage extends React.Component<PartnerWelcomeProps, PartnerWelcomeState> {
  render(): JSX.Element {
    const { t } = this.props;
    return 	(
      <div className="modal PartnerWelcome fade" role="dialog" style={{display: 'block', position: 'relative', opacity: 1}} >
        <div className="modal-dialog" style={{transform: 'none'}}>
          <div className="modal-content">
            <div className="modal-header">
              {t('PartnerWelcome to the English Learning Platform WES')}
            </div>
            <div className="modal-body">
              <p>{t('Invite students, create packages ')}<br />{t('and start working with WES within a few minutes.')}</p>
            </div>
            <div className="modal-footer">
              <Link to="/partner/students/invite" type="button" className="btn btn-default">{t('invite students')}</Link>
            </div>
            <img src="/images/bg_01.svg" alt="" />
          </div>
        </div>
      </div>
  );
  }
}
