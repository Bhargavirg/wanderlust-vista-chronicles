
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  category: 'food' | 'travel' | 'nature' | 'flowers' | 'space' | 'wildlife' | 
    'science' | 'technology' | 'history' | 'culture' | 'marinelife' | 'monuments' | 
    'literature' | 'art' | 'anime' | 'politics' | 'sports' | 'stories' | 
    'psychology' | 'archaeology' | 'mythology' | 'climate' | 'current-affairs' | 
    'music' | 'business-economics' | 'deep-earth-geology' | 'ancient-civilizations';
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
    science: "bg-gradient-to-r from-blue-500/80 to-blue-600 text-white",
    technology: "bg-gradient-to-r from-purple-500/80 to-purple-600 text-white",
    history: "bg-gradient-to-r from-amber-500/80 to-amber-600 text-white",
    culture: "bg-gradient-to-r from-emerald-500/80 to-emerald-600 text-white",
    marinelife: "bg-gradient-to-r from-cyan-500/80 to-cyan-600 text-white",
    monuments: "bg-gradient-to-r from-stone-500/80 to-stone-600 text-white",
    literature: "bg-gradient-to-r from-slate-500/80 to-slate-600 text-white",
    art: "bg-gradient-to-r from-pink-500/80 to-pink-600 text-white",
    anime: "bg-gradient-to-r from-violet-500/80 to-violet-600 text-white",
    politics: "bg-gradient-to-r from-gray-500/80 to-gray-600 text-white", 
    sports: "bg-gradient-to-r from-yellow-500/80 to-yellow-600 text-white",
    stories: "bg-gradient-to-r from-teal-500/80 to-teal-600 text-white",
    psychology: "bg-gradient-to-r from-fuchsia-500/80 to-fuchsia-600 text-white",
    archaeology: "bg-gradient-to-r from-amber-600/80 to-amber-700 text-white",
    mythology: "bg-gradient-to-r from-indigo-600/80 to-indigo-700 text-white",
    climate: "bg-gradient-to-r from-sky-500/80 to-sky-600 text-white",
    "current-affairs": "bg-gradient-to-r from-blue-600/80 to-blue-700 text-white",
    music: "bg-gradient-to-r from-pink-600/80 to-pink-700 text-white",
    "business-economics": "bg-gradient-to-r from-green-600/80 to-green-700 text-white",
    "deep-earth-geology": "bg-gradient-to-r from-amber-700/80 to-amber-800 text-white",
    "ancient-civilizations": "bg-gradient-to-r from-stone-600/80 to-stone-700 text-white"
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
    science: "🔬",
    technology: "💻",
    history: "📜",
    culture: "🏛️",
    marinelife: "🐠",
    monuments: "🗿",
    literature: "📚",
    art: "🎨",
    anime: "🎭",
    politics: "🏛️",
    sports: "⚽",
    stories: "📖",
    psychology: "🧠",
    archaeology: "🔍",
    mythology: "🐉",
    climate: "🌡️",
    "current-affairs": "📰",
    music: "🎵",
    "business-economics": "📊",
    "deep-earth-geology": "🌋",
    "ancient-civilizations": "🏺"
  };

  // Ensure we have a valid category or fallback to a default style
  const categoryColor = categoryColors[category] || "bg-gradient-to-r from-gray-500/80 to-gray-600 text-white";
  const icon = icons[category] || "📄";
  const displayName = category 
    ? category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ')
    : "Unknown";

  return (
    <Badge className={cn(categoryColor, sizeClasses[size], "font-medium")}>
      <span className="mr-1">{icon}</span>
      {displayName}
    </Badge>
  );
};

export default CategoryBadge;
