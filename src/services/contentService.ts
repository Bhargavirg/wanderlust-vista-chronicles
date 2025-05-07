import { supabase } from "@/integrations/supabase/client";
import { EducationalMetadata } from "@/types/mediaTypes";
import { Json } from "@/integrations/supabase/types";

export async function getContentById(id: string) {
  try {
    console.log("Getting content with ID:", id);
    
    const { data, error } = await supabase
      .from('content')
      .select(`
        *,
        category:categories(*),
        author:profiles(*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error("Error retrieving content:", error);
      throw error;
    }

    console.log("Content retrieved:", data);
    return data;
  } catch (error) {
    console.error('Error getting content by id:', error);
    throw error;
  }
}

// Get category by slug
export async function getCategoryBySlug(slug: string) {
  try {
    console.log("Fetching category with slug:", slug);
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug);

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      console.warn(`No category found with slug: ${slug}`);
      return null;
    }

    return data[0]; // Return the first matching category
  } catch (error) {
    console.error('Error getting category by slug:', error);
    throw error;
  }
}

// Get content by category slug
export async function getContentByCategory(categorySlug: string) {
  try {
    console.log("Getting content for category slug:", categorySlug);
    
    // First, get category ID from slug
    const categoryData = await getCategoryBySlug(categorySlug);
    
    if (!categoryData) {
      console.error(`Category not found: ${categorySlug}`);
      return [];
    }
    
    console.log("Found category:", categoryData);
    
    // Then, get all content with that category
    const { data, error } = await supabase
      .from('content')
      .select(`
        *,
        category:categories(*),
        author_id,
        author:profiles(*)
      `)
      .eq('category_id', categoryData.id)
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching content by category:", error);
      throw error;
    }

    console.log(`Found ${data?.length || 0} items for category ${categorySlug}`);
    return data || [];
  } catch (error) {
    console.error('Error getting content by category:', error);
    return []; // Return empty array instead of throwing
  }
}

// Get all published content
export async function getAllPublishedContent() {
  try {
    const { data, error } = await supabase
      .from('content')
      .select(`
        *,
        category:categories(*),
        author:profiles(*)
      `)
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error getting all published content:', error);
    throw error;
  }
}

// Get featured content
export async function getFeaturedContent() {
  try {
    const { data, error } = await supabase
      .from('content')
      .select(`
        *,
        category:categories(*),
        author:profiles(*)
      `)
      .eq('featured', true)
      .eq('published', true)
      .limit(5);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error getting featured content:', error);
    throw error;
  }
}

// Update content - Improved error handling
export async function updateContent(
  contentId: string,
  contentData: {
    title: string;
    description: string;
    mainContent: string;
    categoryId: string;
    coverImage: string;
    additionalImages: string[];
    videoUrl: string;
    videoType: 'youtube' | 'vimeo' | 'mp4' | 'other';
    location: string;
    tags: string;
    educationalMetadata: EducationalMetadata;
  }
) {
  try {
    console.log("Updating content with category ID:", contentData.categoryId);
    
    // Convert tags string to array if needed
    const tagsArray = contentData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    
    const { data, error } = await supabase
      .from('content')
      .update({
        title: contentData.title,
        description: contentData.description,
        main_content: contentData.mainContent,
        category_id: contentData.categoryId,
        cover_image: contentData.coverImage,
        additional_images: contentData.additionalImages,
        video_url: contentData.videoUrl,
        video_type: contentData.videoType,
        location: contentData.location,
        tags: tagsArray,
        educational_metadata: contentData.educationalMetadata as Json,
        updated_at: new Date().toISOString()
      })
      .eq('id', contentId)
      .select();

    if (error) {
      console.error('Error details:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error updating content:', error);
    throw error;
  }
}

// Add new content - Improved error handling
export async function addContent(
  contentData: {
    title: string;
    description: string;
    mainContent: string;
    categoryId: string;
    coverImage: string;
    additionalImages: string[];
    videoUrl: string;
    videoType: 'youtube' | 'vimeo' | 'mp4' | 'other';
    location: string;
    tags: string;
    educationalMetadata: EducationalMetadata;
  },
  userId: string,
  isDraft: boolean = false
) {
  try {
    console.log("Adding content with category ID:", contentData.categoryId);
    console.log("User ID:", userId);
    
    // Extra validation for category ID
    if (!contentData.categoryId || contentData.categoryId.trim() === "") {
      throw new Error("Category ID is required but was not provided");
    }
    
    // Check if the category exists
    const { data: categoryCheck, error: categoryError } = await supabase
      .from('categories')
      .select('id')
      .eq('id', contentData.categoryId)
      .single();
      
    if (categoryError || !categoryCheck) {
      console.error('Category validation failed:', categoryError || "Category not found");
      throw new Error(`Category not found with ID: ${contentData.categoryId}`);
    }
    
    // Convert tags string to array if needed
    const tagsArray = contentData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    
    // Generate a slug from the title
    const slug = contentData.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
    
    // Prepare the data
    const newContent = {
      title: contentData.title,
      description: contentData.description,
      main_content: contentData.mainContent,
      category_id: contentData.categoryId,
      cover_image: contentData.coverImage,
      additional_images: contentData.additionalImages,
      video_url: contentData.videoUrl,
      video_type: contentData.videoType,
      location: contentData.location,
      tags: tagsArray,
      educational_metadata: contentData.educationalMetadata as Json,
      author_id: userId,
      published: !isDraft,
      featured: false,
      slug: slug
    };
    
    console.log("Inserting content with data:", newContent);
    
    const { data, error } = await supabase
      .from('content')
      .insert(newContent)
      .select();

    if (error) {
      console.error('Error in addContent:', error);
      throw error;
    }

    console.log("Content added successfully:", data);
    return data;
  } catch (error) {
    console.error('Error adding content:', error);
    throw error;
  }
}

// Get user content (for dashboard)
export async function getUserContent(userId: string) {
  try {
    const { data, error } = await supabase
      .from('content')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('author_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error getting user content:', error);
    throw error;
  }
}

// Delete content
export async function deleteContent(contentId: string) {
  try {
    const { error } = await supabase
      .from('content')
      .delete()
      .eq('id', contentId);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error deleting content:', error);
    throw error;
  }
}

// Add a new search function for the navbar search
export async function searchContent(query: string) {
  try {
    if (!query || query.trim() === '') {
      return [];
    }
    
    console.log("Searching content with query:", query);
    
    const { data, error } = await supabase
      .from('content')
      .select(`
        *,
        category:categories(*),
        author:profiles(*)
      `)
      .or(`title.ilike.%${query}%, description.ilike.%${query}%, main_content.ilike.%${query}%`)
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Search error:", error);
      throw error;
    }
    
    console.log("Search results:", data);
    return data || [];
  } catch (error) {
    console.error('Error searching content:', error);
    return [];
  }
}
