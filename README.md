# Unsplash
[![npm](https://img.shields.io/npm/v/unsplash-js.svg?style=flat-square)](https://www.npmjs.com/package/unsplash-js)
[![Travis](https://img.shields.io/travis/naoufal/unsplash.svg?style=flat-square)](https://travis-ci.org/naoufal/unsplash)
[![Coveralls](https://img.shields.io/coveralls/naoufal/unsplash.svg?style=flat-square)](https://coveralls.io/github/naoufal/unsplash)

A JavaScript wrapper for the [Unsplash API](https://unsplash.com/developers).

## Install
```
npm i --save unsplash-js
```

## Documentation
- [Usage](https://github.com/naoufal/unsplash#usage)
- [Authorization Workflow](https://github.com/naoufal/unsplash#authorization-workflow)
- [Authorization](https://github.com/naoufal/unsplash#authorization)
- [Current User](https://github.com/naoufal/unsplash#current-user)
- [Users](https://github.com/naoufal/unsplash#users)
- [Photos](https://github.com/naoufal/unsplash#photos)
- [Categories](https://github.com/naoufal/unsplash#categories)
- [Curated Batches](https://github.com/naoufal/unsplash#curated-batches)
- [Stats](https://github.com/naoufal/unsplash#stats)
- [Functions](https://github.com/naoufal/unsplash#functions)

## Usage
Start by requiring the Unsplash.
```js
import Unsplash, { toJson } from "unsplash-js";
```

Once you've required the module, you'll want to initialize Unsplash with your developer credentials.
```js
let unsplash = new Unsplash({
  applicationId: "{YOUR_APPLICATION_ID}",
  secret: "{YOUR_SECRET_KEY}",
  callbackUrl: "{YOUR_CALLBACK_URL}"
});
```

_Credentials can be optained from [Unsplash Developers](https://unsplash.com/developers)._

## Authorization Workflow
Generate an authentication url with the scopes your app requires.

```js
let authenticationUrl = unsplash.auth.getAuthenticationUrl([
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
    unsplash.setBearerToken(json.access_token);
  });
```

_For more information on the authroization workflow, consult the [Unsplash Documentation](https://unsplash.com/documentation#authorization-workflow)._

---

## Authorization
### auth.getAuthenticationUrl(scopes)
Build an OAuth url with requested scopes.

__Arguments__

| Argument | Type | Opt/Required | Default |
|---|---|---|---|
|__`scopes`__|_Array<string>_|Optional| `["public"]` |

__Example__
```js
let authenticationUrl = unsplash.auth.getAuthenticationUrl([
  "public",
  "read_user",
  "write_user",
  "read_photos",
  "write_photos"
]);
```
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
    unsplash.setBearerToken(json.access_token);
  });
```
---

## Current User
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

## Users
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

### users.photos(username)
Get a list of photos uploaded by a user.

__Arguments__

| Argument | Type | Opt/Required |
|---|---|---|
|__`username`__|_string_|Required|

__Example__
```js
unsplash.users.photos("naoufal")
  .then(toJson)
  .then(json => {
    // Your code
  });
```
### users.likes(username, page, perPage)
Get a list of photos liked by a user.

__Arguments__

| Argument | Type | Opt/Required |
|---|---|---|
|__`username`__|_string_|Required|
|__`page`__|_number_|Optional|
|__`perPage`__|_number_|Optional|

__Example__
```js
unsplash.users.likes("naoufal", 2, 15)
  .then(toJson)
  .then(json => {
    // Your code
  });
```
---

## Photos
### photos.listPhotos(page, perPage)
Get a single page from the list of all photos.

__Arguments__

| Argument | Type | Opt/Required |
|---|---|---|
|__`page`__|_number_|Optional|
|__`perPage`__|_number_|Optional|

__Example__
```js
unsplash.photos.listPhotos(2, 15)
  .then(toJson)
  .then(json => {
    // Your code
  });
```
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
### photos.getRandomPhoto(category, featured, username, query, width, height)
Retrieve a single random photo, given optional filters.

__Arguments__

| Argument | Type | Opt/Required |
|---|---|---|
|__`category`__|_Array<number>_|Optional|
|__`featured`__|_boolean_|Optional|
|__`username`__|_string_|Optional|
|__`query`__|_string_|Optional|
|__`width`__|_number_|Optional|
|__`height`__|_number_|Optional|

__Example__
```js
unsplash.photos.getRandomPhoto([88], true, "naoufal", "cats", 1920, 1080)
  .then(toJson)
  .then(json => {
    // Your code
  });
```

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

## Categories
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

## Curated Batches
### curatedBatches.listCuratedBatches()
Get a single page from the list of all curated batches.

__Arguments__

_N/A_

__Example__
```js
unsplash.curatedBatches.listCuratedBatches()
  .then(toJson)
  .then(json => {
    // Your code
  });
```

### curatedBatches.curatedBatch(id)
Retrieve a single batch.

__Arguments__

| Argument | Type | Opt/Required |
|---|---|---|
|__`id`__|_string_|Required|

__Example__
```js
unsplash.curatedBatches.curatedBatch(88)
  .then(toJson)
  .then(json => {
    // Your code
  });
```

### curatedBatches.curatedBatchPhotos(id)
Retrieve a single batch’s ten photos.

__Arguments__

| Argument | Type | Opt/Required |
|---|---|---|
|__`id`__|_string_|Required|

__Example__
```js
unsplash.curatedBatches.curatedBatchPhotos(88)
  .then(toJson)
  .then(json => {
    // Your code
  });
```
---

## Stats
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

## Functions
### setBearerToken(accessToken)
__Arguments__

| Argument | Type | Opt/Required |
|---|---|---|
|__`accessToken`__|_string_|Required|

__Example__
```js
unsplash.setBearerToken("{BEARER_TOKEN}");
```

### toJson(res)
__Arguments__

| Argument | Type | Opt/Required |
|---|---|---|
|__`res`__|_Object_|Required|

__Example__
```js
import Unsplash, { toJson } from "unsplash-js";

let unsplash = new Unsplash({
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

## License
Copyright (c) 2015, [Naoufal Kadhom](http://naoufal.com)

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
