import { useRef, useState } from "react"
import { MemoryCard } from "./MemoryCard"
import { Util } from "./Util"
import { GameStats } from "./GameStats"
import { Card, GameState, RunState } from "./MemoryTypes"


/* create the card models for the game and shuffle them */
const makeCards = (size: number) => {
    const cards: Card[] = []
    for (let i = 0, n = size * size / 2; i < n; i++) {
        const imageUrl = `image_${Util.zeroPadNumber(i + 1, 2)}.jpg`
        const id = "card_" + (i + 1)
        const model = {
            id: id,
            pairIndex: 0,
            flipped: true,
            active: true,
            imageUrl: imageUrl
        }
        // push two cards with the same id and image but different pairIndex
        cards.push(model)
        cards.push({...model, pairIndex: 1})
    }
    Util.shuffle(cards)
    return cards
}

/*
 * the memory game component
 * 
 * internally the gameState is managed
 * 
 * The game size must be 2, 4 or 6 because we dont have enough images
 * if its greater. Also the game size square must be even.
 */
export function MemoryGame({ gameSize: gameSize }: { gameSize: number }) {
    
    /* initialize the game state */
    const [gameState, setGameState] = useState<GameState>({
        cards: makeCards(gameSize),
        runState: RunState.STOPPED,
        moves: 0,
        misses: 0,
        badMisses: 0,
        seenCards: new Set<string>()
    })

    /* remember the timeout id for the checkForMatch function, so we can 
     * cancel pending timeouts */
    const timeoutId = useRef<number>(0)


    /* last gameSize */
    /*
    const lastGameSize = useRef<number>(gameSize)
    useEffect(() => {
        if (gameSize != lastGameSize.current) {
            newGame()
            lastGameSize.current = gameSize
        }
    }, [gameSize])
    */

    /* func to reinitialize the gameState for a new game */
    const newGame = () => {
        const newGameState = {...gameState}
        newGameState.runState = RunState.STARTED
        newGameState.moves = newGameState.misses = newGameState.badMisses = 0
        newGameState.cards = makeCards(gameSize)
        newGameState.seenCards.clear()
        setGameState(newGameState)
    }

    /* flip the card at index from the click event */
    const flipCard = (index: number) => {
        const visibleCards = gameState.cards.filter(card => !card.flipped && card.active)
        if (visibleCards.length >= 2) {
            return
        }
        const newGameState = {...gameState}
        newGameState.cards[index].flipped = !newGameState.cards[index].flipped
        setGameState(newGameState)
    }

    /* check if two cards are visible and if they match and
     * either log a hit or a miss */
    const checkForMatch = () => {
        const newGameState = {...gameState}
        /* when 2 cards are turned around, check if they match or not */
        const visibleCards = newGameState.cards.filter(card => !card.flipped && card.active)
        if (visibleCards.length == 2) {
            const c1 = visibleCards[0]
            const c2 = visibleCards[1]
            newGameState.moves++
            if (c1.id == c2.id) {
                c1.active = false;
                c2.active = false;
            } else {
                newGameState.misses++
                c1.flipped = true
                c2.flipped = true
                if (newGameState.firstCard) {
                    // chance to uncover a card missed here
                    const otherCardKey = newGameState.firstCard.id + "@" + (newGameState.firstCard.pairIndex == 0 ? 1 : 0)
                    if (newGameState.seenCards.has(otherCardKey)) {
                        newGameState.badMisses++
                    }
                }
            }
            newGameState.seenCards.add(c1.id + "@" + c1.pairIndex)
            newGameState.seenCards.add(c2.id + "@" + c2.pairIndex)
        }
        /* game is over when all cards are inactive */
        const activeCards = newGameState.cards.filter(card => card.active)
        newGameState.runState = activeCards.length == 0 ? RunState.STOPPED : RunState.STARTED
        newGameState.firstCard = visibleCards.length == 1 ? visibleCards[0] : undefined  // remember the first card for bad misses
        setGameState(newGameState)
    }

    /* handle the click (=flip) of a card */
    const handleFlip = (index: number) => () => {
        switch (gameState.runState) {
            case RunState.STOPPED:
                break
            case RunState.STARTED:
                /* flip the card around right away*/
                flipCard(index)
                /* delete old timeout */
                if (timeoutId.current) {
                    clearTimeout(timeoutId.current);
                }
                /* check for a match after the cards were revealed */
                timeoutId.current = setTimeout(checkForMatch, 500)
                break
        }
    }
    /* check game size makes sense */
    if ([2, 4, 6].indexOf(gameSize) == -1) {
        return <div>Invalid Gamesize={gameSize}</div>
    }

    /* return the game's gui */
    return (
        <div className="flex">
            <div className="grow"></div>
            {gameState.runState == RunState.STARTED
                // gui for started game
                ? (<div className={`grid grid-cols-${gameSize} gap-4`} >
                    {[...Array(gameSize * gameSize)].map((_, i) => (
                        <MemoryCard key={i} card={gameState.cards[i]} handleFlip={handleFlip(i)} />
                    ))}</div>)
                // gui for stopped game
                : (<button className="button" onClick={newGame}>Start new Game</button>)
            }
            <div className="grow"></div>
            <GameStats badMisses={gameState.badMisses} moves={gameState.moves} misses={gameState.misses}></GameStats>
        </div>
    )
}

