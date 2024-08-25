
/*
 * Type definition for the GameStats component
 */
type GameStatsProps = {
    moves: number
    misses: number
    badMisses: number
}

/*
 * component that shows the game-stats as overlay
 */
export function GameStats({ moves, misses, badMisses }: GameStatsProps) {
    return (
        <div className="absolute top-2 right-2 p-2 bg-gray-900 bg-opacity-75 text-white text-sm flex flex-col rounded-lg ">
            <div className="grid grid-cols-[auto,auto] grid-cols-2 gap-x-4">
                    <div>Moves:</div>
                    <div className="text-right">{moves}</div>
                    <div>Misses:</div>
                    <div className="text-right">{misses}</div>
                    <div>Bad-Misses:</div>
                    <div className="text-right">{badMisses}</div>
            </div>
        </div>
    )
}