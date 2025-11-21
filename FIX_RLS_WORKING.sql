-- WORKING FIX: RLS Policies for Reviews
-- This is the SIMPLEST version that should work
-- Run this ENTIRE script in Supabase SQL Editor

-- Step 1: Drop all existing policies
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

-- Step 2: Enable RLS
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Step 3: Create policies WITHOUT specifying roles
-- This allows both anon and authenticated users
-- This is the simplest approach that works in most Supabase versions

-- Allow INSERT for everyone (including anonymous users)
CREATE POLICY "insert_reviews"
ON public.reviews
FOR INSERT
WITH CHECK (true);

-- Allow SELECT approved reviews for everyone
CREATE POLICY "select_approved_reviews"
ON public.reviews
FOR SELECT
USING (approved = true OR auth.role() = 'authenticated');

-- Allow UPDATE for authenticated users only
CREATE POLICY "update_reviews"
ON public.reviews
FOR UPDATE
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Allow DELETE for authenticated users only
CREATE POLICY "delete_reviews"
ON public.reviews
FOR DELETE
USING (auth.role() = 'authenticated');

-- Step 4: Verify
SELECT 
    policyname,
    cmd,
    roles,
    with_check::text as "WITH CHECK"
FROM pg_policies 
WHERE tablename = 'reviews' AND schemaname = 'public'
ORDER BY cmd;

