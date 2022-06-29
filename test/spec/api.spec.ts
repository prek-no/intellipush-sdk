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
            clientId: '1200478',
            clientSecret: '14a06df0c9904fedf78043696d1452e3',
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
