import GameBoard from "./gameBoard.js";

class Player{
    #playerName;
    #gameBoard;
    
    constructor(playerName){
        this.#playerName = playerName;
        this.#gameBoard = new GameBoard(10);
    }

    get playerName(){ return this.#playerName; }
    get gameBoard(){ return this.#gameBoard; }
}

export default Player;