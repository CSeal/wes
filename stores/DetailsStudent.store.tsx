import { observable, action, runInAction, computed, reaction } from 'mobx';
import { lazyObservable, ILazyObservable } from 'mobx-utils';
import { userApiService, meApiService, userToUserApiService } from '../services';
import { Lesson, UsersLesson, User, UserToUserFeedback, NewUsersAvailability,
        UsersAvailability, UsersExtended, UsersQuiz, Quiz, UsersEvaluation, LessonZoom } from '../services/api';
import { UserRole } from '../interfaces/UserRole.interface';
import UserStore from './User.store';
import ProfilesStore from './Profiles.store';

export interface UsersLessonExtended extends UsersLesson {
    lesson: LessonExtended;
}

interface LessonExtended extends Lesson {
    zoom: LessonZoom;
}

export interface UsersQuizExtended extends UsersQuiz {
    quiz: Quiz;
}

export class DetailsStudentStore {
    @observable currentProfileId: number;

    @observable lessons$: ILazyObservable<UsersLessonExtended[]> = lazyObservable((sink) => {
        if (!this.currentProfileId) {
            sink(undefined);
            return;
        }
        this.userApi().usersIdLessonsGet(
                this.currentProfileId, 0, 10,
                JSON.stringify({lesson: [['date', '>', '2018-08-02 10:34:28']]}),
                // JSON.stringify({lesson: [['id', '=', '2']]}),
                'lesson.date', 'desc', 'lesson,lesson.zoom').then((response) => {
            sink(response.data as UsersLessonExtended[]);
        });
    });

    quizzes$: ILazyObservable<UsersQuizExtended[]> = lazyObservable((sink) => {
        if (!this.currentProfileId) {
            sink(undefined);
            return;
        }
        this.userApi().usersIdQuizGet(this.currentProfileId, 0, 10, undefined, '', 'asc', 'quiz').then((response) => {
            sink(response.data as UsersQuizExtended[]);
        });
    });

    @observable evaluations$: ILazyObservable<UsersEvaluation[]> = lazyObservable((sink) => {
        if (!this.currentProfileId) {
            sink(undefined);
            return;
        }
        this.userApi().usersIdEvaluationsGet(this.currentProfileId, 0, 100)
            .then((response) => sink(response.data));
    }, [],
    );
    constructor (
        protected userApi = userApiService,
    ) {
    }

    @action('changeProfileId') changeProfileId(id: number) {
        this.currentProfileId = id;
        [
            this.lessons$,
            this.quizzes$,
            this.evaluations$,
        ].forEach((lazy) => {
            lazy.reset();
            lazy.refresh();
        });
    }
}

const detailsStudentStore = new DetailsStudentStore();

reaction(() => ProfilesStore.currentProfile && ProfilesStore.currentProfile.id, (currentProfileId: number) => {
    // detect profile changes and update all observables
    if (currentProfileId !== undefined) {
        detailsStudentStore.changeProfileId(currentProfileId);
    }
});

export default detailsStudentStore;
