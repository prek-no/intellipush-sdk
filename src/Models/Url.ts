import { IUrlChildRequest, IUrlChildTarget } from '../Intellipush.types';

export default class Url implements IUrlChildRequest {
    id!: string;
    target!: IUrlChildTarget;

    constructor(obj: IUrlChildRequest) {
        Object.assign(this, obj);
    }

    setId(id: string) {
        this.id = id;
        return this;
    }

    setTarget(target: IUrlChildTarget) {
        this.target = target;
        return this;
    }
}
