-- Fix security issues by setting proper search_path for functions

-- Update handle_new_user function with secure search_path
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, is_admin)
  VALUES (
    NEW.id, 
    NEW.email,
    -- First user becomes admin, others are regular users
    (SELECT COUNT(*) FROM public.profiles) = 0
  );
  RETURN NEW;
END;
$$;

-- Update create_content_version function with secure search_path
CREATE OR REPLACE FUNCTION public.create_content_version()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert the old version into content_versions before updating
  IF TG_OP = 'UPDATE' THEN
    INSERT INTO public.content_versions (content_id, content, version_number, created_by)
    VALUES (
      OLD.id,
      OLD.content,
      COALESCE((
        SELECT MAX(version_number) + 1 
        FROM public.content_versions 
        WHERE content_id = OLD.id
      ), 1),
      auth.uid()
    );
  END IF;
  
  -- Update the updated_at and updated_by fields
  NEW.updated_at = now();
  NEW.updated_by = auth.uid();
  
  RETURN NEW;
END;
$$;

-- Update update_updated_at_column function with secure search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;