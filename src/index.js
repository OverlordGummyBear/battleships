import "./styles.css";
import Game from "./modules/game.js";
import GameViewer from "./modules/gameViewer.js";

const p1BoardDiv = document.getElementById("p1-board");
const p2BoardDiv = document.getElementById("p2-board");
const finishMessageH2 = document.querySelector(".finish-message");
const horizontalCheckbox = document.getElementById("horizontal");
const shipOptionInput = document.getElementById("ships-to-place");
const resetButton = document.getElementById("reset-button");


const game = new Game(10, [6, 4, 4, 3, 3, 3, 2, 2, 2, 2]);
const gameViewer = new GameViewer();

let areShipsPlaced = false;
let isHorizontal = false;
let shipLength = 0;
let fleet = game.fleet;

gameViewer.renderBoard(p1BoardDiv, game.player1.gameBoard.getAllSquareStates(), game.boardSize, true);
gameViewer.renderBoard(p2BoardDiv, game.player2.gameBoard.getAllSquareStates(), game.boardSize, true);
renderShipOption();


shipOptionInput.addEventListener("change", (e) => {
    shipLength = e.target.value;
})


resetButton.addEventListener("click", () => { 
    game.resetGame();
    gameViewer.renderBoard(p1BoardDiv, game.player1.gameBoard.getAllSquareStates(), game.boardSize, true);
    gameViewer.renderBoard(p2BoardDiv, game.player2.gameBoard.getAllSquareStates(), game.boardSize, true);
    finishMessageH2.textContent = "";
    areShipsPlaced = false;
});

horizontalCheckbox.addEventListener("change", () => {
    isHorizontal = horizontalCheckbox.checked;
})

p1BoardDiv.addEventListener("click", (e) => {    
    if(areShipsPlaced) return;
    if(shipLength === 0) return;

    if(e.target.dataset.x === undefined) return;

    const xCoordinate = Number(e.target.dataset.x);
    const yCoordinate = Number(e.target.dataset.y);

    const validPlacement = game.player1.gameBoard.checkValidShipPlacement(
        [xCoordinate, yCoordinate], shipLength, isHorizontal);

    if(!validPlacement) return;

    game.player1.gameBoard.placeShip([xCoordinate, yCoordinate], shipLength, isHorizontal);

    gameViewer.renderBoard(p1BoardDiv, game.player1.gameBoard.getAllSquareStates(), game.boardSize, true);

    //remove placed ship from ship options
    let shipIndex = fleet.findIndex(ship => ship === Number(shipLength))
    fleet.splice(shipIndex, 1);

    renderShipOption();
    
    shipLength = 0;
});

p1BoardDiv.addEventListener("mouseout", () => {
    gameViewer.renderBoard(p1BoardDiv, game.player1.gameBoard.getAllSquareStates(), game.boardSize, true);
})

p1BoardDiv.addEventListener("mouseover", (e) => {
    if(areShipsPlaced) return;
    if(e.buttons === 1) return; //returns if the user is currently trying to click and place a ship

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
            if(yCoordinate + i >= game.boardSize)
                break;

            currentState[yCoordinate + i][xCoordinate] = placement;
        }
    }

    gameViewer.renderBoard(p1BoardDiv, currentState, game.boardSize, true);

    if(fleet.length === 0)
        areShipsPlaced = true;
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

function renderShipOption(){
    shipOptionInput.textContent = "";

    const defaultOption = document.createElement("option");
    defaultOption.value = 0;
    defaultOption.textContent = "Please choose ship size";
    shipOptionInput.appendChild(defaultOption);

    fleet.forEach(shipLength => {
        const shipOption = document.createElement("option");
        shipOption.value = shipLength;
        shipOption.textContent = shipLength;
        shipOptionInput.appendChild(shipOption);
    })
}