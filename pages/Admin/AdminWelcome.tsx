import * as React from 'react';
import { GenericProps } from '../../interfaces/GenericProps.interface';
import transl from '../../utils/t.decorator';
import { Link } from 'react-router-dom';

export interface AdminWelcomeProps extends GenericProps {
}
export interface AdminWelcomeState {
}
@transl()
export class AdminWelcomePage extends React.Component<AdminWelcomeProps, AdminWelcomeState> {
    render(): JSX.Element {
        const { t } = this.props;
        return 	(
            <section id="main">
                <div className="container-fluid">
                            <div className="modal welcome fade" role="dialog" style={{display: 'block', position: 'relative', opacity: 1}}>
                                <div className="modal-dialog" style={{transform: 'none'}}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    {t('Welcome to the English Learning Platform WES')}
                                </div>
                                <div className="modal-body">
                                    <p>{t('Manage users, control payments ')}<br />{t('and start working with WES within a few minutes.')}</p>
                                </div>
                                <div className="modal-footer">
                                    <Link to="/admin/profiles" type="button" className="btn btn-default">{t('users profiles')}</Link>
                                </div>
                                <img src="/images/bg_01.svg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
