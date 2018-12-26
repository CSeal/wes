import { observable, action, runInAction, computed, reaction } from 'mobx';
import { lazyObservable, ILazyObservable } from 'mobx-utils';
import { userApiService, meApiService, userToUserApiService } from '../services';
import {
    Lesson, UsersLesson, User, UserToUserFeedback, NewUsersAvailability, UsersAvailability, UsersExtended, NewUsersDocument,
    UsersDocument, UpdateUsersDocument, Quiz, UsersMarker, NewUsersMarker,
} from '../services/api';
import { UserRole } from '../interfaces/UserRole.interface';
import UserStore from './User.store';

export interface UserProfile extends User {
}

export interface StudentProfileDetails extends User {
}

export interface UserWithQuiz extends User {
    quiz: UserWithQuizQuiz[];
}

export interface UserWithQuizQuiz {
    user_id: number;
    quiz_id: number;
    answer: string;
    quiz: Quiz;
}

export class ProfilesStore {

    @observable relatedUsers$: ILazyObservable<User[]> = lazyObservable((sink) => {
        if (!this.currentRole) {
            sink(undefined);
            return;
        }
        this.meApi().meRelationsGet(this.currentRole, undefined).then((response) => {
            runInAction(() => {
                // tslint:disable-next-line:no-unused-expression
                if (response) {
                    const profile = response.data[0];
                    this.changeProfile(profile);
                }
            });
            sink(response.data as User[]);
        });
    });

    @observable meRelations$: ILazyObservable<User[]> = lazyObservable((sink) => {
        if (!this.currentRole) {
            sink(undefined);
            return;
        }
        this.meApi().meRelationsGet(this.currentRole).then((response) => {
            runInAction(() => {
                // tslint:disable-next-line:no-unused-expression
                if (response) {
                    const profile = response.data[0];
                    this.changeProfile(profile);
                }
            });
            sink(response.data);
        });
    });

    @observable relatedUsersWithQuiz$: ILazyObservable<UserWithQuiz[]> = lazyObservable((sink) => {
        this.meApi().meRelationsGet(this.currentRole, 'quiz.quiz').then((response) => {
            runInAction(() => {
                if (response) {
                    const userWithQuiz = response.data[0] as UserWithQuiz;
                    this.changeCurrentUserWithQuiz(userWithQuiz);
                }
            });
            sink(response.data as UserWithQuiz[]);
        });
    });

    @observable teachers$: ILazyObservable<UserWithQuiz[]> = lazyObservable((sink) => {
        this.userApi().usersGet(0, 30, undefined, undefined, undefined, 'quiz.quiz', undefined, undefined, 'TEACHER').then((response) => {
            sink(response.data as UserWithQuiz[]);
        });
    });

    @observable users$: ILazyObservable<User[]> = lazyObservable((sink) => {
        // TODO: backend call
        // sink([]);
        // return;
        if (!this.currentRole) {
            sink(undefined);
            return;
        }
        this.userApi().usersGet(0, 100, undefined, undefined, undefined, undefined, undefined, undefined, this.currentRole).then((response) => {
            runInAction(() => {
                // tslint:disable-next-line:no-unused-expression
                if (response) {
                    const profile = response.data[0];
                    this.changeProfile(profile);
                }
            });
            sink(response.data);
        });
    });

    @observable currentLessonsList$: ILazyObservable<UsersLesson[]> = lazyObservable((sink) => {
        if (!this.currentProfile) {
            sink(undefined);
            return;
        }
        this.userApi().usersIdLessonsGet(this.currentProfile.id, 0, 10).then((response) => {
            sink(response.data);
        });
    });

    @observable userMarkers$: ILazyObservable<UsersMarker[]> = lazyObservable((sink) => {
        if (!this.currentProfile || this.currentRole !== 'TEACHER') {
            sink(undefined);
            return;
        }
        this.userApi().usersIdMarkersGet(this.currentProfile.id, 0, 100, 'ts').then((response) => {
            sink(response.data);
        });
    });

    @observable currentRole: UserRole;
    @observable currentProfile: User = undefined;
    @observable currentLessons: Lesson[] = [];
    @observable currentUserWithQuiz: UserWithQuiz;

    @observable notes$: ILazyObservable<UserToUserFeedback[]> = lazyObservable((sink) => {
        if (!this.currentProfile) {
            sink(undefined);
            return;
        }
        this.notesApi().feedbacksGet(0, 10, this.currentProfile.id).then((response) => {
            sink(response.data);
        });
    });

    @observable availability$: ILazyObservable<UsersAvailability[]> = lazyObservable((sink) => {
        this.userApi().usersIdAvailabilitiesGet(UserStore.meId, 0, 10).then((response) => sink(response.data));
    });

    @observable contract$: ILazyObservable<UsersDocument[]> = lazyObservable((sink) => {
       this.userApi().usersIdDocumentsGet(UserStore.meId, 0, 10, undefined, undefined, 'desc').then((response) => {
          sink(response.data);
       });
    });

    constructor (
        protected userApi = userApiService,
        protected meApi = meApiService,
        protected notesApi = userToUserApiService,
    ) {
    }

    defaultProfilesRole(role: UserRole): UserRole {
        switch (role) {
            case 'TEACHER':
                return 'STUDENT';
            case 'STUDENT':
                return 'TEACHER';
            case 'PARTNER':
                return 'STUDENT';
            case 'ADMIN':
                return 'PARTNER';
            default:
                return undefined;
        }
    }

    @action('addNote') addNote(note: UserToUserFeedback): void {
        this.notesApi().feedbacksPost(note).then(() => {
            this.notes$.refresh();
        });
    }

    @action('removeNote') removeNote(note: UserToUserFeedback): Promise<void> {
        return this.notesApi().feedbacksIdDelete(note.id).then(() => {
            this.notes$.refresh();
            return null;
        });
    }

    @action('changeNote') changeNote(note: UserToUserFeedback): Promise<void> {
        return this.notesApi().feedbacksIdPut(note.id, note).then(() => {
            this.notes$.refresh();
            return null;
        });
    }

    @action('changeRole') changeRole(role: UserRole): void {
        this.currentRole = role;
        this.users$.refresh();
        this.relatedUsers$.refresh();
    }

    @action('changeProfile') changeProfile(profile: User): Promise<boolean> {
        this.currentProfile = profile;
        this.currentLessonsList$.refresh();
        this.notes$.refresh();
        this.userMarkers$.refresh();
        return Promise.resolve(true);
    }

    @action('deleteProfile') async deleteProfile(profile: User): Promise<void> {
        await this.userApi().usersIdDelete(profile.id);
        this.users$.refresh();
    }

    @action('addAvailability') addAvailability(data: NewUsersAvailability[]): Promise<boolean> {
        return this.userApi().usersIdAvailabilitiesCollectionPost(UserStore.meId, data).then(() => {
            return Promise.resolve(true);
        });
    }

    @action('addContract') addContract(doc: NewUsersDocument): void {
        this.userApi().usersUserIdDocumentsPost(UserStore.meId, doc)
            .then(() => this.contract$.refresh());
    }

    @action('changeContract') changeContract(doc: UpdateUsersDocument): void {
        this.userApi().usersUserIdDocumentsUserDocumentIdPost(UserStore.meId, doc.user_document_id, doc)
            .then(() => this.contract$.refresh());
    }

    @action('changeCurrentUserWithQuiz') changeCurrentUserWithQuiz(userWithQuiz: UserWithQuiz): void {
        this.currentUserWithQuiz = userWithQuiz;
    }

    @action('addUserIdMarker') addUserIdMarker(newUserMarker: NewUsersMarker): void {
        this.userApi().usersUserIdMarkersPost(this.currentProfile.id, newUserMarker).then(() => {
            this.userMarkers$.refresh();
        });
    }

    @action('deleteUserIdMarker') deleteUserIdMarker(code: string): void {
        this.userApi().usersUserIdMarkersCodeDelete(this.currentProfile.id, code).then(() => {
            this.userMarkers$.refresh();
        });
    }
}

const profilesStore = new ProfilesStore();

reaction(() => UserStore.me$.current() && UserStore.me$.current().roles && UserStore.me$.current().roles.role , (currentRole: UserRole) => {
    profilesStore.changeRole(profilesStore.defaultProfilesRole(currentRole));
});

export default profilesStore;

export interface IEvaluate {
    grammar: number;
    grammarComment: string;
    writing: number;
    writingComment: string;
    speaking: number;
    speakingComment: string;
    listening: number;
    listeningComment: string;
}
