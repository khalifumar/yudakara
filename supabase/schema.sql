-- ============================================================================
-- YUDAKARA DATABASE SCHEMA (FASE 1 / MVP) - IDEMPOTENT & RE-RUN FRIENDLY
-- Marketplace Jasa Kreatif Berbasis Keahlian Budaya Tradisional Indonesia
-- ============================================================================

-- 1. ENUMS & TIPE DATA (Aman di-run berkali-kali)
do $$ begin
  create type public.verification_status as enum ('pending', 'verified', 'rejected');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type public.inquiry_status as enum ('new', 'read', 'replied', 'closed');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type public.category_group as enum ('pertunjukan', 'kriya', 'konsultan');
exception
  when duplicate_object then null;
end $$;

-- 2. TABEL KATEGORI (Kriya, Pertunjukan, Konsultan)
create table if not exists public.categories (
  id serial primary key,
  slug text unique not null,
  name text not null,
  group_name public.category_group not null,
  description text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- 3. TABEL RATE CARD STANDAR (Panduan Fair Pay Budaya)
create table if not exists public.rate_cards (
  id serial primary key,
  category_id int not null references public.categories(id) on delete cascade,
  service_name text not null, -- misal: 'Desain Motif Batik Tulis Custom'
  unit text not null,         -- misal: 'per desain', 'per sesi pertunjukan 45 menit'
  min_price integer not null check (min_price >= 0),
  max_price integer not null check (max_price >= min_price),
  notes text,
  created_at timestamptz not null default now()
);

-- 4. TABEL PROFIL PENGGUNA (Terhubung ke Supabase Auth)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  phone text,
  avatar_url text,
  role text not null default 'user' check (role in ('user', 'talent', 'admin')),
  created_at timestamptz not null default now()
);

-- 5. TABEL ADMIN (Daftar Pengguna Berwenang Kurasi)
create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  granted_at timestamptz not null default now()
);

-- 6. TABEL TALENT / SENIMAN & PENGRAJIN
create table if not exists public.talents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  slug text unique not null,
  display_name text not null,
  headline text, -- misal: 'Pembatik Tulis Pewarna Alami Lasem (Pengalaman 15 Tahun)'
  bio text,
  category_id int not null references public.categories(id),
  city text not null,
  province text not null,
  avatar_url text,
  whatsapp text,
  experience_years int default 5,
  verification_status public.verification_status not null default 'pending',
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists talents_category_idx on public.talents(category_id);
create index if not exists talents_status_idx on public.talents(verification_status);
create index if not exists talents_city_idx on public.talents(city);

-- 7. TABEL PORTOFOLIO KARYA
create table if not exists public.portfolio_items (
  id uuid primary key default gen_random_uuid(),
  talent_id uuid not null references public.talents(id) on delete cascade,
  title text not null,
  description text,
  image_url text not null,
  year int,
  created_at timestamptz not null default now()
);

-- 8. TABEL LAYANAN & TARIF TALENT
create table if not exists public.talent_services (
  talent_id uuid not null references public.talents(id) on delete cascade,
  rate_card_id int not null references public.rate_cards(id) on delete cascade,
  custom_title text,
  price integer not null check (price >= 0),
  primary key (talent_id, rate_card_id)
);

-- 9. TABEL SANGGAR & KOMUNITAS SENI
create table if not exists public.studios (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  slug text unique not null,
  name text not null,
  description text,
  city text not null,
  province text not null,
  address text,
  whatsapp text,
  cover_url text,
  verification_status public.verification_status not null default 'pending',
  created_at timestamptz not null default now()
);

-- 10. TABEL PERTANYAAN / AJUKAN PROYEK DARI KLIEN (INQUIRIES)
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  talent_id uuid not null references public.talents(id) on delete cascade,
  client_name text not null,
  client_email text not null,
  client_company text,
  service_requested text,
  message text not null,
  status public.inquiry_status not null default 'new',
  created_at timestamptz not null default now()
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES — KEAMANAN DATA
-- ============================================================================

alter table public.categories enable row level security;
alter table public.rate_cards enable row level security;
alter table public.profiles enable row level security;
alter table public.admins enable row level security;
alter table public.talents enable row level security;
alter table public.portfolio_items enable row level security;
alter table public.talent_services enable row level security;
alter table public.studios enable row level security;
alter table public.inquiries enable row level security;

-- Helper Function: Apakah pengguna saat ini admin?
create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

-- Categories & Rate Cards (Publik Boleh Baca, Hanya Admin Mengubah)
drop policy if exists "categories_read" on public.categories;
create policy "categories_read" on public.categories for select using (true);

drop policy if exists "categories_admin" on public.categories;
create policy "categories_admin" on public.categories for all using (public.is_admin());

drop policy if exists "ratecards_read" on public.rate_cards;
create policy "ratecards_read" on public.rate_cards for select using (true);

drop policy if exists "ratecards_admin" on public.rate_cards;
create policy "ratecards_admin" on public.rate_cards for all using (public.is_admin());

-- Profiles (Hanya pemilik yang dapat membaca dan mengubah)
drop policy if exists "profiles_own_read" on public.profiles;
create policy "profiles_own_read" on public.profiles for select using (id = auth.uid() or public.is_admin());

drop policy if exists "profiles_own_update" on public.profiles;
create policy "profiles_own_update" on public.profiles for update using (id = auth.uid());

-- Talents (Publik hanya membaca yang terverifikasi, pemilik membaca/mengedit miliknya)
drop policy if exists "talents_public_read" on public.talents;
create policy "talents_public_read" on public.talents for select using (
  verification_status = 'verified' or user_id = auth.uid() or public.is_admin()
);

drop policy if exists "talents_user_insert" on public.talents;
create policy "talents_user_insert" on public.talents for insert to authenticated with check (
  user_id = auth.uid() and verification_status = 'pending' and is_featured = false
);

drop policy if exists "talents_user_update" on public.talents;
create policy "talents_user_update" on public.talents for update to authenticated using (
  user_id = auth.uid() or public.is_admin()
);

-- Portfolio & Services
drop policy if exists "portfolio_read" on public.portfolio_items;
create policy "portfolio_read" on public.portfolio_items for select using (true);

drop policy if exists "portfolio_write" on public.portfolio_items;
create policy "portfolio_write" on public.portfolio_items for all to authenticated using (
  exists (select 1 from public.talents t where t.id = talent_id and (t.user_id = auth.uid() or public.is_admin()))
);

drop policy if exists "services_read" on public.talent_services;
create policy "services_read" on public.talent_services for select using (true);

drop policy if exists "services_write" on public.talent_services;
create policy "services_write" on public.talent_services for all to authenticated using (
  exists (select 1 from public.talents t where t.id = talent_id and (t.user_id = auth.uid() or public.is_admin()))
);

-- Studios
drop policy if exists "studios_read" on public.studios;
create policy "studios_read" on public.studios for select using (
  verification_status = 'verified' or owner_id = auth.uid() or public.is_admin()
);

drop policy if exists "studios_insert" on public.studios;
create policy "studios_insert" on public.studios for insert to authenticated with check (
  owner_id = auth.uid() and verification_status = 'pending'
);

-- Inquiries (Klien anonim/login boleh kirim pertanyaan, hanya talent & admin yang boleh baca)
drop policy if exists "inquiries_insert" on public.inquiries;
create policy "inquiries_insert" on public.inquiries for insert to anon, authenticated with check (true);

drop policy if exists "inquiries_talent_read" on public.inquiries;
create policy "inquiries_talent_read" on public.inquiries for select to authenticated using (
  public.is_admin() or exists (select 1 from public.talents t where t.id = talent_id and t.user_id = auth.uid())
);

-- ============================================================================
-- SEED DATA AWAL (Contoh Kategori & Standar Rate Card)
-- ============================================================================

insert into public.categories (id, slug, name, group_name, description, sort_order) values
  (1, 'kriya-batik', 'Pembatik & Desainer Motif Nusantara', 'kriya', 'Keahlian teknik canting malam, pewarnaan alami, filosofi motif, dan adaptasi busana modern.', 1),
  (2, 'seni-tari', 'Penari & Koreografer Tradisional', 'pertunjukan', 'Keahlian tari klasik keraton, tari rakyat, koreografi perhelatan akbar, dan tari kontemporer nusantara.', 2),
  (3, 'seni-wayang', 'Dalang, Karawitan & Pembuat Wayang', 'pertunjukan', 'Keahlian pedalangan wayang kulit & golek, pengrawit karawitan, pesinden, dan tatah sungging kulit.', 3),
  (4, 'konsultan-budaya', 'Konsultan & Kurator Budaya', 'konsultan', 'Validasi kultural bagi kampanye brand, riset etnomusikologi, kurasi festival, dan mitigasi apropriasi.', 4),
  (5, 'kriya-ukir', 'Pengukir Kayu & Logam Tradisional', 'kriya', 'Keahlian ukir Jepara, Bali, Asmat, serta tatah perak Kotagede untuk produk interior berkelas.', 5)
on conflict (slug) do nothing;

-- Rate Cards Seed (Aman dari duplikasi saat di-run ulang)
insert into public.rate_cards (category_id, service_name, unit, min_price, max_price, notes)
select 1, 'Desain Motif Batik Eksklusif (Hak Pakai Komersial Terbatas)', 'per motif', 3500000, 15000000, 'Termasuk filosofi makna motif, sketsa digital vektor, dan panduan pola kain.'
where not exists (select 1 from public.rate_cards where service_name = 'Desain Motif Batik Eksklusif (Hak Pakai Komersial Terbatas)');

insert into public.rate_cards (category_id, service_name, unit, min_price, max_price, notes)
select 1, 'Pembuatan Kain Batik Tulis Sutra Eksklusif (Masterpiece)', 'per lembar (2.5m)', 5000000, 25000000, 'Proses canting tangan halus, pewarnaan alami Indigofera/Tegeran, estimasi pengerjaan 2-3 bulan.'
where not exists (select 1 from public.rate_cards where service_name = 'Pembuatan Kain Batik Tulis Sutra Eksklusif (Masterpiece)');

insert into public.rate_cards (category_id, service_name, unit, min_price, max_price, notes)
select 2, 'Pertunjukan Tari Tradisional / Pembuka Acara Resmi', 'per sesi (15-30 menit)', 4000000, 18000000, 'Format rombongan 3-6 penari profesional lengkap dengan busana adat resmi.'
where not exists (select 1 from public.rate_cards where service_name = 'Pertunjukan Tari Tradisional / Pembuka Acara Resmi)');

insert into public.rate_cards (category_id, service_name, unit, min_price, max_price, notes)
select 2, 'Koreografi Tari Kustom untuk Pagelaran Korporat / Teater', 'per proyek pagelaran', 10000000, 45000000, 'Termasuk rancangan gerak, sesi latihan, aransemen gending, dan penyutradaraan panggung.'
where not exists (select 1 from public.rate_cards where service_name = 'Koreografi Tari Kustom untuk Pagelaran Korporat / Teater');

insert into public.rate_cards (category_id, service_name, unit, min_price, max_price, notes)
select 3, 'Pentas Wayang Kulit Padat Edukasi / Event Korporat', 'per pementasan (2-3 jam)', 12000000, 35000000, 'Lengkap dengan Dalang, Niwaga (pengrawit), Waranggana (sinden), dan set gamelan ringkas.'
where not exists (select 1 from public.rate_cards where service_name = 'Pentas Wayang Kulit Padat Edukasi / Event Korporat');

insert into public.rate_cards (category_id, service_name, unit, min_price, max_price, notes)
select 4, 'Konsultasi & Validasi Kultural Kampanye Brand', 'per proyek kampanye', 7500000, 25000000, 'Mencegah risiko salah tafsir motif/simbol sakral, evaluasi naskah iklan, dan narasi kearifan lokal.'
where not exists (select 1 from public.rate_cards where service_name = 'Konsultasi & Validasi Kultural Kampanye Brand');
