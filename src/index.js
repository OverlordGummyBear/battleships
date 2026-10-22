import "./styles.css";
import Game from "./modules/game.js";
import GameViewer from "./modules/gameViewer.js";

const p1BoardDiv = document.getElementById("p1-board");
const p2BoardDiv = document.getElementById("p2-board");
const finishMessageH2 = document.querySelector(".finish-message");

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
    
    let p1MoveResult = game.takeTurn(game.player1, xCoordinate, yCoordinate)

    if(p1MoveResult === "invalid") 
        return;

    gameViewer.renderBoard(p2BoardDiv, game.player2.gameBoard.getAllSquareStates(), game.boardSize, true);

    if(p1MoveResult === "won"){
        finishMessageH2.textContent = "Player 1 won the game!";
        return;
    }

    let coordinate = game.player2.generateRandomValidMove();
    let p2MoveResult = game.takeTurn(game.player2, coordinate[0], coordinate[1]);
    
    gameViewer.renderBoard(p1BoardDiv, game.player1.gameBoard.getAllSquareStates(), game.boardSize, true);
    
    if(p2MoveResult === "won"){
        finishMessageH2.textContent = "Player 2 won the game!";
        return;
    }
})  