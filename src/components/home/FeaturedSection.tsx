
import { BlogPost } from "@/components/blog/BlogCard";
import BlogCard from "@/components/blog/BlogCard";

interface FeaturedSectionProps {
  featuredPost: BlogPost;
  recentPosts: BlogPost[];
}

const FeaturedSection = ({ featuredPost, recentPosts }: FeaturedSectionProps) => {
  return (
    <section className="container py-8 md:py-12">
      <h2 className="text-3xl font-bold mb-8">Featured</h2>
      <div className="grid gap-6">
        <BlogCard post={featuredPost} featured={true} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
