import './MemoryCard.css';
import { Card } from './MemoryTypes';



/* type for the prots of the memory card component */
export type MemoryCardProps = {
    card: Card
    handleFlip: () => void
}

/* a single memory card component */
export function MemoryCard({ card, handleFlip }: MemoryCardProps) {
    if (!card.active) {
        // inactive cards are removed but render an empty placeholder
        return <div className="w-32 h-32"></div>
    }
    return (
        <div className="w-full h-full cursor-pointer perspective" onClick={handleFlip}>
            <div className={`card-inner ${card.flipped ? 'is-flipped' : ''}`}>
                <div className="card-front">
                    <img src={card.imageUrl} className="w-full h-full object-cover rounded-lg" />
                </div>
                <div className="card-back bg-gray-800 text-white flex items-center justify-center rounded-lg">
                </div>
            </div>
        </div>
    )
}