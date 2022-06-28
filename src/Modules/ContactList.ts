import {
    IContactListCreateRequest,
    IContactListResponse,
    IContactListsGetParams,
    IContactListsResponse,
    IContactListUpdateRequest,
    IContactsInListResponse
} from "../types";
import {ContactListCreateSchema, ContactListUpdateSchema} from "../schema";

export interface IContactListModule {
    create (params: IContactListCreateRequest): Promise<IContactListResponse>
    update (params: Partial<IContactListUpdateRequest>): Promise<IContactListResponse>
    get (id: string): Promise<IContactListResponse>
    getContactLists (params: IContactListsGetParams): Promise<IContactListsResponse>
    getContactsInList (params: IContactListsGetParams): Promise<IContactsInListResponse>
    delete (id: string): Promise<IContactListResponse>
}

export default {
    prefix: 'contactList',

    create (params: IContactListCreateRequest): Promise<IContactListResponse> {
        const { error } = ContactListCreateSchema.validate(params);

        if (error) {
            throw Error(error.message)
        }

        return this.request(`${this.prefix}/create`, { method: 'post', body: params })
    },

    update (params: IContactListUpdateRequest): Promise<IContactListResponse> {
        const { error } = ContactListUpdateSchema.validate(params);

        if (error) {
            throw Error(error.message)
        }

        return this.request(`${this.prefix}/update`, { method: 'post', body: params })
    },

    get (id: string): Promise<IContactListResponse> {
        return this.request(`${this.prefix}/get`, { method: 'get', params: { id } })
    },

    getContactLists (params: IContactListsGetParams): Promise<IContactListsResponse> {
        return this.request(`${this.prefix}/getContactLists`, { method: 'get', params  })
    },

    getContactsInList (params: IContactListsGetParams): Promise<IContactsInListResponse> {
        return this.request(`${this.prefix}/getContactsInContactlist`, { method: 'get', params  })
    },

    delete (id: string): Promise<IContactListResponse> {
        return this.request(`${this.prefix}/delete`, { method: 'delete', params: { id } })
    },
}
