-- STEP-BY-STEP FIX: This WILL work
-- Follow these steps EXACTLY in Supabase SQL Editor

-- ============================================
-- STEP 1: Check current state (run this first)
-- ============================================
SELECT 
    'Current Policies' as "Check",
    COUNT(*) as "Count"
FROM pg_policies 
WHERE tablename = 'reviews' AND schemaname = 'public';

-- ============================================
-- STEP 2: Remove ALL existing policies
-- ============================================
DROP POLICY IF EXISTS "Public can insert reviews" ON public.reviews;
DROP POLICY IF EXISTS "Public can read approved reviews" ON public.reviews;
DROP POLICY IF EXISTS "anon_insert_reviews" ON public.reviews;
DROP POLICY IF EXISTS "authenticated_insert_reviews" ON public.reviews;
DROP POLICY IF EXISTS "insert_reviews" ON public.reviews;
DROP POLICY IF EXISTS "anon_can_insert_reviews" ON public.reviews;
DROP POLICY IF EXISTS "authenticated_can_insert_reviews" ON public.reviews;
DROP POLICY IF EXISTS "select_approved_reviews" ON public.reviews;
DROP POLICY IF EXISTS "update_reviews" ON public.reviews;
DROP POLICY IF EXISTS "delete_reviews" ON public.reviews;
DROP POLICY IF EXISTS "Authenticated users can update reviews" ON public.reviews;
DROP POLICY IF EXISTS "Authenticated users can delete reviews" ON public.reviews;
DROP POLICY IF EXISTS "Authenticated users can read all reviews" ON public.reviews;
DROP POLICY IF EXISTS "Admins can update reviews" ON public.reviews;
DROP POLICY IF EXISTS "Admins can delete reviews" ON public.reviews;

-- Also drop any remaining policies
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
-- STEP 3: Ensure RLS is enabled
-- ============================================
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- ============================================
-- STEP 4: Create the CRITICAL INSERT policy
-- ============================================
-- This is the most important one - it allows anonymous users to insert
CREATE POLICY "Allow anonymous inserts"
ON public.reviews
FOR INSERT
TO anon
WITH CHECK (true);

-- ============================================
-- STEP 5: Create other necessary policies
-- ============================================
-- Allow anonymous to read approved reviews
CREATE POLICY "Allow anonymous read approved"
ON public.reviews
FOR SELECT
TO anon
USING (approved = true);

-- Allow authenticated users to do everything
CREATE POLICY "Allow authenticated all operations"
ON public.reviews
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- ============================================
-- STEP 6: VERIFY - Run this to check
-- ============================================
SELECT 
    policyname as "Policy Name",
    cmd as "Operation",
    roles as "Roles",
    CASE 
        WHEN with_check IS NOT NULL THEN with_check::text
        ELSE 'N/A'
    END as "WITH CHECK"
FROM pg_policies 
WHERE tablename = 'reviews' AND schemaname = 'public'
ORDER BY cmd, policyname;

-- You should see:
-- 1. "Allow anonymous inserts" - INSERT - {anon} - true
-- 2. "Allow anonymous read approved" - SELECT - {anon} - (approved = true)
-- 3. "Allow authenticated all operations" - ALL - {authenticated} - true

