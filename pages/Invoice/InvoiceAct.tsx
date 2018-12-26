import * as React from 'react';
import { GenericProps } from '../../interfaces/GenericProps.interface';
import { observer, inject } from 'mobx-react';
import transl from '../../utils/t.decorator';
import { Switch, Route, RouteComponentProps } from 'react-router';
import LazyLoad from '../../components/LazyLoad';
import Moment from 'react-moment';
import WesDate from '../../components/WesDate';
import { observable, computed, reaction } from 'mobx';
import { TransactionBalance } from '../../stores/Payments.store';
import { ILazyObservable, lazyObservable } from 'mobx-utils';
import { meApiService, userApiService, transactionApiService } from '../../services';
import UserStore from '../../stores/User.store';
import { UsersBalance, Transaction, User } from '../../services/api';
import { InvoiceComponent } from './components/Invoice.component';
import { InvoiceActComponent } from './components/InvoiceAct.component';

export interface TransactionExtended extends Transaction {
    balance: UsersBalanceExtended[];
    user: User;
}
interface UsersBalanceExtended extends UsersBalance {
    user: User;
}
export class InvoiceStore {

    @computed get transactionId(): number {
        return this.id;
    }
    set transactionId(value: number) {
        this.id = value;
        this.transaction$.refresh();
    }

    @observable transaction$: ILazyObservable<TransactionExtended> = lazyObservable((sink) => {
        if (this.id === undefined) {
            return;
        }
        this.transactionApi().transactionsIdGet(this.id, 'balance,user,balance.user').then((response) => {
            sink(response.data as TransactionExtended);
        });
    });

    private id: number;

    constructor (
        protected transactionApi = transactionApiService,
    ) {
    }
}
const invoiceStore = new InvoiceStore();

export interface InvoiceActProps extends GenericProps, RouteComponentProps<{id: number}> {
    invoiceStore: InvoiceStore;
}

// tslint:disable-next-line:max-classes-per-file
@transl()
@inject('userStore')
@observer
export class InvoiceActPage extends React.Component<InvoiceActProps> {
    static defaultProps = {
        invoiceStore,
    };

    componentWillMount() {
        this.props.invoiceStore.transactionId = this.props.match.params.id;
    }

    render(): React.ReactNode {
        const { t } = this.props;
        const transaction = this.props.invoiceStore.transaction$.current();

        return (
            <LazyLoad $={transaction}>
                {() => <InvoiceActComponent transaction={transaction} />}
            </LazyLoad>
        );
    }
}
