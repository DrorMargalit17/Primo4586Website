-- Create team_members table for managing all team people
CREATE TABLE public.team_members (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  role text,
  image text NOT NULL,
  teams text[] DEFAULT '{}',
  section text NOT NULL CHECK (section IN ('captains', 'leads', 'members', 'mentors')),
  year text, -- For mentors only
  display_order integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Create policies for team_members
CREATE POLICY "Everyone can view team members" 
ON public.team_members 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can create team members" 
ON public.team_members 
FOR INSERT 
WITH CHECK (get_current_user_admin_status() = true);

CREATE POLICY "Only admins can update team members" 
ON public.team_members 
FOR UPDATE 
USING (get_current_user_admin_status() = true);

CREATE POLICY "Only admins can delete team members" 
ON public.team_members 
FOR DELETE 
USING (get_current_user_admin_status() = true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_team_members_updated_at
BEFORE UPDATE ON public.team_members
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert existing team data into the database
INSERT INTO public.team_members (name, role, image, teams, section, display_order) VALUES
-- Captains
('Maya Goz', 'Co. Captain & Community TeamLeader', '/TeamProfiles/MayaGoz.jpg', 
 ARRAY['community', 'media', 'design', 'resources', 'mechanics', 'electronics'], 'captains', 1),
('Shay Kalisher', 'Captain', '/TeamProfiles/ShayKalisher.JPG', 
 ARRAY['cad', 'community', 'electronics', 'resources'], 'captains', 2),
('Nadav Marx', 'Co-Captain', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face', 
 ARRAY['mechanics','cad', 'electronics', 'strategy', 'manufacturing', 'resources'], 'captains', 3),

-- Team Leads
('Ariel Ivri', 'FLL TeamLeader', '/TeamProfiles/ArielIvri.JPG', 
 ARRAY['mechanics', 'community', 'strategy', 'media', 'resources', 'fll'], 'leads', 1),
('Gali Levy', 'Mechanics TeamLeader', '/TeamProfiles/GaliLevy.JPG', 
 ARRAY['mechanics', 'cad', 'community'], 'leads', 2),
('Karny Eissenberg', 'Design TeamLeader', '/TeamProfiles/KarnyEissenberg.JPG', 
 ARRAY['design', 'mechanics', 'electronics'], 'leads', 3),
('Dror Margalit', 'Media TeamLeader', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face', 
 ARRAY['media', 'fll', 'community', 'design', 'mechanics'], 'leads', 4),
('Eilon Hoppert', 'Software TeamLeader & Coach', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face', 
 ARRAY['software','DriveTeam', 'cad', 'mechanics', 'strategy', 'electronics'], 'leads', 5),
('Yair Lavie', 'CAD & Manufacturing TeamLeader', '/TeamProfiles/YairLavie.JPG', 
 ARRAY['manufacturing', 'mechanics', 'cad', 'strategy'], 'leads', 6),
('Talya Fuchs', 'Electronics TeamLeader', '/TeamProfiles/TalyaFuchs.jpg', 
 ARRAY['electronics', 'media', 'community'], 'leads', 7),
('Shir Cohen', 'Strategy TeamLeader', 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=300&h=300&fit=crop&crop=face', 
 ARRAY['strategy'], 'leads', 8),
('Daniel Levi', 'Resources TeamLeader & FLL Manager', '/TeamProfiles/DanielLevi.JPG', 
 ARRAY['resources', 'fll', 'community'], 'leads', 9),

-- Mentors
('Ilya Kazakevich', 'Mechanics Mentor', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face', 
 ARRAY[]::text[], 'mentors', 1, '2019'),
('Danny Shavit', 'Electronics Mentor', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face', 
 ARRAY[]::text[], 'mentors', 2, '2014'),
('Avi Segal', 'Software Mentor', '/MentorsProfiles/AviSegal.jpg', 
 ARRAY[]::text[], 'mentors', 3, '2015'),
('Maor Steinberg', 'PR & Community Mentor', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face', 
 ARRAY[]::text[], 'mentors', 4, '2018'),
('Michal Naim', 'Financial Mentor', '/MentorsProfiles/MichalNaim.jpg', 
 ARRAY[]::text[], 'mentors', 5, '2017'),
('Noa Fuchs', 'Community Mentor', '/MentorsProfiles/NoaFuchs.jpg', 
 ARRAY[]::text[], 'mentors', 6, '2017'),
('Hen Perah', 'Software Mentor', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face', 
 ARRAY[]::text[], 'mentors', 7, '2019'),
('Yadin Kovel', 'General Mentor', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face', 
 ARRAY[]::text[], 'mentors', 8, '2022'),
('Shalev Neuman', 'General Mentor', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face', 
 ARRAY[]::text[], 'mentors', 9, '2025'),
('Tom Kazakevich', 'General Mentor', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face', 
 ARRAY[]::text[], 'mentors', 10, '2018'),
('Yuval Zippori', 'General Mentor', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face', 
 ARRAY[]::text[], 'mentors', 11, '2017');

-- Insert team members (sample from the original data)
INSERT INTO public.team_members (name, role, image, teams, section, display_order) VALUES
('Amit Levy', 'CAD Master', '/TeamProfiles/AmitLevy.JPG', 
 ARRAY['cad', 'manufacturing', 'mechanics', 'community'], 'members', 1),
('Uri Rosin', 'Robot Driver', '/TeamProfiles/UriRosin.JPG', 
 ARRAY['software', 'DriveTeam', 'community'], 'members', 2),
('Or Buzaglo', 'Scouting GOAT', '/TeamProfiles/OrBuzaglo.jpg', 
 ARRAY['cad', 'manufacturing'], 'members', 3),
('Adam Dashevsky', 'Human Player', '/TeamProfiles/AdamDashevsky.JPG', 
 ARRAY['mechanics', 'cad' , 'electronics', 'design', 'fll'], 'members', 4),
('Ziv Avivi', 'Programmer', 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=300&fit=crop&crop=face', 
 ARRAY['software', 'mechanics', 'resources'], 'members', 5);