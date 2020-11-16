# Unsplash

[![npm](https://img.shields.io/npm/v/unsplash-js.svg?style=flat-square)](https://www.npmjs.com/package/unsplash-js)
[![Travis](https://img.shields.io/travis/unsplash/unsplash-js/master.svg?style=flat-square)](https://travis-ci.org/unsplash/unsplash-js/branches)

Official Javascript wrapper for the [Unsplash API](https://unsplash.com/developers).

Before using the Unsplash API, you need to [register as a developer](https://unsplash.com/developers) and read the [API Guidelines](https://help.unsplash.com/api-guidelines/unsplash-api-guidelines).

## Quick start

Quick links to methods you're likely to care about:

- [Get a list of new photos](#photos-all) 🎉
- [Get a random photo](#photo-random) 🎑
- [Trigger a photo download](#track-download) 📡
- [Search for a photo by keyword](#search-photos) 🕵️‍♂️

**Note:** Every application must abide by the [API Guidelines](https://help.unsplash.com/api-guidelines/unsplash-api-guidelines). Specifically, remember to [hotlink images](https://help.unsplash.com/api-guidelines/more-on-each-guideline/guideline-hotlinking-images), [attribute photographers](https://help.unsplash.com/api-guidelines/more-on-each-guideline/guideline-attribution), and [trigger a download when appropriate](https://help.unsplash.com/api-guidelines/more-on-each-guideline/guideline-triggering-a-download).

## Documentation

- [Installation](https://github.com/unsplash/unsplash-js#installation)
- [Dependencies](https://github.com/unsplash/unsplash-js#dependencies)
- [Usage](https://github.com/unsplash/unsplash-js#usage)
- [Instance Methods](https://github.com/unsplash/unsplash-js#instance-methods)
- [Helpers](https://github.com/unsplash/unsplash-js#helpers)

## Installation

```bash
$ npm i --save unsplash-js
# or
$ yarn add unsplash-js
```

## Dependencies

This library depends on [fetch](https://fetch.spec.whatwg.org/) to make requests to the Unsplash API. For environments that don't support fetch, you'll need to provide a [polyfill](https://github.com/bitinn/node-fetch).

```js
// ES Modules syntax
import fetch from 'node-fetch';
global.fetch = fetch;

// require syntax
const fetch = require('node-fetch');
global.fetch = fetch;
```

Note: we recommend using a version of `node-fetch` higher than `2.4.0` to benefit from Brotli compression.

## Usage

If you're using `unsplash-js` publicly in the browser, you'll need to proxy your requests through your server to sign the requests with the Access Key and/or Secret Key to abide by the [API Guideline](https://help.unsplash.com/articles/2511245-unsplash-api-guidelines) to keep keys confidential.

### Creating an instance

To create an instance, simply provide an _Object_ with your `accessKey`:

```js
// ES Modules syntax
import Unsplash, { toJson } from 'unsplash-js';
// require syntax
const Unsplash = require('unsplash-js').default;
const toJson = require('unsplash-js').toJson;

const unsplash = new Unsplash({ accessKey: APP_ACCESS_KEY });

const unsplash = new Unsplash({
  accessKey: APP_ACCESS_KEY,
  // Optionally you can also configure a custom header to be sent with every request
  headers: {
    'X-Custom-Header': 'foo',
  },
  // Optionally if using a node-fetch polyfill or a version of fetch which supports the timeout option, you can configure the request timeout for all requests
  timeout: 500, // values set in ms
});
```

_Credentials can be obtained from [Unsplash Developers](https://unsplash.com/developers)._

---

### Error handling

```js
unsplash.users.profile('naoufal').catch(err => {
  // Your flawless error handling code
});
```

---

## Instance Methods

- [Search](https://github.com/unsplash/unsplash-js#search)
- [Photos](https://github.com/unsplash/unsplash-js#photos)
- [Users](https://github.com/unsplash/unsplash-js#users)
- [Collections](https://github.com/unsplash/unsplash-js#collections)
- [User Authorization](https://github.com/unsplash/unsplash-js#user-authorization)
- [Current User](https://github.com/unsplash/unsplash-js#current-user)

All the instance methods below make use of the `toJson` helper method described [below](https://github.com/unsplash/unsplash-js#tojsonres)

---

<div id="search" />

<div id="search-photos" />

### search.photos(keyword, page, per_page, options)

Get a list of photos matching the keyword. [See endpoint docs 🚀](https://unsplash.com/documentation#search-photos)

**Arguments**

| Argument                    | Type     | Optional/Required | Default    |
| --------------------------- | -------- | ----------------- | ---------- |
| **`keyword`**               | _string_ | Required          |            |
| **`page`**                  | _number_ | Optional          | 1          |
| **`per_page`**              | _number_ | Optional          | 10         |
| **`options`**               | _object_ | Optional          |            |
| **`options.orientation`**   | _string_ | Optional          |            |
| **`options.contentFilter`** | _string_ | Optional          | "low"      |
| **`options.color`**         | _string_ | Optional          |            |
| **`options.orderBy`**       | _string_ | Optional          | "relevant" |
| **`options.collections`**   | _array_  | Optional          |            |
| **`options.lang`**          | _string_ | Optional          | "en"       |

See the [API documentation for the possible option values](https://unsplash.com/documentation#parameters-16).

**Example**

```js
unsplash.search
  .photos('dogs', 1, 10, { orientation: 'portrait', color: 'green' })
  .then(toJson)
  .then(json => {
    // Your code
  });
```

### search.users(keyword, page, per_page)

Get a list of users matching the keyword. [See endpoint docs 🚀](https://unsplash.com/documentation#search-users)

**Arguments**

| Argument       | Type     | Opt/Required | Default |
| -------------- | -------- | ------------ | ------- |
| **`keyword`**  | _string_ | Required     |         |
| **`page`**     | _number_ | Optional     | 1       |
| **`per_page`** | _number_ | Optional     | 10      |

**Example**

```js
unsplash.search
  .users('steve', 1)
  .then(toJson)
  .then(json => {
    // Your code
  });
```

### search.collections(keyword, page, per_page)

Get a list of collections matching the keyword. [See endpoint docs 🚀](https://unsplash.com/documentation#search-collections)

**Arguments**

| Argument       | Type     | Opt/Required | Default |
| -------------- | -------- | ------------ | ------- |
| **`keyword`**  | _string_ | Required     |         |
| **`page`**     | _number_ | Optional     | 1       |
| **`per_page`** | _number_ | Optional     | 10      |

**Example**

```js
unsplash.search
  .collections('dogs', 1)
  .then(toJson)
  .then(json => {
    // Your code
  });
```

---

<div id="photos" />

<div id="photos-all" />

### photos.listPhotos(page, perPage, orderBy)

Get a single page from the list of all photos. [See endpoint docs 🚀](https://unsplash.com/documentation#list-photos)

**Arguments**

| Argument      | Type     | Opt/Required | Default  |
| ------------- | -------- | ------------ | -------- |
| **`page`**    | _number_ | Optional     | 1        |
| **`perPage`** | _number_ | Optional     | 10       |
| **`orderBy`** | _string_ | Optional     | `latest` |

**Example**

```js
unsplash.photos
  .listPhotos(2, 15, 'latest')
  .then(toJson)
  .then(json => {
    // Your code
  });
```

---

### photos.getPhoto(id)

Retrieve a single photo. [See endpoint docs 🚀](https://unsplash.com/documentation#get-a-photo)

**Arguments**

| Argument | Type     | Opt/Required |
| -------- | -------- | ------------ |
| **`id`** | _string_ | Required     |

**Example**

```js
unsplash.photos
  .getPhoto('mtNweauBsMQ')
  .then(toJson)
  .then(json => {
    // Your code
  });
```

---

### photos.getPhotoStats(id)

Retrieve a single photo's stats. [See endpoint docs 🚀](https://unsplash.com/documentation#get-a-photos-statistics)

**Arguments**

| Argument | Type     | Opt/Required |
| -------- | -------- | ------------ |
| **`id`** | _string_ | Required     |

**Example**

```js
unsplash.photos
  .getPhotoStats('mtNweauBsMQ')
  .then(toJson)
  .then(json => {
    // Your code
  });
```

---

<div id="photo-random" />

### photos.getRandomPhoto({ query, username, featured })

Retrieve a single random photo, given optional filters. [See endpoint docs 🚀](https://unsplash.com/documentation#get-a-random-photo)

When using this function, It is recommended to double check the types of the parameters,
in particular for the parameters of type Array<number>.

**Arguments**

Argument 1:
_An Object containing the follow keys:_

| Argument          | Type            | Opt/Required |
| ----------------- | --------------- | ------------ |
| **`query`**       | _string_        | Optional     |
| **`username`**    | _string_        | Optional     |
| **`featured`**    | _boolean_       | Optional     |
| **`collections`** | _Array<number>_ | Optional     |
| **`count`**       | _string_        | Optional     |

**Example**

```js
unsplash.photos
  .getRandomPhoto({ username: 'naoufal' })
  .then(toJson)
  .then(json => {
    // Your code
  });
```

---

### photos.likePhoto(id)

Like a photo on behalf of the logged-in user. This requires the `write_likes` scope. [See endpoint docs 🚀](https://unsplash.com/documentation#like-a-photo)

**Arguments**

| Argument | Type     | Opt/Required |
| -------- | -------- | ------------ |
| **`id`** | _string_ | Required     |

**Example**

```js
unsplash.photos
  .likePhoto('mtNweauBsMQ')
  .then(toJson)
  .then(json => {
    // Your code
  });
```

---

### photos.unlikePhoto(id)

Remove a user’s like of a photo. [See endpoint docs 🚀](https://unsplash.com/documentation#unlike-a-photo)

**Arguments**

| Argument | Type     | Opt/Required |
| -------- | -------- | ------------ |
| **`id`** | _string_ | Required     |

**Example**

```js
unsplash.photos
  .unlikePhoto('mtNweauBsMQ')
  .then(toJson)
  .then(json => {
    // Your code
  });
```

---

<div id="track-download" />

### photos.trackDownload(photo)

Trigger a download of a photo as per the [download tracking requirement of API Guidelines](https://medium.com/unsplash/unsplash-api-guidelines-triggering-a-download-c39b24e99e02). [See endpoint docs 🚀](https://unsplash.com/documentation#track-a-photo-download)

_Note_: this accepts a photo JSON object, not a URL string or photo ID. See the example below for how to pair it with other calls to trigger it.

**Arguments**

| Argument    | Type   | Opt/Required |
| ----------- | ------ | ------------ |
| **`photo`** | _json_ | Required     |

**Example**

```js
unsplash.photos
  .getPhoto('mtNweauBsMQ')
  .then(toJson)
  .then(json => {
    unsplash.photos.trackDownload(json);
  });

// or if working with an array of photos
unsplash.search
  .photos('dogs', 1)
  .then(toJson)
  .then(json => {
    unsplash.photos.trackDownload(json['results'][0]);
  });
```

---

<div id="users" />

### users.profile(username)

Retrieve public details on a given user. [See endpoint docs 🚀](https://unsplash.com/documentation#get-a-users-public-profile)

**Arguments**

| Argument       | Type     | Opt/Required |
| -------------- | -------- | ------------ |
| **`username`** | _string_ | Required     |

**Example**

```js
unsplash.users
  .profile('naoufal')
  .then(toJson)
  .then(json => {
    // Your code
  });
```

---

### users.statistics(username, resolution, quantity)

Retrieve statistics for a given user. [See endpoint docs 🚀](https://unsplash.com/documentation#get-a-users-statistics)

**Arguments**

| Argument         | Type     | Opt/Required | Notes                 | Default |
| ---------------- | -------- | ------------ | --------------------- | ------- |
| **`username`**   | _string_ | Required     |
| **`resolution`** | _string_ | Optional     | Currently only `days` | `days`  |
| **`quantity`**   | _string_ | Optional     |                       | 30      |

**Example**

```js
unsplash.users
  .statistics('naoufal', 'days', 30)
  .then(toJson)
  .then(json => {
    // Your code
  });
```

---

### users.photos(username, page, perPage, orderBy, options)

Get a list of photos uploaded by a user. [See endpoint docs 🚀](https://unsplash.com/documentation#list-a-users-photos)

**Arguments**

| Argument                  | Type      | Opt/Required | Notes                               | Default  |
| ------------------------- | --------- | ------------ | ----------------------------------- | -------- |
| **`username`**            | _string_  | Required     |                                     |          |
| **`page`**                | _number_  | Optional     |                                     | 1        |
| **`perPage`**             | _number_  | Optional     |                                     | 10       |
| **`orderBy`**             | _string_  | Optional     | `latest`, `oldest`                  | `latest` |
| **`options`**             | _object_  | Optional     |
| **`options.stats`**       | _boolean_ | Optional     |                                     | `false`  |
| **`options.orientation`** | _string_  | Optional     | `landscape`, `portrait`, `squarish` |

**Example**

```js
unsplash.users
  .photos('naoufal', 1, 10, 'latest', { orientation: 'landscape' })
  .then(toJson)
  .then(json => {
    // Your code
  });
```

---

### users.likes(username, page, perPage, orderBy, options)

Get a list of photos liked by a user. [See endpoint docs 🚀](https://unsplash.com/documentation#list-a-users-liked-photos)

**Arguments**

| Argument                  | Type     | Opt/Required | Notes                               | Default  |
| ------------------------- | -------- | ------------ | ----------------------------------- | -------- |
| **`username`**            | _string_ | Required     |                                     |
| **`page`**                | _number_ | Optional     |                                     | 1        |
| **`perPage`**             | _number_ | Optional     |                                     | 10       |
| **`orderBy`**             | _string_ | Optional     | `latest`, `oldest`                  | `latest` |
| **`options`**             | _object_ | Optional     |                                     |
| **`options.orientation`** | _string_ | Optional     | `landscape`, `portrait`, `squarish` |          |

**Example**

```js
unsplash.users
  .likes('naoufal', 2, 15, 'latest', { orientation: 'landscape' })
  .then(toJson)
  .then(json => {
    // Your code
  });
```

---

### users.collections(username, page, perPage, orderBy)

Get a list of collections created by the user. [See endpoint docs 🚀](https://unsplash.com/documentation#list-a-users-collections)

**Arguments**

| Argument       | Type     | Opt/Required | Notes                    | Default   |
| -------------- | -------- | ------------ | ------------------------ | --------- |
| **`username`** | _string_ | Required     |                          |           |
| **`page`**     | _number_ | Optional     |                          | 1         |
| **`perPage`**  | _number_ | Optional     |                          | 10        |
| **`orderBy`**  | _string_ | Optional     | `published` or `updated` | `updated` |

**Example**

```js
unsplash.users
  .collections('naoufal', 2, 15, 'updated')
  .then(toJson)
  .then(json => {
    // Your code
  });
```

---

<div id="collections" />

### collections.listCollections(page, perPage, orderBy)

Get a single page from the list of all collections. [See endpoint docs 🚀](https://unsplash.com/documentation#list-collections)

**Arguments**

| Argument      | Type     | Opt/Required | Notes              | Default  |
| ------------- | -------- | ------------ | ------------------ | -------- |
| **`page`**    | _number_ | Optional     |                    | 1        |
| **`perPage`** | _number_ | Optional     |                    | 10       |
| **`orderBy`** | _string_ | Optional     | `latest`, `oldest` | `latest` |

**Example**

```js
unsplash.collections
  .listCollections(1, 10, 'latest')
  .then(toJson)
  .then(json => {
    // Your code
  });
```

---

### collections.getCollection(id)

Retrieve a single collection. To view a user’s private collections, the `read_collections` scope is required. [See endpoint docs 🚀](https://unsplash.com/documentation#get-a-collection)

**Arguments**

| Argument | Type     | Opt/Required |
| -------- | -------- | ------------ |
| **`id`** | _number_ | Required     |

**Example**

```js
unsplash.collections
  .getCollection(123456)
  .then(toJson)
  .then(json => {
    // Your code
  });
```

---

### collections.getCollectionPhotos(id, page, perPage, orderBy, options)

Retrieve a collection’s photos. [See endpoint docs 🚀](https://unsplash.com/documentation#get-a-collections-photos)

**Arguments**

| Argument                  | Type     | Opt/Required | Notes                               | Default  |
| ------------------------- | -------- | ------------ | ----------------------------------- | -------- |
| **`id`**                  | _number_ | Required     |                                     |          |
| **`page`**                | _number_ | Optional     |                                     | 1        |
| **`perPage`**             | _number_ | Optional     |                                     | 10       |
| **`orderBy`**             | _string_ | Optional     | `latest`, `oldest`                  | `latest` |
| **`options`**             | _object_ | Optional     |
| **`options.orientation`** | _string_ | Optional     | `landscape`, `portrait`, `squarish` |

**Example**

```js
unsplash.collections
  .getCollectionPhotos(123456, 1, 10, 'latest')
  .then(toJson)
  .then(json => {
    // Your code
  });
```

---

### collections.createCollection(title, description, private)

Create a new collection. This requires the `write_collections` scope. [See endpoint docs 🚀](https://unsplash.com/documentation#create-a-new-collection)

**Arguments**

| Argument          | Type      | Opt/Required |
| ----------------- | --------- | ------------ |
| **`title`**       | _string_  | Required     |
| **`description`** | _string_  | Optional     |
| **`private`**     | _boolean_ | Optional     |

**Example**

```js
unsplash.collections
  .createCollection('Birds', "Wild birds from 'round the world", true)
  .then(toJson)
  .then(json => {
    // Your code
  });
```

---

### collections.updateCollection(id, title, description, private)

Update an existing collection belonging to the logged-in user. This requires the `write_collections` scope. [See endpoint docs 🚀](https://unsplash.com/documentation#update-an-existing-collection)

**Arguments**

| Argument          | Type      | Opt/Required |
| ----------------- | --------- | ------------ |
| **`id`**          | _number_  | Required     |
| **`title`**       | _string_  | Optional     |
| **`description`** | _string_  | Optional     |
| **`private`**     | _boolean_ | Optional     |

**Example**

```js
unsplash.collections
  .updateCollection(
    12345,
    'Wild Birds',
    'Wild birds from around the world',
    false,
  )
  .then(toJson)
  .then(json => {
    // Your code
  });
```

---

### collections.deleteCollection(id)

Delete a collection belonging to the logged-in user. This requires the `write_collections` scope. [See endpoint docs 🚀](https://unsplash.com/documentation#delete-a-collection)

**Arguments**

| Argument | Type     | Opt/Required |
| -------- | -------- | ------------ |
| **`id`** | _number_ | Required     |

**Example**

```js
unsplash.collections
  .deleteCollection(88)
  .then(toJson)
  .then(json => {
    // Your code
  });
```

---

### collections.addPhotoToCollection(collectionId, photoId)

Add a photo to one of the logged-in user’s collections. Requires the `write_collections` scope. [See endpoint docs 🚀](https://unsplash.com/documentation#add-a-photo-to-a-collection)

**Arguments**

| Argument           | Type     | Opt/Required |
| ------------------ | -------- | ------------ |
| **`collectionId`** | _number_ | Required     |
| **`photoId`**      | _string_ | Required     |

**Example**

```js
unsplash.collections
  .addPhotoToCollection(88, 'abc1234')
  .then(toJson)
  .then(json => {
    // Your code
  });
```

---

### collections.removePhotoFromCollection(collectionId, photoId)

Remove a photo from one of the logged-in user’s collections. Requires the `write_collections` scope. [See endpoint docs 🚀](https://unsplash.com/documentation#remove-a-photo-from-a-collection)

**Arguments**

| Argument           | Type     | Opt/Required |
| ------------------ | -------- | ------------ |
| **`collectionId`** | _number_ | Required     |
| **`photoId`**      | _string_ | Required     |

**Example**

```js
unsplash.collections
  .removePhotoFromCollection(88, 'abc1234')
  .then(toJson)
  .then(json => {
    // Your code
  });
```

---

### collections.listRelatedCollections(collectionId)

Lists collections related to the provided one. [See endpoint docs 🚀](https://unsplash.com/documentation#list-a-collections-related-collections)

**Arguments**

| Argument           | Type     | Opt/Required |
| ------------------ | -------- | ------------ |
| **`collectionId`** | _number_ | Required     |

**Example**

```js
unsplash.collections
  .listRelatedCollections(88)
  .then(toJson)
  .then(json => {
    // Your code
  });
```

---

<div id="user-authorization" />

Note: Most endpoints do not need to be authenticated by an individual user to be accessed and can instead be accessed with [public authentication](https://unsplash.com/documentation#public-authentication). Endpoints that require user authentication will be explicitly marked with the required scopes.

When initializing an instance of Unsplash, you'll need to include your application's `secretKey` and `callbackUrl` as defined in the [API documentation](https://unsplash.com/documentation/user-authentication-workflow):

```js
const unsplash = new Unsplash({
  accessKey: '{APP_ACCESS_KEY}',
  secret: '{APP_SECRET}',
  callbackUrl: '{CALLBACK_URL}',
});
```

If you already have a bearer token, you can also provide it to the constructor:

```js
const unsplash = new Unsplash({
  accessKey: '{APP_ACCESS_KEY}',
  secret: '{APP_SECRET}',
  callbackUrl: '{CALLBACK_URL}',
  bearerToken: '{USER_BEARER_TOKEN}',
});
```

Generate an authentication url with the scopes your app requires.

```js
const authenticationUrl = unsplash.auth.getAuthenticationUrl([
  'public',
  'read_user',
  'write_user',
  'read_photos',
  'write_photos',
]);
```

Now that you have an authentication url, you'll want to redirect the user to it.

```js
location.assign(authenticationUrl);
```

After the user authorizes your app she'll be redirected to your callback url with a `code` querystring present. Request an access token using that code.

```js
// The OAuth code will be passed to your callback url as a querystring

unsplash.auth
  .userAuthentication(query.code)
  .then(toJson)
  .then(json => {
    unsplash.auth.setBearerToken(json.access_token);
  });
```

_For more information on the authroization workflow, consult the [Unsplash API Documentation](https://unsplash.com/documentation/user-authentication-workflow)._

---

### auth.getAuthenticationUrl(scopes)

Build an OAuth url with requested scopes.

**Arguments**

| Argument     | Type            | Opt/Required | Default      |
| ------------ | --------------- | ------------ | ------------ |
| **`scopes`** | _Array<string>_ | Optional     | `["public"]` |

**Example**

```js
const authenticationUrl = unsplash.auth.getAuthenticationUrl([
  'public',
  'read_user',
  'write_user',
  'read_photos',
  'write_photos',
]);
```

---

### auth.userAuthentication(code)

Retrieve a user's access token.

**Arguments**

| Argument   | Type     | Opt/Required |
| ---------- | -------- | ------------ |
| **`code`** | _string_ | Required     |

**Example**

```js
unsplash.auth
  .userAuthentication('{OAUTH_CODE}')
  .then(toJson)
  .then(json => {
    // Your code
  });
```

---

### auth.setBearerToken(accessToken)

Set a bearer token on the instance.

**Arguments**

| Argument          | Type     | Opt/Required |
| ----------------- | -------- | ------------ |
| **`accessToken`** | _string_ | Required     |

**Example**

```js
unsplash.auth.setBearerToken('{BEARER_TOKEN}');
```

---

<div id="current-user" />

### currentUser.profile()

Get the user’s profile.

**Arguments**

_N/A_

**Example**

```js
unsplash.currentUser
  .profile()
  .then(toJson)
  .then(json => {
    // Your code
  });
```

---

### currentUser.updateProfile(options)

Update the current user’s profile.

**Arguments**

| Argument      | Type     | Opt/Required | Notes                                                                                                                                |
| ------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| **`options`** | _Object_ | Required     | Object with the following optional keys: `username`, `firstName`, `lastName`, `email`, `url`, `location`, `bio`, `instagramUsername` |

**Example**

```js
unsplash.currentUser
  .updateProfile({
    username: 'drizzy',
    firstName: 'Aubrey',
    lastName: 'Graham',
    email: 'drizzy@octobersveryown.com',
    url: 'http://octobersveryown.com',
    location: 'Toronto, Ontario, Canada',
    bio: 'Views from the 6',
    instagramUsername: 'champagnepapi',
  })
  .then(toJson)
  .then(json => {
    // Your code
  });
```

---

## Helpers

### toJson(res)

**Arguments**

| Argument  | Type     | Opt/Required |
| --------- | -------- | ------------ |
| **`res`** | _Object_ | Required     |

**Example**

```js
import Unsplash, { toJson } from 'unsplash-js';

const unsplash = new Unsplash({
  accessKey: YOUR_ACCESS_KEY,
  secret: YOUR_SECRET_KEY,
});

unsplash.stats
  .total()
  .then(toJson)
  .then(json => {
    // Your code
  });
```
