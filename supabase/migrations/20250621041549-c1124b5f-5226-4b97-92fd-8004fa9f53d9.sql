
-- Create a table for echoes and faces stories
CREATE TABLE public.echoes_faces (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID REFERENCES auth.users,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  story_content TEXT NOT NULL,
  cover_image TEXT,
  author_name TEXT NOT NULL,
  author_location TEXT,
  published BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) to the table
ALTER TABLE public.echoes_faces ENABLE ROW LEVEL SECURITY;

-- Create policy that allows everyone to view published stories
CREATE POLICY "Anyone can view published echoes and faces stories" 
  ON public.echoes_faces 
  FOR SELECT 
  USING (published = true);

-- Create policy that allows authenticated users to create stories
CREATE POLICY "Authenticated users can create echoes and faces stories" 
  ON public.echoes_faces 
  FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

-- Create policy that allows users to update their own stories
CREATE POLICY "Users can update their own echoes and faces stories" 
  ON public.echoes_faces 
  FOR UPDATE 
  USING (auth.uid() = author_id);

-- Create policy that allows users to delete their own stories
CREATE POLICY "Users can delete their own echoes and faces stories" 
  ON public.echoes_faces 
  FOR DELETE 
  USING (auth.uid() = author_id);
