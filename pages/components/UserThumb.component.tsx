import * as React from 'react';
import { GenericProps } from '../../interfaces/GenericProps.interface';
import { User } from '../../services/api';

export interface UserThumbComponentProps extends GenericProps {
    user: User;
    width?: string;
    height?: string;
}
export interface UserThumbComponentState {
}

export default class UserThumbComponent extends React.Component<UserThumbComponentProps, UserThumbComponentState> {
    render(): React.ReactNode {
        const { user, width = 37, height = 37 } = this.props;

        return (
            <img
                {...this.props}
                alt={user.name}
                height={height}
                src={process.env.URL_BASE + process.env.AVATAR_PATH + user.photo}
                width={width}
            />
        );
    }
}
