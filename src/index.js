import "./styles.css";
import Player from "./modules/player.js";
import Game from "./modules/game.js";
import GameViewer from "./modules/gameViewer.js";

const player1 = new Player("Player 1");
const player2 = new Player("Player 2");

const p1BoardDiv = document.getElementById("p1-board");
const p2BoardDiv = document.getElementById("p2-board");
const boardLength = player1.gameBoard.boardLength;
const finishMessageDiv = document.querySelector(".finish-message");

const gameViewer = new GameViewer();
gameViewer.renderBoard(p1BoardDiv, player1.gameBoard.getAllSquareStates(), boardLength, true);
gameViewer.renderBoard(p2BoardDiv, player2.gameBoard.getAllSquareStates(), boardLength, false);

p1BoardDiv.addEventListener("click", (e) => {
    boardClick(e, player1, p1BoardDiv);
})

p2BoardDiv.addEventListener("click", (e) => {
    boardClick(e, player2, p2BoardDiv);
})

//put code inside game class (turns, winnerCheck, etc.)

function boardClick(e, player, playerBoard){
    if(e.target.dataset.x === undefined) return;

    const xCoordinate = Number(e.target.dataset.x);
    const yCoordinate = Number(e.target.dataset.y);

    if(player.gameBoard.receiveAttack(xCoordinate, yCoordinate) === "invalid") return;

    const showBoard = player.playerName === player1.playerName ? true : false;
    gameViewer.renderBoard(playerBoard, player.gameBoard.getAllSquareStates(), boardLength, showBoard);


    if(player.gameBoard.isFleetSunk()){
        const finishMessageH2 = document.createElement("h2");
        const winner = player.playerName === player1.playerName
            ? player2.playerName
            : player1.playerName;

        finishMessageH2.textContent = `Player ${winner} won the game`;
        finishMessageDiv.appendChild(finishMessageH2);
    }
}