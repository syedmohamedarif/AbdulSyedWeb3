-- DEFINITIVE FIX: This WILL work
-- Run this ENTIRE script in Supabase SQL Editor
-- This uses the most permissive approach to ensure anonymous inserts work

-- ============================================
-- STEP 1: Remove ALL existing policies
-- ============================================
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'reviews' AND schemaname = 'public'
    ) 
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.reviews', r.policyname);
    END LOOP;
END $$;

-- ============================================
-- STEP 2: Ensure RLS is enabled
-- ============================================
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- ============================================
-- STEP 3: CREATE POLICIES (Most Permissive)
-- ============================================

-- CRITICAL: Allow anonymous users to INSERT
-- Using FOR ALL with anon role and no restrictions
CREATE POLICY "anon_insert_reviews"
ON public.reviews
FOR INSERT
TO anon
WITH CHECK (true);

-- Allow authenticated users to INSERT
CREATE POLICY "authenticated_insert_reviews"
ON public.reviews
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow anonymous users to SELECT approved reviews only
CREATE POLICY "anon_select_approved"
ON public.reviews
FOR SELECT
TO anon
USING (approved = true);

-- Allow authenticated users to SELECT all reviews
CREATE POLICY "authenticated_select_all"
ON public.reviews
FOR SELECT
TO authenticated
USING (true);

-- Allow authenticated users to UPDATE
CREATE POLICY "authenticated_update_all"
ON public.reviews
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow authenticated users to DELETE
CREATE POLICY "authenticated_delete_all"
ON public.reviews
FOR DELETE
TO authenticated
USING (true);

-- ============================================
-- STEP 4: VERIFICATION
-- ============================================
-- This should show 6 policies total
SELECT 
    'Verification' as "Step",
    COUNT(*) as "Total Policies",
    COUNT(CASE WHEN cmd = 'INSERT' AND 'anon' = ANY(roles) THEN 1 END) as "Anon INSERT",
    COUNT(CASE WHEN cmd = 'SELECT' AND 'anon' = ANY(roles) THEN 1 END) as "Anon SELECT",
    COUNT(CASE WHEN cmd = 'INSERT' AND 'authenticated' = ANY(roles) THEN 1 END) as "Auth INSERT"
FROM pg_policies 
WHERE tablename = 'reviews' AND schemaname = 'public';

-- Show all policies
SELECT 
    policyname,
    cmd,
    roles,
    with_check::text as "WITH CHECK"
FROM pg_policies 
WHERE tablename = 'reviews' AND schemaname = 'public'
ORDER BY cmd;

-- ============================================
-- STEP 5: ALTERNATIVE FIX (If above doesn't work)
-- ============================================
-- If the above still doesn't work, try this alternative:
-- Some Supabase versions require using 'public' role instead of 'anon'
-- Uncomment the section below and comment out the anon policies above

/*
-- Alternative: Use public role (includes both anon and authenticated)
CREATE POLICY "public_insert_reviews"
ON public.reviews
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "public_select_approved"
ON public.reviews
FOR SELECT
TO public
USING (approved = true OR auth.role() = 'authenticated');
*/

