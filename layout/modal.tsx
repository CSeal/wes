import * as React from 'react';
import { GenericProps } from '../interfaces/GenericProps.interface';

export interface ModalLayoutProps extends GenericProps {
    show?: boolean;
    title?: string;
    onClose?: () => void;
}
export default class ModalLayout extends React.Component<ModalLayoutProps, any> {
    static defaultProps: Partial<ModalLayoutProps> = {
        title: '',
        show: true,
    };
    render() {
        return (
            <div className="modal fade" tabIndex={-1} role="dialog" style={{display: this.props.show ? 'block' : 'none', opacity: 1}}>
                    <div className="modal-dialog" style={{transform: 'none'}}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <button onClick={() => this.props.onClose()} type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
                                {this.props.title}
                            </div>
                            {this.props.children}
                        </div>
                    </div>
            </div>
        );
    }
}
