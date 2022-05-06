export const readingTimeInMinutes = (text: string) => {
  const wordsPerMinute = 200;
  const wordCount = text.split(/[-\s]/);

  return Math.ceil(wordCount.length / wordsPerMinute);
}