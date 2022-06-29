import { IContactSexType, IContactUpdateRequest } from '../Intellipush.types';

export default class Contact implements IContactUpdateRequest {
    id?: string;
    name!: string;
    phonenumber!: string;
    countrycode!: string;
    email?: string;
    company?: string;
    country?: string;
    param1?: string;
    param2?: string;
    param3?: string;
    sex?: IContactSexType = 'male';
    zipcode?: number = 0;

    constructor(obj: IContactUpdateRequest = {} as IContactUpdateRequest) {
        return Object.assign(this, obj);
    }

    setId(id: string) {
        this.id = id;
        return this;
    }

    setCompany(company: string) {
        this.company = company;
        return this;
    }

    setCountry(country: string) {
        this.country = country;
        return this;
    }

    setCountrycode(countrycode: string) {
        this.countrycode = countrycode;
        return this;
    }

    setEmail(email: string) {
        this.email = email;
        return this;
    }

    setName(name: string) {
        this.name = name;
        return this;
    }

    setParam1(param1: string) {
        this.param1 = param1;
        return this;
    }

    setParam2(param2: string) {
        this.param2 = param2;
        return this;
    }

    setParam3(param3: string) {
        this.param3 = param3;
        return this;
    }

    setPhonenumber(phonenumber: string) {
        this.phonenumber = phonenumber;
        return this;
    }

    setSex(sex: IContactSexType) {
        this.sex = sex;
        return this;
    }
}
