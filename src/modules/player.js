import GameBoard from "./gameBoard.js";

class Player{
    #playerName;
    #gameBoard;
    #fleet;
    
    constructor(playerName, boardSize, fleet){
        if(!Number.isInteger(boardSize) || boardSize < 1) throw new Error("boardSize has to be an integer higher than 0");

        this.#playerName = playerName;
        this.#gameBoard = new GameBoard(boardSize);
        this.#fleet = fleet;

        //this.placeFleet();
    }

    get playerName(){ return this.#playerName; }
    get gameBoard(){ return this.#gameBoard; }
    get fleet(){ return this.#fleet; }

    placeFleet(){
        this.#gameBoard.placeShip([0,0], 2, true);
        this.#gameBoard.placeShip([3,0], 3, false);
        this.#gameBoard.placeShip([4,9], 6, true);
        this.#gameBoard.placeShip([5,5], 2, false);
    }

    reset(){
        this.gameBoard.clearBoard();
        this.placeFleet()
    }
}

export default Player;