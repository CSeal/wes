import * as React from 'react';
import { Link } from 'react-router-dom';
import HeaderLogo from './Header/HeaderLogo';
import HeaderProfile from './Header/HeaderProfile';
import HeaderNotify from './Header/HeaderNotify';
import HeaderMenuBar from './Header/HeaderMenuBar';

import transl from '../../utils/t.decorator';
import { GenericProps } from '../../interfaces/GenericProps.interface';
import HeaderButtonsBar from './Header/HeaderButtonsBar';

export interface HeaderProps extends GenericProps {
    componentHeaderButtonsBar?: React.ReactNode;
    componentHeaderNotify?: React.ReactNode;
    componentHeaderProfile?: React.ReactNode;
    componentHeaderMenuBar?: React.ReactNode;
}

@transl()
export class Header extends React.Component<HeaderProps, any> {
    static defaultProps = {
        componentHeaderButtonsBar: <HeaderButtonsBar />,
        componentHeaderNotify : <HeaderNotify />,
        componentHeaderProfile : <HeaderProfile />,
        componentHeaderMenuBar : <HeaderMenuBar />,
    };

    render() {
        const { t } = this.props;
        return (
            <header id="header">
                <div className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="col-md-5">
                                    <HeaderLogo />
                                </div>
                                <div className="col-md-6">
                                    {this.props.componentHeaderButtonsBar}
                                </div>
                            </div>
                            <div className="col-md-4 .col-md-offset-4">
                                {this.props.componentHeaderNotify}
                                {this.props.componentHeaderProfile}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    {this.props.componentHeaderMenuBar}
                </div>
            </header>
        );
    }
}
