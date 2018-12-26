import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import transl from '../../../utils/t.decorator';

interface PackageCreateFirstLessonCalcComponentProps extends GenericProps {
}

@transl()
@inject('packageCreateStore')
@observer
export class PackageCreateFirstLessonCalcComponent extends React.Component<PackageCreateFirstLessonCalcComponentProps> {
    render(): React.ReactNode {
        const { t, packageCreateStore, packageStore } = this.props;
        const { firstLessonDate } = packageCreateStore;

        return [
                    firstLessonDate &&
                        <div key="first-lesson-element">
                            <label className="text-size9">{t('First Lesson')}</label>
                            <div style={{paddingTop: '9px'}}>{firstLessonDate.format('dddd, MMMM DD')}, {t('at')} {firstLessonDate.format('HH:mm')}</div>
                        </div>,
                ];
    }
}
