import {
    ISMSCreateBatchRequest,
    ISMSCreateRequest,
    ISMSGetParams,
    ISMSGetReceivedParams,
    ISMSListResponse,
    ISMSResponse,
    ISMSStatusObject,
    ISMSUpdateRequest,
} from '../Intellipush.types';
import {
    SMSCreateBatchSchema,
    SMSCreateSchema,
    SMSUpdatechema
} from '../Intellipush.schema';
import ApiBase from './Base';
import Intellipush from '../Intellipush';

export interface ISMSModule {
    create (params: ISMSCreateRequest): Promise<ISMSResponse>
    createScheduled (dateTime: Date | string, params: ISMSCreateRequest): Promise<ISMSResponse>
    createBatch (params: ISMSCreateBatchRequest): Promise<ISMSResponse>
    getPlanned (id: string): Promise<ISMSResponse>
    getUnsent (params: ISMSGetParams): Promise<ISMSListResponse>
    getSent (params: ISMSGetParams): Promise<ISMSListResponse>
    getReceived (params: ISMSGetReceivedParams): Promise<ISMSListResponse>
    update (params: ISMSUpdateRequest): Promise<ISMSResponse>
    status (ids: number[] | string[]): Promise<ISMSStatusObject>
    delete (id: string): Promise<ISMSResponse>
}

export default class SMS extends ApiBase implements ISMSModule {
    prefix = 'sms';

    /**
     * Create an SMS, for immediate or future sending.
     *
     * @param params
     */
    create(params: ISMSCreateRequest): Promise<ISMSResponse> {
        const { error } = SMSCreateSchema.validate(params);

        if (error) {
            throw Error(error.message);
        }

        return this.client.request(`${this.prefix}/create`, { method: 'post', body: params }) as Promise<ISMSResponse>;
    }

    /**
     * Create an SMS, for future sending.
     *
     * @param dateTime
     * @param params
     */
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

    /**
     * Create SMS Batch
     *
     * @param params
     */
    createBatch(params: ISMSCreateBatchRequest): Promise<ISMSResponse> {
        const { error } = SMSCreateBatchSchema.validate(params);

        if (error) {
            throw Error(error.message);
        }

        return this.client.request(`${this.prefix}/createBatch`, { method: 'post', body: params }) as Promise<ISMSResponse>;
    }

    /**
     * Update an SMS that is not yet sent.
     *
     * @param params
     */
    update(params: ISMSUpdateRequest): Promise<ISMSResponse> {
        const { error } = SMSUpdatechema.validate(params);

        if (error) {
            throw Error(error.message);
        }

        return this.client.request(`${this.prefix}/update`, { method: 'put', body: params }) as Promise<ISMSResponse>;
    }

    /**
     * Getting a notification that is still unsent.
     *
     * @param id
     */
    getPlanned(id: string): Promise<ISMSResponse> {
        return this.client.request(`${this.prefix}/getPlanned`, { method: 'get', params: { id } }) as Promise<ISMSResponse>;
    }

    /**
     * Get a list of sent SMS messages
     *
     * @param params
     */
    getSent(params: ISMSGetParams): Promise<ISMSListResponse> {
        return this.client.request(`${this.prefix}/getSent`, { method: 'get', params }) as Promise<ISMSListResponse>;
    }

    /**
     * Get a list of unsent SMS messages
     *
     * @param params
     */
    getUnsent(params: ISMSGetParams): Promise<ISMSListResponse> {
        return this.client.request(`${this.prefix}/getUnsent`, { method: 'get', params }) as Promise<ISMSListResponse>;
    }

    /**
     * Get received SMS messages
     *
     * @param params
     */
    getReceived(params: ISMSGetReceivedParams): Promise<ISMSListResponse> {
        return this.client.request(`${this.prefix}/getReceived`, { method: 'get', params }) as Promise<ISMSListResponse>;
    }

    /**
     * Get status for a number of SMS messages
     *
     * @param ids
     */
    status(ids: number[] | string[]): Promise<ISMSStatusObject> {
        return this.client.request(`${this.prefix}/status`, { method: 'post', body: { id_array: ids } }) as Promise<ISMSStatusObject>;
    }

    /**
     * Delete an SMS that is not yet sent.
     *
     * @param id
     */
    delete(id: string): Promise<ISMSResponse> {
        return this.client.request(`${this.prefix}/delete`, { method: 'delete', params: { id } }) as Promise<ISMSResponse>;
    }
}
