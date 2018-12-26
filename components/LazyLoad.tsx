import * as React from 'react';
import { inject, observer } from 'mobx-react';

interface LazyLoadProps {
    $: any;
    children: () => React.ReactNode;
    noItems?: React.ReactNode | string | boolean;
}

export default class LazyLoad extends React.Component<LazyLoadProps> {
    static defaultProps = {
        noItems: <div className="no-items text-center">no items</div>,
    };

    noItemsElement(): React.ReactNode {
        return typeof this.props.noItems === 'string'
            ? <div className="no-items text-center">{this.props.noItems}</div>
            : this.props.noItems;
    }
    componentWillMount(): void {
        // this.props.$.current();
    }
    render() {
        if (typeof this.props.children !== 'function') {
            return <span>no lazy</span>;
        }

        return (this.props.$ === undefined)
            ? <div className="text-center"><span className="loader"></span></div>
            : (
                (this.props.noItems !== false && this.props.$ instanceof Array && this.props.$.length === 0)
                ? this.noItemsElement()
                : this.props.children()
            );
    }
}
