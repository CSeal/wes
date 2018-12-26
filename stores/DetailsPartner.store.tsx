import { observable, action, runInAction, computed, reaction } from 'mobx';
import { lazyObservable, ILazyObservable } from 'mobx-utils';
import { userApiService, meApiService, userToUserApiService } from '../services';
import { UsersBalance, Transaction } from '../services/api';
import { UserRole } from '../interfaces/UserRole.interface';
import UserStore from './User.store';
import ProfilesStore from './Profiles.store';

export interface UsersBalanceExtended extends UsersBalance {
    transaction: Transaction;
}

export class DetailsPartnerStore {
    @observable currentProfileId: number;

    @observable balances$: ILazyObservable<UsersBalanceExtended[]> = lazyObservable((sink) => {
        if (!this.currentProfileId) {
            sink(undefined);
            return;
        }
        this.userApi().usersIdBalanceGet(this.currentProfileId, 0, 10, undefined, undefined, undefined, 'transaction').then((response) => {
            return sink(response.data as UsersBalanceExtended[]);
        });
    });

    constructor (
        protected userApi = userApiService,
    ) {
    }

    @action('changeProfileId') changeProfileId(id: number) {
        this.currentProfileId = id;
        [
            this.balances$,
        ].forEach((lazy) => {
            lazy.reset();
            lazy.refresh();
        });
    }
    @action('usersIdAddBalance') async addBalance(amount: number): Promise<void> {
        await this.userApi().usersIdBalancePost(this.currentProfileId, {balance: amount});
        this.balances$.refresh();
        UserStore.me$.refresh();
    }

}

const detailsPartnerStore = new DetailsPartnerStore();

reaction(() => ProfilesStore.currentProfile && ProfilesStore.currentProfile && ProfilesStore.currentProfile.id, (currentProfileId: number) => {
    // detect profile changes and update all observables
    if (currentProfileId !== undefined) {
        detailsPartnerStore.changeProfileId(currentProfileId);
    }
});

export default detailsPartnerStore;
