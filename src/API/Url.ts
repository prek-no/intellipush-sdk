import { IUrlChildRequest, IUrlDetailsResponse, IUrlResponse } from '../Intellipush.types';
import { UrlDetailsSchema, UrlGenerateChildSchema, UrlGenerateSchema } from '../Intellipush.schema';
import ApiBase from './Base';

export interface IUrlModule {
    prefix: string
    generate (url: string): Promise<IUrlResponse>
    generateChild (params: IUrlChildRequest): Promise<IUrlResponse>
    details (id: string): Promise<IUrlDetailsResponse>
}

export default class Url extends ApiBase implements IUrlModule {
    prefix = 'url';

    generate(url: string): Promise<IUrlResponse> {
        const { error } = UrlGenerateSchema.validate(url);

        if (error) {
            throw Error(error.message);
        }

        return this.client.request(`${this.prefix}/generate`, { method: 'post', params: { url } }) as Promise<IUrlResponse>;
    }

    generateChild(params: IUrlChildRequest): Promise<IUrlResponse> {
        const { error } = UrlGenerateChildSchema.validate(params);

        if (error) {
            throw Error(error.message);
        }

        return this.client.request(`${this.prefix}/generateChild`, { method: 'post', body: params }) as Promise<IUrlResponse>;
    }

    details(id: string): Promise<IUrlDetailsResponse> {
        const { error } = UrlDetailsSchema.validate(id);

        if (error) {
            throw Error(error.message);
        }

        return this.client.request(`${this.prefix}/create`, { method: 'get', params: { id } }) as Promise<IUrlDetailsResponse>;
    }
}
