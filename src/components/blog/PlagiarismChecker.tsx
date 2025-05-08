
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle, Check, Scan } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { checkPlagiarism, formatSimilarityScore } from "@/utils/plagiarismUtils";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { getAllPublishedContent } from "@/services/contentService";

interface PlagiarismCheckerProps {
  contentText: string;
}

const PlagiarismChecker = ({ contentText }: PlagiarismCheckerProps) => {
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<{
    isPlagiarized: boolean;
    similarityScore: number;
    matchedText?: string;
  } | null>(null);
  const [progress, setProgress] = useState(0);

  const handleCheckPlagiarism = async () => {
    if (!contentText || contentText.length < 100) {
      toast({
        title: "Not enough content",
        description: "Please provide more content to check for plagiarism",
        variant: "destructive",
      });
      return;
    }

    setIsChecking(true);
    setProgress(10);
    
    try {
      // Fetch all published content to compare against
      const allContent = await getAllPublishedContent();
      setProgress(40);
      
      // Extract text content from all posts
      const comparisonTexts = allContent.map(post => 
        [post.title, post.description, post.main_content]
          .filter(Boolean)
          .join(' ')
      ).filter(text => text !== contentText);
      
      setProgress(60);
      
      // Check the content against our database
      const plagiarismResult = await checkPlagiarism(contentText, comparisonTexts);
      setProgress(90);
      
      // Set the results
      setResult({
        isPlagiarized: plagiarismResult.isPlagiarized,
        similarityScore: plagiarismResult.similarityScore,
        matchedText: plagiarismResult.matchedText
      });
      
      // Show toast notification with result
      if (plagiarismResult.isPlagiarized) {
        toast({
          title: "Potential plagiarism detected",
          description: `Similarity score: ${formatSimilarityScore(plagiarismResult.similarityScore)}`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Content appears original",
          description: `Similarity score: ${formatSimilarityScore(plagiarismResult.similarityScore)}`,
          variant: "default",
        });
      }
    } catch (error) {
      console.error('Error checking plagiarism:', error);
      toast({
        title: "Error checking plagiarism",
        description: "Something went wrong while checking for plagiarism",
        variant: "destructive",
      });
    } finally {
      setProgress(100);
      setIsChecking(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button
          onClick={handleCheckPlagiarism}
          disabled={isChecking || !contentText}
          variant="outline"
          className="flex items-center gap-2"
        >
          {isChecking ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Checking...
            </>
          ) : (
            <>
              <Scan className="h-4 w-4" />
              Check Plagiarism
            </>
          )}
        </Button>
      </div>
      
      {isChecking && (
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Checking content for plagiarism...</p>
          <Progress value={progress} />
        </div>
      )}
      
      {result && !isChecking && (
        <Alert variant={result.isPlagiarized ? "destructive" : "default"}>
          <div className="flex items-center gap-2">
            {result.isPlagiarized ? (
              <AlertTriangle className="h-4 w-4" />
            ) : (
              <Check className="h-4 w-4" />
            )}
            <AlertTitle>
              {result.isPlagiarized 
                ? "Potential plagiarism detected" 
                : "Content appears original"}
            </AlertTitle>
          </div>
          <AlertDescription className="pl-6">
            <p className="mt-1">Similarity score: {formatSimilarityScore(result.similarityScore)}</p>
            {result.isPlagiarized && result.matchedText && (
              <div className="mt-2">
                <p className="font-medium">Similar content:</p>
                <p className="text-sm italic mt-1 bg-gray-100 dark:bg-gray-800 p-2 rounded">
                  {result.matchedText.length > 150 
                    ? `${result.matchedText.substring(0, 150)}...` 
                    : result.matchedText}
                </p>
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default PlagiarismChecker;
