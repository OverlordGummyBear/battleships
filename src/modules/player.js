import GameBoard from "./gameBoard.js";

class Player{
    #playerName;
    #gameBoard;
    #fleet;
    
    constructor(playerName, boardSize, fleet){
        if(!Number.isInteger(boardSize) || boardSize < 1) throw new Error("boardSize has to be an positive integer");

        this.#playerName = playerName;
        this.#gameBoard = new GameBoard(boardSize);
        this.#fleet = fleet;
    }

    get playerName(){ return this.#playerName; }
    get gameBoard(){ return this.#gameBoard; }
    get fleet(){ return this.#fleet; }

    placeFleet(maxTries){
        if(maxTries <= 0 || !Number.isInteger(maxTries)) throw new Error("maxTries need to be a positive integer")

        let requiredFleetSpace = this.#fleet.reduce((acc, current) => acc + current, 0);

        if(requiredFleetSpace > this.#gameBoard.boardLength * this.#gameBoard.boardLength) throw new Error("There is not enough space on the board for the fleet");

        const shipLengthToPlace = this.fleet;

        let i = 0;
        let totalTries = 0;
        let absoluteMaxTries = 0;
        while(i < shipLengthToPlace.length){
            if(this.#fleet[i] > this.#gameBoard.boardLength) throw new Error("A ships cannot be placed as it is longer than the gameBoard itself");

            let randomX = parseInt(Math.random() * this.gameBoard.boardLength);
            let randomY = parseInt(Math.random() * this.gameBoard.boardLength);
            let randomOrientation = Math.random() < 0.5;

            if(this.gameBoard.placeShip([randomX, randomY], shipLengthToPlace[i], randomOrientation)){
                i++;
            }

            if(totalTries > maxTries){
                this.reset();
                i = 0;
                totalTries = 0;
            }

            if(absoluteMaxTries > maxTries * maxTries) throw new Error("Have tried to place fleet too many times, but is unable to do so");

            totalTries++;
            absoluteMaxTries++;
        }
    }

    reset(){
        this.gameBoard.clearBoard();
    }
}

export default Player;