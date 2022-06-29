import { IIntellipushClient } from '../Intellipush.client';

export default abstract class ApiBase {
    client: IIntellipushClient = {} as IIntellipushClient;

    constructor(client: IIntellipushClient) {
        this.client = client;
    }
}
