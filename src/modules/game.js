import Player from "./player.js";
import ComputerPlayer from "./computerPlayer.js";

class Game{
    #player1;
    #player2;
    #currentPlayer;
    #isGameFinished = false;
    #boardSize;
    #fleet;
    
    constructor(boardSizes, fleet){
        this.#fleet = fleet
        this.#boardSize = boardSizes;
        this.#player1 = new Player("Player 1", this.#boardSize, fleet);
        this.#player2 = new ComputerPlayer("Player 2", this.#boardSize, fleet);
        this.#currentPlayer = this.#player1;
    }

    get player1(){ return this.#player1; }
    get player2(){ return this.#player2; }
    get boardSize(){ return this.#boardSize; }
    get currentPlayer(){ return this.#currentPlayer; }
    get fleet(){ return this.#fleet; }
    get isGameFinished(){ return this.#isGameFinished; }
    get currentOpponent(){ return this.#currentPlayer === this.#player1 ? this.#player2 : this.#player1 }

    changePlayer(){
        this.#currentPlayer = this.#currentPlayer === this.#player1 ? this.#player2 : this.#player1;
    }

    takeTurn(player, x, y){
        if(this.#isGameFinished) return "invalid";
        if(this.#currentPlayer !== player) return "invalid";

        let moveResult = this.currentOpponent.gameBoard.receiveAttack(x, y);

        if(moveResult === "invalid") return "continue";

        if(this.checkWinner()){
            this.#isGameFinished = true;
            return "won";
        }

        this.changePlayer();

        return moveResult;
    }

    takeComputerTurn(){
        if(this.#isGameFinished) return "invalid";
        
        let coordinate = this.#player2.generateInformedMove();
        let moveResult = this.takeTurn(this.#player2, coordinate[0], coordinate[1]);

        if(moveResult === "hit"){
            this.#player2.addAdjacentHitSquares(coordinate[0], coordinate[1]);
        }

        return moveResult;
    }
    
    checkWinner(){
        return this.currentOpponent.gameBoard.isFleetSunk();
    }

    resetGame(){
        this.#isGameFinished = false;
        this.#currentPlayer = this.#player1;
        this.#player1.reset();
        this.#player2.reset();
    }

}

export default Game;