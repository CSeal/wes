import * as React from 'react';
import { GenericProps } from '../../interfaces/GenericProps.interface';
import { observer, inject } from 'mobx-react';
import transl from '../../utils/t.decorator';
import { Link } from 'react-router-dom';
import StudentDetailsComponent from '../Partner/components/StudentDetails.component';
import ProfilesListComponent from '../components/ProfilesList.component';
import { UserProfile } from '../../stores/Profiles.store';
import {UsersExtended, UserToUserFeedback} from '../../services/api';
import { Field, Form } from 'react-final-form';
import * as Validator from 'validatorjs';
import moment = require('moment');
import StudentsComponent from '../components/Students.component';

export interface TeacherStudentsProps extends GenericProps {
}
export interface TeacherStudentsState {
    newNote: boolean;
}
@transl()
@inject('profilesStore')
@inject('userStore')
@observer
export class TeacherStudentsPage extends React.Component<TeacherStudentsProps, TeacherStudentsState> {
    constructor(props: TeacherStudentsProps) {
        super(props);
        this.state = {newNote: false};
    }
    leaveNote = (el: any) => {
        const { profilesStore } = this.props;
        const me = this.props.userStore.me$.current();
        profilesStore.addNote({ user_id: me.id, feedback_user_id: profilesStore.currentProfile.id, comment: el.note });
        this.setState({newNote: false});
    };
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

    changeNote = (el: UserToUserFeedback, note: string) => {
        el.comment = note;
        this.props.profilesStore.changeNote(el);
        this.setState({});
    };
    deleteNote(el: UserToUserFeedback): void {
        this.props.profilesStore.removeNote(el);
        this.setState({});
    }
    renderNotes(notes: UserToUserFeedback[]): React.ReactNode {
        const { t } = this.props;
        return notes.map((el) => {
            return (
                <div key={el.id} style={{position: 'relative'}}>
                    <Form
                        // validateOnBlur
                        onSubmit={(e: {note: string}) => this.changeNote(el, e.note)}
                        initialValues={{
                            note: el.comment,
                        }}
                        validate={(values: any) => {
                            const v = new Validator(values, {
                                note: 'required|string|min:3',
                            });
                            v.check();
                            return v.errors.all();
                        }}
                        render={ ({ handleSubmit, values, reset, pristine, invalid  }) => (
                            <form onSubmit={handleSubmit}>
                                <Field
                                    name="note"
                                    render={({ input, meta }) => (
                                        <textarea {...input} style={{minHeight: '30px', resize: 'none', overflow: 'hidden', lineHeight: '16px', color: 'grey', fontSize: '10px'}}/>
                                    )}
                                />
                                {<div
                                    style={{position: 'absolute', top: 0, right: 0}}
                                    onClick={() => this.deleteNote(el)}
                                >X
                                </div>}
                                {!pristine && <button type="submit" className="btn btn-primary">{t('Change comment')}</button>}
                            </form>
                        )}
                    />
                </div>
            );
        });
    }
    renderNewNote() {
        const { t } = this.props;
        return (
            <Form
                // validateOnBlur
                onSubmit={this.leaveNote}
                validate={(values: any) => {
                    const v = new Validator(values, {
                        note: 'required|string|min:3',
                    });
                    v.check();
                    return v.errors.all();
                }}
                render={ ({ handleSubmit, values, reset, pristine, invalid  }) => (
                    <form onSubmit={handleSubmit}>
                        <Field
                            name="note"
                            render={({ input, meta }) => (
                              <textarea {...input} style={{minHeight: '30px', resize: 'none', overflow: 'hidden', lineHeight: '16px', color: 'grey', fontSize: '10px'}}/>
                            )}
                        />
                        <button className="btn btn-primary" type="submit" disabled={pristine || invalid}>
                            {t('Comment')}
                        </button>
                    </form>
                )}
            />
        );
    }
    render(): React.ReactNode {
        const { t, profilesStore } = this.props;
        const notes = profilesStore.notes$.current();
        return (
                    <div className="row">
                        <div className="aside">
                            <h2>
                                {t('My Students')} &amp; {t('Groups')}
                            </h2>
                            <ProfilesListComponent users={profilesStore.relatedUsers$.current()} />
                        </div>
                        <div id="content" className="col-md-9 col-md-offset-3">
                            <div className="leaved-note">
                                {notes && notes.length > 0 && <h2>{t('Your notes')}</h2>}
                                {notes && this.renderNotes(notes)}
                                {this.state.newNote && this.renderNewNote()}
                            </div>
                            <StudentDetailsComponent
                                actions={
                                    () => <ul className="action">
                                        <li className="note">
                                            <a  onClick={() => this.setState({newNote: true})}>
                                                <svg width="14px" height="14px" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                    <g id="Boostrap3-grid-system-layouts" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                        <g id="WES-Teachers-Students-Page-–-1366px" transform="translate(-962.000000, -200.000000)" fill="#32D1FF" fillRule="nonzero">
                                                            <g id="body" transform="translate(-52.000000, -113.000000)">
                                                                <g id="content" transform="translate(549.000000, 299.000000)">
                                                                    <g id="bio">
                                                                        <g id="leave-a-note-btn" transform="translate(465.000000, 14.000000)">
                                                                            <g id="pencil">
                                                                                <path d="M13.4524807,1.5454436 L12.4486791,0.545457599 C11.8098771,-0.1818192 10.6235756,-0.1818192 9.89352368,0.545457599 L8.70722214,1.72724974 C8.70722214,1.76726799 8.68624514,1.81000288 8.66705119,1.85817106 L0.676598917,9.81819759 C0.676598917,9.90910066 0.585348986,10.0000037 0.585348986,10.0909068 L0.0377969589,13.5454847 C-0.0534529719,13.6363877 0.0377969589,13.8181939 0.12904689,13.9090969 C0.22029682,13.9090969 0.402796682,14 0.494046613,14 L3.96175375,13.5454324 C4.05300368,13.5454324 4.14425361,13.5454324 4.23550354,13.4545293 L12.2660219,5.4545368 C12.2660219,5.38818801 12.3070843,5.30815152 12.3326238,5.20632963 L13.4523234,4.09088628 C14.1825326,3.45456479 14.1825326,2.2727204 13.4524807,1.5454436 Z M4.73753549,11.5909642 L2.45612989,9.31823071 L9.02659689,2.77273953 L11.3080025,5.04547299 L4.73753549,11.5909642 Z M3.77930633,12.5454986 L1.04159864,13.0000662 L1.49790074,10.2727652 L1.81732794,9.9545522 L4.09873353,12.2272857 L3.77930633,12.5454986 Z M12.9049287,3.45456479 L11.992377,4.36364773 L9.71097137,2.09091426 L10.6235231,1.18183133 C10.9885228,0.81821905 11.5360749,0.81821905 11.901127,1.18183133 L12.9049287,2.18181733 C13.2699809,2.54542961 13.2699809,3.09090027 12.9049287,3.45456479 Z" id="Shape"></path>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                                {t('leave a note')}</a>
                                        </li>
                                        <li>
                                            <Link to="/chat/" className="btn btn-primary">
                                                {t('contact a student')}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/teacher/evaluate" className="btn btn-default">
                                                {t('evaluate a student')}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={`/teacher/students/evaluations/${profilesStore.currentProfile.id}`} className="btn btn-default">
                                                {t('evaluation answers')}
                                            </Link>
                                        </li>
                                    </ul>}
                            />
                        </div>
                    </div>
        );
    }
}
