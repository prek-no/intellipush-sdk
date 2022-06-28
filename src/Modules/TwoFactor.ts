import {
    ITwoFactorGenerateRequest,
    ITwoFactorGenerateResponse,
    ITwoFactorValidateRequest,
    ITwoFactorValidateResponse
} from "../types";
import {Url2FAGenerateSchema, Url2FAValidateSchema} from "../schema";

export interface ITwoFactorModule {
    generate (params: ITwoFactorGenerateRequest): Promise<ITwoFactorGenerateResponse>
    validate (params: ITwoFactorValidateRequest): Promise<ITwoFactorValidateResponse>
}

export default {
    prefix: 'twofactor',

    generate (params: ITwoFactorGenerateRequest): Promise<ITwoFactorGenerateResponse> {
        const { error } = Url2FAGenerateSchema.validate(params);

        if (error) {
            throw Error(error.message)
        }

        return this.request(`${this.prefix}/generate`, { method: 'post', body: params })
    },

    validate (params: ITwoFactorValidateRequest): Promise<ITwoFactorValidateResponse> {
        const { error } = Url2FAValidateSchema.validate(params);

        if (error) {
            throw Error(error.message)
        }

        return this.request(`${this.prefix}/validate`, { method: 'post', body: params })
    }
}
