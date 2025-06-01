
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

    // Update the counts table
    await updateInteractionCounts(contentId, type, 1);

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

    // Update the counts table
    await updateInteractionCounts(contentId, type, -1);
  } catch (error) {
    console.error('Error in removeInteraction:', error);
    throw error;
  }
}

async function updateInteractionCounts(contentId: string, type: InteractionType, increment: number) {
  try {
    const columnName = `${type}s_count`;
    
    // Check if record exists
    const { data: existing } = await supabase
      .from('interaction_counts')
      .select('*')
      .eq('content_id', contentId)
      .single();

    if (existing) {
      // Update existing record
      const currentCount = existing[columnName] || 0;
      const newCount = Math.max(0, currentCount + increment);
      
      await supabase
        .from('interaction_counts')
        .update({ 
          [columnName]: newCount,
          updated_at: new Date().toISOString()
        })
        .eq('content_id', contentId);
    } else {
      // Create new record
      const initialCounts = {
        content_id: contentId,
        views_count: type === 'view' ? Math.max(0, increment) : 0,
        likes_count: type === 'like' ? Math.max(0, increment) : 0,
        shares_count: type === 'share' ? Math.max(0, increment) : 0,
        saves_count: type === 'save' ? Math.max(0, increment) : 0
      };

      await supabase
        .from('interaction_counts')
        .insert(initialCounts);
    }
  } catch (error) {
    console.error('Error updating interaction counts:', error);
  }
}

export async function getInteractionCounts(contentId: string) {
  try {
    const { data, error } = await supabase
      .from('interaction_counts')
      .select('*')
      .eq('content_id', contentId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error getting interaction counts:', error);
      return { likes: 0, shares: 0, saves: 0, views: 0 };
    }

    if (!data) {
      return { likes: 0, shares: 0, saves: 0, views: 0 };
    }

    return {
      likes: data.likes_count || 0,
      shares: data.shares_count || 0,
      saves: data.saves_count || 0,
      views: data.views_count || 0
    };
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
        profiles (
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
