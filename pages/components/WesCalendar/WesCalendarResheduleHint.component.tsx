import * as React from 'react';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import transl from '../../../utils/t.decorator';
import { inject, observer } from 'mobx-react';
import { LessonExtended } from '../../../stores/Lesson.store';
import { observable } from 'mobx';
import { Link } from 'react-router-dom';
import { Lesson } from '../../../services/api';

interface WesCalendarResheduleHintComponentProps extends GenericProps {
    lesson: LessonExtended;
}

@transl()
@inject('rescheduleStore')
@inject('packageStore')
@observer
export default class WesCalendarResheduleHintComponent extends React.Component<WesCalendarResheduleHintComponentProps> {
    selectLesson(): void {
        const { rescheduleStore, packageStore } = this.props;
        packageStore.setUserId(this.props.lesson.teacher.id);
        rescheduleStore.selectLesson(this.props.lesson);
    }

    render(): React.ReactNode {
        return (
            <Link to={`reschedule/${this.props.lesson.id}`} className="hint" onClick={() => this.selectLesson()}>
                <svg width="26px" height="25px" viewBox="0 0 26 25" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                    <defs></defs>
                    <g id="Boostrap3-grid-system-layouts" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g id="WES-Calendar-–-1366px" transform="translate(-751.000000, -659.000000)">
                            <g id="body" transform="translate(-39.000000, -1.000000)">
                                <g id="calendar" transform="translate(146.000000, 275.000000)">
                                    <g id="group-lessons" transform="translate(77.000000, 157.000000)">
                                        <g id="2" transform="translate(459.000000, 219.000000)">
                                            <g id="group-lesson-1-copy-3">
                                                <g id="reschedule-icon" transform="translate(108.000000, 11.000000)">
                                                    <rect id="Rectangle-16" stroke="#293EAD" x="0.5" y="3.5" width="20" height="19" rx="4"></rect>
                                                    <g id="bell" transform="translate(7.000000, 9.000000)" fill="#293EAD" fillRule="nonzero">
                                                        <path d="M6.80222603,6.41228588 C6.08754281,5.5916519 5.69349315,4.5300256 5.69349315,3.41484544 C5.69349315,2.36739516 5.02525685,1.48218153 4.11429795,1.20023627 C4.19071062,1.07737744 4.23565925,0.932467021 4.23565925,0.7749557 C4.23565925,0.34810002 3.90453767,0 3.49850171,0 C3.09246575,0 2.76134418,0.34810002 2.76134418,0.7749557 C2.76134418,0.932467021 2.80629281,1.07737744 2.88270548,1.20023627 C1.97624144,1.48060642 1.30950342,2.35794448 1.30351027,3.39909431 C1.30351027,3.40381965 1.30351027,3.40854499 1.30351027,3.41327033 C1.30351027,4.52687537 0.910958904,5.58535145 0.194777397,6.41071077 C0.0854023973,6.42016145 0,6.51466824 0,6.63122662 C0,6.75408545 0.0943921233,6.85331758 0.211258562,6.85331758 L2.21596747,6.85331758 C2.31785103,7.50226423 2.85273973,8 3.5,8 C4.14576199,8 4.68214897,7.50226423 4.78403253,6.85331758 L6.78874144,6.85331758 C6.90560788,6.85331758 7,6.75408545 7,6.63122662 C6.99850171,6.51624335 6.91160103,6.42016145 6.80222603,6.41228588 Z M3.49850171,0.444181926 C3.67230308,0.444181926 3.81314212,0.592242567 3.81314212,0.7749557 C3.81314212,0.957668832 3.67230308,1.10572947 3.49850171,1.10572947 C3.32470034,1.10572947 3.1838613,0.957668832 3.1838613,0.7749557 C3.1838613,0.592242567 3.32470034,0.444181926 3.49850171,0.444181926 Z M3.49850171,7.55739319 C3.0864726,7.55739319 2.74036815,7.25812168 2.64597603,6.8548927 L4.3510274,6.8548927 C4.25663527,7.25812168 3.91053082,7.55739319 3.49850171,7.55739319 Z M0.749143836,6.41071077 C1.37842466,5.56014964 1.72153253,4.5189998 1.72452911,3.42902146 C1.72452911,3.42429612 1.72452911,3.41957078 1.72452911,3.41484544 C1.72452911,2.38787163 2.52011986,1.55148651 3.49700342,1.55148651 C4.47388699,1.55148651 5.26947774,2.38787163 5.26947774,3.41484544 C5.26947774,4.50954912 5.61258562,5.55699941 6.24486301,6.41071077 L0.749143836,6.41071077 Z" id="Shape"></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            </Link>
        );
    }
}
