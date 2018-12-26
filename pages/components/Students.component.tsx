import * as React from 'react';
import { GenericProps } from '../../interfaces/GenericProps.interface';
import transl from '../../utils/t.decorator';
import { inject, observer } from 'mobx-react';
import LazyLoad from '../../components/LazyLoad';
import { UsersExtended } from '../../services/api';
import * as moment from 'moment';
import UserThumbComponent from './UserThumb.component';

interface StudentsComponentProps extends GenericProps {}
interface StudentsComponentState {}

@transl()
@inject('userStore')
@observer
export default class StudentsComponent extends React.Component<StudentsComponentProps, StudentsComponentState> {
    static timestampToDate(time: any): string {
        return moment.unix(Number.parseInt(time)).format('L');
    }
    renderTeachers(user: UsersExtended): string[] {
        return user.teachers.map((el, idx) => {
            return el.name + ' ' + el.last_name + (idx === user.teachers.length - 1 ? '' : ', ');
        });
    }
    renderPackages(user: UsersExtended): string[] {
        return user.active_packages.map((el, idx) => {
            return el.name + (idx === user.active_packages.length - 1 ? '' : ', ');
        });
    }
    renderPackageDuration(user: UsersExtended): string[] {
        return user.active_packages.map((el, idx) => {
           return StudentsComponent.timestampToDate(el.start) + '-' + StudentsComponent.timestampToDate(el.ends) + (idx === user.active_packages.length - 1 ? '' : ', ');
        });
    }
    renderStudents(students: UsersExtended[]): React.ReactNode {
        const { t } = this.props;
        return (
            <div className="students">
                <div className="col-md-12">
                    <h2>{t('Students')}</h2>
                </div>
                <ul className="students-list">
                    {students.map((el: UsersExtended, idx: number) => {
                        return (
                            <li className="col-md-4" key={idx}>
                                <div className="item">
                                    <div className="head">
                                      <span className="icon">
                                        <a href="#"><UserThumbComponent user={el.user} /></a>
                                      </span>
                                        <div className="info">
                                            <strong>{el.user.name}</strong>
                                            <em>{el.user.country}</em>
                                            <p>{t('Evaluation Score')}:<span>{el.evaluation_score}</span></p>
                                        </div>
                                    </div>
                                    <dl>
                                        <dt>{t('Active Packages')}:</dt>
                                        <dd><span>{this.renderPackages(el)}</span></dd>
                                        <dt>{t('Teacher')}:</dt>
                                        <dd>{this.renderTeachers(el)}</dd>
                                        <dt>{t('Package Duration')}:</dt>
                                        <dd>{this.renderPackageDuration(el)}</dd>
                                        <dt>{t('Lessons Left')}:</dt>
                                        <dd>{el.user.lessons_count.total - el.user.lessons_count.done} / {el.user.lessons_count.total}</dd>
                                    </dl>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
    render(): React.ReactNode {
        const students = this.props.userStore.meRealtionsStudents$.current();
        return (
            <LazyLoad $={students}>
                {() => this.renderStudents(students)}
            </LazyLoad>
        );
    }
}
