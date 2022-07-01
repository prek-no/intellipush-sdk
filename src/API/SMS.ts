import {
    ISMSCreateBatchRequest,
    ISMSCreateRequest,
    ISMSResponse, ISMSStatusObject,
} from '../Intellipush.types';
import { SMSCreateBatchSchema, SMSCreateSchema } from '../Intellipush.schema';
import ApiBase from './Base';
import { Intellipush } from '../../index';

export interface ISMSModule {
    create (params: ISMSCreateRequest): Promise<ISMSResponse>
    createScheduled (dateTime: Date | string, params: ISMSCreateRequest): Promise<ISMSResponse>
    createBatch (params: ISMSCreateBatchRequest): Promise<ISMSResponse>
    get (id: string): Promise<ISMSResponse>
    status (ids: number[] | string[]): Promise<ISMSStatusObject>
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

    createScheduled(dateTime: Date | string, params: ISMSCreateRequest): Promise<ISMSResponse> {
        const { error } = SMSCreateSchema.validate(params);

        if (error) {
            throw Error(error.message);
        }

        // Create a date object
        const dateObj = Intellipush.dayjs(dateTime);

        // Update params
        params.date = dateObj.format('YYYY-MM-DD');
        params.time = dateObj.format('HH-mm');

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

    status(ids: number[] | string[]): Promise<ISMSStatusObject> {
        return this.client.request(`${this.prefix}/get`, { method: 'post', body: { id_array: ids } }) as Promise<ISMSStatusObject>;
    }
}
