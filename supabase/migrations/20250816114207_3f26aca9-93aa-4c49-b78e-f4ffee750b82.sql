-- Create events table
CREATE TABLE public.events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  time TEXT NOT NULL,
  location TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create community_activities table
CREATE TABLE public.community_activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_activities ENABLE ROW LEVEL SECURITY;

-- Events policies
CREATE POLICY "Everyone can view events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Only admins can create events" ON public.events FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND is_admin = true));
CREATE POLICY "Only admins can update events" ON public.events FOR UPDATE 
  USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND is_admin = true));
CREATE POLICY "Only admins can delete events" ON public.events FOR DELETE 
  USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND is_admin = true));

-- Community activities policies
CREATE POLICY "Everyone can view community activities" ON public.community_activities FOR SELECT USING (true);
CREATE POLICY "Only admins can create community activities" ON public.community_activities FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND is_admin = true));
CREATE POLICY "Only admins can update community activities" ON public.community_activities FOR UPDATE 
  USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND is_admin = true));
CREATE POLICY "Only admins can delete community activities" ON public.community_activities FOR DELETE 
  USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND is_admin = true));

-- Create storage buckets for community activities images
INSERT INTO storage.buckets (id, name, public) VALUES ('community-activities', 'community-activities', true);

-- Storage policies for community activities
CREATE POLICY "Community activity images are publicly accessible" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'community-activities');

CREATE POLICY "Only admins can upload community activity images" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'community-activities' AND 
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND is_admin = true));

CREATE POLICY "Only admins can update community activity images" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'community-activities' AND 
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND is_admin = true));

CREATE POLICY "Only admins can delete community activity images" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'community-activities' AND 
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND is_admin = true));

-- Add triggers for updated_at
CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_community_activities_updated_at
  BEFORE UPDATE ON public.community_activities
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();