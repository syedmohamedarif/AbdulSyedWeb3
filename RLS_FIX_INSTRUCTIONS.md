# RLS Policy Fix Instructions

## The Problem
You're getting error `42501: new row violates row-level security policy` when submitting reviews. This means the RLS (Row Level Security) policy is blocking anonymous users from inserting reviews.

## Solution: Run the SQL Fix

### Option 1: Simple Fix (Recommended First)
1. Open **Supabase Dashboard** → Your Project
2. Go to **SQL Editor**
3. Open the file `FIX_RLS_WORKING.sql` from your project
4. Copy the **ENTIRE** contents
5. Paste into Supabase SQL Editor
6. Click **Run** (or press Ctrl+Enter)
7. Check the output - you should see 4 policies listed

### Option 2: If Option 1 Doesn't Work
1. First, run `CHECK_CURRENT_RLS.sql` to see what's currently configured
2. Then run `FIX_RLS_DEFINITIVE.sql` which uses explicit `TO anon` syntax

### Option 3: Manual Fix in Supabase Dashboard
1. Go to **Supabase Dashboard** → **Table Editor** → **reviews** table
2. Click on **Policies** tab (or **RLS** tab)
3. Delete all existing policies
4. Create a new policy:
   - **Policy name**: `insert_reviews`
   - **Allowed operation**: `INSERT`
   - **Target roles**: Leave empty (or select `anon`)
   - **USING expression**: (leave empty)
   - **WITH CHECK expression**: `true`
5. Click **Save**

## Verify It Works

After running the fix:

1. **Test in Supabase Dashboard:**
   - Go to **Table Editor** → **reviews**
   - Click **Insert row**
   - Fill in the form and click **Save**
   - If it works, the policy is correct

2. **Test on your website:**
   - Open your website
   - Submit a test review
   - Check browser console (F12)
   - You should see: `✅ Review saved to Supabase successfully`
   - Check admin panel - review should appear

## Common Issues

### Issue: "Policy already exists"
- The policy exists but might be misconfigured
- Solution: Run the DROP policy commands first (included in the fix scripts)

### Issue: Still getting 42501 error
- The policy might not be applied correctly
- Solution: 
  1. Run `CHECK_CURRENT_RLS.sql` to verify policies
  2. Make sure you see an INSERT policy with `WITH CHECK: true`
  3. Try Option 3 (manual fix) above

### Issue: 401 Unauthorized
- This suggests the API key might be wrong
- Check Netlify environment variables are set correctly
- Verify you're using the **anon** key, not the **service_role** key

## What Each Policy Does

1. **insert_reviews**: Allows anyone (including anonymous users) to insert new reviews
2. **select_approved_reviews**: Allows anyone to read approved reviews, authenticated users can read all
3. **update_reviews**: Only authenticated users can update reviews
4. **delete_reviews**: Only authenticated users can delete reviews

## Still Not Working?

1. Check Supabase project is active (not paused)
2. Verify environment variables in Netlify:
   - `VITE_SUPABASE_URL` is set
   - `VITE_SUPABASE_ANON_KEY` is set (the **anon** key, not service_role)
3. Redeploy your site after setting environment variables
4. Check Supabase logs: **Dashboard** → **Logs** → **API Logs**

