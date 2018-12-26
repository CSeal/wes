import * as React from 'react';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import transl from '../../../utils/t.decorator';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
import DialogElementComponent from '../../components/DialogElement.component';
import { UserRole } from '../../../interfaces/UserRole.interface';
import InviteUserComponent from '../../components/InviteUser.component';

interface WesCalendarSyncButtonComponentProps extends GenericProps {
    buttonText?: string;
}

@transl()
@inject('userStore')
@observer
export default class WesCalendarSyncButtonComponent extends React.Component<WesCalendarSyncButtonComponentProps> {
    static defaultProps = {
        buttonText: '+',
    };
    @observable showDialog: boolean = true;
    dialogRef: DialogElementComponent;

    syncUrl(): string {
        const { userStore } = this.props;
        const md5 = require('md5');

        return  process.env.URL_API
                + `/users/${userStore.meId}/lessons/ics?secret=`
                + md5(userStore.me$.current().email);
    }

    render(): React.ReactNode {
        const { t } = this.props;
        const Button = (props: {}) =>
            <button {...props} type="button" className="btn btn-primary" >{this.props.buttonText}</button>;

        return (
            <DialogElementComponent
                ref={(ref) => this.dialogRef = ref}
                Element={Button}
                title={t(`Sync Lessons Dates with Google Calendar`)}
            >
                <div className="modal-body">
                    <div className="text-center">
                        <p>{t('Go to Google Calendar and in the left column find Other Calendars.')}</p>
                        <p>{t('Select Add by URL and enter in the field above.')}</p>
                        <br />
                        <div className="form-group">
                            <input type="text" value={this.syncUrl()} readOnly={true} className="form-control"/>
                        </div>
                        <br />
                        <img src="/images/sync_calendar.png"  alt="how to sync" />
                        <br />
                        <br />

                        <button
                            children={t('Done')}
                            style={{ textAlign: 'center', float: 'none' }}
                            type="button"
                            className="btn btn-default"
                            data-dismiss="modal"
                            onClick={() => this.dialogRef.switchDialog(false)}
                        />
                    </div>
                </div>
            </DialogElementComponent>);
    }
}
