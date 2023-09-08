// eslint-disable-next-line import/no-extraneous-dependencies
import { enc } from 'crypto-js';
import { ClientConfig, RequestOptions } from './Intellipush.types';

export interface IIntellipushClient {
    request(endpoint: string, options: Record<string, any>): Promise<unknown>
    authenticate(): Promise<Response>
    setToken (token: string): void
    getToken (): string
}

export default class IntellipushClient implements IIntellipushClient {
    readonly baseApiUrl = 'https://api.intellipush.com';
    private config: ClientConfig;
    private accessToken: string = '';

    constructor(config: ClientConfig) {
        this.config = config;
    }

    /**
     * Authenticate
     */
    async authenticate(): Promise<Response> {
        const wordArray = enc.Utf8.parse(`${this.config.clientId}:${this.config.clientSecret}`);
        let auth = 'Basic ' + enc.Base64.stringify(wordArray);
        //let auth = 'Basic ' + Buffer.from(`${this.config.clientId}:${this.config.clientSecret}`).toString('base64');

        let headers = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': auth,
        };

        const response = await fetch(`${this.baseApiUrl}/oauth2/token`, {
            method: 'post',
            headers,
            body: 'grant_type=client_credentials',
        });

        const result = await response.json();
        this.setToken(result.access_token);

        return result;
    }

    /**
     * Unified request method
     *
     * @param endpoint
     * @param options
     */
    async request(endpoint: string = '', options: RequestOptions = {} as RequestOptions): Promise<unknown> {
        if (!this.accessToken) {
            throw Error('No access token provided');
        }

        const {
            headers = {},
            method = 'post',
            body = null,
            params = {},
        } = options;

        let queryString = this.serializeQuery(params);
        queryString = queryString ? `?${queryString}` : '';

        const response = await fetch(`${this.baseApiUrl}/restv2/${endpoint}${queryString}`, {
            method,
            headers: {
                ...headers,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.accessToken}`,
            },
            body: body && JSON.stringify(body),
        });

        return response.json();
    }

    private serializeQuery(params: Record<string, any>, prefix?: string): string {
        const query: any = Object.keys(params).map((key) => {
            const value  = params[key];

            if (params.constructor === Array)
                key = `${prefix}[]`;
            else if (params.constructor === Object)
                key = (prefix ? `${prefix}[${key}]` : key);

            if (typeof value === 'object')
                return this.serializeQuery(value, key);
            else
                return `${key}=${encodeURIComponent(value)}`;
        });

        return [].concat.apply([], query).join('&') as string;
    }

    getToken(): string {
        return this.accessToken;
    }

    setToken(token: string) {
        this.accessToken = token;
    }
}
