
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
    
    // If no categories exist, insert the default ones
    if (count === 0) {
      const { error } = await supabase
        .from('categories')
        .insert(defaultCategories);
      
      if (error) {
        throw error;
      }
      
      console.log('Default categories added successfully');
    } else {
      console.log('Categories already exist, skipping initialization');
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
