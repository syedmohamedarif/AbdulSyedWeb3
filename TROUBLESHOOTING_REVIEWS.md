# Troubleshooting: Reviews Not Appearing in Admin Panel

## Problem
Reviews submitted from mobile phones are not showing up in the admin panel for approval.

## Common Causes & Solutions

### 1. Supabase RLS Policy Issues

**If you get "policy already exists" error**: The policy exists but might be misconfigured.

**Solution**: Run the complete fix script `FIX_REVIEWS_RLS.sql` which will:
- Drop all existing policies
- Recreate them correctly
- Verify they're working

**Quick Check**: First verify what policies exist:

```sql
SELECT policyname, cmd, with_check
FROM pg_policies 
WHERE tablename = 'reviews';
```

You should see:
- "Public can read approved reviews" (SELECT)
- "Public can insert reviews" (INSERT) ← **This is critical!**
- "Admins can update reviews" (UPDATE)
- "Admins can delete reviews" (DELETE)

### 2. Verify RLS is Enabled

Make sure RLS is enabled on the reviews table:

```sql
-- Check if RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'reviews';

-- If rowsecurity is false, enable it:
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
```

### 3. Check Browser Console for Errors

1. Open your website on mobile
2. Open browser developer tools (if possible) or use remote debugging
3. Submit a review
4. Check the console for error messages

Look for errors like:
- `new row violates row-level security policy`
- `permission denied for table reviews`
- `insert or update on table "reviews" violates foreign key constraint`

### 4. Verify Supabase Configuration

Check that your `.env` file has the correct values:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**Important**: Make sure these are set in your Netlify environment variables too!

### 5. Check Supabase Table Structure

Verify your reviews table has the correct columns:

```sql
-- Check table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'reviews';
```

Should have:
- `id` (uuid)
- `name` (text)
- `email` (text)
- `rating` (integer)
- `comment` (text)
- `approved` (boolean)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

### 6. Test Direct Insert

Test if you can insert directly into Supabase:

1. Go to Supabase Dashboard → Table Editor → reviews
2. Click "Insert row"
3. Try to manually add a review
4. If this fails, the RLS policy is definitely the issue

### 7. Check Network Tab

1. Open browser DevTools → Network tab
2. Submit a review
3. Look for the request to Supabase
4. Check the response - it should show the error message

### 8. Complete RLS Policy Setup

Run this complete SQL script to ensure all policies are correct:

```sql
-- Drop existing policies if they exist (optional - be careful!)
DROP POLICY IF EXISTS "Public can read approved reviews" ON public.reviews;
DROP POLICY IF EXISTS "Public can insert reviews" ON public.reviews;
DROP POLICY IF EXISTS "Admins can manage reviews" ON public.reviews;
DROP POLICY IF EXISTS "Admins can update reviews" ON public.reviews;
DROP POLICY IF EXISTS "Admins can delete reviews" ON public.reviews;

-- Create all policies
-- Allow anyone to read approved reviews
CREATE POLICY "Public can read approved reviews"
ON public.reviews
FOR SELECT
USING ( approved = true );

-- Allow anyone to insert new reviews (for public review form)
CREATE POLICY "Public can insert reviews"
ON public.reviews
FOR INSERT
WITH CHECK ( true );

-- Allow authenticated users to update reviews
CREATE POLICY "Admins can update reviews"
ON public.reviews
FOR UPDATE
USING ( auth.role() = 'authenticated' )
WITH CHECK ( auth.role() = 'authenticated' );

-- Allow authenticated users to delete reviews
CREATE POLICY "Admins can delete reviews"
ON public.reviews
FOR DELETE
USING ( auth.role() = 'authenticated' );
```

### 9. Verify in Supabase Dashboard

1. Go to Supabase Dashboard → Table Editor → reviews
2. Check if new reviews are appearing there (even if not in admin panel)
3. If they appear in Supabase but not in admin panel, it's a loading issue

### 10. Check Admin Panel Loading

The admin panel should load ALL reviews (approved and unapproved). Make sure:
- You're logged in as admin
- The `loadReviews()` function is being called
- Check browser console for errors when loading admin panel

## Quick Fix Checklist

- [ ] RLS policy "Public can insert reviews" exists
- [ ] RLS is enabled on reviews table
- [ ] Supabase environment variables are set in Netlify
- [ ] Can manually insert row in Supabase dashboard
- [ ] Browser console shows no errors
- [ ] Network tab shows successful Supabase request
- [ ] Admin panel refresh button works

## Still Not Working?

1. Check the browser console on mobile (use remote debugging)
2. Check Supabase logs: Dashboard → Logs → API Logs
3. Verify the review form is actually calling Supabase (check Network tab)
4. Try submitting from desktop to see if it's mobile-specific

## Testing

After fixing RLS policies:
1. Submit a test review from mobile
2. Check Supabase Table Editor - should see the review with `approved: false`
3. Check Admin Panel - should see the review in the list
4. Approve the review
5. Check website - review should appear

