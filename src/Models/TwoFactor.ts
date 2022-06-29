import { ITwoFactorGenerateRequest, ITwoFactorValidateRequest } from '../Intellipush.types';

export default class TwoFactor implements ITwoFactorGenerateRequest, ITwoFactorValidateRequest {
    code!: string;
    countrycode!: string;
    message_p1!: string;
    message_p2!: string;
    phonenumber!: string;

    constructor(obj: ITwoFactorGenerateRequest | ITwoFactorValidateRequest) {
        Object.assign(this, obj);
    }

    setCode(code: string) {
        this.code = code;
        return this;
    }

    setCountrycode(countrycode: string) {
        this.countrycode = countrycode;
        return this;
    }

    setMessageP1(message_p1: string) {
        this.message_p1 = message_p1;
        return this;
    }

    setMessageP2(message_p2: string) {
        this.message_p2 = message_p2;
        return this;
    }

    setPhonenumber(phonenumber: string) {
        this.phonenumber = phonenumber;
        return this;
    }
}
