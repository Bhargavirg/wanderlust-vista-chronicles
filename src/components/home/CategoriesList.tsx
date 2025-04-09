
import React from 'react';
import { BlogData } from '@/data/blogData';
import CategorySection from '@/components/home/CategorySection';

interface CategoriesListProps {
  blogData: BlogData;
}

const CategoriesList = ({ blogData }: CategoriesListProps) => {
  return (
    <>
      {Object.entries(blogData.byCategory).map(([category, posts]) => (
        <CategorySection
          key={category}
          title={`${category.charAt(0).toUpperCase() + category.slice(1)} Blogs`}
          category={category as 'food' | 'travel' | 'nature' | 'flowers' | 'space' | 'wildlife'}
          posts={posts}
        />
      ))}
    </>
  );
};

export default CategoriesList;
