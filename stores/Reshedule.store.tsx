import {observable, action, runInAction, computed, reaction} from 'mobx';
import { lazyObservable, ILazyObservable } from 'mobx-utils';
import { lessonApiService, userApiService, packageApiService } from '../services';
import { Lesson, User, ModelPackage, UsersAvailability, NewRescheduleAllLessons, NewLessonsForPackageAvailability } from '../services/api';
import UserStore from './User.store';

export interface LessonExtended extends Lesson {
    package: ModelPackage;
    teacher: User;
    students: User[];
}
export class RescheduleStore {

    @observable lessonsList$: ILazyObservable<LessonExtended[]> = lazyObservable((sink) => {
        this.lessonApi().lessonsGet(0, 20, undefined, 'date', 'desc', 'teacher,students,package').then((response) => {
            sink(response.data as LessonExtended[]);
        });
    });

    @observable availability$: ILazyObservable<UsersAvailability[]> = lazyObservable((sink) => {
        if (!this.lesson) {
            sink(undefined);
            return;
        }
        this.userApi().usersIdAvailabilitiesGet(this.lesson.teacher_id, 0, 100).then((response) => {
            sink(response.data);
        });
    });

    @observable lesson: LessonExtended = null;
    @observable rescheduledDate: number;
    @observable rescheduledDatesAll: NewLessonsForPackageAvailability[] = null;

    constructor (
        protected userApi = userApiService,
        protected lessonApi = lessonApiService,
        protected packageApi = packageApiService,
    ) {
    }

    @action('selectLesson') selectLesson(lesson: LessonExtended): void {
        this.lesson = lesson;
        this.rescheduledDate = undefined;
    }

    @action('saveReschedule') async saveReschedule(date: number, message: string = ''): Promise<void> {
        this.rescheduledDate = date;
        await this.lessonApi().lessonsLessonIdReschedulesPost(this.lesson.id, {
            date,
            message,
            duration: this.lesson.duration,
            initiator_user_id: UserStore.meId,
        }).then(() => null);
    }

    @action('saveRescheduleAll') async saveRescheduleAll(availability: NewLessonsForPackageAvailability[], message: string = ''): Promise<void> {
        await this.packageApi().packagesIdRescheduleLessonsPost(this.lesson.package_id, {
            availability,
            message,
            initiator_user_id: UserStore.meId,
        }).then(() => {
            runInAction(() => this.rescheduledDatesAll = availability);
        });
    }
}

const rescheduleStore = new RescheduleStore();

export default rescheduleStore;
