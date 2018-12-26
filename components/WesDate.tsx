import * as React from 'react';
import Moment, { MomentProps } from 'react-moment';

interface WesDateProps extends MomentProps {
    unix?: boolean;
}

export default class WesDate extends Moment {

    render() {
        return <Moment
            {...this.props}
            unix
            format={this.props.format || 'DD.MM.YYYY'}
        />;
    }
}
