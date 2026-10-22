import Player from "./player.js";

class Game{
    #player1;
    #player2;
    #currentPlayer;
    #isGameFinished = false;
    #boardSize;
    
    constructor(boardSizes){
        this.#boardSize = boardSizes;
        this.#player1 = new Player("Player 1", this.#boardSize);
        this.#player2 = new Player("Player 2", this.#boardSize);
        this.#currentPlayer = this.#player1;
    }

    get player1(){ return this.#player1; }
    get player2(){ return this.#player2; }
    get boardSize(){ return this.#boardSize; }
    get currentPlayer(){ return this.#currentPlayer; }
    get currentOpponent(){ return this.#currentPlayer === this.#player1 ? this.#player2 : this.#player1 }

    changePlayer(){
        this.#currentPlayer = this.#currentPlayer === this.#player1 ? this.#player2 : this.#player1;
    }

    takeTurn(x, y){
        if(this.#isGameFinished) return "invalid";

        if(this.currentOpponent.gameBoard.receiveAttack(x, y) === "invalid") return "continue"; // or invalid maybe

        if(this.checkWinner()){
            this.#isGameFinished = true;
            return "won";
        }

        this.changePlayer();

        return "continue";
    }
    
    checkWinner(){
        return currentOpponent.gameBoard.isFleetSunk();
    }

    resetGame(){
        this.#isGameFinished = false;
        this.#player1.gameBoard.clearBoard();
        this.#player2.gameBoard.clearBoard();

        //need a setup for player2 (AI)
    }

}