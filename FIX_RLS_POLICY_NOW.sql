-- URGENT FIX: This will fix the RLS policy issue
-- Run this ENTIRE script in Supabase SQL Editor

-- Step 1: Drop ALL existing policies on reviews table
DROP POLICY IF EXISTS "Public can read approved reviews" ON public.reviews;
DROP POLICY IF EXISTS "Public can insert reviews" ON public.reviews;
DROP POLICY IF EXISTS "Admins can manage reviews" ON public.reviews;
DROP POLICY IF EXISTS "Admins can update reviews" ON public.reviews;
DROP POLICY IF EXISTS "Admins can delete reviews" ON public.reviews;
DROP POLICY IF EXISTS "Authenticated users can manage reviews" ON public.reviews;

-- Step 2: Ensure RLS is enabled
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Step 3: Create the INSERT policy FIRST (most important)
-- This allows ANYONE to insert reviews
CREATE POLICY "Public can insert reviews"
ON public.reviews
FOR INSERT
TO public
WITH CHECK (true);

-- Step 4: Create SELECT policy (read approved reviews)
CREATE POLICY "Public can read approved reviews"
ON public.reviews
FOR SELECT
TO public
USING (approved = true);

-- Step 5: Create UPDATE policy (authenticated users only)
CREATE POLICY "Authenticated users can update reviews"
ON public.reviews
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Step 6: Create DELETE policy (authenticated users only)
CREATE POLICY "Authenticated users can delete reviews"
ON public.reviews
FOR DELETE
TO authenticated
USING (true);

-- Step 7: Allow authenticated users to read ALL reviews (for admin panel)
CREATE POLICY "Authenticated users can read all reviews"
ON public.reviews
FOR SELECT
TO authenticated
USING (true);

-- Step 8: Verify policies were created
SELECT 
    policyname,
    cmd as "Command",
    roles as "Roles",
    CASE 
        WHEN qual IS NOT NULL THEN 'USING: ' || qual::text
        ELSE 'No USING clause'
    END as "Using Clause",
    CASE 
        WHEN with_check IS NOT NULL THEN 'WITH CHECK: ' || with_check::text
        ELSE 'No WITH CHECK'
    END as "With Check Clause"
FROM pg_policies 
WHERE tablename = 'reviews'
ORDER BY policyname;

