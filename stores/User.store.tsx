import { observable, action, computed, reaction, runInAction } from 'mobx';
import { lazyObservable, ILazyObservable } from 'mobx-utils';
import { User, NewUser, InviteUser, UsersRole, NewUsersQuiz, Quiz, UsersQuiz, UpdateUsersQuiz, UsersExtended, Lesson, UsersLesson, 
    NewUsersRate, UsersRate, UsersMarker, Country} from '../services/api';
import { meApiService, quizApiService, userApiService, lessonApiService, countryApiService } from '../services';
import AuthStore from './Auth.store';
import { LessonExtended } from './Lesson.store';
import DetailsPartnerStore from './DetailsPartner.store';
import { UserRole } from '../interfaces/UserRole.interface';

export interface UserEx extends User {
    roles: UsersRole;
    markers: UsersMarker[];
    // TODO: change to UsersRole[] when backend will be fixed
}
export interface UserLessonWithLessons extends UsersLesson {
    lesson: Lesson;
}
export interface IQuizWithUser extends Quiz {
    id?: number;
    user: UsersQuiz[];
}

export enum HoursPerWeekEnum {
    THREE = '3',
    FIFTEEN = '15',
    TWENTY_FIVE = '25',
}

export enum Months {
    FOUR = '4',
    TWELVE = '12',
}

export enum Overtime {
    'no',
    'yes',
}

export interface TeacherProfileDetailsFormValues {
    startDate: string;
    overtime: Overtime;
    hoursWeek: string;
    month: string;
    rate: string;
}

export class UserStore {
    @observable me$: ILazyObservable<UserEx> = lazyObservable((sink) => {
        if (!AuthStore.isAuthorized) {
            sink(undefined);
            return;
        }
        this.meApi().meGet('roles,markers').then((response) => {
            sink(response as UserEx);
            // runInAction(() => this.avatarPreviewUrl = response.photo || '');
        }).catch((err) => {
            // tslint:disable-next-line:no-console
            console.warn(err);
            AuthStore.signOut();
        });
    });
    @observable invitedUsers: InviteUser[] = [];
    @observable avatar: string = '';
    @observable avatarPreviewUrl: string = '';
    @observable contract: string = '';
    @observable contractPreviewUrl: string;
    @observable quiz$: ILazyObservable<Quiz[]> = lazyObservable((sink) => {
        this.meApi().meQuizGet('user').then((response) => {
            sink(response.data);
        });
    });
    @observable meRealtionsStudents$: ILazyObservable<UsersExtended[]> = lazyObservable((sink) => {
        this.meApi().meRelationsGet('STUDENT', undefined, 'UsersExtended')
            .then((response) => sink(response.data as UsersExtended[]));
    });
    @observable meLessons$: ILazyObservable<LessonExtended[]> = lazyObservable((sink) => {
        // if (!this.meId) {
        //     sink(undefined);
        //     return;
        // }
        // this.userApi().usersIdLessonsGet(this.meId, 0, 100, null, null, null, 'lesson.package')
        //    .then((response) => {
        //        sink(response.data as UserLessonWithLessons[]);
        //    });
        this.lessonApi().lessonsGet(0, 30, undefined, 'date', 'desc', 'teacher,students,package').then((response) => {
            sink(response.data as LessonExtended[]);
        });
    });
    @observable meRate$: ILazyObservable<UsersRate> = lazyObservable((sink) => {
        this.userApi().usersIdRateGet(this.meId, 0, 100).then((response) => {
            sink(response.data[response.data.length - 1]);
        });
    });
    @observable countries$: ILazyObservable<Country[]> = lazyObservable((sink) => {
        this.countryApi().countriesListGet('en').then((response) => {
            sink(response.data);
        });
    });
    constructor(
        protected userApi = userApiService,
        protected meApi = meApiService,
        protected quizApi = quizApiService,
        protected lessonApi = lessonApiService,
        protected countryApi = countryApiService,
    ) {
    }

    @computed get meId(): number {
        return this.me$.current() && this.me$.current().id;
    }
    @computed get trialMode(): boolean {
        return this.me$.current() && this.me$.current().is_trial;
    }
    @action('updateMe') updateMe(newUser: NewUser): Promise<void> {
        return this.userApi().usersIdPut(this.meId, newUser).then(() => {
            this.me$.refresh();
        });
    }
    @action('addQuiz') addQuiz(quiz: NewUsersQuiz): Promise<UsersQuiz> {
        return this.userApi().usersUserIdQuizPost(this.meId, quiz).then((response) => Promise.resolve(response.data));
    }
    @action('invite') invite(inviteUser: InviteUser): Promise<void>  {
        return this.meApi().meInvitePost(inviteUser).then((res) => {
            if (res.status === 200) {
                this.invitedUsers.push(inviteUser);
            }
            return null;
        });
    }
    @action('forgotPassword') forgotPassword(email: string): Promise<void> {
       return this.meApi().mePasswordEmailPost({email}).then(() => null);
    }
    @action('changeAvatar') changeAvatar(avatar: string, url: string) {
        this.avatar = avatar;
        this.avatarPreviewUrl = url;
    }
    @action('changeContract') changeContract(contract: string, url: string) {
        this.contract = contract;
        this.contractPreviewUrl = url;
    }
    @action('updateQuiz') updateQuiz(newQuiz: NewUsersQuiz, quizId: number): Promise<UpdateUsersQuiz> {
        return this.userApi().usersUserIdQuizQuizIdPut(this.meId, quizId, newQuiz)
            .then((response) => Promise.resolve(response.data));
    }

    /**
     * Store UsersRate
     * @summary Store a newly created rate in storage
     * @param TeacherProfileDetailsFormValues
     * @returns {void}
     */
    @action('usersIdRatePost') async usersIdRatePost(data: NewUsersRate): Promise<void> {
        await this.userApi().usersIdRatePost(this.meId, data).then(() => {
            runInAction(() => this.meRate$.refresh());
        });
    }

    /**
     * Current User
     * @summary Returns current User info with Roles
     * @returns {UserEx}
     */
    @computed get meWithRoles(): UserEx {
        return this.me$.current();
    }

    /**
     * Current User Role
     * @summary Returns current User role lowercase
     * @returns {string}
     */
    @computed get meRoleLowerCase(): string {
        return this.me$.current() && this.me$.current().roles.role.toLowerCase();
    }
    @computed get meRole(): UserRole {
        return this.me$.current() ? this.me$.current().roles.role as UserRole : undefined;
    }
    isRole(role: UserRole): boolean {
        return this.me$.current() && this.me$.current().roles.role === role;
    }
}

const userStore = new UserStore();

reaction(() => AuthStore.isAuthorized , (isAuthorized) => {
    // tslint:disable-next-line:no-unused-expression
    isAuthorized === false && userStore.me$.reset();
    // tslint:disable-next-line:no-unused-expression
    isAuthorized === true && userStore.me$.refresh();
});

export default userStore;
