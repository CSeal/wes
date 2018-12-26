import * as React from 'react';
import { GenericProps } from '../../interfaces/GenericProps.interface';
import { observer, inject } from 'mobx-react';
import transl from '../../utils/t.decorator';
import { Switch, Route } from 'react-router';

export interface AdminDiscountsProps extends GenericProps {
}
export interface AdminDiscountsState {
}
@transl()
@inject('userStore')
@observer
export class AdminDiscountsPage extends React.Component<AdminDiscountsProps, AdminDiscountsState> {
    render(): JSX.Element {
        const {t, userStore} = this.props;
        return (
            <div>AdminDiscountsPage</div>
        );
    }
}
