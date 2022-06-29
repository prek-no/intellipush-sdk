import 'isomorphic-unfetch';
import { ClientConfig } from './Intellipush.types';
import IntellipushClient, { IIntellipushClient } from './Intellipush.client';
import {
    Contact,
    ContactList,
    IContactListModule,
    IContactModule,
    ISMSModule,
    ITwoFactorModule,
    IUrlModule,
    IUserModule,
    SMS,
    TwoFactor,
    Url,
    User,
} from './API';

export interface IIntellipush {
    client: IIntellipushClient
    get contact(): IContactModule
    get contactList(): IContactListModule
    get sms(): ISMSModule
    get twoFactor(): ITwoFactorModule
    get url(): IUrlModule
    get user(): IUserModule
    authenticate(): Promise<Response>
    setToken (token: string): void
    getToken (): string
}

export default class Intellipush implements IIntellipush {
    readonly baseApiUrl = 'https://api.intellipush.com';

    readonly client: IIntellipushClient = {} as IIntellipushClient;

    constructor(config: ClientConfig) {
        this.client = new IntellipushClient(config);
    }

    async authenticate(): Promise<Response> {
        return this.client.authenticate();
    }

    get contact(): IContactModule {
        return new Contact(this.client);
    }

    get contactList(): IContactListModule {
        return new ContactList(this.client);
    }

    get sms(): ISMSModule {
        return new SMS(this.client);
    }

    get twoFactor(): ITwoFactorModule {
        return new TwoFactor(this.client);
    }

    get url(): IUrlModule {
        return new Url(this.client);
    }

    get user(): IUserModule {
        return new User(this.client);
    }

    getToken(): string {
        return this.client.getToken();
    }

    setToken(token: string) {
        this.client.setToken(token);
    }
}
