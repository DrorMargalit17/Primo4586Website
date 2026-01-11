-- Drop the insecure delete_past_events function that can be called without authentication
-- Past events will be filtered at query time instead, and admins can manually delete old events if needed
DROP FUNCTION IF EXISTS public.delete_past_events();