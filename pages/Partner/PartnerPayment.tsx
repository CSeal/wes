import * as React from 'react';
import { GenericProps } from '../../interfaces/GenericProps.interface';
import { observer, inject } from 'mobx-react';
import transl from '../../utils/t.decorator';
import { Switch, Route } from 'react-router';
import { PaymentsStore, PaymentState } from '../../stores/Payments.store';
import LazyLoad from '../../components/LazyLoad';
import Moment from 'react-moment';
import WesDate from '../../components/WesDate';
import { Link } from 'react-router-dom';
import ModalLayout from '../../layout/modal';
import PartnerPaymentDialogComponent from './components/PartnerPaymentDialog.component';
import { PartnerPaymentSuccessComponent } from './components/PartnerPaymentSuccess.component';

export interface PartnerPaymentProps extends GenericProps {
    paymentsStore?: PaymentsStore;
}
export interface PartnerPaymentState {
    displayPaymentDialog: boolean;
}
@transl()
@inject('paymentsStore')
@inject('userStore')
@observer
export class PartnerPaymentPage extends React.Component<PartnerPaymentProps, PartnerPaymentState> {
    constructor(props: PartnerPaymentProps) {
        super(props);
        this.state = { displayPaymentDialog: false };
    }
    render(): React.ReactNode {
        const {t, paymentsStore, userStore} = this.props;
        return (
            <div>
                <div className="col-md-12">
                    <h1>{t('Payment')}</h1>
                </div>
                <div className="col-md-8">
                    <h2>{t('Recent Payments')}</h2>
                    <div className="block">
                        <LazyLoad $={paymentsStore.payments$.current()}>
                        { () =>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>{t('Date')}</th>
                                    <th>{t('Amount, USD')}</th>
                                    <th>{t('Balance, USD')}</th>
                                    <th>{t('Receipt')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paymentsStore.payments$.current().map((transaction) => (
                                        <tr key={transaction.id}>
                                            <td><Moment date={transaction.created_at} format="DD MMM YYYY" /></td>
                                            <td>{transaction.total}</td>
                                            <td>{transaction.balance[0].balance}</td>
                                            <td>
                                                {
                                                    transaction.type === 'partner_monthly_pay'
                                                    ?
                                                    [
                                                        <Link key={`invoice-` + transaction.id} to={'/simple/invoice/' + transaction.id} target="_blank">{t('Receipt')} #{transaction.id}</Link>,
                                                        <Link key={`act-` + transaction.id} to={'/simple/invoice/' + transaction.id + '/act'} target="_blank">  #{transaction.id}-A</Link>,
                                                    ]                                                    :
                                                    ''
                                                }
                                            </td>
                                        </tr>
                                    ),
                                )}
                            </tbody>
                        </table>
                        }
                        </LazyLoad>
                        <LazyLoad $={userStore.me$.current()}>
                        {() => (
                        (userStore.me$.current().balance < 0) &&
                        <div>
                            <h3>{t('Pending Payment')} {userStore.me$.current().balance} USD</h3>
                            <div className="text-center">
                                <button
                                    onClick={() => this.setState({displayPaymentDialog: true})}
                                    className="btn btn-primary"
                                >
                                    {t('PAY WITH CARD')}
                                </button>
                            </div>
                        </div>
                        )}
                        </LazyLoad>
                    </div>
                </div>
                <LazyLoad $={userStore.me$.current()}>
                {() =>
                <ModalLayout
                    show={this.state.displayPaymentDialog}
                    title={t('Payment by ') + userStore.me$.current().name}
                    onClose={() => this.setState({displayPaymentDialog: false})}
                >
                    {this.renderDialog(paymentsStore.paymentState)}
                </ModalLayout>
                }
                </LazyLoad>
            </div>
        );
    }

    renderDialog(paymentState: PaymentState): React.ReactNode {
        const {t, paymentsStore, userStore} = this.props;

        switch (paymentState.state) {
            case 'PROCESSING':
                return <div className="text-center loader">Processing payment {paymentsStore.paymentState.amount} USD</div>;
            case 'SUCCESS':
                return <PartnerPaymentSuccessComponent />;
            default:
                return <PartnerPaymentDialogComponent
                        payer={userStore.me$.current().name}
                        amount={userStore.me$.current().balance * -1}
                        email={userStore.me$.current().email}
                />;
        }
    }
}
