import "./styles.css";
import Game from "./modules/game.js";
import GameViewer from "./modules/gameViewer.js";

let areShipsPlaced = false;
let isHorizontal = true;
let shipLength = 2;

const p1BoardDiv = document.getElementById("p1-board");
const p2BoardDiv = document.getElementById("p2-board");
const finishMessageH2 = document.querySelector(".finish-message");

const resetButton = document.getElementById("reset-button");

const game = new Game(10);
const gameViewer = new GameViewer();
gameViewer.renderBoard(p1BoardDiv, game.player1.gameBoard.getAllSquareStates(), game.boardSize, true);
gameViewer.renderBoard(p2BoardDiv, game.player2.gameBoard.getAllSquareStates(), game.boardSize, true);

resetButton.addEventListener("click", () => { 
    game.resetGame();
    gameViewer.renderBoard(p1BoardDiv, game.player1.gameBoard.getAllSquareStates(), game.boardSize, true);
    gameViewer.renderBoard(p2BoardDiv, game.player2.gameBoard.getAllSquareStates(), game.boardSize, true);
    finishMessageH2.textContent = "";
});

p1BoardDiv.addEventListener("mouseout", () => {
    gameViewer.renderBoard(p1BoardDiv, game.player1.gameBoard.getAllSquareStates(), game.boardSize, true);
})

p1BoardDiv.addEventListener("mouseover", (e) => {
    if(areShipsPlaced) return;

    if(e.target.dataset.x === undefined) return;

    const xCoordinate = Number(e.target.dataset.x);
    const yCoordinate = Number(e.target.dataset.y);
    
    let validShipPlacement = game.player1.gameBoard.checkValidShipPlacement(
        [xCoordinate, yCoordinate], shipLength, isHorizontal
    )
    let placement = validShipPlacement ? "ship" : "hit";
    let currentState = game.player1.gameBoard.getAllSquareStates();

    for(let i = 0; i < shipLength; i++){
        if(isHorizontal){
            currentState[yCoordinate][xCoordinate + i] = placement;
        } else {
            if(!game.player1.gameBoard.checkValidShipPlacement(
                [xCoordinate, yCoordinate + i], 1, isHorizontal)){
                break;
            }

            currentState[yCoordinate + i][xCoordinate] = placement;
        }
    }

    gameViewer.renderBoard(p1BoardDiv, currentState, game.boardSize, true);
})

p2BoardDiv.addEventListener("click", (e) => {
    if(!areShipsPlaced) return;

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