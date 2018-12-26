import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import transl from '../../../utils/t.decorator';
import ModalLayout from '../../../layout/modal';

interface WesCalendarReshedulePromptComponentProps extends GenericProps, RouteComponentProps<{id: number}> {
}

@transl()
@inject('rescheduleStore')
@observer
export default class WesCalendarReshedulePromptComponent extends React.Component<WesCalendarReshedulePromptComponentProps> {
    @observable showDialog: boolean = true;

    render(): React.ReactNode {
        const { t, rescheduleStore } = this.props;
        const { lesson } = rescheduleStore;

        if (this.showDialog === false) {
            return <Redirect to="../" />;
        }

        return (
            <ModalLayout show={this.showDialog} onClose={() => this.showDialog = false} title="Have you chatted with your teacher/student about this change?">
                <div className="modal-body">
                    <div className="text-center">
                        <Link to={`${this.props.match.params.id}/one-all`} className="btn btn-default" data-dismiss="modal">{t('YES')}</Link>
                        <Link to={`/chat/`} className="btn btn-primary" data-dismiss="modal">{t('NO, CHAT NOW')}</Link>
                    </div>
                </div>
            </ModalLayout>
        );
    }
}
