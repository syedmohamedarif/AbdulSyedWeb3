-- SIMPLE FIX: RLS Policy for Reviews Table
-- This is a simpler version that should work
-- Run this ENTIRE script in Supabase SQL Editor

-- Step 1: Drop all existing policies
DROP POLICY IF EXISTS "Public can insert reviews" ON public.reviews;
DROP POLICY IF EXISTS "anon_insert_reviews" ON public.reviews;
DROP POLICY IF EXISTS "authenticated_insert_reviews" ON public.reviews;
DROP POLICY IF EXISTS "Public can read approved reviews" ON public.reviews;
DROP POLICY IF EXISTS "anon_read_approved_reviews" ON public.reviews;
DROP POLICY IF EXISTS "authenticated_read_all_reviews" ON public.reviews;
DROP POLICY IF EXISTS "Authenticated users can update reviews" ON public.reviews;
DROP POLICY IF EXISTS "authenticated_update_reviews" ON public.reviews;
DROP POLICY IF EXISTS "Authenticated users can delete reviews" ON public.reviews;
DROP POLICY IF EXISTS "authenticated_delete_reviews" ON public.reviews;
DROP POLICY IF EXISTS "Authenticated users can read all reviews" ON public.reviews;

-- Step 2: Enable RLS
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Step 3: CRITICAL - Allow anonymous users to INSERT
-- This is the most important policy for the review form
CREATE POLICY "Allow anonymous inserts"
ON public.reviews
FOR INSERT
TO anon
WITH CHECK (true);

-- Step 4: Allow anonymous users to SELECT approved reviews
CREATE POLICY "Allow anonymous read approved"
ON public.reviews
FOR SELECT
TO anon
USING (approved = true);

-- Step 5: Allow authenticated users to do everything
CREATE POLICY "Allow authenticated all"
ON public.reviews
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Step 6: Verify
SELECT 
    policyname,
    cmd,
    roles
FROM pg_policies 
WHERE tablename = 'reviews'
ORDER BY cmd;

