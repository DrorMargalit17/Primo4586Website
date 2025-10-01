-- Make image column nullable for team_members table to allow mentors without images
ALTER TABLE public.team_members ALTER COLUMN image DROP NOT NULL;