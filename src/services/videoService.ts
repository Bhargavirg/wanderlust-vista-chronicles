
import { supabase } from "@/integrations/supabase/client";

export interface Video {
  id: string;
  title: string;
  description: string | null;
  thumbnail: string | null;
  embed_id: string;
  duration: string | null;
  category: string | null;
  created_at: string;
  updated_at: string;
}

export async function getAllVideos(): Promise<Video[]> {
  try {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching videos:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getAllVideos:', error);
    return [];
  }
}

export async function getVideoById(id: string): Promise<Video | null> {
  try {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching video:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getVideoById:', error);
    return null;
  }
}

export async function createVideo(video: Omit<Video, 'id' | 'created_at' | 'updated_at'>): Promise<Video | null> {
  try {
    const { data, error } = await supabase
      .from('videos')
      .insert(video)
      .select()
      .single();

    if (error) {
      console.error('Error creating video:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in createVideo:', error);
    return null;
  }
}

export async function updateVideo(id: string, updates: Partial<Omit<Video, 'id' | 'created_at' | 'updated_at'>>): Promise<Video | null> {
  try {
    const { data, error } = await supabase
      .from('videos')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating video:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in updateVideo:', error);
    return null;
  }
}

export async function deleteVideo(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('videos')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting video:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteVideo:', error);
    return false;
  }
}
