interface PostGameSummaryCardProps {
    result: string,
    guesses: string[][],
    time: number,
    correctGuess: string,
}

export default function PostGameSummaryCard({ result, guesses, time, correctGuess }: PostGameSummaryCardProps) {
    return (
        <div>
            <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md space-y-3 mt-6">
                <h3 className="text-xl font-semibold text-center">{result === "won" ? "🎉 Game Summary - You Won!" : "😢 Game Summary - You Lost"}</h3>
                <div className="flex justify-between">
                    <span className="font-medium">Game Result:</span>
                    <span className={result === "won" ? "text-green-600" : "text-red-500"}>{result === "won" ? "Won" : "Lost"}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium">Correct Word:</span>
                    <span>{correctGuess}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium">Time Taken:</span>
                    <span>{time}s</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium">Guesses Made:</span>
                    <span>{guesses.length}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium">Guesses:</span>
                    <span>{guesses.map(guess => guess.join("") + " ")}</span>
                </div>
            </div>
        </div>
    )
}
