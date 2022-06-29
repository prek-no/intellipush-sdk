import { IContactListCreateRequest } from '../Intellipush.types';

export default class ContactList implements IContactListCreateRequest {
    name!: string;

    constructor(obj: IContactListCreateRequest) {
        return Object.assign(this, obj);
    }

    setName(name: string) {
        this.name = name;

        return this;
    }
}
