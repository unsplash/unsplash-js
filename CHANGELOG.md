# Changelog

## 6.0

6.0 removes deprecated endpoints and parameters to match the changes from [the Unsplash API Changelog](https://changelog.unsplash.com/). Most of these endpoints have been deprecated on the API and removed from `unsplash-js` documentation for 2+ years.

| Removed Method | Replacement | Reason |
|---|---|---|
| `unsplash.photos.listCuratedPhotos` | None | Curated photos were [deprecated in 2017](https://changelog.unsplash.com/deprecations/2018/09/27/curated-collections-deprecation.html), [removed in 2019](https://changelog.unsplash.com/deprecations/2019/09/23/curated-collections-removal.html) |
| `unsplash.photos.searchPhotos` | `unsplash.search.photos` | Replaced by [the new search endpoints in 2017](https://changelog.unsplash.com/deprecations/2017/10/05/existing-deprecations.html) |
| `unsplash.photos.uploadPhoto` | None | Removed for legal compatibility |
| `unsplash.collections.listFeaturedCollections` | `unsplash.collections.listCollections` | Redundant endpoint |
| `unsplash.collections.listCuratedCollections` | None | Curated collections were replaced by collections. [Deprecated in 2017](https://changelog.unsplash.com/deprecations/2018/09/27/curated-collections-deprecation.html), [removed in 2019](https://changelog.unsplash.com/deprecations/2019/09/23/curated-collections-removal.html) |
| `unsplash.collections.getCuratedCollection` | `unsplash.collections.getCollection` | Curated collections were replaced by collections. [Deprecated in 2017](https://changelog.unsplash.com/deprecations/2018/09/27/curated-collections-deprecation.html), [removed in 2019](https://changelog.unsplash.com/deprecations/2019/09/23/curated-collections-removal.html) |
| `unsplash.collections.getCuratedCollectionPhotos` | `unsplash.collections.getCollectionPhotos` | Curated collections were replaced by collections. [Deprecated in 2017](https://changelog.unsplash.com/deprecations/2018/09/27/curated-collections-deprecation.html), [removed in 2019](https://changelog.unsplash.com/deprecations/2019/09/23/curated-collections-removal.html) |
| `unsplash.categories.*` | None | [Categories were deprecated in 2017](https://changelog.unsplash.com/deprecations/2017/10/05/existing-deprecations.html) and [removed from the API in 2017](https://changelog.unsplash.com/deprecations/2018/04/20/categories-eol.html) |
