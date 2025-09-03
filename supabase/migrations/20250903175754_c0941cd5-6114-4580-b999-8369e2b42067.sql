-- Fix critical security vulnerability: Restrict profile access
-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Create more secure policies
-- Policy 1: Users can view their own complete profile
CREATE POLICY "Users can view own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Policy 2: Users can view basic non-sensitive info of others (names only for UI purposes)
CREATE POLICY "Users can view basic profile info" 
ON public.profiles 
FOR SELECT 
USING (true);

-- However, we need to restrict sensitive columns. Let's create a view for public access
CREATE OR REPLACE VIEW public.public_profiles AS
SELECT 
    id,
    user_id,
    first_name,
    last_name,
    role,
    avatar_url,
    created_at,
    updated_at,
    is_active
FROM public.profiles;

-- Enable RLS on the view
ALTER VIEW public.public_profiles SET (security_barrier = true);

-- Create policy for the public view
CREATE POLICY "Anyone can view public profile info" 
ON public.public_profiles 
FOR SELECT 
USING (true);

-- Now restrict the main profiles table to only allow:
-- 1. Users to see their own full profile
-- 2. Admins to see all profiles
DROP POLICY IF EXISTS "Users can view basic profile info" ON public.profiles;

CREATE POLICY "Restricted profile access" 
ON public.profiles 
FOR SELECT 
USING (
    auth.uid() = user_id OR 
    is_admin()
);