import { IUserResponse } from '../Intellipush.types';
import ApiBase from './Base';

export interface IUserModule {
    me (): Promise<IUserResponse>
}

export default class User extends ApiBase implements IUserModule {
    me(): Promise<IUserResponse> {
        return this.client.request('user', { method: 'get' }) as Promise<IUserResponse>;
    }
}
