import * as React from 'react';
import Home from '../../pages/Home';

import { Route, Switch } from 'react-router-dom';
import Profile from '../../pages/Profile/Profile';
import ProfileComplete from '../../pages/ProfileComplete';
import CreatePackage from '../../pages/CreatePackage';
import Page404 from '../../pages/Page404';
import { AdminPage } from '../../pages/Admin';
import { StudentPage } from '../../pages/Student';
import TeacherDetailsComponent from '../../pages/Profile/components/TeacherProfile/TeacherDetails.component';
import TeacherAvailabilityComponent from '../../pages/Profile/components/TeacherProfile/TeacherAvailability.component';
import { PartnerPage } from '../../pages/Partner';
import { TeacherPage } from '../../pages/Teacher';
import { NotificationPage } from '../../pages/Notifications';
import { ChatPage } from '../../pages/Chat';
import { InvoicePage } from '../../pages/Invoice';

export interface MainRouterProps {
}

export function MainRouter (props: MainRouterProps) {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home}/>

          <Route path="/admin/*" component={AdminPage}/>
          <Route path="/student/*" component={StudentPage}/>
          <Route path="/partner/*" component={PartnerPage}/>
          <Route path="/teacher/*" component={TeacherPage}/>
          <Route path="/notifications/*" component={NotificationPage}/>
          <Route path="/chat/*" component={ChatPage}/>

          <Route exact path="/profile" component={Profile}/>
          <Route exact path="/profile/*" component={Profile}/>

          <Route path="/packages/create" component={CreatePackage}/>

          <Route exact path="/page404"  component={Page404} />
          <Route component={Page404} />
        </Switch>
      </div>
    );
}
