import * as React from 'react';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import * as Validator from 'validatorjs';
import * as classNames from 'classnames';
import transl from '../../../utils/t.decorator';
import ModalLayout from '../../../layout/modal';
import { UserProfile } from '../../../stores/Profiles.store';
import { inject, observer } from 'mobx-react';

export interface DeleteConfirmProps extends GenericProps {
    user: UserProfile;
    deleteProfile: (user: UserProfile) => void;
    cancel: () => void;
}
interface DeleteConfirmState {
}
@transl()
@inject('profilesStore')
@observer
export default class DeleteConfirm extends React.Component<DeleteConfirmProps, DeleteConfirmState> {
    render() {
        const { t, user, profilesStore } = this.props;
        return (
            <ModalLayout onClose={() => this.props.cancel()}>
                    <div className="modal-body">
                        <div className="text-center">
                            {t('Are you sure you want to delete')} <br />{t(profilesStore.currentRole.toLowerCase())} <strong>{user.name}</strong>?
                            <br /><br /><br />
                            <fieldset>
                                <div className="form-action">
                                    <button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => this.props.cancel()}>{t('NO')}</button>
                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => this.props.deleteProfile(user)}>{t('YES, DELETE')}</button>
                                </div>
                            </fieldset>
                        </div>
                    </div>
            </ModalLayout>
        );
    }
}
