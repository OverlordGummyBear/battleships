import Player from "./player.js";

class ComputerPlayer extends Player{
    #validMoves = [];
    #informedMoves = [];
    #visitedMoves = [];

    constructor(playerName, boardSize, fleet){
        super(playerName, boardSize, fleet);
        this.placeFleet();
        this.generateValidMoves();
    }

    get validMoves(){ return this.#validMoves; }

    generateValidMoves(){
        for(let i = 0; i < this.gameBoard.boardLength; i++)
            for(let j = 0; j < this.gameBoard.boardLength; j++)
                this.#validMoves.push([i, j]);
    }

    generateRandomValidMove(){
        const randomMoveIndex = parseInt(Math.random() * this.#validMoves.length)

        return this.#validMoves.splice(randomMoveIndex, 1)[0];
    }

    generateInformedMove(){

    }

    reset(){
        this.gameBoard.clearBoard();
        this.placeFleet();
    }
}

export default ComputerPlayer;