
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  category: 'food' | 'travel' | 'nature' | 'flowers' | 'space' | 'wildlife';
  size?: 'sm' | 'default' | 'lg';
}

const CategoryBadge = ({ category, size = 'default' }: CategoryBadgeProps) => {
  const categoryColors: Record<string, string> = {
    food: "bg-category-food text-white",
    travel: "bg-category-travel text-white",
    nature: "bg-category-nature text-white",
    flowers: "bg-category-flowers text-white",
    space: "bg-category-space text-white",
    wildlife: "bg-category-wildlife text-white",
  };

  const sizeClasses = {
    sm: "text-xs py-0 px-2",
    default: "",
    lg: "text-sm py-1 px-3",
  };

  return (
    <Badge className={cn(categoryColors[category], sizeClasses[size])}>
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </Badge>
  );
};

export default CategoryBadge;
