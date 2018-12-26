import {observable, action, runInAction, computed, reaction} from 'mobx';
import { lazyObservable, ILazyObservable } from 'mobx-utils';
import { meApiService, paymentsStripeApiService } from '../services';
import { User, StatisticCountersMonth, Transaction, UsersBalance } from '../services/api';
import UserStore from './User.store';

export interface TransactionBalance extends Transaction {
    balance: UsersBalance[];
}

export interface PaymentState {
    amount: number;
    state: 'START' | 'PROCESSING' | 'SUCCESS' | 'ERROR';
}
export class PaymentsStore {

    @observable paymentState: PaymentState = {
        amount: undefined,
        state: 'START',
    };

    @observable payments$: ILazyObservable<TransactionBalance[]> = lazyObservable((sink) => {
        this.meApi().meTransactionsGet('balance').then((response) => {
            sink(response.data as TransactionBalance[]);
        });
    });
    constructor (
        protected meApi = meApiService,
        protected paymentsStripeApi = paymentsStripeApiService,
    ) {
    }
    @action('payStripe') payStripe(amount: number, stripeToken: string, email: string = 'test@wes-english.com'): void {
        this.paymentState =  {amount : amount / 100, state: 'PROCESSING'};
        this.paymentsStripeApi().paymentsStripePayPost(Math.round(amount * 100), stripeToken, email).then((response) => {
            runInAction(() => this.paymentState =  response.success ? {amount, state: 'SUCCESS'} : {amount, state: 'ERROR'});
            this.payments$.refresh();
            UserStore.me$.refresh();
        });

    }
    @action('paymentDone') paymentDone(): void {
        this.paymentState = {
            amount: undefined,
            state: 'START',
        };
    }
    @action('paymentProcess') paymentProcess(): void {
        this.paymentState = {
            amount: undefined,
            state: 'PROCESSING',
        };
    }
}

const paymentsStore = new PaymentsStore();

export default paymentsStore;
