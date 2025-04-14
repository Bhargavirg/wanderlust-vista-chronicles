
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin } from "lucide-react";

// Define the CategoryType to match the BlogPost interface
type CategoryType = "science" | "technology" | "history" | "culture" | "nature" | "space" | "wildlife";

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
  
  // Handle the category change
  const handleCategoryChange = (value: string) => {
    // Cast the string value to CategoryType
    setCategory(value as CategoryType);
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold border-b pb-2">Basic Information</h3>
      
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Enter a descriptive title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={handleCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="science">Science</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="history">History</SelectItem>
              <SelectItem value="culture">Culture</SelectItem>
              <SelectItem value="nature">Nature</SelectItem>
              <SelectItem value="wildlife">Wildlife</SelectItem>
              <SelectItem value="space">Space</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              id="location"
              placeholder="Where was this content captured/created?"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Short Description</Label>
        <Textarea
          id="description"
          placeholder="Enter a brief summary of your content (100-200 characters)"
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="tags">Tags</Label>
        <div className="relative">
          <Input
            id="tags"
            placeholder="Enter tags separated by commas"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <p className="text-xs text-gray-500">e.g., rainforest, biodiversity, amazon</p>
      </div>
    </div>
  );
};

export default BasicInfoForm;
