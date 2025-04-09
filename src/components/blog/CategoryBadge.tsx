
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  category: 'food' | 'travel' | 'nature' | 'flowers' | 'space' | 'wildlife';
  size?: 'sm' | 'default' | 'lg';
}

const CategoryBadge = ({ category, size = 'default' }: CategoryBadgeProps) => {
  const categoryColors: Record<string, string> = {
    food: "bg-gradient-to-r from-category-food/80 to-category-food text-white",
    travel: "bg-gradient-to-r from-category-travel/80 to-category-travel text-white",
    nature: "bg-gradient-to-r from-category-nature/80 to-category-nature text-white",
    flowers: "bg-gradient-to-r from-category-flowers/80 to-category-flowers text-white",
    space: "bg-gradient-to-r from-category-space/80 to-category-space text-white",
    wildlife: "bg-gradient-to-r from-category-wildlife/80 to-category-wildlife text-white",
  };

  const sizeClasses = {
    sm: "text-xs py-0 px-2",
    default: "py-0.5",
    lg: "text-sm py-1 px-3",
  };

  const icons: Record<string, string> = {
    food: "🍲",
    travel: "✈️",
    nature: "🌿",
    flowers: "🌸",
    space: "🌠",
    wildlife: "🦁",
  };

  return (
    <Badge className={cn(categoryColors[category], sizeClasses[size], "font-medium")}>
      <span className="mr-1">{icons[category]}</span>
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </Badge>
  );
};

export default CategoryBadge;
