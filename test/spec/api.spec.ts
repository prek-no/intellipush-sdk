import { Intellipush } from '../../index';
import { Contact, ContactList, SMS, TwoFactor, Url, User } from '../../src/API';

jasmine.getEnv().addReporter({
    specDone: function (result) {
        console.log('Test: ' + result.fullName);
    },
});

describe('api client', () => {
    it('contains all methods', () => {
        const client = new Intellipush({
            clientId: '123456',
            clientSecret: 'clientsecret123',
        });

        expect(client.authenticate).toBeDefined();
        expect(client.contact).toBeInstanceOf(Contact);
        expect(client.contactList).toBeInstanceOf(ContactList);
        expect(client.sms).toBeInstanceOf(SMS);
        expect(client.twoFactor).toBeInstanceOf(TwoFactor);
        expect(client.url).toBeInstanceOf(Url);
        expect(client.user).toBeInstanceOf(User);
    });
});
