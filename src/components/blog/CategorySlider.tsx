
import React from 'react';
import { Atom, BookOpen, Globe, History, Rocket, Leaf, Camera, Palette, Flower2 } from "lucide-react";
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
      image: "https://images.unsplash.com/photo-1532094349884-543019f6a73c?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
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
      image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
      icon: <History className="h-6 w-6" />,
      link: "/category/history",
      description: "Our shared human past"
    },
    {
      name: "Culture",
      image: "https://images.unsplash.com/photo-1493676304190-35560a325c4e?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
      icon: <Globe className="h-6 w-6" />,
      link: "/category/culture",
      description: "Human traditions worldwide"
    },
    {
      name: "Nature",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
      icon: <Leaf className="h-6 w-6" />,
      link: "/category/nature",
      description: "Wonders of our natural world"
    },
    {
      name: "Space",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
      icon: <Rocket className="h-6 w-6" />,
      link: "/category/space",
      description: "Cosmic exploration"
    },
    {
      name: "Art",
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
      icon: <Palette className="h-6 w-6" />,
      link: "/category/art",
      description: "Human creativity & expression"
    },
    {
      name: "Flowers",
      image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
      icon: <Flower2 className="h-6 w-6" />,
      link: "/category/flowers",
      description: "Botanical beauty around us"
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
            <CarouselItem key={index} className="pl-2 md:basis-1/2 lg:basis-1/3">
              <Link to={category.link} className="block">
                <div className="overflow-hidden rounded-lg h-48 relative group">
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
