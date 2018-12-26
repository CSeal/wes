import * as React from 'react';
import { GenericProps } from '../../interfaces/GenericProps.interface';
import { observer } from 'mobx-react';
import transl from '../../utils/t.decorator';
import { Link } from 'react-router-dom';

export interface TeacherWelcomeProps extends GenericProps {
}
export interface TeacherWelcomeState {
}
@transl()
@observer
export class TeacherWelcomePage extends React.Component<TeacherWelcomeProps, TeacherWelcomeState> {
    render(): JSX.Element {
        const { t } = this.props;
        return (
            <section id="main">
                <div className="container-fluid">
                    <div className="modal welcome fade" role="dialog" style={{display: 'block', position: 'relative', opacity: 1}}>
                        <div className="modal-dialog" style={{transform: 'none'}}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    {t('Welcome to the English Learning Platform WES')}
                                </div>
                                <div className="modal-body" style={{marginTop: '-25px'}}>
                                    <p>{t('To start working with WES, please, set available dates and time to take lessons.')}</p>
                                </div>
                                <div className="modal-footer" style={{marginTop: '-30px'}}>
                                    <Link to="/profile/availability">
                                        <button type="button" className="btn btn-default">
                                            {t('SET AVAILABILITY HOURS')}
                                        </button>
                                    </Link>
                                    <img src="/images/bg_01.svg" alt="" style={{marginTop: '20px'}} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
