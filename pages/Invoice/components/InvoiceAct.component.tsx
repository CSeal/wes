import * as React from 'react';
import { observer, inject } from 'mobx-react';
import * as classnames from 'classnames';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import transl from '../../../utils/t.decorator';
import { TransactionExtended } from '../InvoiceMain';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

interface InvoiceActComponentProps extends GenericProps {
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
export class InvoiceActComponent extends React.Component<InvoiceActComponentProps> {
    export = (e: any): void => {
        e.preventDefault();
        const element = document.getElementById('main');
        const html2pdf = require('html2pdf.js');
        html2pdf(element, {
            margin:       0,
            enableLinks:  true,
            filename:     'WES_act_' + (JSON.parse(this.props.transaction.payload) as TransactionPayload).invoice_id + '.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { dpi: 600, letterRendering: false },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'p' },
        });
    }

    render(): React.ReactNode {
        const { t, transaction } = this.props;
        const payload: TransactionPayload = JSON.parse(this.props.transaction.payload) as TransactionPayload;
        const user = transaction.balance[0].user;
        if (typeof payload !== 'object' || !Array.isArray(payload.items)) {
            return <div>{t('No act data is available for transaction #' + transaction.id)}</div>;
        }

        return (
            <section id="main" style={{backgroundColor: '#FFF', fontSize: '0.8em'}}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 text-center">
                            <p><strong>Act of Acceptance</strong></p>
                            <p><strong># {payload.invoice_id}-A</strong></p>
                        </div>
                        <div className="col-md-6 text-center">
                            <p><strong>Акт выполненных работ(услуг)</strong></p>
                            <p><strong>№ {payload.invoice_id}-A</strong></p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <p>
<strong>Contractor:</strong> Worldwide English Services<br />
2124 Moreland Rd, Abington, PA, 19001, USA<br />
Email: <a href="mailto:jared@wes-english.com">jared@wes-english.com</a>
                            </p>
                        </div>
                        <div className="col-md-6">
                            <p>
<strong>Исполнитель:</strong> Компания Ворлдуайд Инглиш Сервисез <br />
2124 Морлэнд роуд, Абингтон, Филадельфия, 19001, США<br />
Email: <a href="mailto:jared@wes-english.com">jared@wes-english.com</a>
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <p>
<strong>Customer:</strong> {user.company_name || 'Company'}<br />
{user.company_address || ''} <br />
{user.city || ''} {user.country || ''}
Email: <a href={`mailto:${user.email}`}>{user.email}</a>
                            </p>
                        </div>
                        <div className="col-md-6">
                            <p>
<strong>Заказчик:</strong> {user.company_name || 'Компания'} <br />
{user.company_address || ''}  <br />
{user.city || ''} {user.country || ''}
Email: <a href={`mailto:${user.email}`}>{user.email}</a>
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
<p>
    <strong>Description of services:</strong>
</p>
    <ul>
        <li>Educational services described in invoice #{payload.invoice_id} in accordance with the PARTNER EDUCATIONAL SERVICES AGREEMENT.</li>
    </ul>
<br />
<p>
The total received in payment for those services was: USD ${payload.items.map((el) => el.total).reduce((sum, el) => sum + el)}.
</p>
<p>
The aforementioned services were rendered in full and on time. The Customer has no complaints as to their volume, quality, or timing.
</p>
<p>
The Contractor hereby confirms that it does not have any economic activity in either the Russian Federation or 
the CIS which could be associated directly or indirectly with the services rendered.
The Contractor does not have a representative office in Russia and does not perform any activity 
which would require registration in the Russian Federation. 
The Contractor confirms that it is established in the USA and is not registered with any Russian authorities. 
Russia is not mentioned directly or indirectly in the charter documents of the Contractor. 
The Contractor also confirms that the place of management of the Contractor is the USA. The Contractor also confirms that it provides services from outside Russia.
</p>
                        </div>
                        <div className="col-md-6">
                        <p>
    <strong>Наименование услуг:</strong>
    </p>
    <ul>
        <li>Образовательные услуги по инвойсу #{payload.invoice_id} в соответствии с СОГЛАШЕНИЕМ О ПРЕДОСТАВЛЕНИИ ОБРАЗОВАТЕЛЬНЫХ УСЛУГ ПАРТНЕРУ</li>
    </ul>
<p>
Всего оказано услуг на сумму: USD ${payload.items.map((el) => el.total).reduce((sum, el) => sum + el)}.
</p>
<p>
Вышеперечисленные услуги выполнены полностью и в срок. Заказчик претензий по объему, качеству и срокам оказания услуг не имеет.
</p>
<p>
Настоящим Исполнитель подтверждает, что он не осуществляет никакой экономической деятельности ни в Российской Федерации, ни в СНГ, которая могла бы быть прямо или косвенно связана с оказываемыми услугами. Исполнитель не имеет представительства в России и не осуществляет деятельности, требующей регистрации в Российской Федерации. Исполнитель подтверждает, что он создан в США и не зарегистрирован ни в каких российских органах. Россия прямо или косвенно не упоминается в уставных документах Исполнителя. Исполнитель подтверждает, что местом его управления являются Соединенные Штаты Америки. Исполнитель также подтверждает, что он оказывает услуги за пределами России.
</p>
                        </div>
                    </div>

                    <div className="row" style={{paddingTop: '4em'}}>
                        <div className="col-md-6">
                            <p>
<strong>Contractor:</strong> Worldwide English Services
<br />
<br />
<img src="/images/jar.png" alt="" width="93" height="76" style={{margin: '0 86px 0 30px'}} />  Jared Firth
                            </p>
                        </div>
                        <div className="col-md-6">
                            <p>
<strong>Исполнитель:</strong> Компания Ворлдуайд Инглиш Сервисез
<br />
<br />
<img src="/images/jar.png" alt="" width="93" height="76" style={{margin: '0 86px 0 30px'}} />   Джаред Фирт
                            </p>
                        </div>
                    </div>
                    <div className="row" style={{paddingTop: '3em', paddingBottom: '3em'}}>
                        <div className="col-md-6">
                            <p>
<strong>Customer:</strong> {user.company_name || 'Company'}<br />
<br />
<br />
________________________________ {user.name}

                            </p>
                        </div>
                        <div className="col-md-6">
                            <p>
<strong>Заказчик:</strong> {user.company_name || 'Компания'} <br />
<br />
<br />
________________________________ {user.name}

                            </p>
                        </div>
                    </div>
                </div>
                <div className="buttons hidden-print text-center" data-html2canvas-ignore="true" >
                            <button type="button" className="btn btn-primary" onClick={this.export}>{t('Download PDF')}</button>
                </div>
            </section>
        );
    }
}
