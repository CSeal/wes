import * as React from 'react';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import { observer, inject } from 'mobx-react';
import transl from '../../../utils/t.decorator';
import { Link } from 'react-router-dom';
import { InviteUser } from '../../../services/api';
import { ReactStripeElements, CardElement, CardNumberElement, CardCVCElement, CardExpiryElement, injectStripe } from 'react-stripe-elements';
import { PaymentsStore } from '../../../stores/Payments.store';

// declare var Stripe: (key: string) => ReactStripeElements.StripeProps;

export interface PartnerPaymentFormComponentProps extends GenericProps, ReactStripeElements.InjectedStripeProps {
    amount?: number;
    email?: string;
    payer?: string;
    paymentsStore?: PaymentsStore;
}
export interface PartnerPaymentFormComponentState {
}

@transl()
@inject('userStore')
@inject('paymentsStore')
@observer
class PartnerPaymentFormComponent extends React.Component<PartnerPaymentFormComponentProps, PartnerPaymentFormComponentState> {
    static defaultProps: Partial<PartnerPaymentFormComponentProps> = {
        amount: 0,
        email: '',
        payer: '',
    };

    handleSubmit = (ev: any) => {
        ev.preventDefault();
        this.props.paymentsStore.paymentProcess();
        this.props.stripe.createToken({name: this.props.payer}).then(({token}) => {
          this.props.paymentsStore.payStripe(this.props.amount, token.id, this.props.userStore.me$.current().email);
        });
      }
    render(): React.ReactNode {
        const { t, userStore } = this.props;
        return (
                <div className="modal-body">
                    <form onSubmit={this.handleSubmit}>
                        <fieldset>
                            {/* <div className="form-group col-md-12">
                                <label>E-mail</label>
                                <input className="form-control" type="email" placeholder="mail@yandex.ru" />
                            </div> */}
                            <div className="form-group col-md-6">
                                <label>{t('Card Number')}</label>
                                {/* <input className="form-control" type="text" placeholder="4149 **** **** **** ****" /> */}
                                <CardNumberElement  className="form-control" />
                            </div>
                            <div className="form-group col-md-3">
                                <label>{t('MM / YY')}</label>
                                <CardExpiryElement  className="form-control" />
                            </div>
                            <div className="form-group col-md-3">
                                <label>{t('CCV')}</label>
                                <CardCVCElement  className="form-control" />
                            </div>
                            <div className="form-group col-md-12">
                                <div className="checkbox">
                                    <label>
                                        {/* <input type="checkbox" checked />Remember me */}
                                    </label>
                                </div>
                            </div>
                            <div className="text-center">
                                <button
                                        type="submit"
                                        className="btn btn-default"
                                        disabled={this.props.paymentsStore.paymentState.state === 'PROCESSING'}
                                >
                                    { (this.props.paymentsStore.paymentState.state === 'PROCESSING')
                                        && `PROCESSING ${this.props.amount} USD`
                                    }
                                    { (this.props.paymentsStore.paymentState.state === 'START')
                                        && `PAY ${this.props.amount} USD`
                                    }
                                </button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            );
    }
}

export default injectStripe(PartnerPaymentFormComponent);
