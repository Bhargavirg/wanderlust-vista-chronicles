
import { Button } from "@/components/ui/button";
import { Loader2, Check } from "lucide-react";

interface ContentFormActionsProps {
  isSubmitting: boolean;
  onSaveDraft: (e: React.MouseEvent) => void;
  onPublish: (e: React.FormEvent) => void;
}

const ContentFormActions = ({ isSubmitting, onSaveDraft, onPublish }: ContentFormActionsProps) => {
  return (
    <div className="flex justify-end space-x-4 mt-8">
      <Button
        type="button"
        variant="outline"
        onClick={onSaveDraft}
        disabled={isSubmitting}
      >
        Save as Draft
      </Button>
      <Button 
        type="submit" 
        onClick={onPublish}
        disabled={isSubmitting}
        className="bg-yellow-500 hover:bg-yellow-600 text-black"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Publishing...
          </>
        ) : (
          <>
            <Check className="mr-2 h-4 w-4" />
            Publish Content
          </>
        )}
      </Button>
    </div>
  );
};

export default ContentFormActions;
