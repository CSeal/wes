import * as React from 'react';
import {observer, inject} from 'mobx-react';

import { MainRouter } from './MainRouter';
import userStore from '../../stores/User.store';
import { GenericProps } from '../../interfaces/GenericProps.interface';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Page404 from '../../pages/Page404';
import LazyLoad from '../../components/LazyLoad';

interface MainProps extends RouteComponentProps<void>, GenericProps {
}

@inject('userStore')
@observer
class Main extends React.Component<MainProps, any> {
    componentWillMount(): void {
    }
    render() {
        return (
            <section id="main">
                <div className="container-fluid">
                    <LazyLoad $={this.props.userStore.meId}>
                        {() => <MainRouter />}
                    </LazyLoad>
                </div>
            </section>
        );
    }
}

export default withRouter(Main);
