import GameBoard from "./gameBoard.js";

class Player{
    #playerName;
    #gameBoard;
    
    constructor(playerName){
        this.#playerName = playerName;
        this.#gameBoard = new GameBoard(10);

        this.#gameBoard.placeShip([0,0], 2, true);
        this.#gameBoard.placeShip([3,0], 3, false);
        this.#gameBoard.placeShip([4,9], 6, true);
        this.#gameBoard.placeShip([5,5], 2, false);
    }

    get playerName(){ return this.#playerName; }
    get gameBoard(){ return this.#gameBoard; }
}

export default Player;