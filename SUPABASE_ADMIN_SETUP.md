# Supabase Admin Setup

This guide walks you through configuring Supabase for the reviews admin panel.

## 1. Create a Supabase Project
1. Visit [https://supabase.com](https://supabase.com) and sign in.
2. Click **New Project**.
3. Enter a project name (e.g., `mrabdulsyed-reviews`).
4. Choose a strong database password (store it somewhere safe).
5. Select the closest region to your users (e.g., `eu-west-1`).
6. Click **Create project** and wait for provisioning to finish.

## 2. Get API Keys
1. In your new project, open **Project Settings → API**.
2. Copy the **Project URL** and **anon public API key**.
3. Create a `.env` file in the project root and add:
   ```
   VITE_SUPABASE_URL=your-project-url
   VITE_SUPABASE_ANON_KEY=your-public-anon-key
   ```
4. Restart `npm run dev` so Vite picks up the env vars.

## 3. Enable Email/Password Auth
1. Go to **Authentication → Providers**.
2. Enable **Email** provider.
3. (Optional) Configure email templates and SMTP if you want branded emails.

## 4. Create the Reviews Table
Open **SQL Editor** and run the following script:

```sql
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  rating int not null check (rating between 1 and 5),
  comment text not null,
  approved boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.reviews enable row level security;
```

## 5. Row Level Security Policies

Add policies so the public site can read approved reviews and submit new reviews, while only admins can manage them.

```sql
-- Allow anyone to read approved reviews
create policy "Public can read approved reviews"
on public.reviews
for select
using ( approved = true );

-- Allow anyone to insert new reviews (for public review form)
create policy "Public can insert reviews"
on public.reviews
for insert
with check ( true );

-- Allow authenticated users to update and delete reviews
create policy "Admins can update reviews"
on public.reviews
for update
using ( auth.role() = 'authenticated' )
with check ( auth.role() = 'authenticated' );

create policy "Admins can delete reviews"
on public.reviews
for delete
using ( auth.role() = 'authenticated' );
```

## 6. Create Admin User
1. Go to **Authentication → Users**.
2. Click **Add User**.
3. Enter admin email (e.g., `admin@mrabdulsyed.com`) and password.
4. Click **Invite User** (sends email) or **Add User** (creates instantly).

## 7. Test Locally
1. Run `npm run dev`.
2. Visit `http://localhost:5173/admin/login`.
3. Sign in with the admin credentials you created.
4. Add/approve reviews to verify CRUD works.

## 8. Deployment Checklist
- Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as environment variables on your hosting provider.
- Protect the Supabase service key; only the anon/public key should be exposed to the frontend.
- Consider enabling email confirmations or multi-factor auth for admins.

## Optional Enhancements
- Use Supabase Edge Functions to trigger emails when new reviews are submitted.
- Add a `published_at` column if you need scheduling.
- Use Supabase Storage for image uploads if you plan to collect media with reviews.

