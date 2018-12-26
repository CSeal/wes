import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import transl from '../../../utils/t.decorator';
import { User } from '../../../services/api/api';

interface ChoosedStudentsProps extends GenericProps {
}
interface ChoosedStudentsState {
}

@inject('packageCreateStore')
@observer
export class PackageCreateChoosedStudentsComponent extends React.Component<ChoosedStudentsProps, ChoosedStudentsState> {
    render(): React.ReactNode {
        const { packageCreateStore } = this.props;
        const { selectedStudentsId } = packageCreateStore;
        const students$: User[] = packageCreateStore.students$.current();

        return (
            <div className="row">
                <div className="col-md-12">
                    <ul className="choosed-students">
                        {students$ && students$.filter(({ id }) => selectedStudentsId.includes(id)).map(this.renderChoosedStudentItem)}
                    </ul>
                </div>
            </div>
        );
    }

    renderChoosedStudentItem = (user: User): React.ReactNode => {
        const { id, name } = user;

        return (
            <li key={id}>
                <a href="#" className="pills" onClick={(e) => { this.deleteFromSelectedStudents(e, id); }}>
                    {name}
                    <span className="pills__close" />
                </a>
            </li>
        );
    }

    deleteFromSelectedStudents = (event: React.SyntheticEvent<HTMLAnchorElement>, id: number): void => {
        event.preventDefault();
        this.props.packageCreateStore.deleteFromSelectedStudents(id);
    }
}
