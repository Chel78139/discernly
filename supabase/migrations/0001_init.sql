-- Discernly initial schema
-- Confidence tiers: 1 = documented fact, 2 = contested/opinion-based, 3 = unverified (never published)

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  brand text not null,
  category text not null,
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists associations (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  claim_text text not null,
  source_urls text[] not null default '{}',
  confidence_tier smallint not null check (confidence_tier in (1, 2)),
  theme_tag text,
  date_checked date not null,
  created_at timestamptz not null default now()
);

create table if not exists alternatives (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  brand text not null,
  basis_text text not null,
  basis_confidence smallint not null check (basis_confidence in (1, 2)),
  basis_sources text[] not null default '{}',
  affiliate_url text,
  affiliate_type text check (affiliate_type in ('amazon', 'direct', 'unconfirmed')),
  category text not null,
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists product_alternative_map (
  product_id uuid not null references products(id) on delete cascade,
  alternative_id uuid not null references alternatives(id) on delete cascade,
  rank text not null check (rank in ('primary', 'secondary')),
  primary key (product_id, alternative_id)
);

create table if not exists ingredient_safety (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  label text not null,
  source_url text,
  created_at timestamptz not null default now()
);

create table if not exists email_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source_product_slug text,
  created_at timestamptz not null default now()
);

create table if not exists suggestions (
  id uuid primary key default gen_random_uuid(),
  product_name text not null,
  brand text,
  category text,
  reason text not null,
  source_url text,
  status text not null default 'pending' check (status in ('pending', 'reviewed', 'published', 'rejected')),
  created_at timestamptz not null default now()
);

create index if not exists idx_associations_product_id on associations(product_id);
create index if not exists idx_product_alternative_map_product_id on product_alternative_map(product_id);
create index if not exists idx_ingredient_safety_product_id on ingredient_safety(product_id);
