-- Tighten profile data exposure by removing email from public.profiles
-- Emails already exist in Supabase Auth; admin operations should use protected Edge Functions.

ALTER TABLE public.profiles
  DROP COLUMN IF EXISTS email;

-- Ensure exactly one profile row per user
ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_user_id_unique UNIQUE (user_id);

-- Remove broad admin SELECT policy on profiles (admins should not need to read profiles to manage users)
DROP POLICY IF EXISTS "Admins can view user management data" ON public.profiles;

-- Update new-user handler to not store email/roles in profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$;