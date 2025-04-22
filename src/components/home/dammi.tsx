import React from 'react';
import { BlogData } from '@/data/blogData';
import CategorySection from '@/components/home/CategorySection';

interface CategoriesListProps {
  blogData: BlogData;
}

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Renders a list of CategorySection components based on the categories in the blogData object.
 * It iterates over the blogData.byCategory object and renders a CategorySection for each
 * category that is present in the allowedCategories array. If a category is not present in

/*******  54284743-bbec-483e-a58c-675281dacac1  *******/
const CategoriesList = ({ blogData }: CategoriesListProps) => {
  // Define the allowed categories that match the CategorySection component's expected types
  const allowedCategories = [
    'science', 'technology', 'history', 'culture', 'nature', 'space', 'wildlife', 
    'art', 'flowers', 'anime', 'politics', 'sports', 'stories'
  ] as const;
  
  type AllowedCategory = typeof allowedCategories[number];
  
  return (
    <>
      {Object.entries(blogData.byCategory).map(([category, posts]) => {
        // Check if this category is in our allowed list, otherwise default to a safe category
        const safeCategory: AllowedCategory = 
          allowedCategories.includes(category as AllowedCategory) 
            ? (category as AllowedCategory) 
            : 'nature';
            
        return (
          <CategorySection
            key={category}
            title={`${category.charAt(0).toUpperCase() + category.slice(1)}`}
            category={safeCategory}
            posts={posts}
          />
        );
      })}
    </>
  );
};

export default CategoriesList;
