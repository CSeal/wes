import * as React from 'react';
import * as classnames from 'classnames';
import { observer, inject } from 'mobx-react';
import { GenericProps } from '../../../../interfaces/GenericProps.interface';
import transl from '../../../../utils/t.decorator';

interface FormFieldNameLessonsCountComponentProps extends GenericProps {
}

@transl()
@inject('packageCreateStore')
@observer
export class FormFieldNameLessonsCountComponent extends React.Component<FormFieldNameLessonsCountComponentProps> {
    render(): React.ReactNode {
        const { t, packageCreateStore } = this.props;
        const { needToChooseLessonsCount } = packageCreateStore;

        return (
            <div className="row">
                <div className="col-md-12 form-group">
                    <label className="text-size9">{t('Lessons choose left')} : {needToChooseLessonsCount}</label>
                </div>
            </div>
        );
    }
}
