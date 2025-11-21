-- Check existing policies on reviews table
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'reviews';

-- Check if RLS is enabled
SELECT 
    tablename, 
    rowsecurity as "RLS Enabled"
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'reviews';

-- If you need to recreate the policy, first drop it:
-- DROP POLICY IF EXISTS "Public can insert reviews" ON public.reviews;

-- Then create it again:
-- CREATE POLICY "Public can insert reviews"
-- ON public.reviews
-- FOR INSERT
-- WITH CHECK ( true );

