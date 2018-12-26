import * as React from 'react';
import { TranslationFunction } from 'react-i18next';
import transl from '../../../../../../utils/t.decorator';
import { RadioButtonComponent } from '../RadioButton/RadioButton.component';
import { HoursPerWeekEnum } from '../../../../../../stores/User.store';

interface FormFieldNameHoursWeekComponentProps {
    t?: TranslationFunction;
}

@transl()
export class FormFieldNameHoursWeekComponent extends React.Component<FormFieldNameHoursWeekComponentProps> {
    render(): React.ReactNode {
        const { t } = this.props;

        return (
            <fieldset>
                <div className="row">
                    <div className="col-md-8">
                        <label>{t('Hours per Week')}</label>
                        <div className="radio-group">
                            <RadioButtonComponent
                                name="hoursWeek"
                                styles={{ marginLeft: '22px' }}
                                value={HoursPerWeekEnum.THREE}
                                title={`${HoursPerWeekEnum.THREE} ${t('h')}`}
                            />
                            <RadioButtonComponent
                                name="hoursWeek"
                                value={HoursPerWeekEnum.FIFTEEN}
                                title={`${HoursPerWeekEnum.FIFTEEN} ${t('h')}`}
                            />
                            <RadioButtonComponent
                                name="hoursWeek"
                                value={HoursPerWeekEnum.TWENTY_FIVE}
                                title={`${HoursPerWeekEnum.TWENTY_FIVE} ${t('h')}`}
                            />
                        </div>
                    </div>
                </div>
            </fieldset>
        );
    }
}
