import {
    IContactCreateRequest,
    IContactResponse,
    IContactsGetParams,
    IContactsResponse,
    IContactUpdateRequest
} from "../types";
import {ContactCreateSchema} from "../schema";

export interface ISMSModule {
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
}
