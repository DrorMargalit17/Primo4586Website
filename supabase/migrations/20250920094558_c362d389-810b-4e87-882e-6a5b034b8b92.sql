-- Add display_order column to community_activities table
ALTER TABLE public.community_activities 
ADD COLUMN display_order INTEGER;

-- Set initial display_order values based on created_at (oldest gets lowest order number)
UPDATE public.community_activities 
SET display_order = row_number() OVER (ORDER BY created_at);