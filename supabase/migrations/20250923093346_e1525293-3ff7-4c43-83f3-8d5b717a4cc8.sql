-- Create sponsors table
CREATE TABLE public.sponsors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo TEXT NOT NULL,
  website TEXT NOT NULL,
  description TEXT NOT NULL,
  since TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.sponsors ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Everyone can view sponsors"
ON public.sponsors
FOR SELECT
USING (true);

CREATE POLICY "Only admins can create sponsors"
ON public.sponsors
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() AND is_admin = true
  )
);

CREATE POLICY "Only admins can update sponsors"
ON public.sponsors
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() AND is_admin = true
  )
);

CREATE POLICY "Only admins can delete sponsors"
ON public.sponsors
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() AND is_admin = true
  )
);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_sponsors_updated_at
  BEFORE UPDATE ON public.sponsors
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert existing sponsor data
INSERT INTO public.sponsors (name, logo, website, description, since, display_order) VALUES
('CodeValue', '/Sponsors/codeValue.png', 'https://www.codevalue.com/', 'CodeValue is a leading software development company, specializing in advanced technological solutions and driving innovation across organizations. Since 2025, they have been one of our main sponsors, providing essential financial support as well as top-tier professional and technological guidance.', '2025', 1),
('CHEMOGRAF', '/Sponsors/Chemograf.png', 'https://chemograf.com/?lang=he', 'Chemograf is a pioneering company in the field of chemical technologies and advanced materials. Since 2024, they have been a key sponsor of ours, offering vital funding and expert knowledge to support our initiatives and growth.', '2024', 2),
('PLASKOLITE', '/Sponsors/plaskolite.png', 'https://plaskolite.com/', 'Plaskolite is a leading manufacturer specializing in innovative plastic solutions and engineered acrylic products. Since 2025, they have been a valued sponsor of ours, providing crucial financial support and technical expertise to help advance our projects.', '2022', 3),
('WEISS GROUP', '/Sponsors/Weiss_Group.png', 'https://weissgroup.co.il/en/', 'Weiss Group is a distinguished company specializing in high-precision industrial equipment and automation solutions. Since 2025, they have been a proud sponsor of ours, contributing essential funding and expert technical support to drive our success.', '2025', 4),
('Argentools', '/Sponsors/Argentols.png', 'https://www.argentools.co.il/', 'Argentools is a dynamic company specializing in advanced tooling solutions and precision engineering services. Since 2025, they have been a key sponsor of ours, offering vital financial backing and expert industry knowledge to support our development.', '2019', 5),
('Kursia', '/Sponsors/Kursia.png', 'https://modiinapp.com/he/page/7500/%D7%A7%D7%95%D7%A8%D7%A1%D7%99%D7%94-%D7%91%D7%99%D7%AA-%D7%A9%D7%9C-%D7%98%D7%A2%D7%9E%D7%99%D7%9D', 'Kursia is a renowned establishment in Modi''in, Israel, offering a diverse range of culinary experiences with a focus on high-quality, flavorful dishes. Since 2025, they have been a valued sponsor of ours, providing essential support and contributing to the success of our initiatives.', '2025', 6),
('Cheese Pizza', '/Sponsors/CheesePizza.jpg', 'https://pizzacheese.co.il/', 'Pizza Cheese is a local Israeli pizzeria known for its fresh ingredients, rich flavors, and welcoming atmosphere. They generously support us by donating delicious food every week throughout the season. Their kindness not only keeps us energized but also creates a warm sense of community around our team.', '2025', 7),
('3d3', '/Sponsors/3d3.jpg', 'https://www.3d3.co.il/', '3D3 is an innovative Israeli company specializing in advanced 3D printing and creative design solutions. They generously support us by contributing every week throughout the season, helping us stay equipped and inspired. Their commitment not only strengthens our work but also builds a strong sense of partnership within our team', '2025', 8),
('Ironi B', '/Sponsors/ironiB.png', 'https://ironibetrabin.mashov.info/', 'Ironi B is our local high school, providing quality education and fostering growth in academics, arts, and community engagement. It plays a central role in shaping the future of its students and the wider community.', '2012', 9),
('Modi''in City', '/Sponsors/modiin.png', 'https://www.modiin.muni.il/ModiinWebSite/MainPage.aspx', 'Modi''in City is our vibrant hometown, known for its modern infrastructure, rich history, and dynamic community life. It serves as a center for culture, education, and innovation in the region, offering a high quality of life to its residents.', '2012', 10);

-- Create storage bucket for sponsor logos
INSERT INTO storage.buckets (id, name, public) VALUES ('sponsor-logos', 'sponsor-logos', true);

-- Create storage policies for sponsor logos
CREATE POLICY "Sponsor logos are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'sponsor-logos');

CREATE POLICY "Only admins can upload sponsor logos"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'sponsor-logos' AND
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() AND is_admin = true
  )
);

CREATE POLICY "Only admins can update sponsor logos"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'sponsor-logos' AND
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() AND is_admin = true
  )
);

CREATE POLICY "Only admins can delete sponsor logos"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'sponsor-logos' AND
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() AND is_admin = true
  )
);