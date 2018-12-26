import * as React from 'react';
import { observer, inject } from 'mobx-react';
import * as classnames from 'classnames';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import transl from '../../../utils/t.decorator';
import { TransactionExtended } from '../InvoiceMain';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

interface InvoiceComponentProps extends GenericProps {
    transaction: TransactionExtended;
}

interface TransactionPayload {
    to: number;
    from: number;
    items: [{qty: number, total: number, description: string}];
    processor: string;
    invoice_id: string;
}
@transl()
@observer
export class InvoiceComponent extends React.Component<InvoiceComponentProps> {
    export = (e: any): void => {
        e.preventDefault();
        const element = document.getElementById('wrapper');
        const html2pdf = require('html2pdf.js');
        html2pdf(element, {
            margin:       0,
            enableLinks:  true,
            filename:     'WES_invoice_' + (JSON.parse(this.props.transaction.payload) as TransactionPayload).invoice_id + '.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { dpi: 600, letterRendering: false },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'p' },
        });
    }

    render(): React.ReactNode {
        const { t, transaction } = this.props;
        const payload: TransactionPayload = JSON.parse(this.props.transaction.payload) as TransactionPayload;
        if (typeof payload !== 'object' || !Array.isArray(payload.items)) {
            return <div>{t('No invoice data is available for transaction #' + transaction.id)}</div>;
        }

        return (
            <div id="wrapper" className="invoice">
                <header id="header">
                    <div className="navbar navbar-default ">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-8 col-md-offset-2">
                                    <div className="col-md-5">
                                        <a href="/" className="logo"><img src="/images/logo_white.png" width="259" height="76" alt="wes logo" /></a>
                                        <span className="address">2124 Moreland Rd <br />Abington, PA 19001 <br />USA </span>
                                        <span className="date"><Moment date={transaction.created_at} format="MMM DD, YYYY"/> </span>
                                    </div>
                                    <div className="content col-md-3 col-md-offset-3 text-right">
                                        <span className="company">{transaction.balance[0].user.company_name || 'Company'}</span>
                                        <span className="company-address">
                                            {transaction.balance[0].user.company_address || ''}< br/>
                                            {transaction.balance[0].user.city || ''}
                                            &nbsp;{transaction.balance[0].user.country || ''}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <section id="main">
                    <div className="container-fluid">
                        <div className="invoce-box col-md-8 col-md-offset-2">
                            <div className="row">
                                <aside className="col-md-3">
                                    <h1>{t('Invoice')}</h1>
                                    <span className="info">
                                        <strong>{t('Invoice No.')}</strong>
                                        <em>{payload.invoice_id}</em>
                                    </span>
                                </aside>
                                <div className="content col-md-9">
                                    <h2 className="text-right">{t('Signature Required')}</h2>
                                    <table className="invoice-table">
                                        <thead>
                                            <tr>
                                                <th>{t('Description')}</th>
                                                <th>{t('Qty')}</th>
                                                <th>{t('Total')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                payload.items.map((item, idx) =>
                                                    <tr key={idx}>
                                                        <td>{item.description}</td>
                                                        <td>{item.qty}</td>
                                                        <td>{item.total}</td>
                                                    </tr>)
                                            }
                                        </tbody>
                                        <tfoot>
                                            {
                                                <tr className="active">
                                                    <td>{t('Total')}</td>
                                                    <td></td>
                                                    <td>{payload.items.map((el) => el.total).reduce((sum, el) => sum + el)}</td>
                                                </tr>
                                            }
                                        </tfoot>
                                    </table>
                                    <div className="total">
                                        <strong>{t('Warning')}</strong>
                                        <p>{t('A $100 fee is charged for each week in arrears.')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="invoce-box col-md-8 col-md-offset-2">
                            <div className="row signature">
                                <div className="col-md-5">
                                    <em className="signature-input">{t('Recipient\’s Signature')}</em>
                                </div>
                                <div className="col-md-5 col-md-offset-8 algn-right">
                                    <img src="/images/jar.png" alt="" />
                                    <em className="signature-input">Jared Firth</em>
                                </div>
                            </div>
                            <div className="row">
                                <div className="sign">
                                    <div className="total">
                                        <strong>{t('Please Note')}</strong>
                                        <p>{t('Please download an invoice, sign it and upload to the WES platform by clicking on “Go to Payment”')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <ul className="buttons hidden-print" data-html2canvas-ignore="true" >
                        <li><Link to="/partner/payment" className="btn btn-primary">{t('Go to Payment')}</Link></li>
                        <li>
                            <button type="button" className="btn btn-primary" onClick={this.export}>{t('Download PDF')}</button>
                        </li>
                    </ul>
                </section>
            </div>
        );
    }
}
