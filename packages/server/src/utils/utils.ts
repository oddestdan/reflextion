// JavaScript implementation of the Durstenfeld shuffle, an optimized version of Fisher-Yates
// https://stackoverflow.com/a/12646864/9346354
export function shuffleArray<T>(array: Array<T>): Array<T> {
  let shuffledArray: T[] = array;
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}
