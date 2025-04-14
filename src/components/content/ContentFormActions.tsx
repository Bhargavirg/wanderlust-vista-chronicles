
import { Button } from "@/components/ui/button";
import { Loader2, Check, Trash2, Save } from "lucide-react";
import { useState } from "react";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ContentFormActionsProps {
  isSubmitting: boolean;
  onSaveDraft: (e: React.MouseEvent) => void;
  onPublish: (e: React.FormEvent) => void;
  onDelete?: (e: React.MouseEvent) => void;
  isEditMode?: boolean;
  authorId?: string;
  currentUserId?: string;
}

const ContentFormActions = ({ 
  isSubmitting, 
  onSaveDraft, 
  onPublish, 
  onDelete,
  isEditMode = false,
  authorId,
  currentUserId
}: ContentFormActionsProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const isAuthor = !authorId || !currentUserId || authorId === currentUserId;

  return (
    <div className="flex justify-between mt-8">
      <div>
        {isEditMode && onDelete && isAuthor && (
          <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant="destructive"
                disabled={isSubmitting}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Content
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to delete this content?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your content and remove it from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={(e) => {
                  onDelete(e);
                  setShowDeleteDialog(false);
                }}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onSaveDraft}
          disabled={isSubmitting || (isEditMode && !isAuthor)}
        >
          {isEditMode ? (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          ) : (
            "Save as Draft"
          )}
        </Button>
        <Button 
          type="submit" 
          onClick={onPublish}
          disabled={isSubmitting || (isEditMode && !isAuthor)}
          className="bg-yellow-500 hover:bg-yellow-600 text-black"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isEditMode ? "Updating..." : "Publishing..."}
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              {isEditMode ? "Update Content" : "Publish Content"}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ContentFormActions;
