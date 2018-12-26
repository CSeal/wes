import { observable, action, runInAction } from 'mobx';
import { lazyObservable, ILazyObservable } from 'mobx-utils';
import { AuthService } from '../services/Auth.service';
import { userApiService, packageApiService, meApiService } from '../services';
import {ModelPackage, NewPackageWithLessons, User, UsersAvailability, NewPackage} from '../services/api';
import { CreatePackageWizardFormStep1 } from './PackageCreate.store';

export interface ModelPackageExtended extends ModelPackage {
    students: User[];
}

export class PackageStore {

    @observable packages$: ILazyObservable<ModelPackage[]> = lazyObservable((sink) =>
        this.packageApi().packagesGet(0, 50, undefined, undefined, undefined, 'students').then((response) => sink(response.data)),
    );

    @observable packagesExtended$: ILazyObservable<ModelPackageExtended[]> = lazyObservable((sink) =>
        this.packageApi().packagesGet(0, 50, undefined, 'created_at', 'desc', undefined, undefined, 'PackageWithStudents')
            .then((response) => sink(response.data as ModelPackageExtended[])),
    );

    @observable newPage: object;
    @observable teachers$: ILazyObservable<User[]> = lazyObservable((sink) => {
        this.meApi().meRelationsGet('TEACHER').then((response) => {
            sink(response.data);
        });
    });
    @observable students$: ILazyObservable<User[]> = lazyObservable((sink) => {
        this.meApi().meRelationsGet('STUDENT').then((response) => {
            sink(response.data);
        });
    });
    @observable selectedTime: string[] = [];
    @observable userId: number;
    @observable availableTime$: ILazyObservable<UsersAvailability[]> = lazyObservable((sink) => {
        if (!this.userId) {
            sink(undefined);
            return;
        }
        this.userApi().usersIdAvailabilitiesGet(this.userId, 0, 100).then((response) => {
            sink(response.data);
        });
    });

    constructor(
        protected authService = AuthService(),
        protected userApi = userApiService,
        protected packageApi = packageApiService,
        protected meApi = meApiService,
    ) {}

    @action('createPageStep1') createPageStep1(data: CreatePackageWizardFormStep1): void {
        this.newPage = data;
    }
    @action('selectTime') selectTime(time: string): void {
        const times = this.selectedTime;
        const exist = times.indexOf(time);
        if (exist === -1) {
            times.push(time);
        } else {
            times.splice(exist, 1);
        }
        this.selectedTime = times;
    }
    @action('createPackage') createPackage(data: NewPackageWithLessons): void {
        this.packageApi().packagesPackageWithLessonsPost(data).then(() => {
            this.packagesExtended$.refresh();
        });
    }
    @action('removePackage') async removePackage(id: number): Promise<void> {
        await this.packageApi().packagesIdDelete(id);
        this.packagesExtended$.refresh();
    }
    @action('getAvailableTime') getAvailableTime(userId: number): Promise<UsersAvailability[]> {
        return this.userApi().usersIdAvailabilitiesGet(userId, 0, 100).then((response) => {
            return response.data;
        });
    }
    @action('setUserId') setUserId(id: number): void {
        this.userId = id;
    }
}

const packageStore = new PackageStore();

export default packageStore;
