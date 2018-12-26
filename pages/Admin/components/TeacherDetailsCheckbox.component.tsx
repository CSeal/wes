import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { observable, runInAction } from 'mobx';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import transl from '../../../utils/t.decorator';
import { UsersMarker } from '../../../services/api';
import { DetailsTeacherStore } from '../../../stores/DetailsTeacher.store';

export interface TeacherDetailsCheckboxComponentProps extends GenericProps {
    detailsTeacherStore?: DetailsTeacherStore;
    code: string;
}

@transl()
@inject('profilesStore')
@observer
export default class TeacherDetailsCheckboxComponent extends React.Component<TeacherDetailsCheckboxComponentProps> {
    @observable checked: boolean = false;
    componentWillReact() {
        const { profilesStore, code } = this.props;
        const userMarkers: UsersMarker[] = profilesStore.userMarkers$.current();
        const isChecked: boolean = !!userMarkers && !!userMarkers.length && !!userMarkers.find((marker) => marker.code === code.toUpperCase());
        if (this.checked !== isChecked) {
            this.checked = isChecked;
        }
    }
    render(): React.ReactNode {
        const { t, code, profilesStore } = this.props;
        profilesStore.userMarkers$.current();
        return (
            <div className="checkbox">
                <label>
                    <input
                        type="checkbox"
                        onChange={this.checkboxChangeHandler}
                        checked={this.checked}
                    />{' '}
                    {t(code)}
                </label>
            </div>
        );
    }

    checkboxChangeHandler = (event: React.SyntheticEvent<HTMLInputElement>): void => {
        const { profilesStore, code } = this.props;
        const markerCode: string = code.toUpperCase();
        this.checked
            ? profilesStore.deleteUserIdMarker(markerCode)
            : profilesStore.addUserIdMarker({ code: markerCode, type: 'ts', value: 'enabled' });
    }
}
