import * as React from 'react';
import { TranslationFunction } from 'react-i18next';
import transl from '../../../../../../utils/t.decorator';
import { RadioButtonComponent } from '../RadioButton/RadioButton.component';
import { Months } from '../../../../../../stores/User.store';

interface FormFieldNameMonthComponentProps {
    t?: TranslationFunction;
}

@transl()
export class FormFieldNameMonthComponent extends React.Component<FormFieldNameMonthComponentProps> {
    render(): React.ReactNode {
        const { t } = this.props;

        return (
            <fieldset>
                <div className="row">
                    <div className="col-md-8">
                        <label>{t('Months')}</label>
                        <div className="radio-group">
                            <RadioButtonComponent
                                name="month"
                                styles={{ marginLeft: '22px' }}
                                value={Months.FOUR}
                                title={`${Months.FOUR} ${t('months')}`}
                            />
                            <RadioButtonComponent
                                name="month"
                                value={Months.TWELVE}
                                title={`${Months.TWELVE} ${t('months')}`}
                            />
                        </div>
                    </div>
                </div>
            </fieldset>
        );
    }
}
