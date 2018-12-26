import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import transl from '../../../utils/t.decorator';
import ModalLayout from '../../../layout/modal';

interface WesCalendarResheduleOneAllComponentProps extends GenericProps, RouteComponentProps<{id: number}> {
}

@transl()
@inject('rescheduleStore')
@observer
export default class WesCalendarResheduleOneAllComponent extends React.Component<WesCalendarResheduleOneAllComponentProps> {
    @observable showDialog: boolean = true;

    render(): React.ReactNode {
        const { t, rescheduleStore } = this.props;
        const { lesson } = rescheduleStore;

        if (this.showDialog === false) {
            return <Redirect to="../../../" />;
        }

        return (
            <ModalLayout show={this.showDialog} onClose={() => this.showDialog = false} title="Do you want to reschedule only one lesson or all of them?">
                <div className="modal-body">
                    <div className="text-center">
                        <Link to={`./one/`} className="btn btn-default" data-dismiss="modal">{t('ONLY ONE')}</Link>
                        <Link to={`../${lesson.package_id}/all/`} className="btn btn-primary" data-dismiss="modal">{t('ALL LESSONS')}</Link>
                    </div>
                </div>
            </ModalLayout>
        );
    }
}
