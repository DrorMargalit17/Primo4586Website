-- Update storage policies to use has_role() instead of profiles.is_admin
-- This allows us to safely drop the is_admin column

-- Drop old community activity image policies
DROP POLICY IF EXISTS "Only admins can upload community activity images" ON storage.objects;
DROP POLICY IF EXISTS "Only admins can update community activity images" ON storage.objects;
DROP POLICY IF EXISTS "Only admins can delete community activity images" ON storage.objects;

-- Create new community activity image policies using has_role()
CREATE POLICY "Only admins can upload community activity images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'community-activities' 
    AND public.has_role(auth.uid(), 'admin'::app_role)
  );

CREATE POLICY "Only admins can update community activity images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'community-activities' 
    AND public.has_role(auth.uid(), 'admin'::app_role)
  );

CREATE POLICY "Only admins can delete community activity images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'community-activities' 
    AND public.has_role(auth.uid(), 'admin'::app_role)
  );

-- Drop old team image policies
DROP POLICY IF EXISTS "Admins can upload team images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update team images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete team images" ON storage.objects;

-- Create new team image policies using has_role()
CREATE POLICY "Admins can upload team images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'team-images' 
    AND public.has_role(auth.uid(), 'admin'::app_role)
  );

CREATE POLICY "Admins can update team images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'team-images' 
    AND public.has_role(auth.uid(), 'admin'::app_role)
  );

CREATE POLICY "Admins can delete team images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'team-images' 
    AND public.has_role(auth.uid(), 'admin'::app_role)
  );

-- Drop old sponsor logo policies
DROP POLICY IF EXISTS "Only admins can upload sponsor logos" ON storage.objects;
DROP POLICY IF EXISTS "Only admins can update sponsor logos" ON storage.objects;
DROP POLICY IF EXISTS "Only admins can delete sponsor logos" ON storage.objects;

-- Create new sponsor logo policies using has_role()
CREATE POLICY "Only admins can upload sponsor logos"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'sponsor-logos' 
    AND public.has_role(auth.uid(), 'admin'::app_role)
  );

CREATE POLICY "Only admins can update sponsor logos"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'sponsor-logos' 
    AND public.has_role(auth.uid(), 'admin'::app_role)
  );

CREATE POLICY "Only admins can delete sponsor logos"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'sponsor-logos' 
    AND public.has_role(auth.uid(), 'admin'::app_role)
  );

-- Now drop the insecure is_admin column from profiles
ALTER TABLE public.profiles DROP COLUMN IF EXISTS is_admin;