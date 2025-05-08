
import { supabase } from "@/integrations/supabase/client";

export interface Category {
  name: string;
  slug: string;
  description: string;
}

// Note: This array is used as a fallback if database categories can't be loaded
const defaultCategories: Category[] = [
  {
    name: "Wildlife",
    slug: "wildlife",
    description: "Discover fascinating animals and their habitats around the world."
  },
  {
    name: "Landmarks",
    slug: "landmarks",
    description: "Architectural wonders and natural formations across the globe."
  },
  {
    name: "Marine Life",
    slug: "marinelife",
    description: "Explore the wonders beneath the waves and oceanic ecosystems."
  },
  {
    name: "Travel",
    slug: "travel",
    description: "Journey to incredible destinations and unique cultural experiences."
  },
  {
    name: "Geology",
    slug: "geology",
    description: "Explore Earth's structure, rocks, minerals, and geological forces."
  },
  {
    name: "Ancient Civilizations",
    slug: "ancient-civilizations",
    description: "Discover lost cultures and forgotten wisdom from the past."
  },
  {
    name: "Climate",
    slug: "climate",
    description: "Weather patterns, climate change, and environmental science."
  },
  {
    name: "Psychology",
    slug: "psychology",
    description: "Understanding the human mind, behavior, and consciousness."
  },
  {
    name: "Archaeology",
    slug: "archaeology",
    description: "Uncovering history through artifacts and ancient discoveries."
  },
  {
    name: "Mythology",
    slug: "mythology",
    description: "Ancient stories, legendary beings, and cultural beliefs."
  },
  {
    name: "Science",
    slug: "science",
    description: "Exploring scientific discoveries and advancements."
  },
  {
    name: "Technology",
    slug: "technology",
    description: "Innovations and technological developments changing our world."
  },
  {
    name: "History",
    slug: "history",
    description: "Journey through time to understand our shared human past."
  },
  {
    name: "Culture",
    slug: "culture",
    description: "Experience traditions and expressions from around the world."
  },
  {
    name: "Nature",
    slug: "nature",
    description: "Connect with the natural beauty and wonders of our planet."
  },
  {
    name: "Space",
    slug: "space",
    description: "Venture into the cosmos and unlock the mysteries of the universe."
  },
  {
    name: "Art",
    slug: "art",
    description: "Experience human creativity and expression across different mediums."
  },
  {
    name: "Flowers",
    slug: "flowers",
    description: "Discover the beautiful world of flowers and their significance."
  },
  {
    name: "Anime",
    slug: "anime",
    description: "Explore Japanese animation and its cultural impact worldwide."
  },
  {
    name: "Politics",
    slug: "politics",
    description: "Stay informed about global affairs, governance, and policy developments."
  },
  {
    name: "Sports",
    slug: "sports",
    description: "Follow athletic competitions and sporting events from around the globe."
  },
  {
    name: "Stories",
    slug: "stories",
    description: "Immerse yourself in compelling narratives and meaningful tales."
  },
  {
    name: "Food",
    slug: "food",
    description: "Culinary delights and recipes from around the world."
  },
  {
    name: "Music",
    slug: "music",
    description: "Harmony, rhythm, and musical culture from around the world."
  },
  {
    name: "Business & Economics",
    slug: "business-economics",
    description: "Markets, finance, and economic trends."
  },
  {
    name: "Current Affairs",
    slug: "current-affairs",
    description: "Today's most important global events and news."
  },
  {
    name: "Deep Earth & Geology",
    slug: "deep-earth-geology",
    description: "Earth's structure, rocks, minerals, and geological forces."
  },
  {
    name: "Monuments",
    slug: "monuments",
    description: "Discover significant landmarks and memorials around the world."
  },
  {
    name: "Literature",
    slug: "literature",
    description: "Explore written works of artistic and cultural significance."
  }
];

export async function initializeCategories() {
  try {
    // Check if categories already exist
    const { count, error: countError } = await supabase
      .from('categories')
      .select('id', { count: 'exact', head: true });
    
    if (countError) {
      console.error("Error checking categories count:", countError);
      throw countError;
    }
    
    console.log(`Found ${count} existing categories`);
    
    // If no categories exist or additional categories should be added
    const { data: existingCategories, error: fetchError } = await supabase
      .from('categories')
      .select('slug');
      
    if (fetchError) {
      console.error("Error fetching existing categories:", fetchError);
      throw fetchError;
    }
    
    const existingSlugs = new Set((existingCategories || []).map(cat => cat.slug));
    const missingCategories = defaultCategories.filter(cat => !existingSlugs.has(cat.slug));
    
    console.log(`Found ${missingCategories.length} missing categories`);
    
    if (missingCategories.length > 0) {
      console.log(`Adding ${missingCategories.length} missing categories`);
      
      // Insert categories in smaller batches to avoid potential issues
      const batchSize = 5;
      for (let i = 0; i < missingCategories.length; i += batchSize) {
        const batch = missingCategories.slice(i, i + batchSize);
        const { error } = await supabase
          .from('categories')
          .insert(batch);
        
        if (error) {
          console.error('Error adding categories batch:', error);
          console.error('Batch data:', batch);
          // Continue with other batches even if one fails
        }
      }
      
      console.log('Missing categories added successfully');
    } else {
      console.log('All categories already exist');
    }
    
    return true;
  } catch (error) {
    console.error('Error initializing categories:', error);
    return false;
  }
}

export async function getAllCategories() {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
      
    if (error) {
      console.error('Error fetching categories:', error);
      return defaultCategories; // Fall back to default categories in case of error
    }
    
    return data || defaultCategories;
  } catch (error) {
    console.error('Error fetching categories (caught):', error);
    return defaultCategories; // Fall back to default categories in case of error
  }
}
