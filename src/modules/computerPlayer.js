import Player from "./player.js";

class ComputerPlayer extends Player{
    #validMoves = [];
    #informedMoves = [];

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
        if(this.#informedMoves.length === 0){
            return this.generateRandomValidMove();
        } else {
            return this.#informedMoves.pop();
        }
    }

    addAdjacentHitSquares(x, y){
        let coord = [[x - 1, y], [x + 1, y], [x, y-1], [x, y+1]];

        coord.forEach(coord => {
            if(coord[0] < 0 || coord[0] >= this.gameBoard.boardLength || coord[1] < 0 || coord[1] >= this.gameBoard.boardLength)
                return;

            let moveIndex = this.#validMoves.findIndex(validMove => validMove[0] === coord[0] && validMove[1] === coord[1])
            
            if(moveIndex === -1) return;
            
            this.#validMoves.splice(moveIndex, 1);
            this.#informedMoves.push(coord);
        })
    }

    reset(){
        this.gameBoard.clearBoard();
        this.placeFleet();
    }
}

export default ComputerPlayer;