import {
    ISMSCreateBatchRequest,
    ISMSCreateRequest,
    ISMSResponse
} from "../types";
import {SMSCreateBatchSchema, SMSCreateSchema} from "../schema";

export interface ISMSModule {
    create (params: ISMSCreateRequest): Promise<ISMSResponse>
    createBatch (params: ISMSCreateRequest): Promise<ISMSResponse>
    get (id: string): Promise<ISMSResponse>
    status (ids: number[] | string[]): Promise<ISMSResponse>
}

export default {
    prefix: 'sms',

    create (params: ISMSCreateRequest): Promise<ISMSResponse> {
        const { error } = SMSCreateSchema.validate(params);

        if (error) {
            throw Error(error.message)
        }

        return this.request(`${this.prefix}/create`, { method: 'post', body: params })
    },

    createBatch (params: ISMSCreateBatchRequest): Promise<ISMSResponse> {
        const { error } = SMSCreateBatchSchema.validate(params);

        if (error) {
            throw Error(error.message)
        }

        return this.request(`${this.prefix}/createBatch`, { method: 'post', body: params })
    },

    get (id: string): Promise<ISMSResponse> {
        return this.request(`${this.prefix}/get`, { method: 'get', params: { id } })
    },

    status (ids: number[] | string[]): Promise<ISMSResponse> {
        return this.request(`${this.prefix}/get`, { method: 'post', body: { id_array: ids } })
    }
}
