import Http from '../utils/Http';
import * as localForage from 'localforage';
import {AxiosResponse} from 'axios';

export class AuthServiceSignleton {

    static getInstance() {
        if (!AuthServiceSignleton.instance) {
            AuthServiceSignleton.instance = new AuthServiceSignleton();
        }
        return AuthServiceSignleton.instance;
    }

    private static instance: AuthServiceSignleton;
    token: string = '';
    protected readonly tokenKey = 'token';

    private constructor() {
        // do something construct...
    }

    async getToken(): Promise<AccessToken> {
        return localForage.getItem<string>(this.tokenKey).then((key) => {
            if (!key) {
                throw new Error('Client is not authorized');
            }
            this.keepToken(key);
            return key;
        });

    }
    async retrieveToken(username: string, password: string): Promise<AxiosResponse<any>> {
        return Http.post(process.env.URL_BASE + 'oauth/token', {
            grant_type: 'password',
            client_id: process.env.OAUTH_CLIENT_ID,
            client_secret: process.env.OAUTH_CLIENT_SECRECT,
            username,
            password,
            scope: '',
        })
            .then((response) => {
                if (response.status === 200) {
                    this.token = response.data.access_token;
                    this.keepToken(response.data.access_token);
                }
                return response;
            }, (error) => { throw new Error(error); })
            .catch((error) => { throw new Error('Request failed with ' + error); });
    }
    // TODO: expiring token ?
    async keepToken(token: string): Promise<string> {
        this.token = token;
        if (token) {
            Http.defaults.headers.common.authorization = `X-Bearer ${token}`;
        } else {
            delete Http.defaults.headers.common.authorization;
        }
        return localForage.setItem(this.tokenKey, token);
    }

    async forgetToken(token: string = this.token): Promise<void> {
        return localForage.removeItem(this.tokenKey);
    }
    async forgotPassword(data: string): Promise<boolean> {
        return Http.post(process.env.URL_API + '/me/password/email', {
            email: data,
        }).then((response) => {
            return true;
        });
    }
}

export function AuthService (): AuthServiceSignleton {
    return AuthServiceSignleton.getInstance();
}

interface ITokenResponse {
    access_token: string;
    refresh_token: string;
    expires_in: number;
}

type AccessToken = string;
