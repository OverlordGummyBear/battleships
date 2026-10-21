import "./styles.css";
import GameBoard from "./modules/gameBoard.js";
import Player from "./modules/player.js";
import GameViewer from "./modules/gameViewer.js";

const player1 = new Player("Player 1");
const player2 = new Player("Player 2");

console.log(player1.gameBoard.board)

const p1BoardDiv = document.getElementById("p1-board");
const p2BoardDiv = document.getElementById("p2-board");
const boardLength = player1.gameBoard.boardLength;

const gameViewer = new GameViewer();
gameViewer.renderBoard(p1BoardDiv, player1.gameBoard.getAllSquareStates(), boardLength, true);
gameViewer.renderBoard(p2BoardDiv, player2.gameBoard.getAllSquareStates(), boardLength, false);





p1BoardDiv.addEventListener("click", (e) => {
    boardClick(e);
})

p2BoardDiv.addEventListener("click", (e) => {
    boardClick(e);
})

function boardClick(e){
    if(e.target.dataset.x === undefined) return;

    const xCoordinate = Number(e.target.dataset.x);
    const yCoordinate = Number(e.target.dataset.y);

    console.log("X:", xCoordinate, "Y:", yCoordinate)
}