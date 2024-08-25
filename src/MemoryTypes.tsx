/* define the types used for the state (=model) of the memory game component */

/*
 * The type that contains the the state of a single card 
 * in the game
 * 
 */
export type Card = {
    id: string          // the id of the card, for each id 2 cards exist
    pairIndex: number   // can be 0 or 1, if 0 then its the first card of a pair
    flipped: boolean    // if the card is flipped (not showing the image but the backside)
    active: boolean     // if the card is active, inactive ones are removed from the game
    imageUrl: string    // the image url of the card
}


/* type for the game's running state */
export enum RunState {
    STOPPED, STARTED
}


/* type for the game's state 
 * this is the central state of a game and contains the cards, the running state
 * and the statistics of the game
 */
export type GameState = {
    runState: RunState
    cards: Card[]
    moves: number
    misses: number
    badMisses: number
    seenCards: Set<string>  // keep track of cards that were already seen
    firstCard?: Card        // remember the first revealed card for bad misses
}
