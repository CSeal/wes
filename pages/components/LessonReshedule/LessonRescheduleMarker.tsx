import * as React from 'react';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import transl from '../../../utils/t.decorator';
import { inject, observer } from 'mobx-react';
import { LessonExtended } from '../../../stores/Lesson.store';
import LessonRescheduleAccepter from './LessonRescheduleAccepter';
import LessonRescheduleProposal from './LessonRescheduleProposal';

interface LessonRescheduleMarkerComponentProps extends GenericProps {
    lesson: LessonExtended;
}

@transl()
@inject('rescheduleStore')
@inject('packageStore')
@observer
export default class LessonRescheduleMarker extends React.Component<LessonRescheduleMarkerComponentProps> {
    render(): React.ReactNode {
        const { lesson } = this.props;
        const { state } = lesson;

        switch (true) {
            case state === 'refused': {
                return <div />;
            }
            case state === 'finished': {
                return <div />;
            }
            case state === 'schedule': {
                return <LessonRescheduleProposal lesson={lesson} />;
            }
            case state === 'reschedule': {
                return <LessonRescheduleAccepter lesson={lesson} />;
            }
        }
    }
}
