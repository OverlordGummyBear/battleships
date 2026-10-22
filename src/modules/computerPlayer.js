import Player from "./player.js";

class ComputerPlayer extends Player{
    constructor(playerName, boardSize){
        super(playerName, boardSize);
    }

    placeFleet(){
        const shipLengthToPlace = [5, 4, 4, 3, 3, 3, 2, 2, 2, 2];

        let i = 0;
        while(i < shipLengthToPlace.length){
            let randomX = parseInt(Math.random() * 10);
            let randomY = parseInt(Math.random() * 10);
            let randomOrientation = Math.random() < 0.5;

            if(this.gameBoard.placeShip([randomX, randomY], shipLengthToPlace[i], randomOrientation)){
                i++;
            }
        }
    }
}

export default ComputerPlayer;