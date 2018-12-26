import * as React from 'react';

export interface SelectedUserContentProps {
}
export interface SelectedUserContentState {
}

export class SelectedUserContent extends React.PureComponent<SelectedUserContentProps, SelectedUserContentState> {
    render(): React.ReactNode {
        return (
            <div id="content" className="col-md-9 col-md-offset-3">
                {this.props.children}
            </div>
        );
    }
}
