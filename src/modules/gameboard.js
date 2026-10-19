import Ship from "./ship.js";

class GameBoard{
    #boardLength;
    #board;
    #fleet = [];

    constructor(boardSize){
        if(boardSize <= 0) throw new Error("boardSize has to be more than 0");

        this.#boardLength = boardSize;
        this.#board = new Array(boardSize);

        //create board an fill with shipIndex and isShot info
        for(let i = 0; i < boardSize; i++){
            const innerBoardArr = new Array(boardSize);
            
            this.#board[i] = innerBoardArr;

            for(let j = 0; j < boardSize; j++){
                innerBoardArr[j] = {shipIndex: null, isShot: false};
            }
        }
    }

    placeShip([x, y], length, isHorizontal){ //orientation
        
    }

    receiveAttack(x, y){

    }

    isFleetSunk(){
        if(this.#fleet.length === 0) throw new Error("fleet is empty");
        
        this.#fleet.forEach(ship => {
            if(!ship.isSunk())
                return false;
        })

        return true;
    }
}

export default GameBoard;