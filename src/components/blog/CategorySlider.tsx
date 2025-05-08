
import React from 'react';
import { Atom, BookOpen, Globe, History, Rocket, Leaf, Camera, Palette, Flower2, Film, Flag, Trophy, BookOpen as StoryIcon, Utensils, Book, Map, Ship, Landmark, Mountain, Scroll, Cloud, Brain, Shovel, Smile, Building, DollarSign, Music } from "lucide-react";
import { Link } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface CategorySlide {
  name: string;
  image: string;
  icon: React.ReactNode;
  link: string;
  description: string;
}

const CategorySlider = () => {
  const categories: CategorySlide[] = [
    {
      name: "Science",
      image: "https://i.pinimg.com/736x/3d/85/7f/3d857fe040510267884a3c03f78dabbe.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
      icon: <Atom className="h-6 w-6" />,
      link: "/category/science",
      description: "Discoveries and breakthroughs"
    },
    {
      name: "Technology",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
      icon: <Rocket className="h-6 w-6" />,
      link: "/category/technology",
      description: "Innovations and future tech"
    },
    {
      name: "History",
      image: "https://cdn.pixabay.com/photo/2018/05/17/16/03/compass-3408928_1280.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
      icon: <History className="h-6 w-6" />,
      link: "/category/history",
      description: "Our shared human past"
    },
    {
      name: "Culture",
      image: "https://i.pinimg.com/736x/d8/c3/78/d8c37889799640a06408caeaf34a38fa.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
      icon: <Globe className="h-6 w-6" />,
      link: "/category/culture",
      description: "Human traditions worldwide"
    },
    {
      name: "Nature",
      image: "https://i.pinimg.com/736x/1f/81/e6/1f81e6e79e6a6322b1bcea03fab08c95.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
      icon: <Leaf className="h-6 w-6" />,
      link: "/category/nature",
      description: "Wonders of our natural world"
    },
    {
      name: "Wildlife",
      image: "https://images.unsplash.com/photo-1504173010664-32509aeebb62?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
      icon: <Leaf className="h-6 w-6" />,
      link: "/category/wildlife",
      description: "Amazing animal species"
    },
    {
      name: "Space",
      image: "https://cdn.pixabay.com/photo/2023/08/16/16/32/ai-generated-8194508_1280.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
      icon: <Rocket className="h-6 w-6" />,
      link: "/category/space",
      description: "Cosmic exploration"
    },
    {
      name: "Art",
      image: "https://i.pinimg.com/736x/5d/5c/25/5d5c2556fcec282d7a82722b8dae5385.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
      icon: <Palette className="h-6 w-6" />,
      link: "/category/art",
      description: "Human creativity & expression"
    },
    {
      name: "Flowers",
      image: "https://i.pinimg.com/736x/d5/5a/8e/d55a8e48bc020292ca8a8b7b0b5bb01a.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
      icon: <Flower2 className="h-6 w-6" />,
      link: "/category/flowers",
      description: "Botanical beauty around us"
    },
    {
      name: "Anime",
      image: "https://i.pinimg.com/736x/9e/07/92/9e0792fa4d1bc15db2e1b1440d0ef66b.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
      icon: <Film className="h-6 w-6" />,
      link: "/category/anime",
      description: "Japanese animation culture"
    },
    {
      name: "Politics",
      image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
      icon: <Flag className="h-6 w-6" />,
      link: "/category/politics",
      description: "Global affairs and governance"
    },
    {
      name: "Sports",
      image: "https://i.pinimg.com/736x/4c/ea/6d/4cea6d4a6d970fa15156e5faeb595a4f.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
      icon: <Trophy className="h-6 w-6" />,
      link: "/category/sports",
      description: "Athletic competitions worldwide"
    },
    {
      name: "Stories",
      image: "https://i.pinimg.com/736x/74/dc/eb/74dceb2ac5dc044e3f54ae4325a361a0.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
      icon: <StoryIcon className="h-6 w-6" />,
      link: "/category/stories",
      description: "Compelling narratives and tales"
    },
    {
      name: "Food",
      image: "https://i.pinimg.com/736x/16/92/b3/1692b3193ce168983c05e8f42b2997c6.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
      icon: <Utensils className="h-6 w-6" />,
      link: "/category/food",
      description: "Culinary delights and recipes"
    },
    {
      name: "Literature",
      image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2500&h=1600",
      icon: <Book className="h-6 w-6" />,
      link: "/category/literature",
      description: "Books, poems, and written art"
    },
    {
      name: "Travel",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2500&h=1600",
      icon: <Map className="h-6 w-6" />,
      link: "/category/travel",
      description: "Adventures around the globe"
    },
    {
      name: "Marinelife",
      image: "https://images.unsplash.com/photo-1518877593221-1f28583780b4?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2500&h=1600",
      icon: <Ship className="h-6 w-6" />,
      link: "/category/marinelife",
      description: "Exploring ocean ecosystems"
    },
    {
      name: "Monuments",
      image: "https://i.pinimg.com/736x/b2/0b/97/b20b977813320fcb9524cc8d37a3049c.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2500&h=1600",
      icon: <Landmark className="h-6 w-6" />,
      link: "/category/monuments",
      description: "Historical landmarks worldwide"
    },
    // New categories
    {
      name: "Deep Earth & Geology",
      image: "https://cdn.pixabay.com/photo/2016/11/21/17/46/craters-1846775_1280.jpg",
      icon: <Mountain className="h-6 w-6" />,
      link: "/category/deep-earth-geology",
      description: "Earth's structure and geological wonders"
    },
    {
      name: "Ancient Civilizations",
      image: "https://cdn.pixabay.com/photo/2016/11/19/14/11/ancient-1839467_1280.jpg",
      icon: <Scroll className="h-6 w-6" />,
      link: "/category/ancient-civilizations",
      description: "Lost cultures and ancient wisdom"
    },
    {
      name: "Climate",
      image: "https://cdn.pixabay.com/photo/2017/02/27/08/50/cyclone-2102397_1280.jpg",
      icon: <Cloud className="h-6 w-6" />,
      link: "/category/climate",
      description: "Weather patterns and climate science"
    },
    {
      name: "Psychology",
      image: "https://cdn.pixabay.com/photo/2018/01/27/10/09/perception-3110812_1280.jpg",
      icon: <Brain className="h-6 w-6" />,
      link: "/category/psychology",
      description: "Understanding the human mind"
    },
    {
      name: "Archaeology",
      image: "https://cdn.pixabay.com/photo/2017/05/19/15/08/stonehenge-2326750_1280.jpg",
      icon: <Shovel className="h-6 w-6" />,
      link: "/category/archaeology",
      description: "Uncovering history through artifacts"
    },
    {
      name: "Mythology",
      image: "https://cdn.pixabay.com/photo/2016/08/26/01/32/poseidon-1621062_1280.jpg",
      icon: <Smile className="h-6 w-6" />,
      link: "/category/mythology",
      description: "Ancient stories and legendary beings"
    },
    {
      name: "Business & Economics",
      image: "https://cdn.pixabay.com/photo/2018/02/08/10/22/desk-3139127_1280.jpg",
      icon: <DollarSign className="h-6 w-6" />,
      link: "/category/business-economics",
      description: "Markets, finance, and economic trends"
    },
    {
      name: "Music",
      image: "https://cdn.pixabay.com/photo/2022/08/31/20/47/concert-7424190_1280.jpg",
      icon: <Music className="h-6 w-6" />,
      link: "/category/music",
      description: "Harmony, rhythm, and musical culture"
    },
    {
      name: "Current Affairs",
      image: "https://cdn.pixabay.com/photo/2017/08/03/11/05/people-2575608_1280.jpg",
      icon: <Globe className="h-6 w-6" />,
      link: "/category/current-affairs",
      description: "Today's most important global events"
    }
  ];

  return (
    <div className="mb-10">
      <h3 className="text-xl font-bold mb-4 text-white">Explore Categories</h3>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2">
          {categories.map((category, index) => (
            <CarouselItem key={index} className="pl-2 md:basis-1/3 lg:basis-1/4">
              <Link to={category.link} className="block">
                <div className="overflow-hidden rounded-lg h-56 relative group">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                    <div className="flex items-center mb-1">
                      <div className="bg-sky-500 p-2 rounded-full mr-2">
                        {category.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white">{category.name}</h3>
                    </div>
                    <p className="text-white/80 text-sm">{category.description}</p>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-end mt-4">
          <CarouselPrevious className="relative left-0 right-auto mr-2 bg-white/20 hover:bg-white/40 border-none text-white" />
          <CarouselNext className="relative right-0 left-auto bg-white/20 hover:bg-white/40 border-none text-white" />
        </div>
      </Carousel>
    </div>
  );
};

export default CategorySlider;
