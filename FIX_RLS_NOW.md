# 🚨 URGENT: Fix RLS Policy Error

## The Error You're Seeing
```
42501: new row violates row-level security policy for table "reviews"
```

This means anonymous users cannot insert reviews because the RLS policy is blocking them.

## ✅ SOLUTION: Follow These Steps EXACTLY

### Step 1: Open Supabase Dashboard
1. Go to https://supabase.com/dashboard
2. Select your project
3. Click **SQL Editor** in the left sidebar

### Step 2: Run the Fix Script
1. Open the file `FIX_RLS_STEP_BY_STEP.sql` from your project
2. Copy the **ENTIRE** contents (all lines)
3. Paste into the Supabase SQL Editor
4. Click **Run** (or press Ctrl+Enter / Cmd+Enter)

### Step 3: Verify It Worked
After running, you should see a table with 3 policies:
- ✅ "Allow anonymous inserts" - INSERT - {anon}
- ✅ "Allow anonymous read approved" - SELECT - {anon}  
- ✅ "Allow authenticated all operations" - ALL - {authenticated}

### Step 4: Test on Your Website
1. Go to your website
2. Submit a test review
3. Open browser console (F12)
4. You should see: `✅ Review saved to Supabase successfully`

## ❌ If It Still Doesn't Work

### Check 1: Verify Policies Were Created
Run this in Supabase SQL Editor:
```sql
SELECT policyname, cmd, roles
FROM pg_policies 
WHERE tablename = 'reviews';
```

You MUST see a policy with:
- `cmd = 'INSERT'`
- `roles` contains `anon` or is empty

### Check 2: Verify RLS is Enabled
Run this:
```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'reviews';
```

`rowsecurity` should be `true`

### Check 3: Test Direct Insert in Supabase
1. Go to **Table Editor** → **reviews**
2. Click **Insert row**
3. Fill in the form
4. Click **Save**
5. If this fails, the policy is still wrong

### Check 4: Verify Environment Variables
Make sure in Netlify:
- `VITE_SUPABASE_URL` is set
- `VITE_SUPABASE_ANON_KEY` is set (the **anon** key, not service_role)

After setting variables, **redeploy** your site.

## 🔍 Alternative: Manual Policy Creation

If the SQL script doesn't work, create the policy manually:

1. Go to **Table Editor** → **reviews** table
2. Click **Policies** tab (or look for RLS/Policy settings)
3. Click **New Policy**
4. Choose **For full customization**
5. Set:
   - **Policy name**: `Allow anonymous inserts`
   - **Allowed operation**: `INSERT`
   - **Target roles**: Select `anon` (or leave empty)
   - **USING expression**: (leave empty)
   - **WITH CHECK expression**: `true`
6. Click **Save**

## 📞 Still Not Working?

Share with me:
1. The output from `CHECK_CURRENT_RLS.sql`
2. Screenshot of your Supabase policies page
3. The exact error message from browser console

