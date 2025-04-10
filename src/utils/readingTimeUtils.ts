
/**
 * Utility functions for calculating and displaying reading time
 */

/**
 * Calculates the estimated reading time for a given text
 * @param text The content to calculate reading time for
 * @returns An object with minutes, seconds and words count
 */
export const calculateReadingTime = (text: string) => {
  // Average reading speed (words per minute)
  const wordsPerMinute = 225;
  const wordCount = text.trim().split(/\s+/).length;
  const minutes = Math.floor(wordCount / wordsPerMinute);
  const seconds = Math.floor((wordCount % wordsPerMinute) / (wordsPerMinute / 60));
  
  return {
    minutes,
    seconds,
    wordCount
  };
};

/**
 * Formats the reading time into a human-readable string
 * @param minutes Minutes part of the reading time
 * @param seconds Seconds part of the reading time
 * @returns A formatted string representing the reading time
 */
export const formatReadingTime = (minutes: number, seconds: number): string => {
  if (minutes === 0) {
    return `${seconds} sec read`;
  } else if (minutes === 1) {
    return `1 min read`;
  } else {
    return `${minutes} min read`;
  }
};
