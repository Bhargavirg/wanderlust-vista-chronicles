
import { FormEvent, MouseEvent } from "react";
import BasicInfoForm from "./BasicInfoForm";
import EducationalMetadataForm from "./EducationalMetadataForm";
import ContentTabs from "./ContentTabs";
import ContentFormActions from "./ContentFormActions";
import { EducationalMetadata } from "@/types/mediaTypes";

// Define the CategoryType to match the BlogPost interface
type CategoryType = "science" | "technology" | "history" | "culture" | "nature" | "space" | "wildlife";

interface ContentFormProps {
  title: string;
  setTitle: (value: string) => void;
  category: CategoryType;
  setCategory: (value: CategoryType) => void;
  description: string;
  setDescription: (value: string) => void;
  mainContent: string;
  setMainContent: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  tags: string;
  setTags: (value: string) => void;
  coverImage: string;
  setCoverImage: (value: string) => void;
  images: string[];
  setImages: (images: string[]) => void;
  videoUrl: string;
  setVideoUrl: (url: string) => void;
  videoType: "youtube" | "vimeo" | "mp4" | "other";
  setVideoType: (type: "youtube" | "vimeo" | "mp4" | "other") => void;
  educationalMetadata: EducationalMetadata;
  setEducationalMetadata: (metadata: EducationalMetadata) => void;
  isSubmitting: boolean;
  sampleVideos: {
    title: string;
    src: string;
    type: "youtube" | "vimeo" | "mp4" | "other";
    description: string;
  }[];
  handleSubmit: (e: FormEvent, isDraft?: boolean) => void;
}

const ContentForm = ({
  title,
  setTitle,
  category,
  setCategory,
  description,
  setDescription,
  mainContent,
  setMainContent,
  location,
  setLocation,
  tags,
  setTags,
  coverImage,
  setCoverImage,
  images,
  setImages,
  videoUrl,
  setVideoUrl,
  videoType,
  setVideoType,
  educationalMetadata,
  setEducationalMetadata,
  isSubmitting,
  sampleVideos,
  handleSubmit,
}: ContentFormProps) => {
  
  const handleSaveDraft = (e: MouseEvent) => {
    handleSubmit(e as unknown as FormEvent, true);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, false)} className="p-6">
      <div className="space-y-8">
        {/* Basic Information */}
        <BasicInfoForm
          title={title}
          setTitle={setTitle}
          category={category}
          setCategory={setCategory}
          description={description}
          setDescription={setDescription}
          location={location}
          setLocation={setLocation}
          tags={tags}
          setTags={setTags}
        />
        
        {/* Educational Metadata */}
        <EducationalMetadataForm
          educationalMetadata={educationalMetadata}
          setEducationalMetadata={setEducationalMetadata}
        />
        
        {/* Content Tabs */}
        <ContentTabs
          mainContent={mainContent}
          setMainContent={setMainContent}
          coverImage={coverImage}
          setCoverImage={setCoverImage}
          images={images}
          setImages={setImages}
          videoUrl={videoUrl}
          setVideoUrl={setVideoUrl}
          videoType={videoType}
          setVideoType={setVideoType}
          sampleVideos={sampleVideos}
        />
      </div>
      
      <ContentFormActions
        isSubmitting={isSubmitting}
        onSaveDraft={handleSaveDraft}
        onPublish={(e) => handleSubmit(e)}
      />
    </form>
  );
};

export default ContentForm;
