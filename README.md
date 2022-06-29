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
await Client.authenticate()

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

Need help? Feel free to [contact us](https://www.hirvi.no).

[![MIT](https://img.shields.io/badge/License-MIT-teal.svg)](LICENSE)
