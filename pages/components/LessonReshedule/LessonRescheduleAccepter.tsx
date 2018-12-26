import * as React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { RescheduleIconRedLabelSVG } from '../../../components/ButtonsSVG/RescheduleIconRedLabel';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import transl from '../../../utils/t.decorator';
import { LessonExtended } from '../../../stores/Lesson.store';
import ModalLayout from '../../../layout/modal';
import WesDate from '../../../components/WesDate';

interface LessonRescheduleAccepterProps extends GenericProps {
    lesson: LessonExtended;
}

@transl()
@inject('rescheduleStore')
@inject('packageStore')
@observer
export default class LessonRescheduleAccepter extends React.Component<LessonRescheduleAccepterProps> {
    @observable showDialog: boolean = false;

    render(): React.ReactNode {
        const { lesson, t } = this.props;

        return (
            <React.Fragment>
                <a href="#" className="hint" onClick={(e) => { e.preventDefault(); this.showDialog = true; }}>
                    <RescheduleIconRedLabelSVG />
                </a>
                <ModalLayout onClose={() => this.showDialog = false} show={this.showDialog} title={t('Request for Rescedule')}>
                    <div className="modal-body">
                        <p>
                            {t('Rescedule lesson to')} <span>{<WesDate date={lesson.date} />}</span>? <br />
                            {t('Please, accept a request or contact a teacher in chat')}.
                        </p>
                        <div className="text-center">
                            <button type="button" className="btn btn-warning" data-dismiss="modal">{t('ACCEPT')}</button>
                            <Link to="/chat/" className="btn btn-primary">{t('CONTACT A TEACHER')}</Link>
                        </div>
                    </div>
                </ModalLayout>
            </React.Fragment>
        );
    }
}
