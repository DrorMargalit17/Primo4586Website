-- Add RLS policy to allow admins to update other users' profiles
-- This is needed for the admin registration functionality to work properly
CREATE POLICY "Admins can update any profile" 
ON public.profiles 
FOR UPDATE 
USING (public.get_current_user_admin_status() = true);