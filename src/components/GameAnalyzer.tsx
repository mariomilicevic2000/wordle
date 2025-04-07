import { useState, useEffect } from "react";
import { filterWords } from "../analysisutils";
import { potentialWords } from "../data";
import DisplayRow from "./DisplayRow";
import { TileFeedback } from "../types";
import ReviewCard from "./ReviewCard";
import PostGameSummaryCard from "./PostGameSummaryCard";
// import { guessHotness } from "../analysisutils";


export default function GameAnalyzer() {
    const [wordsHistory, setWordsHistory] = useState<number[]>([]);  // Store the count of words after each guess

    const [gameData, setGameData] = useState<any[]>([]); // Store all games data in an array
    const [guesses, setGuesses] = useState<string[][]>([]);  // To store the guesses of the latest game
    const [feedbacks, setFeedbacks] = useState<string[][]>([]);  // To store the feedbacks of the latest game
    const [correctGuess, setCorrectGuess] = useState<string>("");
    const [result, setResult] = useState<string | null>(null);
    const [time, setTime] = useState<number | null>(null);

    // Fetch all games' data and extract the latest game data
    useEffect(() => {
        const allGameData = localStorage.getItem("wordleData");
        if (allGameData) {
            const parsedGameData = JSON.parse(allGameData);  // Parse all games' data
            // console.log("This is parsedGameData:", parsedGameData); // Log the parsed data to verify its structure

            // Update the `gameData` state with the history of all games
            setGameData(parsedGameData);

            // Get the latest game (the last item in the array)
            const latestGame = parsedGameData[parsedGameData.length - 1];

            // Check if latestGame has all required data
            if (latestGame && latestGame.triedGuesses && latestGame.feedbacks) {
                // console.log("Latest game data:", latestGame);

                // Extract the latest game's data and set it to corresponding state variables
                setGuesses(latestGame.triedGuesses.map((guess: string) => guess.split('').map(letter => letter.toLowerCase())));
                setFeedbacks(latestGame.feedbacks);
                setResult(latestGame.result);
                setTime(latestGame.time);
                setCorrectGuess(latestGame.correctGuess);
            } else {
                console.error("Latest game data is missing expected properties.");
            }
        }
    }, []);  // Only run once on component mount

    // Log state variables after they've been updated
    // useEffect(() => {
    //     console.log("Guesses:", guesses);
    //     console.log("Feedbacks:", feedbacks);
    //     console.log("Result:", result);
    //     console.log("Time:", time);
    //     console.log("Correct Guess:", correctGuess);
    // }, [guesses, feedbacks, result, time, correctGuess]);

    // Function to generate the potential words after each guess
    function generatePotentialWords() {
        if (guesses.length === 0 || feedbacks.length === 0) {
            console.error("Guesses or feedbacks are missing. Cannot generate potential words.");
            return;
        }

        let currentWords = [...potentialWords]; // Start with all potential words
        const wordCounts: number[] = []; // Array to store the word count at each iteration

        // Filter potential words for each guess and feedback
        for (let i = 0; i < guesses.length; i++) {
            if (!guesses[i] || !feedbacks[i]) {
                console.error("Missing guess or feedback for index", i);
                continue;
            }

            // Log guesses and feedbacks for debugging
            // console.log(`Guess ${i}:`, guesses[i]);
            // console.log(`Feedback ${i}:`, feedbacks[i]);

            currentWords = filterWords(currentWords, guesses[i], feedbacks[i]);
            // console.log(`After guess ${i}, words left:`, currentWords.length);

            wordCounts.push(currentWords.length);  // Store the number of words after this iteration
        }

        // Log wordCounts for debugging
        // console.log("Word counts after each guess:", wordCounts);

        setWordsHistory(wordCounts); // Update the state with the history of word counts
    }

    // Call generatePotentialWords only after the render (with a delay)
    useEffect(() => {
        const timer = setTimeout(() => {
            if (guesses.length > 0 && feedbacks.length > 0) {
                generatePotentialWords();
            }
        }, 0); // Set timeout with 0ms delay

        // Cleanup the timer on component unmount
        return () => clearTimeout(timer);
    }, [guesses, feedbacks]);  // This effect runs whenever `guesses` or `feedbacks` change

    // console.log(gameData);
    // console.log(gameData.filter(game => game.result === "won").length);

    const totalGames: number = gameData.length;
    const wins: number = gameData.filter(game => game.result === "won").length;
    const losses: number = gameData.filter(game => game.result === "loss").length;
    const winrate: number = Math.floor((wins / totalGames) * 100);
    const totalGuesses: number = gameData.filter(game => game.result === "won").reduce((acc, game) => acc + game.triedGuesses.filter((g: any) => g !== "").length, 0);
    const avgGuesses: string = totalGuesses > 0 ? (totalGuesses / wins).toFixed(2) : "N/A";
    const totalTime: number = gameData.filter(game => game.result === "won").reduce((acc, game) => acc + game.time, 0);
    const avgTime: string = totalTime > 0 ? (totalTime / wins).toFixed(2) : "N/A";
    

    // TODO : Come up with a better score, incorporate entropy analysis

    // const guessesJoined = guesses.map(guess => guess.join(""));
    // const hotnessValues = guessHotness(guessesJoined, correctGuess, wordsHistory, TOTAL_WORDS);

    return (
        <div>
            <PostGameSummaryCard result={result!} guesses={guesses} time={time!} correctGuess={correctGuess}/>
            <ReviewCard totalGames={totalGames} wins={wins} losses={losses} winrate={winrate} avgGuesses={avgGuesses} avgTime={avgTime} />

            <p>At the beginning, there are {potentialWords.length} words.</p>

            {/* Use the DisplayRow component for displaying guesses and feedback */}
            {(() => {
                const renderedRows = [];

                for (let guessIndex = 0; guessIndex < guesses.length; guessIndex++) {
                    const guess = guesses[guessIndex];

                    // Stop rendering if the guess is empty
                    if (guess.every(letter => letter === "")) break;

                    renderedRows.push(
                        <div key={guessIndex} className="mb-4">
                            <DisplayRow
                                rowIndex={guessIndex}
                                currentRow={guesses.length - 1}
                                tileStatus="guessed"
                                letters={guess}
                                tileFeedbacks={feedbacks[guessIndex] as TileFeedback[]}
                            />
                            <div className="mt-2">
                                {
                                    wordsHistory[guessIndex] > 0 ? (
                                        <>
                                        <p className="text-sm text-gray-600">
                                            After guess {guessIndex + 1}, there are{" "}
                                            <span className="font-semibold text-blue-500">{wordsHistory[guessIndex]}</span>{" "}
                                            potential words left.
                                        </p>
                                        {/* <p>Guess hotness: {hotnessValues[guessIndex]}</p> */}
                                        </>
                                    ) : guess.every((letter, index) => letter.toUpperCase() === correctGuess[index].toUpperCase()) ? (
                                        <p className="text-sm text-green-600 font-semibold">You guessed it right!</p>
                                    ) : (
                                        <p className="text-sm text-red-600 font-semibold">You lost!</p>
                                    )
                                }

                            </div>
                        </div>
                    );
                }

                return renderedRows;
            })()}


        </div>
    );
}
