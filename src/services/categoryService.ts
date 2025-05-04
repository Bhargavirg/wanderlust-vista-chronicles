
import { supabase } from "@/integrations/supabase/client";

export interface Category {
  name: string;
  slug: string;
  description: string;
}

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
    slug: "marine-life",
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
  // Add more categories to match those in CategorySection
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
  }
];

export async function initializeCategories() {
  try {
    // Check if categories already exist
    const { count, error: countError } = await supabase
      .from('categories')
      .select('id', { count: 'exact', head: true });
    
    if (countError) {
      throw countError;
    }
    
    // If no categories exist or additional categories should be added
    const { data: existingCategories, error: fetchError } = await supabase
      .from('categories')
      .select('slug');
      
    if (fetchError) {
      throw fetchError;
    }
    
    const existingSlugs = new Set((existingCategories || []).map(cat => cat.slug));
    const missingCategories = defaultCategories.filter(cat => !existingSlugs.has(cat.slug));
    
    if (missingCategories.length > 0) {
      console.log(`Adding ${missingCategories.length} missing categories`);
      const { error } = await supabase
        .from('categories')
        .insert(missingCategories);
      
      if (error) {
        console.error('Error adding categories:', error);
        throw error;
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
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');
    
  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  
  return data;
}
