import Ship from "./ship.js";

//maybe include method to clear the board and let the setup be in a method for itself

class GameBoard{
    #boardLength;
    #board;
    #fleet = [];

    constructor(boardSize){
        if(boardSize <= 0) throw new Error("boardSize has to be more than 0");

        this.setupBoard(boardSize);
    }

    get board(){ return this.#board; }
    get boardLength(){ return this.#boardLength; }

    setupBoard(boardSize){
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

    checkValidShipPlacement([x, y], length, isHorizontal){
        //check that neither x or y overflow the board
        if(x >= this.#boardLength || x < 0 || y >= this.#boardLength || y < 0) return false;
        //check that the ship does not overflow the board
        if((x + length > this.#boardLength && isHorizontal) ||
            (y + length > this.#boardLength && !isHorizontal)) return false;

        //make sure that no ship is placed in any of the squares before placing
        for(let i = 0; i < length; i++){
            let shipInfo = isHorizontal ? this.#board[y][x + i] : this.#board[y + i][x];

            //return false to show that placement was unsuccessful
            if(shipInfo.shipIndex !== null) return false;
        }

        return true;
    }

    placeShip([x, y], length, isHorizontal){
        if(!this.checkValidShipPlacement([x, y], length, isHorizontal)) return false;
        
        const newShip = new Ship(length); //index before adding ship to arr in case placement is invalid
        const newShipIndex = this.#fleet.length;

        this.#fleet.push(newShip);

        //place ships
        for(let i = 0; i < length; i++){
            isHorizontal 
                ? this.#board[y][x + i].shipIndex = newShipIndex 
                : this.#board[y + i][x].shipIndex = newShipIndex;
        }

        return true;
    }

    receiveAttack(x, y){
        if(x >= this.#boardLength || x < 0 || y >= this.#boardLength || y < 0) return "invalid";

        const squareInfo = this.#board[y][x];

        if(squareInfo.isShot) return "invalid";

        squareInfo.isShot = true;

        if(squareInfo.shipIndex !== null){
            this.#fleet[squareInfo.shipIndex].hit();
            return "hit";
        } else {
            return "miss";
        }
    }

    isFleetSunk(){
        if(this.#fleet.length === 0) throw new Error("There are no ships in the fleet");
        
        let isEveryShipSunk = true;

        this.#fleet.forEach(ship => {
            if(!ship.isSunk())
                isEveryShipSunk = false;
        })

        return isEveryShipSunk;
    }

    getAllSquareStates(){
        const squareStateArr = new Array(this.#boardLength);

        for(let i = 0; i < this.#boardLength; i++){
            const innerBoardArray = new Array(this.#boardLength);

            squareStateArr[i] = innerBoardArray;

            for(let j = 0; j < this.#boardLength; j++){
                let squareInfo = this.#board[i][j];
                let result = "untouched";

                if(squareInfo.shipIndex !== null && squareInfo.isShot === true)
                    result = "hit";
                else if(squareInfo.shipIndex === null && squareInfo.isShot === true)
                    result = "miss";
                else if(squareInfo.shipIndex !== null && squareInfo.isShot === false)
                    result = "ship";

                innerBoardArray[j] = result;
            }
        }

        return squareStateArr;
    }

    clearBoard(){
        this.#board = null;
        this.#fleet = [];

        this.setupBoard(this.#boardLength);
    }
}

export default GameBoard;