![https://www.intellipush.com/](https://www.intellipush.com/wp-content/uploads/2021/03/IP-logo-mobile.png "Intellipush logo")

# Unofficial Nodejs SDK for [Intellipush](https://www.intellipush.com)

This SDK is actively developed and maintained by [HIRVI](https://hirvi.no) - an official [Intellipush partner](https://www.intellipush.com/partnere/).

> For compatibility with Node.js versions < 12, please install the [globalThis polyfill](https://github.com/es-shims/globalThis).

## Installation

Add `@hirvi/intellipush-sdk` dependency to your project:

```shell
npm install @hirvi/intellipush-sdk
```

or using `Yarn`

```shell
yarn add @hirvi/intellipush-sdk
```

### TypeScript

This package delivers its own typings. If you have any problems with typings, add the package to the `types` array in your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": [
      "@hirvi/intellipush-sdk"
    ]
  }
}
```

## Initialize client

Initialize the Intellipush Client by passing in the credentials:

```typescript
// const globalThis = require('globalthis')(); // uncomment if NodeJS < NodeJS versions < 12
import { Intellipush } from '@hirvi/intellipush-sdk'

const intellipush = new Intellipush({
    clientId: '<client_id>', // e.g process.env.INTELLIPUSH_CLIENT_ID
    clientSecret: '<client_secret>', // e.g process.env.INTELLIPUSH_CLIENT_SECRET
})
```

## Authentication

You can sign in using [OAuth2](https://www.oauth.com/oauth2-servers/access-tokens/client-credentials/) (Client Credentials) by calling the `authenticate` method:

```typescript
// Async
try {
    await intellipush.authenticate()
} catch(err: any) {
    console.log(err)
}

// Promise
intellipush.authenticate().then(() => {
    console.log('Authenticated!')
}).catch(() => {
    console.log('Authentication failed!')
})
```

## Models

This SDK provides you with some convenient data models. All models accepts an object in the constructor as well as some setter functions. See example below.

### Initialize model with an object.

```ts
const contact = new ContactModel({
    name: 'Tim Cook',
    countrycode: '0047',
    phonenumber: '12345678'
})

const result: IContactResponse = await intellipush.contact.create(contact)

console.log(result.data.name)
```

### Initialize without object, use setters
```typescript
const contact = new ContactModel()

contact.setName('Tim cook')
    .setCountrycode('0047')
    .setPhonenumber('12345678')
    .setEmail('tim@example.com')

const result: IContactResponse = await intellipush.contact.create(contact)

console.log(result.data.name)
```

### Initialize with object and override with setters
```typescript
const contact = new ContactModel({
    name: 'Tim Cook',
    countrycode: '0047',
    phonenumber: '12345678'
})

contact.setName('Howard Stewart')

const result: IContactResponse = await intellipush.contact.create(contact)

console.log(result.data.name)
```

### Run without using data model

Since the Data Models is really just an object, you can also pass an object directly to the API methods:

```typescript
const result: IContactResponse = await intellipush.contact.create({
    name: 'Tim Cook',
    countrycode: '0047',
    phonenumber: '12345678'
})

console.log(result.data.name)
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
    - [X] addContact
    - [X] removeContact
    - [X] delete
  - [X] SMS
    - [X] create
    - [X] createScheduled
    - [X] createBatch
    - [X] getPlanned
    - [X] getSent
    - [X] getUnsent
    - [X] getReceived
    - [X] status
    - [X] delete
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
