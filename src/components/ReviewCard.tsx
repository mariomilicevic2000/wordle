interface ReviewCardProps {
    totalGames : number,
    wins : number,
    losses : number,
    winrate : number,
    avgGuesses : string,
    avgTime : string,
    winStreak : number,
}

export default function ReviewCard({totalGames, wins, losses, winrate, avgGuesses, avgTime, winStreak} : ReviewCardProps) {
    return (
        <div>
            <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md space-y-3 mt-6">
                <h3 className="text-xl font-semibold text-center">📊 Lifetime Averages</h3>
                <div className="flex justify-between">
                    <span className="font-medium">Total Games:</span>
                    <span>{totalGames}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium text-green-600">Wins:</span>
                    <span>{wins}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium text-red-500">Losses:</span>
                    <span>{losses}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium">Winrate:</span>
                    <span>{winrate}%</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium">Avg. Guesses to Win:</span>
                    <span>{avgGuesses}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium">Avg. Time to Win:</span>
                    <span>{avgTime}s</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium">Current win streak:</span>
                    <span>{winStreak}</span>
                </div>
            </div>
        </div>
    )
}
