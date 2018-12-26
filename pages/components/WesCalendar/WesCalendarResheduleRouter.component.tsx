import * as React from 'react';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import { Switch, Route } from 'react-router';
import WesCalendarResheduleOneAllComponent from './WesCalendarResheduleOneAll.component';
import WesCalendarResheduleOneComponent from './WesCalendarResheduleOne.component';
import WesCalendarResheduleOneDoneComponent from './WesCalendarResheduleOneDone.component';
import WesCalendarResheduleAllComponent from './WesCalendarResheduleAll.component';
import WesCalendarResheduleAllDoneComponent from './WesCalendarResheduleAllDone.component';
import WesCalendarReshedulePromptComponent from './WesCalendarReshedulePrompt.component';

interface WesCalendarResheduleRouterComponentProps extends GenericProps {
}

export default class WesCalendarResheduleRouterComponent extends React.Component<WesCalendarResheduleRouterComponentProps> {

    render(): React.ReactNode {
        return (
            <Switch>
                <Route exact path="/:role/schedule/reschedule/:id" component={WesCalendarReshedulePromptComponent} />
                <Route exact path="/:role/schedule/reschedule/:id/one-all" component={WesCalendarResheduleOneAllComponent} />
                <Route exact path="/:role/schedule/reschedule/:id/one/" component={WesCalendarResheduleOneComponent} />
                <Route exact path="/:role/schedule/reschedule/:id/one/done" component={WesCalendarResheduleOneDoneComponent} />
                <Route exact path="/:role/schedule/reschedule/:id/all/" component={WesCalendarResheduleAllComponent} />
                <Route exact path="/:role/schedule/reschedule/:id/all/done" component={WesCalendarResheduleAllDoneComponent} />
            </Switch>
        );
    }
}
