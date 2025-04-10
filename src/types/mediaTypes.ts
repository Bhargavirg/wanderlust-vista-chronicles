
export interface MediaContent {
  type: "image" | "video";
  url: string;
  caption?: string;
}

export interface GalleryContent {
  images: string[];
  caption?: string;
}

export interface VideoContent {
  src: string;
  type: "youtube" | "vimeo" | "mp4" | "other";
  title?: string;
}
