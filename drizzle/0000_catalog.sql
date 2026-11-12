CREATE TABLE products (id INTEGER PRIMARY KEY, brand TEXT NOT NULL, name TEXT NOT NULL, category TEXT NOT NULL, ages TEXT NOT NULL, price REAL NOT NULL, him INTEGER NOT NULL, her INTEGER NOT NULL, edits TEXT NOT NULL, search_text TEXT NOT NULL, rank INTEGER NOT NULL, data TEXT NOT NULL);
--> statement-breakpoint
CREATE INDEX products_rank ON products(rank, id);
--> statement-breakpoint
CREATE INDEX products_price ON products(price, id);
--> statement-breakpoint
CREATE INDEX products_category ON products(category, rank);
--> statement-breakpoint
CREATE INDEX products_brand ON products(brand, rank);
--> statement-breakpoint
CREATE TABLE catalog_seed (version TEXT PRIMARY KEY);
