
/**
 * Simple text comparison plagiarism detection
 * This uses basic similarity detection techniques
 */

// Function to split text into chunks for comparison
export const splitIntoChunks = (text: string, chunkSize: number = 50): string[] => {
  const words = text.split(/\s+/);
  const chunks: string[] = [];
  
  for (let i = 0; i < words.length - chunkSize + 1; i += Math.ceil(chunkSize / 2)) {
    chunks.push(words.slice(i, i + chunkSize).join(' '));
  }
  
  return chunks;
};

// Calculate similarity between two texts using Dice's coefficient
export const calculateSimilarity = (text1: string, text2: string): number => {
  const set1 = new Set(text1.toLowerCase().split(/\s+/).filter(word => word.length > 3));
  const set2 = new Set(text2.toLowerCase().split(/\s+/).filter(word => word.length > 3));
  
  if (set1.size === 0 || set2.size === 0) return 0;
  
  const intersection = [...set1].filter(word => set2.has(word)).length;
  return (2 * intersection) / (set1.size + set2.size);
};

// Compare a text against a database of texts to find potential plagiarism
export const checkPlagiarism = async (text: string, comparisonTexts: string[]): Promise<{
  isPlagiarized: boolean;
  similarityScore: number;
  matchedText?: string;
  matchedIndex?: number;
}> => {
  const textChunks = splitIntoChunks(text);
  let highestSimilarity = 0;
  let matchedText = '';
  let matchedIndex = -1;
  
  // Compare each chunk against the database texts
  for (const chunk of textChunks) {
    for (let i = 0; i < comparisonTexts.length; i++) {
      const comparisonText = comparisonTexts[i];
      const similarity = calculateSimilarity(chunk, comparisonText);
      
      if (similarity > highestSimilarity) {
        highestSimilarity = similarity;
        matchedText = comparisonText;
        matchedIndex = i;
      }
      
      // If similarity is above threshold, consider it plagiarized
      if (similarity > 0.8) {
        return {
          isPlagiarized: true,
          similarityScore: similarity,
          matchedText: comparisonText,
          matchedIndex: i
        };
      }
    }
  }
  
  return {
    isPlagiarized: highestSimilarity > 0.5,
    similarityScore: highestSimilarity,
    ...(highestSimilarity > 0.5 ? { matchedText, matchedIndex } : {})
  };
};

// Helper function to format the similarity score as a percentage
export const formatSimilarityScore = (score: number): string => {
  return `${Math.round(score * 100)}%`;
};
