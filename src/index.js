import "./styles.css";
import Player from "./modules/player.js";
import Game from "./modules/game.js";
import GameViewer from "./modules/gameViewer.js";

const p1BoardDiv = document.getElementById("p1-board");
const p2BoardDiv = document.getElementById("p2-board");
const finishMessageDiv = document.querySelector(".finish-message");

const game = new Game(10);
const gameViewer = new GameViewer();
gameViewer.renderBoard(p1BoardDiv, game.player1.gameBoard.getAllSquareStates(), game.boardSize, true);
gameViewer.renderBoard(p2BoardDiv, game.player2.gameBoard.getAllSquareStates(), game.boardSize, true);

p1BoardDiv.addEventListener("click", (e) => {

})

p2BoardDiv.addEventListener("click", (e) => {
    if(e.target.dataset.x === undefined) return;

    const xCoordinate = Number(e.target.dataset.x);
    const yCoordinate = Number(e.target.dataset.y);
    
    if(game.takeTurn(game.player1, xCoordinate, yCoordinate) === "invalid") return;

    gameViewer.renderBoard(p2BoardDiv, game.player2.gameBoard.getAllSquareStates(), game.boardSize, false);

    console.log(game.player2.generateRandomValidMove())
})  

//put code inside game class (turns, winnerCheck, etc.)

function boardClick(e, player, playerBoard){
    


    //take turn here
    if(player.gameBoard.receiveAttack(xCoordinate, yCoordinate) === "invalid") return;

    //identify player 2 to know whether the board show be shown or not
    //const showBoard = player.playerName === player1.playerName ? true : false;
    //gameViewer.renderBoard(playerBoard, player.gameBoard.getAllSquareStates(), boardLength, showBoard);


    //check if won is returned from take turn
}