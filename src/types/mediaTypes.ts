
export interface MediaContent {
  type: "image" | "video";
  url: string;
  caption?: string;
  source?: string;
  credit?: string; // For crediting photographers, scientists, etc.
}

export interface GalleryContent {
  images: string[];
  captions?: string[];
  sources?: string[]; // Where the images come from
  credits?: string[]; // Who took/created the images
}

export interface VideoContent {
  src: string;
  type: "youtube" | "vimeo" | "mp4" | "other";
  title?: string;
  description?: string;
  transcript?: string; // Text version of the video content
  relatedMaterials?: { title: string; url: string }[]; // Links to related resources
}

export interface EducationalMetadata {
  ageRange?: string; // e.g., "12-16", "All ages"
  difficulty?: "beginner" | "intermediate" | "advanced";
  subjects?: string[]; // e.g., ["Biology", "Environmental Science"]
  keywords?: string[]; // For better search functionality
  citations?: string[]; // Scientific citations or sources
}
