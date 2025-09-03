-- Fix critical security vulnerability: Restrict profile access properly
-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Drop any existing policies we might have created
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view basic profile info" ON public.profiles;
DROP POLICY IF EXISTS "Restricted profile access" ON public.profiles;

-- Drop the view we tried to create
DROP VIEW IF EXISTS public.public_profiles;

-- Create secure policies for profiles table
-- Policy 1: Users can view their own complete profile
CREATE POLICY "Users can view own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Policy 2: Admins can view all profiles
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (is_admin());

-- Policy 3: For legitimate business needs, allow viewing of basic non-sensitive info only
-- This is restricted to just names and role - no sensitive data
CREATE POLICY "View basic profile info for business needs" 
ON public.profiles 
FOR SELECT 
USING (
    -- Only allow access to non-sensitive columns for business purposes
    -- This will need to be handled at application level to filter sensitive fields
    true
);

-- Actually, let's be more restrictive and handle business needs differently
DROP POLICY IF EXISTS "View basic profile info for business needs" ON public.profiles;

-- Final secure policy: Only self and admins can access profiles
-- This may break some UI elements but ensures security first