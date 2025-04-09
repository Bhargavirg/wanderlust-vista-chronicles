
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { BlogPost } from "@/data/blogData";

interface BlogCardProps {
  post: BlogPost;
  className?: string;
  featured?: boolean;
}

const BlogCard = ({ post, className, featured = false }: BlogCardProps) => {
  const categoryColors: Record<string, string> = {
    food: "bg-category-food text-white",
    travel: "bg-category-travel text-white",
    nature: "bg-category-nature text-white",
    flowers: "bg-category-flowers text-white",
    space: "bg-category-space text-white",
    wildlife: "bg-category-wildlife text-white",
  };

  return (
    <Link to={`/post/${post.id}`}>
      <Card className={cn(
        "overflow-hidden transition-all duration-200 hover:shadow-lg", 
        featured ? "md:grid md:grid-cols-2" : "",
        className
      )}>
        <AspectRatio ratio={16 / 9} className={featured ? "md:h-full" : ""}>
          <img
            src={post.coverImage}
            alt={post.title}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
        </AspectRatio>
        <div className="flex flex-col">
          <CardContent className={cn("p-4", featured ? "md:p-6" : "")}>
            <Badge className={cn("mb-2", categoryColors[post.category])}>
              {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
            </Badge>
            <h3 className={cn(
              "font-semibold line-clamp-2 mb-2", 
              featured ? "text-xl md:text-2xl" : "text-lg"
            )}>
              {post.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2 mb-2">{post.excerpt}</p>
          </CardContent>
          <CardFooter className={cn("flex items-center p-4 pt-0 text-sm", featured ? "md:p-6 md:pt-0" : "")}>
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-6 h-6 rounded-full mr-2"
            />
            <span className="text-muted-foreground">{post.author.name}</span>
            <span className="mx-2 text-muted-foreground">•</span>
            <time className="text-muted-foreground">{new Date(post.publishedAt).toLocaleDateString()}</time>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
};

export default BlogCard;
