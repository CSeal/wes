import * as React from 'react';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import { observer, inject } from 'mobx-react';
import transl from '../../../utils/t.decorator';
import { Link } from 'react-router-dom';
import { InviteUser } from '../../../services/api';
import { StripeProvider, Elements } from 'react-stripe-elements';
import PartnerPaymentFormComponent from './PartnerPaymentForm.component';

// declare var Stripe: (key: string) => ReactStripeElements.StripeProps;

export interface PartnerPaymentDialogComponentProps extends GenericProps {
    amount?: number;
    email?: string;
    payer?: string;
}
export interface PartnerPaymentDialogComponentState {
}

@transl()
@inject('userStore')
@observer
class PartnerPaymentDialogComponent extends React.Component<PartnerPaymentDialogComponentProps, PartnerPaymentDialogComponentState> {
    static defaultProps: Partial<PartnerPaymentDialogComponentProps> = {
        amount: 0,
        email: '',
        payer: '',
    };

    render(): React.ReactNode {
        const { t, userStore } = this.props;
        return (
            <StripeProvider apiKey={process.env.STRIPE_PUBLIC_KEY}>
            <Elements>
                <PartnerPaymentFormComponent {...this.props} />
            </Elements>
            </StripeProvider>
            );
    }
}

export default PartnerPaymentDialogComponent;
