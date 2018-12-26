import { observable, action, runInAction, computed } from 'mobx';
import { fromPromise, lazyObservable, ILazyObservable, IPromiseBasedObservable } from 'mobx-utils';
import { AuthService } from '../services/Auth.service';
import {meApiService} from '../services';
/**
 * Auth class
 * It implements fundament user flow: sign in/out and authToken workflow
 * @export
 * @class AuthStore
 */
export class AuthStore {
    @observable isAuthorized: boolean = undefined;
    @observable isInit: boolean = undefined;

    constructor(
        protected authService = AuthService(),
        protected meApi = meApiService,
    ) {
        this.checkAuth();
    }

    @action('checkAuth') checkAuth(): Promise<boolean> {
        return this.authService.getToken().then((token: string) => {
            runInAction(() => this.isAuthorized = true);
            return true;
        }).catch((error: any) => {
            runInAction(() => this.isAuthorized = false);
            return false;
        });
    }

    @action('signIn') signIn(username: string, password: string): Promise<void> {
        this.isAuthorized = undefined;
        return this.authService.retrieveToken(username, password).then((response) => {
            if (response.status === 200) {
                runInAction(() => {
                    this.isAuthorized = true;
                });
            } else {
                runInAction(() => {
                    this.isAuthorized = false;
                });
            }
        });
    }

    @action('signInAs') async signInAs(userId: number): Promise<void> {
        await this.signOut();
        this.isAuthorized = undefined;
        return this.meApi().meUserTokensGet(userId).then((response) => {
                this.isAuthorized = true;
                this.authService
                    .keepToken(response.access_token)
                    .then(() => window.location.href = '/');
                // console.log(response);
        }).catch((err) => {
            this.isAuthorized = false;
            return ;
        });
    }

    @action('signOut') signOut(): Promise<boolean> {
        this.isAuthorized = undefined;
        return this.authService.forgetToken().then(() => {
            runInAction(() => {
                this.isAuthorized = false;

            });
            return true;
        }).catch((err) => {
            runInAction(() => {
                this.isAuthorized = false;
            });
            return false;
        });
    }

    @action initUser(code: string): Promise<boolean> {
        return this.meApi().meInitTokensGet(code).then((res: any) => {
            this.authService.keepToken(res.access_token);
            return this.meApi().meGet().then((response) => {
                runInAction(() => {
                    this.isAuthorized = true;
                });
                return true;
            });
        });
    }
}

const authStore = new AuthStore();

export default authStore;
