import { potentialWords } from "./data";

const TOTAL_WORDS = potentialWords.length;


export function filterWords(potentialWords: string[], guess: string[], feedback: string[]) {
    // Create pairs of letter and feedback
    const guessFeedbackPairs = [];
    for (let i = 0; i < guess.length; i++) {
        guessFeedbackPairs.push({
            letter: guess[i],
            feedback: feedback[i],
            index: i,
        });
    }

    const wrongPairs = guessFeedbackPairs.filter(pair => pair.feedback === "wrong");
    const correctPairs = guessFeedbackPairs.filter(pair => pair.feedback === "correct");
    const wrongPlacePairs = guessFeedbackPairs.filter(pair => pair.feedback === "wrong-place");

    // console.log("Wrong pairs:", wrongPairs);
    // console.log("Correct pairs:", correctPairs);
    // console.log("Wrong-place pairs:", wrongPlacePairs);

    // Apply filters in sequence
    let filteredWords = [...potentialWords];
    
    // Filter words based on correct letters (must be in these positions)
    filteredWords = filteredWords.filter(word => {
        return correctPairs.every(pair => word[pair.index] === pair.letter);
    });
    // console.log("After correct filter, words left:", filteredWords.length);
    
    // Filter words based on wrong-place letters (must contain these letters but not in these positions)
    filteredWords = filteredWords.filter(word => {
        return wrongPlacePairs.every(pair => {
            return word.includes(pair.letter) && word[pair.index] !== pair.letter;
        });
    });
    // console.log("After wrong-place filter, words left:", filteredWords.length);
    
    // Filter words based on wrong letters (can't contain these letters unless also present as correct/wrong-place)
    filteredWords = filteredWords.filter(word => {
        return wrongPairs.every(pair => {
            const letter = pair.letter;
            
            // Check if this letter appears in correct or wrong-place positions
            const letterInOtherPositions = correctPairs.some(p => p.letter === letter) || 
                                         wrongPlacePairs.some(p => p.letter === letter);
            
            if (letterInOtherPositions) {
                // If it's in other positions, just ensure it's not in THIS position
                return word[pair.index] !== letter;
            } else {
                // If it's not in other positions, ensure it's not in the word at all
                return !word.includes(letter);
            }
        });
    });
    // console.log("After wrong filter, words left:", filteredWords.length);
    
    return filteredWords;
}

// export const calculateHammingDistance = (word1: string, word2: string): number => {
//     return word1.split('').reduce((distance, char, index) => {
//       return distance + (char !== word2[index] ? 1 : 0);
//     }, 0);
//   };
  
//   export const normalizeRarity = (wordsHistory: number[], TOTAL_WORDS: number): number[] => {
//     if (TOTAL_WORDS === 0) return wordsHistory.map(() => 0);
  
//     return wordsHistory.map(remaining => {
//       if (typeof remaining !== "number" || isNaN(remaining)) return 0;
//       return 1 - remaining / TOTAL_WORDS;
//     });
//   };
  
//   export const guessHotness = (
//     guesses: string[],
//     solution: string,
//     wordsHistory: number[],
//     TOTAL_WORDS: number
//   ): number[] => {
//     const hammingScores = guesses.map(guess =>
//       guess.length === solution.length ? calculateHammingDistance(guess, solution) : 0
//     );
  
//     const rarityScores = normalizeRarity(wordsHistory, TOTAL_WORDS);
  
//     const rawScores = hammingScores.map((hamming, index) => {
//       const rarity = rarityScores[index] ?? 0;
//       return (hamming + 1) * rarity;
//     });
  
//     const maxRaw = Math.max(...rawScores);
//     if (!isFinite(maxRaw) || maxRaw === 0) return rawScores.map(() => 0);
  
//     return rawScores.map(score => Math.round((score / maxRaw) * 100));
//   };
  