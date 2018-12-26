import * as React from 'react';
import { TranslationFunction } from 'react-i18next';
import transl from '../../../../../../utils/t.decorator';
import { RadioButtonComponent } from '../RadioButton/RadioButton.component';
import { Overtime } from '../../../../../../stores/User.store';

interface FormFieldNameOvertimeComponentProps {
    t?: TranslationFunction;
}

@transl()
export class FormFieldNameOvertimeComponent extends React.Component<FormFieldNameOvertimeComponentProps> {
    render(): React.ReactNode {
        const { t } = this.props;

        return (
            <fieldset>
                <div className="row">
                    <div className="col-md-8">
                        <label>{t('Allow Overtime')}</label>
                        <div className="radio-group">
                            <RadioButtonComponent
                                name="overtime"
                                styles={{ marginLeft: '22px' }}
                                title={t('Yes')}
                                value={Overtime[1]}
                            />
                            <RadioButtonComponent
                                name="overtime"
                                title={t('No')}
                                value={Overtime[0]}
                            />
                        </div>
                    </div>
                </div>
            </fieldset>
        );
    }
}
