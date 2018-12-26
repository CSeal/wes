import { observable, action, runInAction, computed, reaction } from 'mobx';
import { lazyObservable, ILazyObservable } from 'mobx-utils';
import { userApiService, meApiService, userToUserApiService } from '../services';
import { Lesson, UsersLesson, User, UserToUserFeedback, NewUsersAvailability, UsersAvailability, UsersExtended, UsersQuiz, Quiz, UsersEvaluation } from '../services/api';
import { UserRole } from '../interfaces/UserRole.interface';
import UserStore from './User.store';
import ProfilesStore from './Profiles.store';

export interface UsersLessonExtended extends UsersLesson {
    lesson: Lesson;
}

export interface UsersQuizExtended extends UsersQuiz {
    quiz: Quiz;
}

export class DetailsTeacherStore {
    @observable currentProfileId: number;

    quizzes$: ILazyObservable<UsersQuizExtended[]> = lazyObservable((sink) => {
        if (!this.currentProfileId) {
            sink(undefined);
            return;
        }
        this.userApi().usersIdQuizGet(this.currentProfileId, 0, 10, undefined , undefined, undefined, 'quiz').then((response) => {
            sink(response.data as UsersQuizExtended[]);
        });
    });

    constructor (
        protected userApi = userApiService,
    ) {
    }

    @action('changeProfileId') changeProfileId(id: number) {
        this.currentProfileId = id;
        [
            this.quizzes$,
        ].forEach((lazy) => {
            lazy.reset();
            lazy.refresh();
        });
    }
}

const detailsTeacherStore = new DetailsTeacherStore();

reaction(() => ProfilesStore.currentProfile && ProfilesStore.currentProfile.id, (currentProfileId: number) => {
    // detect profile changes and update all observables
    if (currentProfileId !== undefined) {
        detailsTeacherStore.changeProfileId(currentProfileId);
    }
});

export default detailsTeacherStore;
