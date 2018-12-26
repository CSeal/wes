import * as React from 'react';
import { GenericProps } from '../../interfaces/GenericProps.interface';
import { observer, inject } from 'mobx-react';
import transl from '../../utils/t.decorator';
import WesCalendarComponent from '../components/WesCalendar.component';
import WesCalendarResheduleRouterComponent from '../components/WesCalendar/WesCalendarResheduleRouter.component';

export interface TeacherScheduleProps extends GenericProps {
}
export interface TeacherScheduleState {
}
@transl()
@inject('userStore')
@observer
export class TeacherSchedulePage extends React.Component<TeacherScheduleProps, TeacherScheduleState> {
    render(): JSX.Element {
        const {t, userStore} = this.props;
        return (
            <div>
                <WesCalendarComponent />
                <WesCalendarResheduleRouterComponent />
            </div>
        );
    }
}
