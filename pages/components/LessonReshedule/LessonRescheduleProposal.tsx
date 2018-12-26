import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { RescheduleIconSVG } from '../../../components/ButtonsSVG/RescheduleIcon';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import transl from '../../../utils/t.decorator';
import { LessonExtended } from '../../../stores/Lesson.store';

interface LessonRescheduleProposalProps extends GenericProps {
    lesson: LessonExtended;
}

@transl()
@inject('rescheduleStore')
@inject('packageStore')
@inject('userStore')
@observer
export default class LessonRescheduleProposal extends React.Component<LessonRescheduleProposalProps> {
    render(): React.ReactNode {
        const { lesson, userStore } = this.props;
        const { meRoleLowerCase } = userStore;
        const { id } = lesson;

        return (
            <Link to={`/${meRoleLowerCase}/schedule/reschedule/${id}`} className="hint" onClick={() => { this.selectLesson(lesson); }}>
                <RescheduleIconSVG />
            </Link>
        );
    }

    selectLesson(lesson: LessonExtended): void {
        const { rescheduleStore, packageStore } = this.props;
        const { id } = lesson.teacher;

        packageStore.setUserId(id);
        rescheduleStore.selectLesson(lesson);
    }
}
