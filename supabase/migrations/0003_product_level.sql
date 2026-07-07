-- Distinguishes brand-level flagged products (e.g. "NYX (Brand)", one
-- overall Christian-made swap) from product-level ones (e.g. "NYX HD
-- Foundation", its own specific product-level swap + direct affiliate
-- link). Existing rows default to 'brand' since that's what every
-- product in the catalog has been until now.

alter table products
  add column if not exists level text not null default 'brand'
    check (level in ('brand', 'product'));
