import {IUserResponse} from "../types";

export interface IUserModule {
    me (): Promise<IUserResponse>
}

export default {
    me (): Promise<IUserResponse> {
        return this.request('user', { method: 'get' })
    }
}
