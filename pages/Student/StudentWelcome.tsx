import * as React from 'react';
import { GenericProps } from '../../interfaces/GenericProps.interface';
import { observer } from 'mobx-react';
import transl from '../../utils/t.decorator';
import { Link } from 'react-router-dom';

export interface StudentWelcomeProps extends GenericProps {
}
export interface StudentWelcomeState {
}
@transl()
@observer
export class StudentWelcomePage extends React.Component<StudentWelcomeProps, StudentWelcomeState> {
    render(): JSX.Element {
        const { t } = this.props;
        return (
            <div className="modal welcome fade" role="dialog" style={{display: 'block', position: 'relative', opacity: 1}}>
                <div className="modal-dialog" style={{transform: 'none'}}>
                    <div className="modal-content">
                        <div className="modal-header">
                            {t('Welcome to the English Learning Platform WES')}
                        </div>
                        <div className="modal-body">
                            <p>{t('Please, take our English grammar level test')}
                            <br />{t('to start learning English with our native speakers.')}</p>
                            <Link to="/student/evaluation">
                                <button type="button" className="btn btn-default">{t('TAKE A TEST')}</button>
                            </Link>
                        </div>
                        <div className="modal-footer" style={{marginTop: '-30px'}}>
                            <img src="/images/bg_01.svg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
