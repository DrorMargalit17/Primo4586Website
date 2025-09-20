-- Create a function to delete past events
CREATE OR REPLACE FUNCTION public.delete_past_events()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Delete events where the date + time has passed
  DELETE FROM public.events 
  WHERE 
    -- Convert date + time to a proper timestamp and compare with now
    (date::date + time::time) < now();
END;
$function$;