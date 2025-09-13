-- Remove the overly permissive policy that allows viewing all profiles
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Ensure we only have secure policies that allow users to view only their own profile
-- The "Users can view own profile" policy with auth.uid() = user_id should remain

-- Also ensure proper admin access if needed (only for authenticated admin users)
CREATE POLICY "Admins can view all profiles for management" 
ON public.profiles 
FOR SELECT
USING (
  auth.uid() IS NOT NULL AND 
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND is_admin = true
  )
);