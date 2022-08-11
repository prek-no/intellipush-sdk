import { ITwoFactorGenerateRequest, ITwoFactorValidateRequest } from '../Intellipush.types';

export default class TwoFactor implements ITwoFactorGenerateRequest, ITwoFactorValidateRequest {
    code!: string;
    countrycode!: string;
    message_pre_code!: string;
    message_post_code!: string;
    phonenumber!: string;

    constructor(obj: ITwoFactorGenerateRequest | ITwoFactorValidateRequest = {} as ITwoFactorGenerateRequest | ITwoFactorValidateRequest) {
        return Object.assign(this, obj);
    }

    setCode(code: string) {
        this.code = code;
        return this;
    }

    setCountrycode(countrycode: string) {
        this.countrycode = countrycode;
        return this;
    }

    setMessagePreCode(message_p1: string) {
        this.message_pre_code = message_p1;
        return this;
    }

    setMessagePostCode(message_p2: string) {
        this.message_post_code = message_p2;
        return this;
    }

    setPhonenumber(phonenumber: string) {
        this.phonenumber = phonenumber;
        return this;
    }
}
