# Netlify Environment Variables Setup

## Critical Issue
If reviews are not appearing in Supabase or the admin panel, it's likely because **Supabase environment variables are not set in Netlify**.

## How to Fix

### Step 1: Get Your Supabase Credentials
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Project Settings** → **API**
4. Copy:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

### Step 2: Add to Netlify
1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Select your site (`mrabdulsyed.com`)
3. Go to **Site settings** → **Environment variables**
4. Click **Add a variable**
5. Add these two variables:

   **Variable 1:**
   - Key: `VITE_SUPABASE_URL`
   - Value: `https://your-project-id.supabase.co` (your Supabase URL)
   - Scope: All scopes (or just Production)

   **Variable 2:**
   - Key: `VITE_SUPABASE_ANON_KEY`
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (your anon key)
   - Scope: All scopes (or just Production)

6. Click **Save**

### Step 3: Redeploy
1. After adding the variables, go to **Deploys** tab
2. Click **Trigger deploy** → **Deploy site**
3. Wait for deployment to complete

### Step 4: Verify
1. Open your website
2. Open browser console (F12)
3. Submit a test review
4. Check console - you should see:
   - `✅ Supabase is configured`
   - `🔄 Attempting to save review to Supabase...`
   - `✅ Review saved to Supabase successfully`

## Important Notes

- **Local `.env` file doesn't work in production** - you MUST set variables in Netlify
- Variables must start with `VITE_` to be accessible in the browser
- After adding variables, you MUST redeploy for them to take effect
- The anon key is safe to expose - it's designed for client-side use

## Troubleshooting

### Check if variables are set:
1. Go to Netlify → Site settings → Environment variables
2. Verify both `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` exist
3. Make sure they're not in "Build environment variables only" - they need to be in "Runtime environment variables"

### Check browser console:
After deploying, open your site and check the console. You should see:
- `✅ Supabase is configured` (not `⚠️ Supabase is NOT configured!`)

### If still not working:
1. Clear browser cache
2. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
3. Check Netlify deploy logs for any errors
4. Verify the Supabase URL and key are correct (no extra spaces)

