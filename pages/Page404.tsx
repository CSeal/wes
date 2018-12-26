import * as React from 'react';
import transl from '../utils/t.decorator';
import { GenericProps } from '../interfaces/GenericProps.interface';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

interface Page404Props extends GenericProps {
}
// tslint:disable:max-line-length

@transl()
@observer
export default class Page404 extends React.Component<Page404Props> {
    render() {
        const { t } = this.props;
        return (
                <div className="modal welcome modal-404 fade" role="dialog" style={{display: 'block', position: 'relative', opacity: 1}}>
                    <div className="modal-dialog" style={{transform: 'none'}}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <img src="/images/404.svg" alt="" style={{display: 'block', margin: '0 auto'}}/>
                                    <strong style={{display: 'block', paddingTop: '25px', paddingBottom: '15px', fontSize: '48px', lineHeight: '54px', color: '#3AD7FF'}}>404</strong>
                                {t('Page Not Found')}
                            </div>
                            <div className="modal-body">
                                <p>{t('Oops, seems like the page you’re looking for doesn’t exist or you missed. Please go back to the Dashboard Page to continue your work with WES.')}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default">
                                    <Link to="/" className="btn btn-primary">{t('back to dashboard')}</Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
         );
    }
}
