import * as React from 'react';
import { GenericProps } from '../interfaces/GenericProps.interface';

export interface ModalFullLayoutProps extends GenericProps {
}
export default class ModalFullLayout extends React.Component<ModalFullLayoutProps, any> {
    render() {
        return (
            <div className="modal fade" tabIndex={-1} role="dialog" style={{display: 'block', opacity: 1}}>
                    <div className="modal-dialog" style={{transform: 'none'}}>
                        <div className="modal-content">
                            {this.props.children}
                        </div>
                    </div>
            </div>
        );
    }
}
