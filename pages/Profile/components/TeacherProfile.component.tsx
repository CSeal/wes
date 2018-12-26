import * as React from 'react';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import transl from '../../../utils/t.decorator';
import { NavLink, Switch, Route } from 'react-router-dom';
import ProfileComplete from '../../ProfileComplete';
import TeacherProfileMainComponent from './TeacherProfile/TeacherMain.component';
import TeacherProfileDetailsComponent from './TeacherProfile/TeacherDetails.component';
import TeacherProfileAvailabilityComponent from './TeacherProfile/TeacherAvailability.component';

interface TeacherProfileProps extends GenericProps {
}
interface TeacherProfileState {
}

@transl()
export default class TeacherProfileComponent extends React.Component<TeacherProfileProps, TeacherProfileState> {
    constructor(props: TeacherProfileProps) {
        super(props);
    }
    render() {
        const { t } = this.props;
        return (
            <div className="row">
                <div className="aside no-bg">
                    <header className="heading">
                        <h1>{t('Profile')}</h1>
                    </header>
                    <ul className="profile-menu">
                        <li><NavLink activeStyle={{color: '#606060', fontWeight: 500}} exact to="/profile">{t('Personal Information')}</NavLink></li>
                        <li><NavLink activeStyle={{color: '#606060', fontWeight: 500}} exact to="/profile/details">{t('Contract Details')}</NavLink></li>
                        <li><NavLink activeStyle={{color: '#606060', fontWeight: 500}} exact to="/profile/availability">{t('Availability')}</NavLink></li>
                    </ul>
                </div>
                <Switch>
                    <Route exact path="/profile" component={TeacherProfileMainComponent}/>
                    <Route exact path="/profile/details" component={TeacherProfileDetailsComponent}/>
                    <Route exact path="/profile/availability" component={TeacherProfileAvailabilityComponent}/>
                </Switch>
            </div>
        );
    }
}
