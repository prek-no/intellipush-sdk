import {
    ITwoFactorGenerateRequest,
    ITwoFactorGenerateResponse,
    ITwoFactorValidateRequest,
    ITwoFactorValidateResponse,
} from '../Intellipush.types';
import { Url2FAGenerateSchema, Url2FAValidateSchema } from '../Intellipush.schema';
import ApiBase from './Base';

export interface ITwoFactorModule {
    generate (params: ITwoFactorGenerateRequest): Promise<ITwoFactorGenerateResponse>
    validate (params: ITwoFactorValidateRequest): Promise<ITwoFactorValidateResponse>
}

export default class TwoFactor extends ApiBase implements ITwoFactorModule {
    prefix = 'twofactor';

    generate(params: ITwoFactorGenerateRequest): Promise<ITwoFactorGenerateResponse> {
        const { error } = Url2FAGenerateSchema.validate(params);

        if (error) {
            throw Error(error.message);
        }

        return this.client.request(`${this.prefix}/generate`, { method: 'post', body: params }) as Promise<ITwoFactorGenerateResponse>;
    }

    validate(params: ITwoFactorValidateRequest): Promise<ITwoFactorValidateResponse> {
        const { error } = Url2FAValidateSchema.validate(params);

        if (error) {
            throw Error(error.message);
        }

        return this.client.request(`${this.prefix}/validate`, { method: 'post', body: params }) as Promise<ITwoFactorValidateResponse>;
    }
}
