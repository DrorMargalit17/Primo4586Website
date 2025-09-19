-- Create resources table
CREATE TABLE public.resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  link TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

-- Create policies for resources
CREATE POLICY "Everyone can view resources" 
ON public.resources 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can create resources" 
ON public.resources 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM profiles 
  WHERE user_id = auth.uid() AND is_admin = true
));

CREATE POLICY "Only admins can update resources" 
ON public.resources 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE user_id = auth.uid() AND is_admin = true
));

CREATE POLICY "Only admins can delete resources" 
ON public.resources 
FOR DELETE 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE user_id = auth.uid() AND is_admin = true
));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_resources_updated_at
BEFORE UPDATE ON public.resources
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default resources for each category
INSERT INTO public.resources (category, name, type, link) VALUES
-- Strategy
('Strategy', 'Game Analysis Sheet', 'PDF', '#'),
('Strategy', 'Match Strategy Presentation', 'Slides', '#'),

-- CAD & Manufacture
('CAD & Manufacture', 'Fusion 360 Files', 'CAD', '#'),
('CAD & Manufacture', 'Machining Guidelines', 'PDF', '#'),

-- Mechanics
('Mechanics', 'Subsystem Overview', 'Document', '#'),
('Mechanics', 'Assembly Instructions', 'PDF', '#'),

-- Electronics
('Electronics', 'Wiring Diagram', 'Schematic', '#'),
('Electronics', 'Sensor Guide', 'Manual', '#'),

-- Software
('Software', 'Control Code Repo', 'GitHub Repository', '#'),
('Software', 'Autonomous Algorithms', 'Python Scripts', '#'),

-- Community
('Community', 'Outreach Summary', 'Report', '#'),
('Community', 'Volunteer Program', 'Document', '#'),

-- Media
('Media', 'Photo Collection', 'Drive Folder', '#'),
('Media', 'Promo Video', 'YouTube', '#'),

-- Design
('Design', 'Brand Guide', 'PDF', '#'),
('Design', 'Logo Pack', 'Assets', '#'),

-- FLL
('FLL', 'Mentorship Plan', 'Document', '#'),
('FLL', 'Team Goals', 'PDF', '#'),

-- Resource Mobilization
('Resource Mobilization', 'Sponsorship Letter', 'PDF', '#'),
('Resource Mobilization', 'Budget Plan', 'Spreadsheet', '#');