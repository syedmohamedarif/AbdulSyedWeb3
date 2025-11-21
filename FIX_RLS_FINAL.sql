-- FINAL FIX: RLS Policy for Reviews Table
-- This script fixes the "new row violates row-level security policy" error
-- Run this ENTIRE script in Supabase SQL Editor

-- Step 1: Drop ALL existing policies on reviews table
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

-- Step 2: Ensure RLS is enabled
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Step 3: Create INSERT policy for anonymous users (CRITICAL!)
-- This allows unauthenticated users to insert reviews
-- Note: In Supabase, anonymous users use the 'anon' role
CREATE POLICY "anon_insert_reviews"
ON public.reviews
FOR INSERT
TO anon
WITH CHECK (true);

-- Step 4: Also allow authenticated users to insert (for admin panel)
CREATE POLICY "authenticated_insert_reviews"
ON public.reviews
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Step 5: Allow anonymous users to read approved reviews (for public display)
CREATE POLICY "anon_read_approved_reviews"
ON public.reviews
FOR SELECT
TO anon
USING (approved = true);

-- Step 6: Allow authenticated users to read ALL reviews (for admin panel)
CREATE POLICY "authenticated_read_all_reviews"
ON public.reviews
FOR SELECT
TO authenticated
USING (true);

-- Step 7: Allow authenticated users to update reviews (for admin panel)
CREATE POLICY "authenticated_update_reviews"
ON public.reviews
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Step 8: Allow authenticated users to delete reviews (for admin panel)
CREATE POLICY "authenticated_delete_reviews"
ON public.reviews
FOR DELETE
TO authenticated
USING (true);

-- Step 9: Verify all policies were created correctly
SELECT 
    policyname as "Policy Name",
    cmd as "Command",
    roles as "Roles",
    CASE 
        WHEN qual IS NOT NULL THEN qual::text
        ELSE 'No USING clause'
    END as "USING Clause",
    CASE 
        WHEN with_check IS NOT NULL THEN with_check::text
        ELSE 'No WITH CHECK'
    END as "WITH CHECK Clause"
FROM pg_policies 
WHERE tablename = 'reviews' AND schemaname = 'public'
ORDER BY cmd, policyname;

-- Step 10: Verify RLS is enabled
SELECT 
    tablename,
    rowsecurity as "RLS Enabled"
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'reviews';

-- Step 11: Test query to verify anonymous access
-- This should return true if policies are working
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM pg_policies 
            WHERE tablename = 'reviews' 
            AND cmd = 'INSERT' 
            AND 'anon' = ANY(roles)
        ) THEN '✅ INSERT policy for anon exists'
        ELSE '❌ INSERT policy for anon MISSING'
    END as "Policy Check";

