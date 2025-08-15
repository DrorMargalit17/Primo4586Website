-- Create enum for content types
CREATE TYPE public.content_type AS ENUM ('text', 'heading', 'paragraph');

-- Create table for storing editable content
CREATE TABLE public.editable_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  content_type content_type NOT NULL DEFAULT 'text',
  page_path TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Create table for content version history
CREATE TABLE public.content_versions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content_id UUID NOT NULL REFERENCES public.editable_content(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  version_number INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Create profiles table for user roles
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  is_admin BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.editable_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for editable_content
CREATE POLICY "Everyone can view content" 
ON public.editable_content 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can create content" 
ON public.editable_content 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND is_admin = true
  )
);

CREATE POLICY "Only admins can update content" 
ON public.editable_content 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND is_admin = true
  )
);

-- RLS Policies for content_versions
CREATE POLICY "Everyone can view versions" 
ON public.content_versions 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can create versions" 
ON public.content_versions 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND is_admin = true
  )
);

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to automatically create content versions
CREATE OR REPLACE FUNCTION public.create_content_version()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for versioning
CREATE TRIGGER create_version_before_update
  BEFORE UPDATE ON public.editable_content
  FOR EACH ROW EXECUTE FUNCTION public.create_content_version();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for profiles updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();