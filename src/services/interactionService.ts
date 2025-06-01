
import { supabase } from "@/integrations/supabase/client";

export type InteractionType = 'like' | 'share' | 'save' | 'view';

export async function addInteraction(contentId: string, userId: string, type: InteractionType) {
  try {
    const { data, error } = await supabase
      .from('article_interactions')
      .upsert({
        content_id: contentId,
        user_id: userId,
        interaction_type: type
      })
      .select();

    if (error) {
      console.error('Error adding interaction:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in addInteraction:', error);
    throw error;
  }
}

export async function removeInteraction(contentId: string, userId: string, type: InteractionType) {
  try {
    const { error } = await supabase
      .from('article_interactions')
      .delete()
      .eq('content_id', contentId)
      .eq('user_id', userId)
      .eq('interaction_type', type);

    if (error) {
      console.error('Error removing interaction:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in removeInteraction:', error);
    throw error;
  }
}

export async function getInteractionCounts(contentId: string) {
  try {
    const { data, error } = await supabase
      .from('article_interactions')
      .select('interaction_type')
      .eq('content_id', contentId);

    if (error) {
      console.error('Error getting interaction counts:', error);
      throw error;
    }

    const counts = {
      likes: 0,
      shares: 0,
      saves: 0,
      views: 0
    };

    data?.forEach(interaction => {
      if (interaction.interaction_type === 'like') counts.likes++;
      if (interaction.interaction_type === 'share') counts.shares++;
      if (interaction.interaction_type === 'save') counts.saves++;
      if (interaction.interaction_type === 'view') counts.views++;
    });

    return counts;
  } catch (error) {
    console.error('Error in getInteractionCounts:', error);
    return { likes: 0, shares: 0, saves: 0, views: 0 };
  }
}

export async function getUserInteractions(contentId: string, userId: string) {
  try {
    const { data, error } = await supabase
      .from('article_interactions')
      .select('interaction_type')
      .eq('content_id', contentId)
      .eq('user_id', userId);

    if (error) {
      console.error('Error getting user interactions:', error);
      throw error;
    }

    const interactions = {
      liked: false,
      shared: false,
      saved: false,
      viewed: false
    };

    data?.forEach(interaction => {
      if (interaction.interaction_type === 'like') interactions.liked = true;
      if (interaction.interaction_type === 'share') interactions.shared = true;
      if (interaction.interaction_type === 'save') interactions.saved = true;
      if (interaction.interaction_type === 'view') interactions.viewed = true;
    });

    return interactions;
  } catch (error) {
    console.error('Error in getUserInteractions:', error);
    return { liked: false, shared: false, saved: false, viewed: false };
  }
}

export async function addComment(contentId: string, userId: string, commentText: string, parentId?: string) {
  try {
    const { data, error } = await supabase
      .from('article_comments')
      .insert({
        content_id: contentId,
        user_id: userId,
        comment_text: commentText,
        parent_id: parentId || null
      })
      .select();

    if (error) {
      console.error('Error adding comment:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in addComment:', error);
    throw error;
  }
}

export async function getComments(contentId: string) {
  try {
    const { data, error } = await supabase
      .from('article_comments')
      .select(`
        *,
        profiles:user_id (
          username,
          full_name,
          avatar_url
        )
      `)
      .eq('content_id', contentId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error getting comments:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getComments:', error);
    return [];
  }
}
