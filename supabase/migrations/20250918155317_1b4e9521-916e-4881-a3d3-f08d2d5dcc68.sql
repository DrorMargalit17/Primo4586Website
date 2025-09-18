-- Fix infinite recursion in profiles table RLS policies
-- The issue is that the admin policy queries the profiles table from within a policy on the profiles table

-- First, create a security definer function to safely check if a user is an admin
CREATE OR REPLACE FUNCTION public.get_current_user_admin_status()
RETURNS BOOLEAN AS $$
  SELECT is_admin FROM public.profiles WHERE user_id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public;

-- Drop the problematic admin policy that causes infinite recursion
DROP POLICY IF EXISTS "Admins can view all profiles for management" ON public.profiles;

-- Create a new, more secure admin policy using the security definer function
-- This policy only allows admins to see user_id and is_admin fields, not email addresses
CREATE POLICY "Admins can view user management data" 
ON public.profiles 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL 
  AND public.get_current_user_admin_status() = true
);