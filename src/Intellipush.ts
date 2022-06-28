import 'isomorphic-unfetch'
import {Contact, IContactModule, ISMSModule, IUserModule, SMS, User} from "./Modules";
import {serializeQuery} from "./utils";
import {ClientConfig, RequestOptions} from "./types";

export interface IIntellipush {
    Contact: IContactModule
    SMS: ISMSModule
    User: IUserModule
    authenticate(): Promise<Response>
    request(endpoint: string, options: Record<string, any>): Promise<Response>
}

export default class Intellipush implements IIntellipush {
    readonly baseApiUrl = 'https://api.intellipush.com'
    private config: ClientConfig
    private accessToken: string

    // Modules
    Contact: IContactModule;
    User: IUserModule;
    SMS: ISMSModule;

    constructor(config: ClientConfig) {
        this.config = config

        Object.assign(this, {
            Contact,
            SMS,
            User
        })
    }

    /**
     * Authenticate
     */
    async authenticate (): Promise<Response> {
        let auth = "Basic " + Buffer.from(`${this.config.clientId}:${this.config.clientSecret}`).toString('base64')

        let headers = {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            "Authorization": auth
        }

        const response = await fetch(`${this.baseApiUrl}/oauth2/token`, {
            method: 'post',
            headers,
            body: 'grant_type=client_credentials'
        });

        const result = await response.json()
        this.accessToken = result.access_token

        return result
    }

    /**
     * Make API Request
     *
     * @param endpoint
     * @param options
     */
    async request(endpoint: string = '', options: RequestOptions = {} as RequestOptions): Promise<Response> {
        if (!this.accessToken) {
            throw Error('No access token provided')
        }

        const {
            headers = {},
            method = 'post',
            body = null,
            params = {}
        } = options

        let queryString = serializeQuery(params)
        queryString = queryString ? `?${queryString}` : ''

        const response = await fetch(`${this.baseApiUrl}/restv2/${endpoint}${queryString}`, {
            method,
            headers: {
                ...headers,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.accessToken}`
            },
            body: body && JSON.stringify(body)
        })

        return response.json()
    }
}
