
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ImageCarouselProps {
  images: string[];
  aspectRatio?: number;
}

const ImageCarousel = ({ images, aspectRatio = 16 / 9 }: ImageCarouselProps) => {
  if (!images || images.length === 0) {
    return null;
  }

  // If only one image, return a simple image component
  if (images.length === 1) {
    return (
      <div className="overflow-hidden rounded-md">
        <AspectRatio ratio={aspectRatio}>
          <img
            src={images[0]}
            alt="Blog content"
            className="object-cover w-full h-full"
          />
        </AspectRatio>
      </div>
    );
  }

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="overflow-hidden rounded-md">
              <AspectRatio ratio={aspectRatio}>
                <img
                  src={image}
                  alt={`Blog content ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-end gap-2 mt-2">
        <CarouselPrevious className="static transform-none" />
        <CarouselNext className="static transform-none" />
      </div>
    </Carousel>
  );
};

export default ImageCarousel;
