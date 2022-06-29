import {
    IContactCreateRequest,
    IContactResponse,
    IContactsGetParams,
    IContactsResponse,
    IContactUpdateRequest,
} from '../Intellipush.types';
import { ContactCreateSchema, ContactUpdateSchema } from '../Intellipush.schema';
import ApiBase from './Base';

export interface IContactModule {
    create (params: IContactCreateRequest): Promise<IContactResponse>
    update (params: Partial<IContactUpdateRequest>): Promise<IContactResponse>
    get (id: string): Promise<IContactResponse>
    getContacts (params: IContactsGetParams): Promise<IContactsResponse>
    delete (id: string): Promise<IContactResponse>
}

export default class Contact extends ApiBase implements IContactModule {
    prefix = 'contact';

    create(params: IContactCreateRequest): Promise<IContactResponse> {
        const { error } = ContactCreateSchema.validate(params);

        if (error) {
            throw Error(error.message);
        }

        return this.client.request(`${this.prefix}/create`, { method: 'post', body: params }) as Promise<IContactResponse>;
    }

    update(params: IContactUpdateRequest): Promise<IContactResponse> {
        const { error } = ContactUpdateSchema.validate(params);

        if (error) {
            throw Error(error.message);
        }

        return this.client.request(`${this.prefix}/update`, { method: 'post', body: params }) as Promise<IContactResponse>;
    }

    get(id: string): Promise<IContactResponse> {
        return this.client.request(`${this.prefix}/get`, { method: 'get', params: { id } }) as Promise<IContactResponse>;
    }

    getContacts(params: IContactsGetParams): Promise<IContactsResponse> {
        return this.client.request(`${this.prefix}/getContacts`, { method: 'get', params }) as Promise<IContactsResponse>;
    }

    delete(id: string): Promise<IContactResponse> {
        return this.client.request(`${this.prefix}/delete`, { method: 'delete', params: { id } }) as Promise<IContactResponse>;
    }
}
