
import React, { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Image as ImageIcon, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageCarouselProps {
  images: string[];
  aspectRatio?: number;
  captions?: string[];
}

const ImageCarousel = ({ 
  images, 
  aspectRatio = 16 / 9, 
  captions = [] 
}: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { toast } = useToast();
  
  if (!images || images.length === 0) {
    return null;
  }

  // If only one image, return a simple image component
  if (images.length === 1) {
    return (
      <div className="overflow-hidden rounded-md relative group">
        <AspectRatio ratio={aspectRatio}>
          <img
            src={images[0]}
            alt={captions[0] || "Educational content"}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </AspectRatio>
        {captions[0] && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-sm">
            {captions[0]}
          </div>
        )}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                className="absolute top-2 right-2 bg-black/60 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => toast({
                  title: "Image Info",
                  description: captions[0] || "No caption available"
                })}
              >
                <Info size={16} className="text-white" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View image details</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }

  // Fix: Replace onSlideChange with a standard callback using onChange API
  const handleSlideChange = (api: any) => {
    if (!api) return;
    // Get the current index from the embla carousel API
    setCurrentIndex(api.selectedScrollSnap());
  };

  return (
    <div className="space-y-2 relative">
      <Carousel 
        className="w-full"
        opts={{
          loop: true,
        }}
        setApi={(api) => {
          if (api) {
            api.on('select', () => handleSlideChange(api));
          }
        }}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="overflow-hidden rounded-md relative group">
                <AspectRatio ratio={aspectRatio}>
                  <img
                    src={image}
                    alt={captions[index] || `Educational content ${index + 1}`}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                </AspectRatio>
                {captions[index] && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-sm">
                    {captions[index]}
                  </div>
                )}
                <div className="absolute top-2 left-2 bg-black/60 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                  <ImageIcon size={12} />
                  {index + 1}/{images.length}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-between items-center mt-2">
          <div className="flex gap-1">
            {images.map((_, index) => (
              <div 
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentIndex === index ? "bg-primary" : "bg-gray-300 dark:bg-gray-700"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CarouselPrevious className="static transform-none h-8 w-8" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Previous image</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CarouselNext className="static transform-none h-8 w-8" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Next image</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
