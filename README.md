# Unsplash

[![npm](https://img.shields.io/npm/v/unsplash-js.svg?style=flat-square)](https://www.npmjs.com/package/unsplash-js)
[![Travis](https://img.shields.io/travis/unsplash/unsplash-js/master.svg?style=flat-square)](https://travis-ci.org/unsplash/unsplash-js/branches)

Official Javascript wrapper for the [Unsplash API](https://unsplash.com/developers).

Before using the Unsplash API, you need to [register as a developer](https://unsplash.com/developers) and read the [API Guidelines](https://help.unsplash.com/api-guidelines/unsplash-api-guidelines).

**Note:** Every application must abide by the [API Guidelines](https://help.unsplash.com/api-guidelines/unsplash-api-guidelines). Specifically, remember to [hotlink images](https://help.unsplash.com/api-guidelines/more-on-each-guideline/guideline-hotlinking-images), [attribute photographers](https://help.unsplash.com/api-guidelines/more-on-each-guideline/guideline-attribution), and [trigger a download when appropriate](https://help.unsplash.com/api-guidelines/more-on-each-guideline/guideline-triggering-a-download).

## Documentation

- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage](#usage)

## Installation

```bash
$ npm i --save unsplash-js
# or
$ yarn add unsplash-js
```

## Dependencies

This library depends on [fetch](https://fetch.spec.whatwg.org/) to make requests to the Unsplash API, and the [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) to allow you to abort the requests. For environments that don't support fetch, you'll need to provide polyfills of your choosing. Here are the ones we recommend:

- fetch:
  - server: [node-fetch](https://github.com/bitinn/node-fetch)
  - browser: [whatwg-fetch](https://github.com/github/fetch)
- AbortController (same package ):
  - server: [abort-controller](https://github.com/mysticatea/abort-controller#basic)
  - browser: [abort-controller](https://github.com/mysticatea/abort-controller#polyfilling)

```ts
// server
import fetch from 'node-fetch';
import AbortController from 'abort-controller';

global.fetch = fetch;
global.AbortController = AbortController;

// browser
import 'whatwg-fetch';
import 'abort-controller/polyfill';
```

Note: we recommend using a version of `node-fetch` higher than `2.4.0` to benefit from Brotli compression.

## Usage

### Creating an instance

To create an instance, simply provide an _Object_ with your `accessKey`.

NOTE: If you're using `unsplash-js` publicly in the browser, you'll need to proxy your requests through your server to sign the requests with the Access Key to abide by the [API Guideline](https://help.unsplash.com/articles/2511245-unsplash-api-guidelines) to keep keys confidential. We provide an `apiUrl` property that lets you do so:

```ts
import { createApi } from 'unsplash-js';

// server
const unsplash = createApi({
  accessKey: 'MY_ACCESS_KEY',
  // add any additional fetch options here that you want to apply on every request
});

// browser
const unsplash = createApi({
  accessKey: 'MY_ACCESS_KEY',
  apiUrl: 'https://mywebsite.com/unsplash-proxy',
  // add any additional fetch options here that you want to apply on every request
});
```

### Making a request

There are 3 outcomes to a request: error, aborted or success. You can inspect which one you have by reading the `result.type` value:

```ts
const unsplash = createApi({ accessKey: 'MY_ACCESS_KEY' });

unsplash.photos.get({ photoId: 'foo' }).then(result => {
  if (result.type === 'error') {
    console.log('error occurred: ', result.errors[0]);
  } else if (result.type === 'aborted') {
    console.log('fetch request aborted');
  } else if (request.type === 'success') {
    const photo = result.response;
    console.log(photo);
  }
});
```
