-- Create storage bucket for team member images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('team-images', 'team-images', true);

-- Create policies for team images
CREATE POLICY "Team images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'team-images');

CREATE POLICY "Admins can upload team images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'team-images' AND (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.user_id = auth.uid() 
  AND profiles.is_admin = true
)));

CREATE POLICY "Admins can update team images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'team-images' AND (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.user_id = auth.uid() 
  AND profiles.is_admin = true
)));

CREATE POLICY "Admins can delete team images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'team-images' AND (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.user_id = auth.uid() 
  AND profiles.is_admin = true
)));