import * as React from 'react';
import { GenericProps } from '../../interfaces/GenericProps.interface';
import { observer, inject } from 'mobx-react';
import transl from '../../utils/t.decorator';
import { ModelPackage } from '../../services/api';
import LazyLoad from '../../components/LazyLoad';
import { NotificationToast } from '../../stores/Notification.store';

export interface NotificationToastComponentProps extends GenericProps {
    notification: NotificationToast;
}
export interface NotificationToastComponentState {
}

@transl()
export default class NotificationToastComponent extends React.Component<NotificationToastComponentProps, NotificationToastComponentState> {
    render(): React.ReactNode {
        const {t, notification} = this.props;
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="block">
                        <div className="warning-message">
                            <a href="#" className="btn btn-primary">{t('CONTACT A STUDENT')}</a>
                            <a href="#" className="btn btn-default">{t('ACCEPT')}</a>
                            <p>
                                {/* {notification.content} */}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
