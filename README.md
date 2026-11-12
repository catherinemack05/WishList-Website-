# WishList
A responsive white-and-pink gift discovery website with 42 real products, matching official product photography, exact product links, age/interest/budget filters, occasion lists, browser persistence, and list exports.

Serve `dist` with any static server: `python3 -m http.server 3013 --directory dist`.

## Product curation
Product catalog details and official brand catalogs checked November 12, 2026. Popularity inspiration includes the [GiftList 2026 Holiday Wish Report](https://giftlist.com/newsroom/reports/holiday-2026). Popularity badges are limited to products or brands featured in that report; other items are curated complementary picks. Displayed prices are starting prices or budget estimates, not live inventory or checkout quotes. Confirm size, variant, current price, stock, compatibility, and age suitability with the retailer.

`dist/catalog.json` is the editable product data; `dist/catalog.js` exposes the same data to the buildless site. Product images are optimized copies of official product imagery in `dist/assets`.

Existing saved-list item IDs are retained for compatibility; the original generic catalog is hidden from discovery. Lists save locally to the visitor's browser. There is no account or cross-device synchronization.

## Expanded collections
The catalog now has 1,042 real product listings (1,000 added), including editorial For him and For her collections with overlapping unisex items. The initial 42 entries keep their IDs so existing wishlists are preserved. Catalog imports use unique official product URLs, available variants, product photography, and starting prices checked November 12, 2026. Different product listings may include distinct colors or editions; size variants within a listing are not counted as extra products. Free samples, gift cards, replacement parts, reservations, and zero-priced entries are excluded.

Discovery renders 48 products at a time, with a Show more control, combined recipient/age/interest/budget/brand filtering, and sorting. New catalog images load from brand CDNs; the original 42 optimized photos remain bundled. New imports are curated brand catalog picks, not individually ranked viral products.
