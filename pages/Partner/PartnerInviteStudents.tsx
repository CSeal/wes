import * as React from 'react';
import { GenericProps } from '../../interfaces/GenericProps.interface';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router';
import transl from '../../utils/t.decorator';
import ModalLayout from '../../layout/modal';
import { Link } from 'react-router-dom';

/* form validation */
import { Form, Field, FormRenderProps } from 'react-final-form';
import * as Validator from 'validatorjs';
import * as classNames from 'classnames';
import { PartnerStudentsPage } from './PartnerStudents';
import ModalFullLayout from '../../layout/modalfull';
import InviteUserComponent from '../components/InviteUser.component';
import { observable } from 'mobx';
export interface StudentsInviteProps extends GenericProps {
}

@transl()
@inject('userStore')
@observer
export class PartnerInviteStudents extends React.Component<StudentsInviteProps> {
  @observable showDialog: boolean = true;

  render(): JSX.Element {
    const { t, userStore } = this.props;
    return (
      <div>
        <PartnerStudentsPage />
        <ModalLayout show={this.showDialog} onClose={() => this.showDialog = false} title={t('Invite students')}>
            <InviteUserComponent userType="STUDENT" />
        </ModalLayout>
      </div>
    );
  }
}
