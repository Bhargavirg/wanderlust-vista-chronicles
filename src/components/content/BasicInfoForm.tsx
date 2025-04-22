
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue,
  SelectGroup,
  SelectLabel
} from "@/components/ui/select";
import { MapPin } from "lucide-react";

type CategoryType = "science" | "technology" | "history" | "culture" | "nature" | "space" | "wildlife" | 
  "travel" | "marinelife" | "monuments" | "literature" | "art" | "flowers" | "food" | "anime" | "politics" | 
  "sports" | "stories" ;

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
  
  const handleCategoryChange = (value: string) => {
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
        <div className="space-y-1">
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={(value) => setCategory(value as CategoryType)}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Nature</SelectLabel>
                <SelectItem value="nature">Nature</SelectItem>
                <SelectItem value="wildlife">Wildlife</SelectItem>
                <SelectItem value="flowers">Flowers</SelectItem>
                <SelectItem value="marinelife">Marine Life</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Science & Technology</SelectLabel>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="space">Space</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Culture & History</SelectLabel>
                <SelectItem value="culture">Culture</SelectItem>
                <SelectItem value="history">History</SelectItem>
                <SelectItem value="monuments">Monuments</SelectItem>
                <SelectItem value="literature">Literature</SelectItem>
                <SelectItem value="art">Art</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Lifestyle</SelectLabel>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Entertainment</SelectLabel>
                <SelectItem value="anime">Anime</SelectItem>
                <SelectItem value="stories">Stories</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Others</SelectLabel>
                <SelectItem value="politics">Politics</SelectItem>
                
              </SelectGroup>
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
