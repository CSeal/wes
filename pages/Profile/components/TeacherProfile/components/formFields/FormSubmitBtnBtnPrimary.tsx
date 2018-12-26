import * as React from 'react';
import { TranslationFunction } from 'react-i18next';
import transl from '../../../../../../utils/t.decorator';

interface FormSubmitBtnBtnPrimaryProps {
    t?: TranslationFunction;
    disabled: boolean;
}

@transl()
export class FormSubmitBtnBtnPrimary extends React.Component<FormSubmitBtnBtnPrimaryProps> {
    render(): React.ReactNode {
        const { t, disabled } = this.props;

        return (
            <fieldset>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <button type="submit" disabled={disabled} className="btn btn-primary">
                                {t('SUBMIT')}
                            </button>
                        </div>
                    </div>
                </div>
            </fieldset>
        );
    }
}
