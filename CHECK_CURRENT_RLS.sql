-- DIAGNOSTIC: Check Current RLS Configuration
-- Run this FIRST to see what's currently configured

-- 1. Check if RLS is enabled
SELECT 
    tablename,
    rowsecurity as "RLS Enabled",
    CASE 
        WHEN rowsecurity THEN '✅ RLS is ENABLED'
        ELSE '❌ RLS is DISABLED'
    END as "Status"
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'reviews';

-- 2. List ALL existing policies
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
    END as "WITH CHECK Clause",
    permissive as "Permissive"
FROM pg_policies 
WHERE tablename = 'reviews' AND schemaname = 'public'
ORDER BY cmd, policyname;

-- 3. Check specifically for INSERT policies
SELECT 
    'INSERT Policy Check' as "Check",
    COUNT(*) as "Total INSERT Policies",
    COUNT(CASE WHEN 'anon' = ANY(roles) THEN 1 END) as "Anon INSERT Policies",
    COUNT(CASE WHEN 'authenticated' = ANY(roles) THEN 1 END) as "Authenticated INSERT Policies",
    COUNT(CASE WHEN 'public' = ANY(roles) THEN 1 END) as "Public INSERT Policies"
FROM pg_policies 
WHERE tablename = 'reviews' 
AND cmd = 'INSERT'
AND schemaname = 'public';

-- 4. Check table structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name = 'reviews'
ORDER BY ordinal_position;

