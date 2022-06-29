![https://www.intellipush.com/](https://www.intellipush.com/wp-content/uploads/2021/03/IP-logo-mobile.png "Intellipush logo")

# Unofficial Nodejs SDK for [Intellipush](https://www.intellipush.com)

This SDK is actively developed and maintained by [HIRVI](https://hirvi.no) - an official [Intellipush partner](https://www.intellipush.com/partnere/).

## Installation

For compatibility with Node.js versions < 12, please install the [globalThis polyfill](https://github.com/es-shims/globalThis).

### Via NPM

```bash
npm install @hirvi/intellipush-sdk
```

### Via Yarn

```bash
yarn add @hirvi/intellipush-sdk
```

## Example

```typescript
// const globalThis = require('globalthis')(); // uncomment if NodeJS < NodeJS versions < 12
import { Intellipush } from '@hirvi/intellipush-sdk';

// Initialize client
const intellipush = new Intellipush({
    clientId: process.env.INTELLIPUSH_CLIENT_ID,
    clientSecret: process.env.INTELLIPUSH_CLIENT_SECRET,
})

// OAuth2 authentication
await intellipush.authenticate()

// Create SMS and send
try {
    const result = await intellipush.sms.create({
        message: 'Intellipush rocks!',
        countrycode: '0047',
        phonenumber: '1234567890'
    })

    console.log(result)
} catch (err: any) {
    return console.log(err)
}
```

### Contact - [Swagger Doc](https://api.intellipush.com/restv2/developer/#/contact)

**Create contact**
```typescript
// Initialize and authenticate first. See above.

try {
    const result: IContactResponse = await intellipush.contact.create({
        name: "Tim Apple",
        countrycode: "0047",
        phonenumber: "12345678",
        email: "tim@example.com",
        company: "Apple",
        country: "USA"
    })

    console.log(result) // See IContactCreateRequest
} catch (err: any) {
    return console.log(err)
}
```

**Update contact**
```typescript
// Initialize and authenticate first. See above.

try {
    const result: IContactResponse = await intellipush.contact.update({
        id: "0123456",
        name: "Tim Cook"
    })

    console.log(result) // See IContactResponse
} catch (err: any) {
    return console.log(err)
}
```

**Get single contact**
```typescript
// Initialize and authenticate first. See above.

try {
    const result: IContactResponse = await intellipush.contact.get('0123456')

    console.log(result) // See IContactResponse
} catch (err: any) {
    return console.log(err)
}
```

**List or search for contacts**
```typescript
// Initialize and authenticate first. See above.

try {
    const result: IContactResponse = await intellipush.contact.getContacts({
        items: 10, // Defaults to 20
        page: 1, // Defaults to 1
        query: 'Tim'
    })

    console.log(result) // See IContactsResponse
} catch (err: any) {
    return console.log(err)
}
```

## Development status

- [X] Authentication
  - [X] authenticate
  - [X] getToken
  - [X] setToken
- [X] API Resources
  - [X] Contact
    - [X] create
    - [X] update
    - [X] get
    - [X] getContacts
    - [X] delete
  - [X] ContactList
    - [X] create
    - [X] update
    - [X] get
    - [X] getContactLists
    - [X] getContactsInList
    - [X] delete
  - [X] SMS
    - [X] create
    - [X] createBatch
    - [X] get
    - [X] status
  - [X] TwoFactor
    - [X] generate
    - [X] validate
  - [X] Url
    - [X] generate
    - [X] generateChild
    - [X] details
  - [X] User
    - [X] me

<hr/>

Need help? Feel free to [contact us](https://www.hirvi.no).

[![MIT](https://img.shields.io/badge/License-MIT-teal.svg)](LICENSE)
