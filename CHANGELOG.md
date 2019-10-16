# Changelog

## 6.0

### Changes

- To better clarify the use of `accessKey` when initializing, `applicationId` has been renamed to `accessKey`:
  ```js
  // previously
  const unsplash = new Unsplash({
    applicationId: "{APP_ACCESS_KEY}"
  });

  // now
  const unsplash = new Unsplash({
    accessKey: "{APP_ACCESS_KEY}"
  });
  ```
- `unsplash.photos.getPhotoStats` now uses the `/photos/:id/statistics` endpoint ([changelog reference](https://changelog.unsplash.com/deprecations/2017/10/05/existing-deprecations.html))

- To support additional filters, the `unsplash.search.photos` method signature has been changed to support an optional `filters` object, which currently supports `collections` and `orientation` keys.

```js
unsplash.search.photos("nature", 1, 10, { orientation: "landscape", collections: [1,2] })
```

### Removals

6.0 removes deprecated endpoints and parameters to match the changes from [the Unsplash API Changelog](https://changelog.unsplash.com/). Most of these endpoints have been deprecated on the API and removed from `unsplash-js` documentation for 2+ years.

| Removed Method | Replacement | Reason |
|---|---|---|
| `unsplash.search.all` | None | This endpoint is undocumented publicly and is highly likely to change in the future. Therefore, we don't recommend anyone use this functionality in their applications. |
| `unsplash.photos.listCuratedPhotos` | None | Curated photos were [deprecated in 2017](https://changelog.unsplash.com/deprecations/2018/09/27/curated-collections-deprecation.html), [removed in 2019](https://changelog.unsplash.com/deprecations/2019/09/23/curated-collections-removal.html) |
| `unsplash.photos.searchPhotos` | `unsplash.search.photos` | Replaced by [the new search endpoints in 2017](https://changelog.unsplash.com/deprecations/2017/10/05/existing-deprecations.html) |
| `unsplash.photos.uploadPhoto` | None | Removed for legal compatibility |
| `unsplash.collections.listFeaturedCollections` | `unsplash.collections.listCollections` | Redundant endpoint |
| `unsplash.collections.listCuratedCollections` | None | Curated collections were replaced by collections. [Deprecated in 2017](https://changelog.unsplash.com/deprecations/2018/09/27/curated-collections-deprecation.html), [removed in 2019](https://changelog.unsplash.com/deprecations/2019/09/23/curated-collections-removal.html) |
| `unsplash.collections.getCuratedCollection` | `unsplash.collections.getCollection` | Curated collections were replaced by collections. [Deprecated in 2017](https://changelog.unsplash.com/deprecations/2018/09/27/curated-collections-deprecation.html), [removed in 2019](https://changelog.unsplash.com/deprecations/2019/09/23/curated-collections-removal.html) |
| `unsplash.collections.getCuratedCollectionPhotos` | `unsplash.collections.getCollectionPhotos` | Curated collections were replaced by collections. [Deprecated in 2017](https://changelog.unsplash.com/deprecations/2018/09/27/curated-collections-deprecation.html), [removed in 2019](https://changelog.unsplash.com/deprecations/2019/09/23/curated-collections-removal.html) |
| `unsplash.categories.*` | None | [Categories were deprecated in 2017](https://changelog.unsplash.com/deprecations/2017/10/05/existing-deprecations.html) and [removed from the API in 2017](https://changelog.unsplash.com/deprecations/2018/04/20/categories-eol.html) |

| Removed Parameter | Method | Reason |
|---|---|---|
| `category` | `unsplash.photos.getRandomPhoto` | [Categories were deprecated in 2017](https://changelog.unsplash.com/deprecations/2017/10/05/existing-deprecations.html) and [removed from the API in 2017](https://changelog.unsplash.com/deprecations/2018/04/20/categories-eol.html) |
| `w` | `unsplash.photos.getPhoto`, `unsplash.photos.getRandomPhoto` | [Deprecated in favor of dynamic image URLs](https://changelog.unsplash.com/2019/03/19/image-resizing.html) |
| `h` | `unsplash.photos.getPhoto`, `unsplash.photos.getRandomPhoto` | [Deprecated in favor of dynamic image URLs](https://changelog.unsplash.com/2019/03/19/image-resizing.html) |
| `crop` | `unsplash.photos.getPhoto` | [Deprecated in favor of dynamic image URLs](https://changelog.unsplash.com/2019/03/19/image-resizing.html) |
