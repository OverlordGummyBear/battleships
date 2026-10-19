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

    get board(){ return this.#board; }

    placeShip([x, y], length, isHorizontal){ //orientation
        //check that neither x or y overflow the board
        if(x >= this.#boardLength || x < 0 || y >= this.#boardLength || y < 0) return false;
        //check that the ship does not overflow the board
        if((x + length > this.#boardLength && isHorizontal) ||
            (y + length > this.#boardLength && !isHorizontal)) return false;
        
        const newShip = new Ship(length);

        this.#fleet.push(newShip);

        const newShipIndex = this.#fleet.length - 1;

        //make sure that no ship is placed in any of the squares before placing
        for(let i = 0; i < length; i++){
            let shipInfo = isHorizontal ? this.#board[x + i][y] : this.#board[x][y + i];

            //return false to show that placement was unsuccessful
            if(shipInfo.shipIndex !== null) return false;
        }

        //place ships
        for(let i = 0; i < length; i++){
            isHorizontal 
                ? this.#board[x + i][y].shipIndex = newShipIndex 
                : this.#board[x][y + i].shipIndex = newShipIndex;
        }

        return true;
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