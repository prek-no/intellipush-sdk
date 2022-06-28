import {
    IContactCreateRequest,
    IContactResponse,
    IContactsGetParams,
    IContactsResponse,
    IContactUpdateRequest
} from "../types";
import {ContactCreateSchema, ContactUpdateSchema} from "../schema";

export interface IContactModule {
    create (params: IContactCreateRequest): Promise<IContactResponse>
    update (params: Partial<IContactUpdateRequest>): Promise<IContactResponse>
    get (id: string): Promise<IContactResponse>
    getContacts (params: IContactsGetParams): Promise<IContactsResponse>
}

export default {
    prefix: 'contact',

    create (params: IContactCreateRequest): Promise<IContactResponse> {
        const { error } = ContactCreateSchema.validate(params);

        if (error) {
            throw Error(error.message)
        }

        return this.request(`${this.prefix}/create`, { method: 'post', body: params })
    },

    update (params: IContactUpdateRequest): Promise<IContactResponse> {
        const { error } = ContactUpdateSchema.validate(params);

        if (error) {
            throw Error(error.message)
        }

        return this.request(`${this.prefix}/update`, { method: 'post', body: params })
    },

    get (id: string): Promise<IContactResponse> {
        return this.request(`${this.prefix}/get`, { method: 'get', params: { id } })
    },

    getContacts (params: IContactsGetParams): Promise<IContactResponse> {
        return this.request(`${this.prefix}/getContacts`, { method: 'get', params  })
    },
}
