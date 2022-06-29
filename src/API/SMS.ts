import {
    ISMSCreateBatchRequest,
    ISMSCreateRequest,
    ISMSResponse,
} from '../Intellipush.types';
import { SMSCreateBatchSchema, SMSCreateSchema } from '../Intellipush.schema';
import ApiBase from './Base';

export interface ISMSModule {
    create (params: ISMSCreateRequest): Promise<ISMSResponse>
    createBatch (params: ISMSCreateBatchRequest): Promise<ISMSResponse>
    get (id: string): Promise<ISMSResponse>
    status (ids: number[] | string[]): Promise<ISMSResponse>
}

export default class SMS extends ApiBase implements ISMSModule {
    prefix = 'sms';

    create(params: ISMSCreateRequest): Promise<ISMSResponse> {
        const { error } = SMSCreateSchema.validate(params);

        if (error) {
            throw Error(error.message);
        }

        return this.client.request(`${this.prefix}/create`, { method: 'post', body: params }) as Promise<ISMSResponse>;
    }

    createBatch(params: ISMSCreateBatchRequest): Promise<ISMSResponse> {
        const { error } = SMSCreateBatchSchema.validate(params);

        if (error) {
            throw Error(error.message);
        }

        return this.client.request(`${this.prefix}/createBatch`, { method: 'post', body: params }) as Promise<ISMSResponse>;
    }

    get(id: string): Promise<ISMSResponse> {
        return this.client.request(`${this.prefix}/get`, { method: 'get', params: { id } }) as Promise<ISMSResponse>;
    }

    status(ids: number[] | string[]): Promise<ISMSResponse> {
        return this.client.request(`${this.prefix}/get`, { method: 'post', body: { id_array: ids } }) as Promise<ISMSResponse>;
    }
}
