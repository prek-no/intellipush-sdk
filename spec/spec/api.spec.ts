import { Intellipush } from '../../index';
import { Contact, ContactList, SMS, TwoFactor, Url, User } from '../../src/API';
import { IIntellipush } from '../../src/Intellipush';

jasmine.getEnv().addReporter({
    specDone: function (result) {
        console.log('Test: ' + result.fullName);
    },
});

describe('api client', () => {
    let apiClient: IIntellipush

    beforeEach(() => {
        apiClient = new Intellipush({
            clientId: '123456',
            clientSecret: 'clientsecret123',
        });
    });

    it('contains all methods', () => {
        expect(apiClient.authenticate).toBeDefined();
        expect(apiClient.contact).toBeInstanceOf(Contact);
        expect(apiClient.contactList).toBeInstanceOf(ContactList);
        expect(apiClient.sms).toBeInstanceOf(SMS);
        expect(apiClient.twoFactor).toBeInstanceOf(TwoFactor);
        expect(apiClient.url).toBeInstanceOf(Url);
        expect(apiClient.user).toBeInstanceOf(User);
    });
});
