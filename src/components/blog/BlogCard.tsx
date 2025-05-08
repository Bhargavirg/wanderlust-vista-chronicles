
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Clock, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { BlogPost } from "@/data/blogData";
import { calculateReadingTime, formatReadingTime } from "@/utils/readingTimeUtils";

interface BlogCardProps {
  post: BlogPost | any; // Allow Supabase content type as well
  className?: string;
  featured?: boolean;
  hasVideo?: boolean;
}

const BlogCard = ({ post, className, featured = false, hasVideo = false }: BlogCardProps) => {
  const categoryColors: Record<string, string> = {
    food: "bg-category-food text-white",
    travel: "bg-category-travel text-white",
    nature: "bg-category-nature text-white",
    flowers: "bg-category-flowers text-white",
    space: "bg-category-space text-white",
    wildlife: "bg-category-wildlife text-white",
  };
  
  // Safely determine category name and slug with proper type handling
  const categoryName = (() => {
    // Handle both mock data format and API data format
    if (!post.category) return "Uncategorized";
    
    if (typeof post.category === 'object' && post.category !== null) {
      // Handle API data format (content from Supabase)
      return post.category.name || "Uncategorized";
    }
    
    // Handle mock data format (string category)
    if (typeof post.category === 'string') {
      return post.category.charAt(0).toUpperCase() + post.category.slice(1);
    }
    
    return "Uncategorized";
  })();
  
  const categorySlug = (() => {
    // Handle both mock data format and API data format
    if (!post.category) return "uncategorized";
    
    if (typeof post.category === 'object' && post.category !== null) {
      // Handle API data format (content from Supabase)
      return post.category.slug || "uncategorized";
    }
    
    // Handle mock data format (string category)
    if (typeof post.category === 'string') {
      return post.category.toLowerCase();
    }
    
    return "uncategorized";
  })();
  
  // Handle different post data structures for excerpt
  const excerpt = post.excerpt || post.description || "";
  const readingTime = (() => {
    const { minutes, seconds } = calculateReadingTime(excerpt);
    return formatReadingTime(minutes, seconds);
  })();

  // Get the post ID for the URL - handle both API and mock data formats
  const postId = post.id;

  // Get cover image - handle both API and mock data formats
  const coverImage = post.coverImage || post.cover_image || "";
  
  // Handle author data for both formats
  const authorName = (() => {
    if (!post.author) return "Unknown";
    
    if (typeof post.author === 'object') {
      // Handle different possible author object structures
      if (post.author.name) return post.author.name;
      if (post.author.username) return post.author.username;
      if (post.author.full_name) return post.author.full_name;
    }
    
    return "Unknown";
  })();
  
  const authorAvatar = (() => {
    if (!post.author) return "https://i.pravatar.cc/150?img=3";
    
    if (typeof post.author === 'object') {
      // Handle different possible author avatar fields
      if (post.author.avatar) return post.author.avatar;
      if (post.author.avatar_url) return post.author.avatar_url;
    }
    
    return "https://i.pravatar.cc/150?img=3";
  })();
  
  // Get published date - handle both API and mock data formats
  const publishedDate = post.publishedAt || post.created_at || new Date();

  return (
    <Link to={`/post/${postId}`} className="block">
      <Card className={cn(
        "overflow-hidden transition-all duration-200 hover:shadow-lg", 
        featured ? "md:grid md:grid-cols-2" : "",
        className
      )}>
        <div className="relative">
          <AspectRatio ratio={16 / 9} className={featured ? "md:h-full" : ""}>
            <img
              src={coverImage}
              alt={post.title}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            />
          </AspectRatio>
          {hasVideo && (
            <div className="absolute top-2 right-2 bg-black/70 rounded-full p-1.5">
              <Video className="h-4 w-4 text-white" />
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <CardContent className={cn("p-4", featured ? "md:p-6" : "")}>
            <div className="flex justify-between items-center mb-2">
              <Badge className={cn(categoryColors[categorySlug] || "bg-gray-500 text-white")}>
                {categoryName}
              </Badge>
              <div className="flex items-center text-xs text-gray-500">
                <Clock size={12} className="mr-1" />
                <span>{readingTime}</span>
              </div>
            </div>
            <h3 className={cn(
              "font-semibold line-clamp-2 mb-2", 
              featured ? "text-xl md:text-2xl" : "text-lg"
            )}>
              {post.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2 mb-2">{excerpt}</p>
          </CardContent>
          <CardFooter className={cn("flex items-center p-4 pt-0 text-sm", featured ? "md:p-6 md:pt-0" : "")}>
            <img
              src={authorAvatar}
              alt={authorName}
              className="w-6 h-6 rounded-full mr-2"
            />
            <span className="text-muted-foreground">{authorName}</span>
            <span className="mx-2 text-muted-foreground">•</span>
            <time className="text-muted-foreground">
              {new Date(publishedDate).toLocaleDateString()}
            </time>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
};

export default BlogCard;
