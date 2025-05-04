
import { supabase } from "@/integrations/supabase/client";
import { EducationalMetadata } from "@/types/mediaTypes";

export interface ContentCreateData {
  title: string;
  description?: string;
  mainContent?: string;
  categoryId?: string;
  coverImage?: string;
  additionalImages?: string[];
  videoUrl?: string;
  videoType?: string;
  location?: string;
  tags?: string[];
  educationalMetadata?: EducationalMetadata;
}

export async function addContent(contentData: ContentCreateData, authorId?: string, isDraft: boolean = false) {
  try {
    // Prepare the slug from title
    const slug = contentData.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
    
    // Prepare tags array
    let tags: string[] = [];
    if (typeof contentData.tags === 'string') {
      tags = contentData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
    } else if (Array.isArray(contentData.tags)) {
      tags = contentData.tags;
    }
    
    // Create content object
    const contentObject = {
      title: contentData.title,
      slug,
      description: contentData.description || null,
      main_content: contentData.mainContent || null,
      cover_image: contentData.coverImage || null,
      additional_images: contentData.additionalImages || null,
      video_url: contentData.videoUrl || null,
      video_type: contentData.videoType || null,
      location: contentData.location || null,
      tags: tags.length > 0 ? tags : null,
      category_id: contentData.categoryId || null,
      author_id: authorId || null,
      educational_metadata: contentData.educationalMetadata || null,
      published: !isDraft
    };
    
    const { data, error } = await supabase
      .from('content')
      .insert(contentObject)
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error adding content:', error);
    throw error;
  }
}

export async function updateContent(contentId: string, contentData: Partial<ContentCreateData>, isDraft?: boolean) {
  try {
    // Prepare tags array if provided
    let tags: string[] | undefined = undefined;
    if (contentData.tags !== undefined) {
      if (typeof contentData.tags === 'string') {
        tags = contentData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
      } else {
        tags = contentData.tags;
      }
    }
    
    // Create update object
    const updateObject: any = {};
    
    if (contentData.title !== undefined) updateObject.title = contentData.title;
    if (contentData.description !== undefined) updateObject.description = contentData.description;
    if (contentData.mainContent !== undefined) updateObject.main_content = contentData.mainContent;
    if (contentData.coverImage !== undefined) updateObject.cover_image = contentData.coverImage;
    if (contentData.additionalImages !== undefined) updateObject.additional_images = contentData.additionalImages;
    if (contentData.videoUrl !== undefined) updateObject.video_url = contentData.videoUrl;
    if (contentData.videoType !== undefined) updateObject.video_type = contentData.videoType;
    if (contentData.location !== undefined) updateObject.location = contentData.location;
    if (tags !== undefined) updateObject.tags = tags.length > 0 ? tags : null;
    if (contentData.categoryId !== undefined) updateObject.category_id = contentData.categoryId;
    if (contentData.educationalMetadata !== undefined) updateObject.educational_metadata = contentData.educationalMetadata;
    if (isDraft !== undefined) updateObject.published = !isDraft;
    
    // Always update the updated_at timestamp
    updateObject.updated_at = new Date().toISOString();
    
    const { data, error } = await supabase
      .from('content')
      .update(updateObject)
      .eq('id', contentId)
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error updating content:', error);
    throw error;
  }
}

export async function getContentById(contentId: string) {
  const { data, error } = await supabase
    .from('content')
    .select(`
      *,
      category:categories(name, slug),
      author:author_id(id, profiles(username, avatar_url, full_name))
    `)
    .eq('id', contentId)
    .single();
  
  if (error) {
    console.error('Error fetching content:', error);
    return null;
  }
  
  return data;
}

export async function getContentByCategory(categorySlug: string) {
  const { data, error } = await supabase
    .from('content')
    .select(`
      *,
      category:categories(name, slug),
      author:author_id(id, profiles(username, avatar_url, full_name))
    `)
    .eq('categories.slug', categorySlug)
    .eq('published', true)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching content by category:', error);
    return [];
  }
  
  return data;
}
