import {
    IContactListCreateRequest,
    IContactListResponse,
    IContactListsGetParams,
    IContactListsResponse,
    IContactListUpdateRequest,
    IContactsInListResponse, IContactsResponse,
} from '../Intellipush.types';
import { ContactListCreateSchema, ContactListUpdateSchema } from '../Intellipush.schema';
import ApiBase from './Base';

export interface IContactListModule {
    create (params: IContactListCreateRequest): Promise<IContactListResponse>
    update (params: Partial<IContactListUpdateRequest>): Promise<IContactListResponse>
    get (id: string): Promise<IContactListResponse>
    getContactLists (params: IContactListsGetParams): Promise<IContactListsResponse>
    getContactsInList (params: IContactListsGetParams): Promise<IContactsInListResponse>
    addContact (contactListId: number, contactId: number): Promise<IContactsResponse>
    removeContact (contactListId: number, contactId: number): Promise<IContactsResponse>
    delete (id: string): Promise<IContactListResponse>
}

export default class ContactList extends ApiBase implements IContactListModule {
    prefix = 'contactList';

    create(params: IContactListCreateRequest): Promise<IContactListResponse> {
        const { error } = ContactListCreateSchema.validate(params);

        if (error) {
            throw Error(error.message);
        }

        return this.client.request(`${this.prefix}/create`, { method: 'post', body: params }) as Promise<IContactListResponse>;
    }

    update(params: IContactListUpdateRequest): Promise<IContactListResponse> {
        const { error } = ContactListUpdateSchema.validate(params);

        if (error) {
            throw Error(error.message);
        }

        return this.client.request(`${this.prefix}/update`, { method: 'put', body: params }) as Promise<IContactListResponse>;
    }

    get(id: string): Promise<IContactListResponse> {
        return this.client.request(`${this.prefix}/get`, { method: 'get', params: { id } }) as Promise<IContactListResponse>;
    }

    getContactLists(params: IContactListsGetParams): Promise<IContactListsResponse> {
        return this.client.request(`${this.prefix}/getContactLists`, { method: 'get', params }) as Promise<IContactListsResponse>;
    }

    getContactsInList(params: IContactListsGetParams): Promise<IContactsInListResponse> {
        return this.client.request(`${this.prefix}/getContactsInContactlist`, { method: 'get', params }) as Promise<IContactsInListResponse>;
    }

    addContact(contactListId: number, contactId: number): Promise<IContactsResponse> {
        return this.client.request(`${this.prefix}/addContact`, { method: 'post', params: { contactListId, contactId } }) as Promise<IContactsResponse>;
    }

    removeContact(contactListId: number, contactId: number): Promise<IContactsResponse> {
        return this.client.request(`${this.prefix}/removeContact`, { method: 'post', params: { contactListId, contactId } }) as Promise<IContactsResponse>;
    }

    delete(id: string): Promise<IContactListResponse> {
        return this.client.request(`${this.prefix}/delete`, { method: 'delete', params: { id } }) as Promise<IContactListResponse>;
    }
}
