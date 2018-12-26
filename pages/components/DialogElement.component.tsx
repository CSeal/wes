import * as React from 'react';
import { GenericProps } from '../../interfaces/GenericProps.interface';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import ModalLayout from '../../layout/modal';

interface DialogElementComponentProps extends GenericProps {
    Element: React.ComponentClass<any> | React.StatelessComponent<any>;
    title: string;
}

@observer
export default class DialogElementComponent extends React.Component<DialogElementComponentProps> {
    static defaultProps = {
        title: '',
    };
    @observable showDialog: boolean = false;

    switchDialog(showDialog: boolean): void {
        this.showDialog = showDialog;
    }
    render(): React.ReactNode {
        const { Element } = this.props;
        return (
            <span>
                <Element onClick={() => this.showDialog = true} />
                <ModalLayout onClose={() => this.showDialog = false} show={this.showDialog} title={this.props.title}>
                    {this.props.children}
                </ModalLayout>
            </span>);
    }
}
