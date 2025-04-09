
import { useState } from "react";
import { Link } from "react-router-dom";
import { BlogPost } from "@/components/blog/BlogCard";
import BlogCard from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";

interface CategorySectionProps {
  title: string;
  category: 'food' | 'travel' | 'nature' | 'flowers' | 'space' | 'wildlife';
  posts: BlogPost[];
}

const CategorySection = ({ title, category, posts }: CategorySectionProps) => {
  const [visiblePosts, setVisiblePosts] = useState(3);
  
  const showMorePosts = () => {
    setVisiblePosts((prev) => Math.min(prev + 3, posts.length));
  };

  return (
    <section className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Link to={`/category/${category}`} className="text-sm font-medium text-primary hover:underline">
          View all
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.slice(0, visiblePosts).map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
      {visiblePosts < posts.length && (
        <div className="flex justify-center mt-8">
          <Button variant="outline" onClick={showMorePosts}>
            Load More
          </Button>
        </div>
      )}
    </section>
  );
};

export default CategorySection;
