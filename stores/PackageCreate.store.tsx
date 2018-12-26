import { observable, action, runInAction, computed, reaction } from 'mobx';
import { lazyObservable, ILazyObservable } from 'mobx-utils';
import * as moment from 'moment';
import { AuthService } from '../services/Auth.service';
import { userApiService, packageApiService, meApiService } from '../services';
import { NewPackage, User, NewPackageWithLessons, UsersAvailability, UsersRate,
        UsersMarker, NewLessonsForPackage, NewLessonsForPackageAvailability, ModelPackage } from '../services/api';
import NewPackageTypeEnum = NewPackage.TypeEnum;
import UserStore from './User.store';
import PackageStore from './Package.store';
import Moment from 'react-moment';

export enum LessonsDurationEnum {
    HALF_HOURS = 0.5,
    HOUR = 1,
    HOUR_HALF = 1.5,
    HOUR_TWO = 2.0,

}
export const daysOfWeek = [
    UsersAvailability.DayOfWeekEnum.MON,
    UsersAvailability.DayOfWeekEnum.TUE,
    UsersAvailability.DayOfWeekEnum.WED,
    UsersAvailability.DayOfWeekEnum.THU,
    UsersAvailability.DayOfWeekEnum.FRI,
    UsersAvailability.DayOfWeekEnum.SAT,
    UsersAvailability.DayOfWeekEnum.SUN,
];
export interface UserWithMarkers extends User {
    markers?: UsersMarker[];
}
export interface CreatePackageWizardFormStep1 {
    plan: NewPackage.TypeEnum;
    title: string;
    startWeek: string;
    student: string;
    numberWeeks: number | string;
    numberHours: number | string;
}

export interface CreatePackageWizardFormStep2 {
    students: number[];
    teacher: string;
}
export class PackageCreateStore {
    @observable selectedPlan: NewPackageTypeEnum = NewPackageTypeEnum.INDIVIDUAL;
    @observable packageStepsCounter: number = 0;
    @observable maxPageCountInStepper: number = 2;
    @observable lessonsDuration: LessonsDurationEnum = LessonsDurationEnum.HOUR;
    @observable selectedStudentsId: number[] = [];
    @observable multiplier: number = 1;
    @observable userId: number;
    @observable selectedTime: string[] = [];
    @observable createPackageResult: boolean = false;
    @observable numberHours: number = 1;
    @observable maxNumberHours: number = 20;
    @observable minNumberHours: number = 1;
    @observable numberWeeks: number = 1;
    @observable maxNumberWeeks: number = 30;
    @observable minNumberWeeks: number = 1;
    @observable startWeek: string;
    @observable name: string;
    @observable id: number;
    @observable lessonsCountToReschedule: number = null;

    @observable lessons$: ILazyObservable<User> = lazyObservable((sink) => {
        if (!this.userId) {
            sink(undefined);
            return;
        }
        this.userApi().usersIdGet(this.userId, 'lessons').then((response) => {
            sink(response.data);
        });
    });

    @observable students$: ILazyObservable<User[]> = lazyObservable((sink) => {
        this.meApi().meRelationsGet('STUDENT').then((response) => {
            sink(response.data);
        });
    });

    @observable teachers$: ILazyObservable<User[]> = lazyObservable((sink) => {
        // const query: string = `{"markers": [["code", "=", "${this.selectedPlan}"]]}`;
        // this.userApi().usersGet(0, 30, query, undefined, undefined, 'markers', undefined, undefined, undefined).then((response) => {
        //     sink(response.data);
        // });
        this.packageApi().packagesIdTeachersSuggestionsGet(this.id).then((response) => sink(response.data));
    });

    @observable trialPackages$: ILazyObservable<ModelPackage[]> = lazyObservable((sink) => {
        this.packageApi().packagesGet(0, 5 , '{"": [["type", "=", "TRIAL"]]}').then((response) => sink(response.data));
    });

    @observable availableTime$: ILazyObservable<UsersAvailability[]> = lazyObservable((sink) => {
        if (!this.userId) {
            sink(undefined);
            return;
        }
        this.userApi().usersIdFreeAvailabilitiesGet(this.userId).then((response) => {
            const SECONDS_IN_HOUR: number = 3600;
            const SECONDS_IN_HALF_HOUR: number = 1800;

            if (response.data.length === 0) {
                return [];
            }

            // concat to time-blocks
            const concatAvailabilities: UsersAvailability[] = [];
            let availabilities: UsersAvailability[] = [];

            let cAv: UsersAvailability;
            response.data.forEach((av, idx) => {
                    if (cAv === undefined) {
                        cAv = av;
                        return;
                    }
                    if (cAv.day_of_week === av.day_of_week && av.date === cAv.date + cAv.duration) {
                        cAv = {...cAv, duration: av.duration + cAv.duration};
                    } else {
                        concatAvailabilities.push(cAv);
                        cAv = av;
                    }
            });
            if (cAv !== undefined) {
                concatAvailabilities.push(cAv);
            }
            // split & check lessonsDuration
            concatAvailabilities.forEach((av) => {
                for (let i = av.date; i <= av.date + av.duration - this.lessonsDuration * SECONDS_IN_HOUR; i += SECONDS_IN_HALF_HOUR) {
                    availabilities.push(
                        {
                            ...av,
                            date: i,
                            duration: this.lessonsDuration,
                        });
                }
            });

            // correct timezones teacher-partner
            availabilities = availabilities.map((av) => {
                av.date = av.date - this.teacher.tz_shift + UserStore.me$.current().tz_shift;
                let dIdx = daysOfWeek.indexOf(av.day_of_week);

                if (av.date >= 24 * 3600) {
                    dIdx++;
                    av.day_of_week = daysOfWeek [ dIdx > daysOfWeek.length - 1 ? 0 : dIdx];
                    av.date = av.date - 24 * 3600;
                } else if (av.date < 0) {
                    dIdx--;
                    av.day_of_week = daysOfWeek [ dIdx < 0 ? daysOfWeek.length - 1 : dIdx];
                    av.date = av.date + 24 * 3600;
                }
                return av;
            });
            sink(availabilities);
        });
    });

    @computed get teacher(): User {
        return this.teachers$.current().find((teacher) => teacher.id === this.userId);
    }

    @computed get firstLessonDate(): moment.Moment {
        if (this.selectedTime.length === 0) {
            return undefined;
        }
        const time = this.selectedTime[0].split(':');
        const dIdx = daysOfWeek.map((dow) => dow.toString()).indexOf(time[2]);
         // console.log(time, dIdx, moment().weekday(dIdx + 7));
        return moment().hour(parseInt(time[0], 10)).minutes(parseInt(time[1], 10)).isoWeekday(dIdx + 8);
    }

    @observable userRate$: ILazyObservable<UsersRate[]> = lazyObservable((sink) => {
        if (!this.userId) {
            sink(undefined);
            return;
        }
        this.userApi().usersIdRateGet(this.userId, 0, 100).then((response) => {
            sink(response.data);
        });
    });

    constructor(
        protected authService = AuthService(),
        protected userApi = userApiService,
        protected packageApi = packageApiService,
        protected meApi = meApiService,
        protected packageStore = PackageStore,
        protected userStore = UserStore,
    ) {
    }

    @action('init') init(): void {
        this.createPackageResult = false;
        this.packageStepsCounter = 0;
        this.id = undefined;
        this.changeSelectedPlan(UserStore.trialMode ? NewPackage.TypeEnum.TRIAL : NewPackage.TypeEnum.INDIVIDUAL);
    }

    @action('setUserId') setUserId(id: number): void {
        this.createPackageResult = false;
        this.userId = id;

        this.setSelectedTime([]);
    }

    @action('selectTime') selectTime(time: string): void {
        const times: string[] = this.selectedTime.slice();
        const exist: number = times.indexOf(time);

        if (exist === -1) {
            if (this.needToChooseLessonsCount > 0) {
                times.push(time);
            }
        } else {
            times.splice(exist, 1);
        }
        this.setSelectedTime(times);
    }

    @action('setSelectedTime') setSelectedTime(times: string[]): void {
        this.selectedTime = times;
    }

    @action('createPackageSuccess') createPackageSuccess(): void {
        this.createPackageResult = true;
    }

    @action('clearCreatePackageStore') clearCreatePackageStore(): void {
        this.init();
        this.setUserId(null);
        this.setStartWeek(null);
        this.clearSelectedStudents();
        this.setNumberWeeks('' + this.minNumberWeeks);
        this.setNumberHours('' + this.minNumberHours);
        this.setNeedToChooseLessonsCount(null);
        this.setName('');
    }

    @action('createPackage') async createPackage(data: NewPackage): Promise<void> {
        const response = await this.packageApi().packagesPost(data);
        this.packageStore.packagesExtended$.refresh();
        await this.loadPackage(response.data.id);
        this.incrementPackageStepsCounter();
    }
    @action('schedulePackage') async schedulePackage(availability: NewLessonsForPackageAvailability[]): Promise<void> {
        const response = await this.packageApi().packagesIdSchedulePost(this.id, {availability, teacher_id: this.userId});
        this.packageStore.packagesExtended$.refresh();
        this.incrementPackageStepsCounter();
    }

    @action('loadPackage') async loadPackage(id: number): Promise<void>  {
        const { data } =  await this.packageApi().packagesIdGet(id);
        this.changeSelectedPlan(data.type);
        this.setNumberHours(data.number_of_hours.toString());
        this.setNumberWeeks(data.number_of_weeks.toString());
        this.id = id;
    }

    @action('setStartWeek') setStartWeek(startWeek: string): void {
        this.startWeek = startWeek;
    }

    @action('setName') setName(name: string): void {
        this.name = name;
    }

    @action('changeSelectedPlan') changeSelectedPlan(value: NewPackageTypeEnum): void {
        if (NewPackageTypeEnum.TRIAL === value) {
            this.lessonsDuration = LessonsDurationEnum.HOUR;
            this.setNumberWeeks('2');
            this.setNumberHours('1');
            this.setStartWeek(moment().format('YYYY-MM-DD HH:mm:ss'));
        }
        this.clearSelectedStudents();
        this.selectedPlan = value;
    }

    @action('changeLessonsDuration') changeLessonsDuration(value: LessonsDurationEnum): void {
        this.lessonsDuration = value;
        this.availableTime$.refresh();
        this.setSelectedTime([]);
    }

    @action('incrementPackageStepsCounter') incrementPackageStepsCounter(): void {
        this.packageStepsCounter++;
    }
    @action('setPackageStepsCounter') setPackageStepsCounter(counter: number): void {
        this.packageStepsCounter = counter;
    }
    @action('setStudentAsSelected') setStudentAsSelected(id: number): void {
        const selectedStudents: number[] = this.selectedStudentsId.slice();

        if (selectedStudents.includes(id)) {
            return;
        }
        selectedStudents.push(id);
        this.selectedStudentsId = selectedStudents;
    }

    @action('clearSelectedStudents') clearSelectedStudents(): void {
        this.selectedStudentsId = [];
    }

    @action('deleteFromSelectedStudents') deleteFromSelectedStudents(id: number): void {
        const index: number = this.selectedStudentsId.findIndex((el) => el === id);
        this.selectedStudentsId.splice(index, 1);
    }

    @action('setNumberHours') setNumberHours(value: string): void {
        const valueAsNumber: number = parseFloat(value);
        const isNumber: boolean = !isNaN(valueAsNumber);

        switch (true) {
            case (isNumber && valueAsNumber >= this.maxNumberHours): {
                this.numberHours = this.maxNumberHours;
                break;
            }
            case (isNumber && valueAsNumber <= this.minNumberHours): {
                this.numberHours = this.minNumberHours;
                break;
            }
            case (isNumber): {
                this.numberHours = valueAsNumber;
                break;
            }
        }
    }

    @action('setNumberWeeks') setNumberWeeks(value: string): void {
        const valueAsNumber: number = parseFloat(value);
        const isNumber: boolean = !isNaN(valueAsNumber);

        switch (true) {
            case (isNumber && valueAsNumber >= this.maxNumberWeeks): {
                this.numberWeeks = this.maxNumberWeeks;
                break;
            }
            case (isNumber && valueAsNumber <= this.minNumberWeeks): {
                this.numberWeeks = this.minNumberWeeks;
                break;
            }
            case (isNumber): {
                this.numberWeeks = valueAsNumber;
                break;
            }
        }
    }

    @action('setNeedToChooseLessonsCount') setNeedToChooseLessonsCount(value: number): void {
        this.lessonsCountToReschedule = value;
    }
    @computed get trialAvailable(): boolean {
        if (this.userStore.trialMode === false) {
            return false;
        }
        return this.trialPackages$.current() && this.trialPackages$.current().length <= 2 && this.userStore.trialMode;
    }

    @computed get isLastPageInStepper(): boolean {
        return this.packageStepsCounter >= this.maxPageCountInStepper;
    }

    @computed get totalPackagePriceCalc(): number {
        const usersRate$: UsersRate[] = this.userRate$.current();
        const defaultRate: number = 1;
        const currentRate: number = (
            usersRate$ && usersRate$.length
                ? usersRate$[usersRate$.length - 1].individual_rate
                : defaultRate
        );

        return this.multiplier * this.lessonsDuration * this.numberHours * currentRate;
    }

    @computed get selectedStudents(): number[] {
        return Array.from(this.selectedStudentsId);
    }

    @computed get needToChooseLessonsCount(): number {
        const choosedTime: number = this.selectedTime.length;
        // const needToRound: boolean = this.numberHours % this.lessonsDuration !== 0;
        const lessonsCount: number = Math.ceil(this.numberHours  / this.numberWeeks / this.lessonsDuration);

        if (this.lessonsCountToReschedule) {
            return this.lessonsCountToReschedule;
        }

        // if (needToRound) {
        //     lessonsCount = Math.floor(lessonsCount) + 1;
        // }

        return lessonsCount - choosedTime;
    }

    @computed get disableSubmitButton(): boolean {
        return !(this.needToChooseLessonsCount === 0);
    }
}

const packageCreateStore = new PackageCreateStore();

reaction(() => packageCreateStore.userId, (userId) => {
    if (userId) {
        packageCreateStore.availableTime$.refresh();
        packageCreateStore.userRate$.refresh();
        packageCreateStore.lessons$.refresh();
        // packageCreateStore.init();
    }
});
reaction(() => UserStore.meId, (userId: number) => {
    packageCreateStore.init();
});
export default packageCreateStore;
