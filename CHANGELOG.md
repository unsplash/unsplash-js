# Changelog

## 7.0.3

- Adds response types to all endpoints.

## 7.0.0

This version includes a total TypeScript rewrite of the library, with many breaking changes. If upgrading from a previous version, read carefully. You will not be able to upgrade to v7 without making the necessary adjustments.

### Breaking Changes

- Replaces the `Unsplash` `class` with a named `createApi` function:

```ts
// before
import Unsplash from 'unsplash-js';
const unsplash = new Unsplash({ accessKey: 'MY_ACCESS_KEY' });

// after
import { createApi } from 'unsplash-js';
const unsplash = createApi({ accessKey: 'MY_ACCESS_KEY' });
// or
import Unsplash from 'unsplash-js';
const unsplash = Unsplash.createApi({ accessKey: 'MY_ACCESS_KEY' });
```

- Removes user authentication features from the library. This means that the `createApi` function does not recieve `secret`, `callbackUrl` or `bearerToken`.

* Removes the following API methods (primarily due to removal of user authentication):

  - `photos`:
    - ❌ `likePhoto`
    - ❌ `unlikePhoto`
    - ❌ `downloadPhoto` (deprecated in 6.3, replaced with `trackDownload`)
  - `users`:
    - ❌ `statistics`
  - `collections`:
    - ❌ `createCollection`
    - ❌ `updateCollection`
    - ❌ `deleteCollection`
    - ❌ `addPhotoToCollection`
    - ❌ `removePhotoFromCollection`
  - `auth`:
    - ❌ `getAuthenticationUrl`
    - ❌ `userAuthentication`
    - ❌ `setBearerToken`
  - `currentUser`:
    - ❌ `profile`
    - ❌ `updateProfile`
  - `stats`:
    - ❌ `total`
  - ❌ `toJson` (the library now takes care of converting the response to JSON).

* Renames all of the remaining API methods:

  - `search`:
    - ⚠️ `photos` --> `getPhotos`
    - ⚠️ `users` --> `getUsers`
    - ⚠️ `collections` --> `getCollections`
  - `photos`:
    - ⚠️ `listPhotos` --> `list`
    - ⚠️ `getPhoto` --> `get`
    - ⚠️ `getRandomPhoto` --> `getRandom`
    - ⚠️ `getPhotoStats` --> `getStats`
  - `users`:
    - ⚠️ `profile` --> `get`
    - ⚠️ `photos` --> `getPhotos`
    - ⚠️ `likes` --> `getLikes`
    - ⚠️ `collections` --> `getCollections`
  - `collections`:
    - ⚠️ `listCollections` --> `list`
    - ⚠️ `getCollection` --> `get`
    - ⚠️ `getCollectionPhotos` --> `getPhotos`
    - ⚠️ `listRelatedCollections` --> `listRelated`

- Changes the format of the parameters for **all** API methods. They are now all named parameters within the first argument, instead of multiple arguments. Check the TypeScript types and the [Arguments](./README.md#Arguments) section of the docs for the new parameters format.
- Changes the format of the responses for **all** API methods. The JSON is now parsed and returned, removing the need for the `toJson` helper. Feeds have the "x-total" header added to the response. The library now also performs error-handling: expected errors are returned instead of thrown, along with a description of their source. Check the TypeScript types and the [Response](./README.md#Response) section of the docs for the new response format.

### Changes

- TypeScript support! Everything is now accurately typed (except responses which we plan to add types for soon).
- You can now provide fetch options on a per-call basis using the second parameter. See [Arguments](./README.md#Arguments).

## 6.3.0

### Changes

- Deprecate `photos.downloadPhoto` in favor of `photos.trackDownload` to better clarify method usage. `downloadPhoto` will continue to be supported until version 7.0.

## 6.2.0

### Changes

- Adds support for [the languages beta](https://changelog.unsplash.com/update/2020/08/21/languages-beta.html) on search

```js
unsplash.search.photos('nature', 1, 10, { lang: 'en' });
```

- Adds support for the [new search filters and ordering](https://changelog.unsplash.com/update/2020/03/04/new-filters.html)

```js
unsplash.search.photos('nature', 1, 10, {
  orientation: 'landscape',
  color: 'green', // new
  orderBy: 'relevant', // new
});
```

- Adds support for [content filtering on search](https://changelog.unsplash.com/update/2020/03/15/content-filtering.html)

```js
unsplash.search.photos('nature', 1, 10, { contentFilter: 'high' });
```

- Removes any references to 'popular' ordering ([due to deprecation](https://changelog.unsplash.com/update/2020/07/09/deprecate-popular.html))

## 6.1.0

Enables Brotli compression by default.

## 6.0

### Changes

- To better clarify the use of `accessKey` when initializing, `applicationId` has been renamed to `accessKey`:

  ```js
  // previously
  const unsplash = new Unsplash({
    applicationId: '{APP_ACCESS_KEY}',
  });

  // now
  const unsplash = new Unsplash({
    accessKey: '{APP_ACCESS_KEY}',
  });
  ```

- `unsplash.photos.getPhotoStats` now uses the `/photos/:id/statistics` endpoint ([changelog reference](https://changelog.unsplash.com/deprecations/2017/10/05/existing-deprecations.html))

- To support additional filters, the `unsplash.search.photos` method signature has been changed to support an optional `filters` object, which currently supports `collections` and `orientation` keys.

```js
unsplash.search.photos('nature', 1, 10, { orientation: 'landscape', collections: [1, 2] });
```

### Removals

6.0 removes deprecated endpoints and parameters to match the changes from [the Unsplash API Changelog](https://changelog.unsplash.com/). Most of these endpoints have been deprecated on the API and removed from `unsplash-js` documentation for 2+ years.

| Removed Method                                    | Replacement                                | Reason                                                                                                                                                                                                                                                                          |
| ------------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `unsplash.search.all`                             | None                                       | This endpoint is undocumented publicly and is highly likely to change in the future. Therefore, we don't recommend anyone use this functionality in their applications.                                                                                                         |
| `unsplash.photos.listCuratedPhotos`               | None                                       | Curated photos were [deprecated in 2017](https://changelog.unsplash.com/deprecations/2018/09/27/curated-collections-deprecation.html), [removed in 2019](https://changelog.unsplash.com/deprecations/2019/09/23/curated-collections-removal.html)                               |
| `unsplash.photos.searchPhotos`                    | `unsplash.search.photos`                   | Replaced by [the new search endpoints in 2017](https://changelog.unsplash.com/deprecations/2017/10/05/existing-deprecations.html)                                                                                                                                               |
| `unsplash.photos.uploadPhoto`                     | None                                       | Removed for legal compatibility                                                                                                                                                                                                                                                 |
| `unsplash.collections.listFeaturedCollections`    | `unsplash.collections.listCollections`     | Redundant endpoint                                                                                                                                                                                                                                                              |
| `unsplash.collections.listCuratedCollections`     | None                                       | Curated collections were replaced by collections. [Deprecated in 2017](https://changelog.unsplash.com/deprecations/2018/09/27/curated-collections-deprecation.html), [removed in 2019](https://changelog.unsplash.com/deprecations/2019/09/23/curated-collections-removal.html) |
| `unsplash.collections.getCuratedCollection`       | `unsplash.collections.getCollection`       | Curated collections were replaced by collections. [Deprecated in 2017](https://changelog.unsplash.com/deprecations/2018/09/27/curated-collections-deprecation.html), [removed in 2019](https://changelog.unsplash.com/deprecations/2019/09/23/curated-collections-removal.html) |
| `unsplash.collections.getCuratedCollectionPhotos` | `unsplash.collections.getCollectionPhotos` | Curated collections were replaced by collections. [Deprecated in 2017](https://changelog.unsplash.com/deprecations/2018/09/27/curated-collections-deprecation.html), [removed in 2019](https://changelog.unsplash.com/deprecations/2019/09/23/curated-collections-removal.html) |
| `unsplash.categories.*`                           | None                                       | [Categories were deprecated in 2017](https://changelog.unsplash.com/deprecations/2017/10/05/existing-deprecations.html) and [removed from the API in 2017](https://changelog.unsplash.com/deprecations/2018/04/20/categories-eol.html)                                          |

| Removed Parameter | Method                                                       | Reason                                                                                                                                                                                                                                 |
| ----------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `category`        | `unsplash.photos.getRandomPhoto`                             | [Categories were deprecated in 2017](https://changelog.unsplash.com/deprecations/2017/10/05/existing-deprecations.html) and [removed from the API in 2017](https://changelog.unsplash.com/deprecations/2018/04/20/categories-eol.html) |
| `w`               | `unsplash.photos.getPhoto`, `unsplash.photos.getRandomPhoto` | [Deprecated in favor of dynamic image URLs](https://changelog.unsplash.com/2019/03/19/image-resizing.html)                                                                                                                             |
| `h`               | `unsplash.photos.getPhoto`, `unsplash.photos.getRandomPhoto` | [Deprecated in favor of dynamic image URLs](https://changelog.unsplash.com/2019/03/19/image-resizing.html)                                                                                                                             |
| `crop`            | `unsplash.photos.getPhoto`                                   | [Deprecated in favor of dynamic image URLs](https://changelog.unsplash.com/2019/03/19/image-resizing.html)                                                                                                                             |
