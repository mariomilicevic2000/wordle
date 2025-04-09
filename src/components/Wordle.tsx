import { useEffect, useState, useRef } from "react";
import { calculateKeyStatuses, calculateTileFeedback, getRandomWord, isCorrectAnswer } from "../utils";
import { KeyStatus, TileFeedback } from "../types";
import { potentialWords } from "../data";
import Grid from "./Grid";
import Keyboard from "./Keyboard";
import GameOverModal from "./GameOverModal";
import Timer from "./Timer";

const maxRows = 6;

export default function Wordle() {
    let gameStartTime = new Date().getTime();

    const [wordToGuess, setWordToGuess] = useState(getRandomWord().toUpperCase());
    useEffect(() => {
        console.log(wordToGuess);
        gameStartTime = new Date().getTime();
    }, [wordToGuess])

    const initialGuesses = Array.from({ length: maxRows }, () => Array(5).fill(''));
    const [guesses, setGuesses] = useState(initialGuesses);
    const [currentRow, setCurrentRow] = useState(0);
    const [keyStatuses, setKeyStatuses] = useState<KeyStatus[]>(Array(26).fill("not-guessed"));
    const [tileFeedbackRows, setTileFeedbackRows] = useState<TileFeedback[][]>([]);
    const [hasWon, setHasWon] = useState(false);
    const [hasLost, setHasLost] = useState(false);
    const [flippingTiles, setFlippingTiles] = useState<number[]>([]);
    const [isShaking, setIsShaking] = useState<boolean>(false);
    const [timerKey, setTimerKey] = useState<number>(0); 


    // Reference for hidden input field
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Ensure the hidden input field always has focus
    useEffect(() => {
        inputRef.current?.focus();
    }, [currentRow, guesses]);

    function handleBlur() {
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    }
    function handleSubmitGuess() {
        if (hasWon || hasLost) return;
        if (
            currentRow < maxRows &&
            guesses[currentRow].every(letter => letter !== "") &&
            potentialWords.includes(guesses[currentRow].join("").toLowerCase())
        ) {
            const currentGuess = guesses[currentRow];
            const newStatuses = calculateKeyStatuses(wordToGuess, currentGuess, keyStatuses);
            const newTileFeedbackRow = calculateTileFeedback(wordToGuess, currentGuess);

            let delay = 0;
            currentGuess.forEach((_, index) => {
                setTimeout(() => {
                    setFlippingTiles(prev => [...prev, index]);
                }, delay);
                delay += 200;
            });

            setTimeout(() => {
                // Ensure feedback is set before moving forward
                setTileFeedbackRows(prev => [...prev, newTileFeedbackRow]);
                setKeyStatuses(newStatuses);
                setCurrentRow(prev => prev + 1);
                setFlippingTiles([]);

                // Move the win/lose check here, after the state has been updated
                if (isCorrectAnswer(wordToGuess, currentGuess)) {
                    console.log("THESE ARE TILE FEEDBACKS");
                    console.log(tileFeedbackRows);


                    handleWin();
                } else if (currentRow === maxRows - 1) {
                    handleLose();
                }
            }, delay + 300);
        } else {
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 600);
            console.log("Not a word");
        }
    }


    function updateGuesses(prevGuesses: string[][], key: string, currentRow: number): string[][] {
        const newGuesses = prevGuesses.map(row => [...row]); // Deep copy each row
        const currentGuess = [...newGuesses[currentRow]]; // Copy current row

        if (/^[A-Z]$/.test(key)) {
            const nextEmptyIndex = currentGuess.indexOf("");
            if (nextEmptyIndex !== -1) {
                currentGuess[nextEmptyIndex] = key;
            }
        } else if (key === "BACKSPACE") {
            const lastFilledIndex = currentGuess.reduce(
                (lastIndex, letter, index) => (letter !== "" ? index : lastIndex),
                -1
            );
            if (lastFilledIndex !== -1) {
                currentGuess[lastFilledIndex] = "";
            }
        }

        newGuesses[currentRow] = currentGuess;
        return newGuesses;
    }

    function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
        const key = e.key.toUpperCase();

        if (/^[A-Z]$/.test(key) || key === "BACKSPACE") {
            setGuesses(prevGuesses => updateGuesses(prevGuesses, key, currentRow));
        } else if (key === "ENTER" && guesses[currentRow].every(letter => letter !== "")) {
            handleSubmitGuess();
        }

        setTimeout(() => inputRef.current?.focus(), 0);
    }

    // Standardizes input from both physical and virtual keyboard
    function onKeyClick(key: string) {
        handleKeyPress({ key } as React.KeyboardEvent<HTMLInputElement>);
    }

    function handleWin() {
        const wins = Number(localStorage.getItem("wordleWins")) || 0;
        localStorage.setItem("wordleWins", (wins + 1).toString());

        saveGameStats("won");

        setTimeout(() => {
            setHasWon(true);
        }, 2000);
    }

    function handleLose() {
        const losses = Number(localStorage.getItem("wordleLosses")) || 0;
        localStorage.setItem("wordleLosses", (losses + 1).toString());

        saveGameStats("loss");

        setTimeout(() => {
            setHasLost(true);
        }, 2000);
    }

    function saveGameStats(outcome: string) {
        const existingGameData = JSON.parse(localStorage.getItem("wordleData") || "[]");

        const triedGuesses = guesses.map(row => row.join(""));

        console.log(existingGameData);

        const gameStats = {
            result: outcome,
            triedGuesses: triedGuesses,
            feedbacks: tileFeedbackRows,
            correctGuess: wordToGuess,
            time: Math.floor((new Date().getTime() - gameStartTime) / 1000),
        }

        // if(gameStats){
        //     console.log(gameStats);
        // } else {
        //     console.log("wtf");
        // }
        
        existingGameData.push(gameStats);
        localStorage.setItem("wordleData", JSON.stringify(existingGameData));
    }

    function resetGame() {
        setWordToGuess(getRandomWord().toUpperCase());  // Get new word
        setGuesses(Array.from({ length: maxRows }, () => Array(5).fill(''))); // Reset guesses
        setCurrentRow(0);  // Reset row index
        setKeyStatuses(Array(26).fill("not-guessed"));  // Reset keyboard colors
        setTileFeedbackRows([]);  // Clear tile feedback
        setHasWon(false);  // Hide modal if applicable
        setHasLost(false);
        setFlippingTiles([]); // Clear flipping animation tracking
        setTimerKey(prev => prev+1);

        setTimeout(() => inputRef.current?.focus(), 0); // Regain input focus
    }

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-between px-4 py-8 bg-gradient-to-b from-slate-50 to-slate-200 transition-colors">
            {(hasWon || hasLost) && <GameOverModal onClose={resetGame} hasWon={hasWon} hasLost={hasLost} wordToGuess={wordToGuess} />}
            <span className="flex flex-row justify-between items-center">
                <Timer wordToGuess={wordToGuess} key={timerKey}/>
                <button onClick={handleLose} className="mx-6 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg shadow transition-colors">Give up</button>
            </span>

            {/* Hidden input field to capture all user input */}
            <input
                contentEditable={true}
                readOnly={true}
                style={{ cursor: "default" }}
                ref={inputRef}
                onBlur={handleBlur}
                type="text"
                className="absolute opacity-0 w-0 h-0"
                onKeyDown={handleKeyPress}
                autoFocus
                onClick={(e) => e.preventDefault()}
                tabIndex={-1}
            />
            <div className="mb-6">
                <Grid
                    guessesByLetters={guesses}
                    tileFeedbacksRows={tileFeedbackRows}
                    currentRow={currentRow}
                    maxRows={maxRows}
                    flippingTiles={flippingTiles}
                    isShaking={isShaking}
                />
            </div>

            <Keyboard keyStatuses={keyStatuses} onKeyClick={onKeyClick} />
        </div>
    );
}
