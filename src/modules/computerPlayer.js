import Player from "./player.js";

class ComputerPlayer extends Player{
    #validMoves = [];

    constructor(playerName, boardSize, fleet){
        super(playerName, boardSize, fleet);
        this.placeFleet();
        this.generateValidMoves();
    }

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

    generateValidMoves(){
        for(let i = 0; i < this.gameBoard.boardLength; i++)
            for(let j = 0; j < this.gameBoard.boardLength; j++)
                this.#validMoves.push([i, j]);
    }

    generateRandomValidMove(){
        const randomMoveIndex = parseInt(Math.random() * this.#validMoves.length)

        return this.#validMoves.splice(randomMoveIndex, 1)[0];
    }

    reset(){
        this.generateRandomValidMove();
        this.gameBoard.clearBoard();
        this.placeFleet();
    }
}

export default ComputerPlayer;