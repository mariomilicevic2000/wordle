import { potentialWords, QWERTY_MAPPING } from "./data";
import { KeyStatus, TileFeedback } from "./types";

export function getRandomWord() : string{
    const randomIndex = Math.floor(Math.random() * potentialWords.length);

    return potentialWords[randomIndex];
}

export function calculateKeyStatuses(
    wordToGuess: string, 
    currentGuess: string[], 
    keyStatuses: KeyStatus[]
): KeyStatus[] {
    const newKeyStatuses = [...keyStatuses]; 
    const wordLetterCounts: Record<string, number> = {};

    // Count occurrences of each letter in the target word
    for (const letter of wordToGuess) {
        wordLetterCounts[letter] = (wordLetterCounts[letter] || 0) + 1;
    }

    // First pass: Mark "correct" letters and update counts
    currentGuess.forEach((letter, index) => {
        const keyIndex = QWERTY_MAPPING[letter];
        if (keyIndex === undefined) return; 

        if (wordToGuess[index] === letter) {
            newKeyStatuses[keyIndex] = "correct";
            wordLetterCounts[letter]--;
        }
    });

    // Second pass: Mark "wrong-place" or "wrong"
    currentGuess.forEach((letter) => {
        const keyIndex = QWERTY_MAPPING[letter];
        if (keyIndex === undefined || newKeyStatuses[keyIndex] === "correct") return;

        if (wordLetterCounts[letter] > 0) {
            newKeyStatuses[keyIndex] = "wrong-place";
            wordLetterCounts[letter]--;
        } else {
            newKeyStatuses[keyIndex] = "wrong";
        }
    });

    return newKeyStatuses;
}



export function calculateTileFeedback(wordToGuess: string, guess: string[]): TileFeedback[] {
    const newTileFeedbackRow: TileFeedback[] = Array(5).fill("wrong");
    const wordLetterCounts: Record<string, number> = {};

    // Count occurrences of each letter in the word
    for (const letter of wordToGuess) {
        wordLetterCounts[letter] = (wordLetterCounts[letter] || 0) + 1;
    }

    // First pass: Mark "correct" and decrement count
    guess.forEach((letter, index) => {
        if (wordToGuess[index] === letter) {
            newTileFeedbackRow[index] = "correct";
            wordLetterCounts[letter]--;
        }
    });

    // Second pass: Mark "wrong-place" only if there are remaining occurrences
    guess.forEach((letter, index) => {
        if (newTileFeedbackRow[index] === "correct") return; // Skip already correct letters

        if (wordLetterCounts[letter] > 0) {
            newTileFeedbackRow[index] = "wrong-place";
            wordLetterCounts[letter]--;
        }
    });

    return newTileFeedbackRow;
}


export function isCorrectAnswer(wordToGuess : string, guess : string[]) : boolean {
    return guess.join('') === wordToGuess;
}