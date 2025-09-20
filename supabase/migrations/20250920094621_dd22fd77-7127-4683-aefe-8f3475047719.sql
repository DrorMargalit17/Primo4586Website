-- Add display_order column to community_activities table
ALTER TABLE public.community_activities 
ADD COLUMN display_order INTEGER;

-- Set initial display_order values using a subquery
WITH ordered_activities AS (
  SELECT id, row_number() OVER (ORDER BY created_at) as order_num
  FROM public.community_activities
)
UPDATE public.community_activities 
SET display_order = ordered_activities.order_num
FROM ordered_activities
WHERE public.community_activities.id = ordered_activities.id;