# WISHD
A responsive white-and-pink gift discovery website with 42 real products, matching official product photography, exact product links, age/interest/budget filters, occasion lists, browser persistence, and list exports.

Serve `dist` with any static server: `python3 -m http.server 3013 --directory dist`.

## Product curation
Product catalog details and official brand catalogs checked November 12, 2026. Popularity inspiration includes the [GiftList 2026 Holiday Wish Report](https://giftlist.com/newsroom/reports/holiday-2026). Popularity badges are limited to products or brands featured in that report; other items are curated complementary picks. Displayed prices are starting prices or budget estimates, not live inventory or checkout quotes. Confirm size, variant, current price, stock, compatibility, and age suitability with the retailer.

`dist/catalog.json` is the editable product data; `dist/catalog.js` exposes the same data to the buildless site. Product images are optimized copies of official product imagery in `dist/assets`.

Existing saved-list item IDs are retained for compatibility; the original generic catalog is hidden from discovery. Lists save locally to the visitor's browser. There is no account or cross-device synchronization.

## Expanded collections
The catalog now has 1,042 real product listings (1,000 added), including editorial For him and For her collections with overlapping unisex items. The initial 42 entries keep their IDs so existing wishlists are preserved. Catalog imports use unique official product URLs, available variants, product photography, and starting prices checked November 12, 2026. Different product listings may include distinct colors or editions; size variants within a listing are not counted as extra products. Free samples, gift cards, replacement parts, reservations, and zero-priced entries are excluded.

Discovery renders 48 products at a time, with a Show more control, combined recipient/age/interest/budget/brand filtering, and sorting. New catalog images load from brand CDNs; the original 42 optimized photos remain bundled. New imports are curated brand catalog picks, not individually ranked viral products.

## Public trend research and adult edit
November 12, 2026 update: 1,282 products, including 240 additional official product listings from Cécred, P.F. Candle Co., Intelligent Change, AeroPress, KINTO, The Woobles, Our Place, and FIFINE. Existing product indices are retained.

The browsing age labels are Kids 6–12, Teens 13–19, and Adults 20+. These are editorial browse groupings, not manufacturer safety ratings. Product pages tell visitors to confirm age guidance with the retailer.

Trend collections match product names/categories to public topic-level signals from [TikTok Next 2026](https://ads.tiktok.com/business/en-US/next), [Google Holiday 100](https://blog.google/products-and-platforms/products/shopping/holiday-100-gift-guide-2026/), and [Circana's consumer wellbeing research](https://www.circana.com/post/consumer-wellness-trends-insights-from-circana-s-wellbeing-report). Counts, periods, source links, editorial inference, and ranking methodology are disclosed on the homepage. These sources do not provide a dataset specifically for all people aged 20+, and the adult collection does not claim one. No private TikTok account analytics, live popularity feed, tracking, or item-level sales/like counts are used.

The trend-informed sort is an editorial ordering based on matching collection themes and highlighting new curated products. Inline SVG doodles and CSS movement respect prefers-reduced-motion.


## WISHD cleanup
The public brand is WISHD, with a CSS halo above the capital I. The URL remains unchanged. Header navigation and recipient cards open fresh matching collections at #for-him and #for-her. Explicit men’s and women’s product names take precedence; beauty is curated into For her, unisex gifts may appear in both, and the general kids catalog remains available through Everyone and the age filter.

The review removed 22 alcohol-themed, smoking-themed, or accessory-part listings. Removed IDs are not reassigned: catalog records now include explicit stable IDs, product lookup uses an ID map, and saved lists retain valid products. Every published product has an HTTPS official retailer URL, displayed as a prominent Buy at button at the top of its detail panel.

Homepage text uses responsive stacking at tablet widths, visible overflow for copy, readable spacing, and consistent full-control selection highlights.
