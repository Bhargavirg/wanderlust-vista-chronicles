
import React from 'react';
import { BlogData } from '@/data/blogData';
import CategorySection from '@/components/home/CategorySection';

interface CategoriesListProps {
  blogData: BlogData;
}

const CategoriesList = ({ blogData }: CategoriesListProps) => {
  // Define the allowed categories that match the CategorySection component's expected types
  const allowedCategories = ['science', 'technology', 'history', 'culture', 'nature', 'space', 'wildlife'] as const;
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
