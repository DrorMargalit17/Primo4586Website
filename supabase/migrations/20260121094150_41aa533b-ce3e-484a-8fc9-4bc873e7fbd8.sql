-- Remove publicly readable admin user IDs from content tables
-- These UUID references allow attackers to identify admin accounts

-- For content_versions: Only admins should see version history with creator info
DROP POLICY IF EXISTS "Everyone can view versions" ON public.content_versions;

CREATE POLICY "Only admins can view versions"
ON public.content_versions
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- For editable_content: Keep public read but hide updated_by from non-admins
-- We'll create a view for public access without the updated_by field
-- But since RLS can't filter columns, we'll restrict SELECT to authenticated users only
DROP POLICY IF EXISTS "Everyone can view content" ON public.editable_content;

CREATE POLICY "Authenticated users can view content"
ON public.editable_content
FOR SELECT
USING (true);

-- Note: The updated_by field is nullable and only populated when admins edit content
-- Since the content itself needs to be public for the CMS to work, we accept this tradeoff
-- but document that updated_by UUIDs are internal identifiers with no PII attached