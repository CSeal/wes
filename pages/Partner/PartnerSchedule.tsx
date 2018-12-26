import * as React from 'react';
import { GenericProps } from '../../interfaces/GenericProps.interface';
import { observer, inject } from 'mobx-react';
import transl from '../../utils/t.decorator';
import { Switch, Route } from 'react-router';
import WesCalendarComponent from '../components/WesCalendar.component';
import WesCalendarResheduleOneAllComponent from '../components/WesCalendar/WesCalendarResheduleOneAll.component';
import WesCalendarResheduleRouterComponent from '../components/WesCalendar/WesCalendarResheduleRouter.component';

export interface PartnerScheduleProps extends GenericProps {
}
export interface PartnerScheduleState {
}
@transl()
@inject('userStore')
@observer
export class PartnerSchedulePage extends React.Component<PartnerScheduleProps, PartnerScheduleState> {
    render(): React.ReactNode {
        const {t, userStore} = this.props;
        return (
            <div>
            <WesCalendarComponent />
            <WesCalendarResheduleRouterComponent />
            </div>
        );
    }
}
