import { observable, action, runInAction, computed, reaction } from 'mobx';
import { lazyObservable, ILazyObservable } from 'mobx-utils';
import { meApiService, statisticsService } from '../services';
import { User, StatisticCountersMonth, StatisticEvaluations, StatisticOwed, UsersStatistic, StatisticPartnerTeacher } from '../services/api';
import UserStore from './User.store';

export class StatisticsStore {

    @observable statisticsCountersMonth$: ILazyObservable<StatisticCountersMonth> = lazyObservable((sink) => {
        this.statisticsApi().statisticsCountersMonthGet().then((response) => {
            sink(response.data);
        });
    });

    @observable statisticsPartner$: ILazyObservable<StatisticPartnerTeacher> = lazyObservable((sink) => {
        this.statisticsApi().statisticsPartnerTeacherGet(UserStore.meId).then((response) => {
            sink(response.data);
        });
    });
    @observable statisticsTeacher$: ILazyObservable<StatisticPartnerTeacher> = lazyObservable((sink) => {
        this.statisticsApi().statisticsPartnerTeacherGet(undefined, UserStore.meId).then((response) => {
            sink(response.data);
        });
    });
    @observable statisticsEvaluations$: ILazyObservable<StatisticEvaluations[]> = lazyObservable((sink) => {
        this.statisticsApi().statisticsEvaluationsGet().then((response) => {
            sink(response.data);
        });
    });

    @observable statisticsOwed$: ILazyObservable<StatisticOwed> = lazyObservable((sink) => {
        this.statisticsApi().statisticsOwedGet().then((response) => {
            sink(response.data);
        });
    });

    @observable statisticsPartnerUsers$: ILazyObservable<UsersStatistic[]> = lazyObservable((sink) => {
        this.statisticsApi().statisticsStudentsGet(UserStore.meId, 0, 50).then((response) => {
            sink(response.data);
        });
    });

    constructor (
        protected meApi = meApiService,
        protected statisticsApi = statisticsService,
    ) {
    }
}

const statisticsStore = new StatisticsStore();

export default statisticsStore;
