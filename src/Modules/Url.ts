import {IUrlChildRequest, IUrlDetailsResponse, IUrlResponse} from "../types";
import {UrlDetailsSchema, UrlGenerateChildSchema, UrlGenerateSchema} from "../schema";

export interface IUrlModule {
    generate (url: string): Promise<IUrlResponse>
    generateChild (params: IUrlChildRequest): Promise<IUrlResponse>
    details (id: string): Promise<IUrlDetailsResponse>
}

export default {
    prefix: 'url',

    generate (url: string): Promise<IUrlResponse> {
        const { error } = UrlGenerateSchema.validate(url);

        if (error) {
            throw Error(error.message)
        }

        return this.request(`${this.prefix}/generate`, { method: 'post', params: url })
    },

    generateChild (params: IUrlChildRequest): Promise<IUrlResponse> {
        const { error } = UrlGenerateChildSchema.validate(params);

        if (error) {
            throw Error(error.message)
        }

        return this.request(`${this.prefix}/generateChild`, { method: 'post', body: params })
    },

    details (id: string): Promise<IUrlDetailsResponse> {
        const { error } = UrlDetailsSchema.validate(id);

        if (error) {
            throw Error(error.message)
        }

        return this.request(`${this.prefix}/create`, { method: 'get', params: id })
    }
}
