import {observable, action, runInAction, computed, reaction} from 'mobx';
import { lazyObservable, ILazyObservable } from 'mobx-utils';
import { meApiService, lessonApiService } from '../services';
import { Lesson, User, ModelPackage } from '../services/api';

export interface LessonExtended extends Lesson {
    package: ModelPackage;
    teacher: User;
    students: User[];
}
export class LessonStore {

    @observable lessonsList$: ILazyObservable<LessonExtended[]> = lazyObservable((sink) => {
        this.lessonApi().lessonsGet(0, 20,  undefined, 'date', 'desc', 'teacher,students,package').then((response) => {
            sink(response.data as LessonExtended[]);
        });
    });
    constructor (
        protected meApi = meApiService,
        protected lessonApi = lessonApiService,
    ) {
    }
    @computed get lessonsCountToReschedule(): number {
        return this.lessonsList$.current() && (
            this.lessonsList$.current().filter(({ state }) => state === 'schedule').length
        );
    }
}

const lessonStore = new LessonStore();

export default lessonStore;
