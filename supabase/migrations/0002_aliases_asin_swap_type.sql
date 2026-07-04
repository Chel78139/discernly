-- Adds product search aliases, confirmed Amazon ASINs, and the
-- Christian-vs-clean swap distinction. Existing RLS policies already
-- cover these tables at the table level, so no policy changes needed.

alter table products
  add column if not exists aliases text[] not null default '{}';

alter table alternatives
  add column if not exists asin text,
  add column if not exists swap_type text not null default 'christian'
    check (swap_type in ('christian', 'clean'));
