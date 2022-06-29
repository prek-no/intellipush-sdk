import { ISMSCreateRequest } from '../Intellipush.types';

export default class SMS implements ISMSCreateRequest {
    contactId!: string;
    contactlistId!: string;
    countrycode!: string;
    date!: string;
    message!: string;
    phonenumber!: string;
    time!: string;

    constructor(obj: ISMSCreateRequest) {
        return Object.assign(this, obj);
    }

    setContactId(contactId: string) {
        this.contactId = contactId;
        return this;
    }

    setContactlistId(contactListId: string) {
        this.contactlistId = contactListId;
        return this;
    }

    setCountrycode(countrycode: string) {
        this.countrycode = countrycode;
        return this;
    }

    setDate(date: string) {
        this.date = date;
        return this;
    }

    setMessage(message: string) {
        this.message = message;
        return this;
    }

    setPhonenumber(phonenumber: string) {
        this.phonenumber = phonenumber;
        return this;
    }

    setTime(time: string) {
        this.time = time;
        return this;
    }
}
