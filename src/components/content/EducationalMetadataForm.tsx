
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EducationalMetadata } from "@/types/mediaTypes";

interface EducationalMetadataFormProps {
  educationalMetadata: EducationalMetadata;
  setEducationalMetadata: (metadata: EducationalMetadata) => void;
}

const EducationalMetadataForm = ({
  educationalMetadata,
  setEducationalMetadata,
}: EducationalMetadataFormProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold border-b pb-2">Educational Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="ageRange">Target Age Range</Label>
          <Select 
            value={educationalMetadata.ageRange} 
            onValueChange={(val) => setEducationalMetadata({...educationalMetadata, ageRange: val})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select age range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All ages">All ages</SelectItem>
              <SelectItem value="Elementary (5-10)">Elementary (5-10)</SelectItem>
              <SelectItem value="Middle School (11-13)">Middle School (11-13)</SelectItem>
              <SelectItem value="High School (14-18)">High School (14-18)</SelectItem>
              <SelectItem value="College (18+)">College (18+)</SelectItem>
              <SelectItem value="Adult">Adult</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="difficulty">Difficulty Level</Label>
          <Select 
            value={educationalMetadata.difficulty} 
            onValueChange={(val: "beginner" | "intermediate" | "advanced") => setEducationalMetadata({...educationalMetadata, difficulty: val})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <input 
            type="checkbox" 
            id="factCheck" 
            checked={educationalMetadata.factCheck}
            onChange={(e) => setEducationalMetadata({...educationalMetadata, factCheck: e.target.checked})}
            className="h-4 w-4 border-gray-300 rounded text-primary focus:ring-primary"
          />
          <label htmlFor="factCheck" className="text-sm">Fact Checked</label>
        </div>
        
        <div className="flex items-center space-x-2">
          <input 
            type="checkbox"
            id="expertReview"
            checked={educationalMetadata.expertReviewed}
            onChange={(e) => setEducationalMetadata({...educationalMetadata, expertReviewed: e.target.checked})}
            className="h-4 w-4 border-gray-300 rounded text-primary focus:ring-primary"
          />
          <label htmlFor="expertReview" className="text-sm">Expert Reviewed</label>
        </div>
      </div>
    </div>
  );
};

export default EducationalMetadataForm;
