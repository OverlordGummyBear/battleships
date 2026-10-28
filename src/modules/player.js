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
    }

    get playerName(){ return this.#playerName; }
    get gameBoard(){ return this.#gameBoard; }
    get fleet(){ return this.#fleet; }

    placeFleet(){
        const shipLengthToPlace = this.fleet;

        let i = 0;
        while(i < shipLengthToPlace.length){
            let randomX = parseInt(Math.random() * this.gameBoard.boardLength);
            let randomY = parseInt(Math.random() * this.gameBoard.boardLength);
            let randomOrientation = Math.random() < 0.5;

            if(this.gameBoard.placeShip([randomX, randomY], shipLengthToPlace[i], randomOrientation)){
                i++;
            }
        }
    }


    reset(){
        this.gameBoard.clearBoard();
    }
}

export default Player;