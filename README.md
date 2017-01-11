# Unsplash

[![npm](https://img.shields.io/npm/v/unsplash-js.svg?style=flat-square)](https://www.npmjs.com/package/unsplash-js)
[![Travis](https://img.shields.io/travis/unsplash/unsplash-js/master.svg?style=flat-square)](https://travis-ci.org/unsplash/unsplash-js/branches)
[![Coveralls](https://img.shields.io/coveralls/unsplash/unsplash-js/master.svg?style=flat-square)](https://coveralls.io/github/unsplash/unsplash-js?branch=master)

A [Universal JavaScript](https://medium.com/@mjackson/universal-javascript-4761051b7ae9) wrapper for the [Unsplash API](https://unsplash.com/developers).

## Browser Support

![Chrome](https://raw.github.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/opera/opera_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) |
--- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 10+ ✔ |


## Documentation
- [Installation](https://github.com/unsplash/unsplash-js#installation)
- [Dependencies](https://github.com/unsplash/unsplash-js#dependencies)
- [Usage](https://github.com/unsplash/unsplash-js#usage)
- [Instance Methods](https://github.com/unsplash/unsplash-js#instance-methods)
- [Helpers](https://github.com/unsplash/unsplash-js#helpers)
- [Shoutouts](https://github.com/unsplash/unsplash-js#shoutouts)
- [License](https://github.com/unsplash/unsplash-js#license)

## Installation
```bash
$ npm i --save unsplash-js
```

## Dependencies
This library depends on [fetch](https://fetch.spec.whatwg.org/) to make requests to the Unsplash API.  For environments that don't support fetch, you'll need to provide a [poly](https://github.com/github/fetch)[fill](https://github.com/bitinn/node-fetch).

## Usage
### Creating an instance
To create an instance, simply provide an _Object_ with your `applicationId`, `secret` and `callbackUrl`.

```js
import Unsplash from 'unsplash-js';

const unsplash = new Unsplash({
  applicationId: "{APP_ID}",
  secret: "{APP_SECRET}",
  callbackUrl: "{CALLBACK_URL}"
});
```

If you already have a bearer token, you can also provide it to the constructor.

```js
const unsplash = new Unsplash({
  applicationId: "{APP_ID}",
  secret: "{APP_SECRET}",
  callbackUrl: "{CALLBACK_URL}",
  bearerToken: "{USER_BEARER_TOKEN}"
});
```

_Credentials can be obtained from [Unsplash Developers](https://unsplash.com/developers)._

### React Native
For use with React Native, import from `unsplash-js/native` instead.

```js
import Unsplash from 'unsplash-js/native';
```

---

### Authorization workflow
Generate an authentication url with the scopes your app requires.

```js
const authenticationUrl = unsplash.auth.getAuthenticationUrl([
  "public",
  "read_user",
  "write_user",
  "read_photos",
  "write_photos"
]);
```

Now that you have an authentication url, you'll want to redirect the user to it.

```js
location.assign(authenticationUrl);
```

After the user authorizes your app she'll be redirected to your callback url with a `code` querystring present.  Request an access token using that code.

```js
// The OAuth code will be passed to your callback url as a querystring

unsplash.auth.userAuthentication(query.code)
  .then(toJson)
  .then(json => {
    unsplash.auth.setBearerToken(json.access_token);
  });
```

_For more information on the authroization workflow, consult the [Unsplash Documentation](https://unsplash.com/documentation#authorization-workflow)._

---

### Error handling
```js
unsplash.users.profile("naoufal")
  .catch(err => {
    // Your flawless error handling code
  });
```

---

## Instance Methods
- [Authorization](https://github.com/unsplash/unsplash-js#authorization)
- [Current User](https://github.com/unsplash/unsplash-js#current-user)
- [Users](https://github.com/unsplash/unsplash-js#users)
- [Photos](https://github.com/unsplash/unsplash-js#photos)
- [Categories](https://github.com/unsplash/unsplash-js#categories)
- [Collections](https://github.com/unsplash/unsplash-js#collections)
- [Search](https://github.com/unsplash/unsplash-js#searchallkeyword-page)
- [Stats](https://github.com/unsplash/unsplash-js#stats)

<div id="authorization" />

### auth.getAuthenticationUrl(scopes)
Build an OAuth url with requested scopes.

__Arguments__

| Argument | Type | Opt/Required | Default |
|---|---|---|---|
|__`scopes`__|_Array<string>_|Optional| `["public"]` |

__Example__
```js
const authenticationUrl = unsplash.auth.getAuthenticationUrl([
  "public",
  "read_user",
  "write_user",
  "read_photos",
  "write_photos"
]);
```
---

### auth.userAuthentication(code)
Retrieve a user's access token.

__Arguments__

| Argument | Type | Opt/Required |
|---|---|---|
|__`code`__|_string_|Required|

__Example__
```js
unsplash.auth.userAuthentication("{OAUTH_CODE}")
  .then(toJson)
  .then(json => {
    // Your code
  });
```
---

### auth.setBearerToken(accessToken)
Set a bearer token on the instance.

__Arguments__

| Argument | Type | Opt/Required |
|---|---|---|
|__`accessToken`__|_string_|Required|

__Example__
```js
unsplash.auth.setBearerToken("{BEARER_TOKEN}");
```
---

<div id="current-user" />

### currentUser.profile()
Get the user’s profile.

__Arguments__

_N/A_

__Example__
```js
unsplash.currentUser.profile()
  .then(toJson)
  .then(json => {
    // Your code
  });
```
---

### currentUser.updateProfile(options)
Update the current user’s profile.

__Arguments__

| Argument | Type | Opt/Required |Notes|
|---|---|---|---|
|__`options`__|_Object_|Required|Object with the following optional keys: `username`, `firstName`, `lastName`, `email`, `url`, `location`, `bio`, `instagramUsername`|

__Example__
```js
unsplash.currentUser.updateProfile({
  username: "drizzy",
  firstName: "Aubrey",
  lastName: "Graham",
  email: "drizzy@octobersveryown.com",
  url: "http://octobersveryown.com",
  location: "Toronto, Ontario, Canada",
  bio: "Views from the 6",
  instagramUsername: "champagnepapi"
})
  .then(toJson)
  .then(json => {
    // Your code
  });
```
---

<div id="users" />

### users.profile(username)
Retrieve public details on a given user.

__Arguments__

| Argument | Type | Opt/Required |
|---|---|---|
|__`username`__|_string_|Required|

__Example__
```js
unsplash.users.profile("naoufal")
  .then(toJson)
  .then(json => {
    // Your code
  });
```
---

### users.photos(username, page, perPage, orderBy)
Get a list of photos uploaded by a user.

__Arguments__

| Argument | Type | Opt/Required | Notes |
|---|---|---|---|
|__`username`__|_string_|Required||
|__`page`__|_number_|Optional||
|__`perPage`__|_number_|Optional||
|__`orderBy`__|_string_|Optional|`latest`, `popular` or `oldest`|

__Example__
```js
unsplash.users.photos("naoufal", "popular")
  .then(toJson)
  .then(json => {
    // Your code
  });
```
---

### users.likes(username, page, perPage, orderBy)
Get a list of photos liked by a user.

__Arguments__

| Argument | Type | Opt/Required | Notes |
|---|---|---|---|
|__`username`__|_string_|Required||
|__`page`__|_number_|Optional||
|__`perPage`__|_number_|Optional||
|__`orderBy`__|_string_|Optional|`latest`, `popular` or `oldest`|

__Example__
```js
unsplash.users.likes("naoufal", 2, 15, "popular")
  .then(toJson)
  .then(json => {
    // Your code
  });
```
---

### users.collections(username, page, perPage)
Get a list of collections created by the user.

__Arguments__

| Argument | Type | Opt/Required | Notes |
|---|---|---|---|
|__`username`__|_string_|Required||
|__`page`__|_number_|Optional||
|__`perPage`__|_number_|Optional||

__Example__
```js
unsplash.users.collections("naoufal", 2, 15)
  .then(toJson)
  .then(json => {
    // Your code
  });
```
---

<div id="photos" />

### photos.listPhotos(page, perPage, orderBy)
Get a single page from the list of all photos.

__Arguments__

| Argument | Type | Opt/Required |
|---|---|---|
|__`page`__|_number_|Optional|
|__`perPage`__|_number_|Optional|
|__`orderBy`__|_string_|Optional|`latest`, `popular` or `oldest`|

__Example__
```js
unsplash.photos.listPhotos(2, 15, "latest")
  .then(toJson)
  .then(json => {
    // Your code
  });
```
---

### photos.listCuratedPhotos(page, perPage, orderBy)
Get a single page from the list of the curated photos.

__Arguments__

| Argument | Type | Opt/Required |
|---|---|---|
|__`page`__|_number_|Optional|
|__`perPage`__|_number_|Optional|
|__`orderBy`__|_string_|Optional|`latest`, `popular` or `oldest`|

__Example__
```js
unsplash.photos.listCuratedPhotos(2, 15, "latest")
  .then(toJson)
  .then(json => {
    // Your code
  });
```
---

### photos.searchPhotos(query, category, page, perPage)
Get a single page from a photo search. Optionally limit your search to a set of categories by supplying the category ID’s.

__Arguments__

| Argument | Type | Opt/Required |
|---|---|---|
|__`query`__|_string_|Optional|
|__`category`__|_Array<number>_|Optional|
|__`page`__|_number_|Optional|
|__`perPage`__|_number_|Optional|

__Example__
```js
unsplash.photos.searchPhotos("cats", [11, 88], 1, 15)
  .then(toJson)
  .then(json => {
    // Your code
  });
```
---

### photos.getPhoto(id, width, height, rectangle)
Retrieve a single photo.

__Arguments__

| Argument | Type | Opt/Required |
|---|---|---|
|__`id`__|_string_|Required|
|__`width`__|_number_|Optional|
|__`height`__|_number_|Optional|
|__`rectangle`__|_Array<number>_|Optional|

__Example__
```js
unsplash.photos.getPhoto("mtNweauBsMQ", 1920, 1080, [0, 0, 1920, 1080])
  .then(toJson)
  .then(json => {
    // Your code
  });
```
---

### photos.getPhotoStats(id)
Retrieve a single photo's stats.

__Arguments__

| Argument | Type | Opt/Required |
|---|---|---|
|__`id`__|_string_|Required|

__Example__
```js
unsplash.photos.getPhotoStats("mtNweauBsMQ")
  .then(toJson)
  .then(json => {
    // Your code
  });
```
---

### photos.getRandomPhoto({ width, height, query, username, featured, category })
Retrieve a single random photo, given optional filters.

__Arguments__

_An Object containing the follow keys:_

| Argument | Type | Opt/Required |
|---|---|---|
|__`width`__|_number_|Optional|
|__`height`__|_number_|Optional|
|__`query`__|_string_|Optional|
|__`username`__|_string_|Optional|
|__`featured`__|_boolean_|Optional|
|__`category`__|_Array<number>_|Optional|

__Example__
```js
unsplash.photos.getRandomPhoto({ username: "naoufal" })
  .then(toJson)
  .then(json => {
    // Your code
  });
```
---

### photos.uploadPhoto(photo)
Upload a photo on behalf of the logged-in user. This requires the `write_photos` scope.

__Arguments__

| Argument | Type | Opt/Required |
|---|---|---|
|__`photo`__|_Image Binary_|Required|

__Example__
```js
import { createReadStream } from "fs";

unsplash.photos.uploadPhoto(createReadStream(__dirname + "path/to/image"))
  .then(toJson)
  .then(json => {
    // Your code
  });
```
---

### photos.likePhoto(id)
Like a photo on behalf of the logged-in user. This requires the `write_likes` scope.

__Arguments__

| Argument | Type | Opt/Required |
|---|---|---|
|__`id`__|_string_|Required|

__Example__
```js
unsplash.photos.likePhoto("mtNweauBsMQ")
  .then(toJson)
  .then(json => {
    // Your code
  });
```
---

### photos.unlikePhoto(id)
Remove a user’s like of a photo.

__Arguments__

| Argument | Type | Opt/Required |
|---|---|---|
|__`id`__|_string_|Required|

__Example__
```js
unsplash.photos.unlikePhoto("mtNweauBsMQ")
  .then(toJson)
  .then(json => {
    // Your code
  });
```
---

<div id="categories" />

### categories.listCategories()
Get a list of all photo categories.

__Arguments__

_N/A_

__Example__
```js
unsplash.categories.listCategories()
  .then(toJson)
  .then(json => {
    // Your code
  });
```
---

### categories.category(id)
Retrieve a single category.

__Arguments__

| Argument | Type | Opt/Required |
|---|---|---|
|__`id`__|_string_|Required|

__Example__
```js
unsplash.categories.category(4)
  .then(toJson)
  .then(json => {
    // Your code
  });
```
---

### categories.categoryPhotos(id, page, perPage)
Retrieve a single category’s photos.

__Arguments__

| Argument | Type | Opt/Required |
|---|---|---|
|__`id`__|_string_|Required|
|__`page`__|_number_|Optional|
|__`perPage`__|_number_|Optional|

__Example__
```js
unsplash.categories.categoryPhotos(4, 3, 15)
  .then(toJson)
  .then(json => {
    // Your code
  });
```
---

<div id="collections" />

### collections.listCollections(page, perPage, orderBy)
Get a single page from the list of all collections.

__Arguments__

| Argument | Type | Opt/Required |Notes|
|---|---|---|---|
|__`page`__|_number_|Optional||
|__`perPage`__|_number_|Optional||
|__`orderBy`__|_string_|Optional|`latest`, `popular` or `oldest`|

__Example__
```js
unsplash.collections.listCollections(1, 10, "popular")
  .then(toJson)
  .then(json => {
    // Your code
  });
```
---

### collections.listCuratedCollections(page, perPage)
Get a single page from the list of curated collections.

__Arguments__

| Argument | Type | Opt/Required |
|---|---|---|
|__`page`__|_number_|Optional|
|__`perPage`__|_number_|Optional|

__Example__
```js
unsplash.collections.listCuratedCollections(1, 10)
  .then(toJson)
  .then(json => {
    // Your code
  });
```
---

### collections.listFeaturedCollections(page, perPage)
Get a single page from the list of featured collections.

__Arguments__

| Argument | Type | Opt/Required |
|---|---|---|
|__`page`__|_number_|Optional|
|__`perPage`__|_number_|Optional|

__Example__
```js
unsplash.collections.listFeaturedCollections(1, 10)
  .then(toJson)
  .then(json => {
    // Your code
  });
```
---

### collections.getCollection(id)
Retrieve a single collection. To view a user’s private collections, the `read_collections` scope is required.

__Arguments__

| Argument | Type | Opt/Required |
|---|---|---|
|__`id`__|_number_|Required|


__Example__
```js
unsplash.collections.getCollection(123456)
  .then(toJson)
  .then(json => {
    // Your code
  });
```
---

### collections.getCuratedCollection(id)
Or, for a curated collection:

__Arguments__

| Argument | Type | Opt/Required |
|---|---|---|
|__`id`__|_number_|Required|


__Example__
```js
unsplash.collections.getCuratedCollection(88)
  .then(toJson)
  .then(json => {
    // Your code
  });
```
---

### collections.getCollectionPhotos(id, orderBy)
Retrieve a collection’s photos.

__Arguments__

| Argument | Type | Opt/Required | Notes |
|---|---|---|---|
|__`id`__|_number_|Required||
|__`page`__|_number_|Optional|
|__`perPage`__|_number_|Optional|
|__`orderBy`__|_string_|Optional|`latest`, `popular` or `oldest`|



__Example__
```js
unsplash.collections.getCollectionPhotos(123456, 1, 10, "popular")
  .then(toJson)
  .then(json => {
    // Your code
  });
```
---

### collections.getCuratedCollectionPhotos(id, orderBy)
Or, for a curated collection:

__Arguments__

| Argument | Type | Opt/Required | Notes |
|---|---|---|---|
|__`id`__|_number_|Required||
|__`page`__|_number_|Optional|
|__`perPage`__|_number_|Optional|
|__`orderBy`__|_string_|Optional|`latest`, `popular` or `oldest`|


__Example__
```js
unsplash.collections.getCuratedCollectionPhotos(88, 1, 10, "popular")
  .then(toJson)
  .then(json => {
    // Your code
  });
```
---

### collections.createCollection(title, description, private)
Create a new collection. This requires the `write_collections` scope.

__Arguments__

| Argument | Type | Opt/Required |
|---|---|---|
|__`title`__|_string_|Required|
|__`description`__|_string_|Optional|
|__`private`__|_boolean_|Optional|

__Example__
```js
unsplash.collections.createCollection("Birds", "Wild birds from 'round the world", true)
  .then(toJson)
  .then(json => {
    // Your code
  });
```
---

### collections.updateCollection(id, title, description, private)
Update an existing collection belonging to the logged-in user. This requires the `write_collections` scope.

__Arguments__

| Argument | Type | Opt/Required |
|---|---|---|
|__`id`__|_number_|Required|
|__`title`__|_string_|Optional|
|__`description`__|_string_|Optional|
|__`private`__|_boolean_|Optional|

__Example__
```js
unsplash.collections.updateCollection(12345, "Wild Birds", "Wild birds from around the world", false)
  .then(toJson)
  .then(json => {
    // Your code
  });
```
---

### collections.deleteCollection(id)
Delete a collection belonging to the logged-in user. This requires the `write_collections` scope.

__Arguments__

| Argument | Type | Opt/Required |
|---|---|---|
|__`id`__|_number_|Required|


__Example__
```js
unsplash.collections.deleteCollection(88)
  .then(toJson)
  .then(json => {
    // Your code
  });
```
---

### collections.addPhotoToCollection(collectionId, photoId)
Add a photo to one of the logged-in user’s collections. Requires the `write_collections` scope.

__Arguments__

| Argument | Type | Opt/Required |
|---|---|---|
|__`collectionId`__|_number_|Required|
|__`photoId`__|_string_|Required|

__Example__
```js
unsplash.collections.addPhotoToCollection(88, 'abc1234')
  .then(toJson)
  .then(json => {
    // Your code
  });
```
---

### collections.removePhotoFromCollection(collectionId, photoId)
Remove a photo from one of the logged-in user’s collections. Requires the `write_collections` scope.

__Arguments__

| Argument | Type | Opt/Required |
|---|---|---|
|__`collectionId`__|_number_|Required|
|__`photoId`__|_string_|Required|

__Example__
```js
unsplash.collections.removePhotoFromCollection(88, 'abc1234')
  .then(toJson)
  .then(json => {
    // Your code
  });
```
---

<div id="search" />

### search.all(keyword, page, per_page)
Get a list of photos, collections, and users matching the keyword.

__Arguments__

| Argument | Type | Opt/Required | Default |
|---|---|---|---|
|__`keyword`__|_number_|Required||
|__`page`__|_number_|Optional||
|__`per_page`__|_number_|Optional|10|


__Example__
```js
unsplash.search.all("dogs", 2)
  .then(toJson)
  .then(json => {
    // Your code
  });
```

### search.users(keyword, page, per_page)
Get a list of users matching the keyword.

__Arguments__

| Argument | Type | Opt/Required | Default |
|---|---|---|---|
|__`keyword`__|_number_|Required||
|__`page`__|_number_|Optional||
|__`per_page`__|_number_|Optional|10|


__Example__
```js
unsplash.search.users("steve", 1)
  .then(toJson)
  .then(json => {
    // Your code
  });
```

### search.photos(keyword, page, per_page)
Get a list of photos matching the keyword.

__Arguments__

| Argument | Type | Opt/Required | Default |
|---|---|---|---|
|__`keyword`__|_number_|Required||
|__`page`__|_number_|Optional||
|__`per_page`__|_number_|Optional|10|


__Example__
```js
unsplash.search.photos("dogs", 1)
  .then(toJson)
  .then(json => {
    // Your code
  });
```

### search.collections(keyword, page, per_page)
Get a list of collections matching the keyword.

__Arguments__

| Argument | Type | Opt/Required | Default |
|---|---|---|---|
|__`keyword`__|_number_|Required||
|__`page`__|_number_|Optional||
|__`per_page`__|_number_|Optional|10|


__Example__
```js
unsplash.search.collections("dogs", 1)
  .then(toJson)
  .then(json => {
    // Your code
  });
```

---

<div id="stats" />

### stats.total()
Get a list of download counts for all of Unsplash.

__Arguments__

_N/A_

__Example__
```js
unsplash.stats.total()
  .then(toJson)
  .then(json => {
    // Your code
  });
```
---

## Helpers

### toJson(res)
__Arguments__

| Argument | Type | Opt/Required |
|---|---|---|
|__`res`__|_Object_|Required|

__Example__
```js
import Unsplash, { toJson } from "unsplash-js";

const unsplash = new Unsplash({
  applicationId: "{YOUR_APPLICATION_ID}",
  secret: "{YOUR_SECRET_KEY}",
  callbackUrl: "{YOUR_CALLBACK_URL}"
});

unsplash.stats.total()
  .then(toJson)
  .then(json => {
    // Your code
  });
```
---

## Shoutouts
- Shoutout to all the [contributors](https://github.com/unsplash/unsplash-js/graphs/contributors) for lending a helping hand.
- Shoutout to [BrowserStack](https://www.browserstack.com/) for letting us use their service to run automated browser tests.

## License
Copyright (c) 2015, [Unsplash](https://unsplash.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
