
import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CategoryBadge from "@/components/blog/CategoryBadge";

// Define the CategoryType to match the BlogPost interface
type CategoryType = "science" | "technology" | "history" | "culture" | "nature" | "space" | "wildlife" | 
  "travel" | "marinelife" | "monuments" | "literature" | "art" | "flowers" | "food" | "anime" | "politics" | "sports" | "stories" |
  "psychology" | "archaeology" | "mythology" | "climate" | "current-affairs" | "music" | "business-economics" | "deep-earth-geology" | "ancient-civilizations";

interface BasicInfoFormProps {
  title: string;
  setTitle: (value: string) => void;
  category: CategoryType;
  setCategory: (value: CategoryType) => void;
  description: string;
  setDescription: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  tags: string;
  setTags: (value: string) => void;
}

const BasicInfoForm = ({
  title,
  setTitle,
  category,
  setCategory,
  description,
  setDescription,
  location,
  setLocation,
  tags,
  setTags
}: BasicInfoFormProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Basic Information</h3>
      
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a descriptive title"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={(value) => setCategory(value as CategoryType)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category">
                {category && <CategoryBadge category={category} size="sm" />}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="max-h-[300px] overflow-y-auto">
              <SelectItem value="science">Science</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="history">History</SelectItem>
              <SelectItem value="culture">Culture</SelectItem>
              <SelectItem value="nature">Nature</SelectItem>
              <SelectItem value="space">Space</SelectItem>
              <SelectItem value="wildlife">Wildlife</SelectItem>
              <SelectItem value="travel">Travel</SelectItem>
              <SelectItem value="marinelife">Marine Life</SelectItem>
              <SelectItem value="monuments">Monuments</SelectItem>
              <SelectItem value="literature">Literature</SelectItem>
              <SelectItem value="art">Art</SelectItem>
              <SelectItem value="flowers">Flowers</SelectItem>
              <SelectItem value="food">Food</SelectItem>
              <SelectItem value="anime">Anime</SelectItem>
              <SelectItem value="politics">Politics</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="stories">Stories</SelectItem>
              <SelectItem value="psychology">Psychology</SelectItem>
              <SelectItem value="archaeology">Archaeology</SelectItem>
              <SelectItem value="mythology">Mythology</SelectItem>
              <SelectItem value="climate">Climate</SelectItem>
              <SelectItem value="current-affairs">Current Affairs</SelectItem>
              <SelectItem value="music">Music</SelectItem>
              <SelectItem value="business-economics">Business & Economics</SelectItem>
              <SelectItem value="deep-earth-geology">Deep Earth & Geology</SelectItem>
              <SelectItem value="ancient-civilizations">Ancient Civilizations</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a brief summary of your content"
            rows={3}
          />
          <p className="text-sm text-muted-foreground">
            This description will appear in search results and previews.
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location">Location (Optional)</Label>
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Where was this content created or about?"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tags">Tags</Label>
          <Input
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter tags separated by commas (e.g. nature, wildlife, conservation)"
          />
          <p className="text-sm text-muted-foreground">
            Tags help users find your content.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoForm;
