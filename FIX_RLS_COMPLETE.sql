-- COMPLETE FIX: RLS Policies for Reviews Table
-- This fixes the "new row violates row-level security policy" error (42501)
-- Run this ENTIRE script in Supabase SQL Editor

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
        RAISE NOTICE 'Dropped policy: %', r.policyname;
    END LOOP;
END $$;

-- ============================================
-- STEP 2: Ensure RLS is enabled
-- ============================================
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- ============================================
-- STEP 3: INSERT POLICIES (CRITICAL!)
-- ============================================
-- Allow anonymous users (unauthenticated) to insert reviews
-- This is what allows the public review form to work
CREATE POLICY "anon_can_insert_reviews"
ON public.reviews
FOR INSERT
TO anon
WITH CHECK (true);

-- Allow authenticated users to insert (for admin panel)
CREATE POLICY "authenticated_can_insert_reviews"
ON public.reviews
FOR INSERT
TO authenticated
WITH CHECK (true);

-- ============================================
-- STEP 4: SELECT POLICIES
-- ============================================
-- Anonymous users can only read approved reviews
CREATE POLICY "anon_can_read_approved"
ON public.reviews
FOR SELECT
TO anon
USING (approved = true);

-- Authenticated users can read ALL reviews (for admin panel)
CREATE POLICY "authenticated_can_read_all"
ON public.reviews
FOR SELECT
TO authenticated
USING (true);

-- ============================================
-- STEP 5: UPDATE POLICIES
-- ============================================
-- Only authenticated users can update reviews
CREATE POLICY "authenticated_can_update"
ON public.reviews
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- ============================================
-- STEP 6: DELETE POLICIES
-- ============================================
-- Only authenticated users can delete reviews
CREATE POLICY "authenticated_can_delete"
ON public.reviews
FOR DELETE
TO authenticated
USING (true);

-- ============================================
-- STEP 7: VERIFICATION
-- ============================================
-- Check all policies were created
SELECT 
    'Policy Check' as "Status",
    COUNT(*) as "Total Policies",
    COUNT(CASE WHEN cmd = 'INSERT' AND 'anon' = ANY(roles) THEN 1 END) as "Anon INSERT Policy",
    COUNT(CASE WHEN cmd = 'SELECT' AND 'anon' = ANY(roles) THEN 1 END) as "Anon SELECT Policy",
    COUNT(CASE WHEN cmd = 'INSERT' AND 'authenticated' = ANY(roles) THEN 1 END) as "Auth INSERT Policy"
FROM pg_policies 
WHERE tablename = 'reviews' AND schemaname = 'public';

-- Show all policies
SELECT 
    policyname as "Policy Name",
    cmd as "Command",
    roles as "Roles",
    CASE 
        WHEN with_check IS NOT NULL THEN with_check::text
        ELSE 'N/A'
    END as "WITH CHECK"
FROM pg_policies 
WHERE tablename = 'reviews' AND schemaname = 'public'
ORDER BY cmd, policyname;

-- Verify RLS is enabled
SELECT 
    tablename,
    rowsecurity as "RLS Enabled"
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'reviews';

-- ============================================
-- STEP 8: TEST (Optional - uncomment to test)
-- ============================================
-- Test if anonymous insert would work (this will fail if policies are wrong)
-- Note: This test requires the anon key, so it's commented out
-- You can test manually by submitting a review from the website

/*
-- Expected result: Should return 1 row with anon INSERT policy
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM pg_policies 
            WHERE tablename = 'reviews' 
            AND cmd = 'INSERT' 
            AND 'anon' = ANY(roles)
            AND with_check::text = 'true'
        ) THEN '✅ Anon INSERT policy is correctly configured'
        ELSE '❌ Anon INSERT policy is MISSING or INCORRECT'
    END as "Test Result";
*/

