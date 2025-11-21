-- Complete RLS Policy Fix for Reviews Table
-- Run this entire script in Supabase SQL Editor

-- Step 1: Drop all existing policies (safe - we'll recreate them)
DROP POLICY IF EXISTS "Public can read approved reviews" ON public.reviews;
DROP POLICY IF EXISTS "Public can insert reviews" ON public.reviews;
DROP POLICY IF EXISTS "Admins can manage reviews" ON public.reviews;
DROP POLICY IF EXISTS "Admins can update reviews" ON public.reviews;
DROP POLICY IF EXISTS "Admins can delete reviews" ON public.reviews;

-- Step 2: Ensure RLS is enabled
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Step 3: Create all policies from scratch

-- Allow anyone to read approved reviews (for public display)
CREATE POLICY "Public can read approved reviews"
ON public.reviews
FOR SELECT
USING ( approved = true );

-- Allow anyone to insert new reviews (for public review form)
-- This is the critical one for mobile submissions!
CREATE POLICY "Public can insert reviews"
ON public.reviews
FOR INSERT
WITH CHECK ( true );

-- Allow authenticated users to update reviews (for admin panel)
CREATE POLICY "Admins can update reviews"
ON public.reviews
FOR UPDATE
USING ( auth.role() = 'authenticated' )
WITH CHECK ( auth.role() = 'authenticated' );

-- Allow authenticated users to delete reviews (for admin panel)
CREATE POLICY "Admins can delete reviews"
ON public.reviews
FOR DELETE
USING ( auth.role() = 'authenticated' );

-- Step 4: Verify policies were created
SELECT 
    policyname,
    cmd as "Command",
    CASE 
        WHEN with_check IS NOT NULL THEN 'WITH CHECK: ' || with_check::text
        ELSE 'No WITH CHECK'
    END as "Policy Details"
FROM pg_policies 
WHERE tablename = 'reviews'
ORDER BY policyname;

