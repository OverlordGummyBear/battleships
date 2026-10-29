import "./styles.css";
import Game from "./modules/game.js";
import GameViewer from "./modules/gameViewer.js";

const p1BoardDiv = document.getElementById("p1-board");
const p2BoardDiv = document.getElementById("p2-board");
const finishMessageH2 = document.querySelector(".finish-message");
const horizontalCheckbox = document.getElementById("horizontal");
const shipOptionInput = document.getElementById("ships-to-place");
const randomShipPlacementButton = document.getElementById("random-ship-placement");
const gamePrepDiv = document.getElementById("gameprep");
const resetButton = document.getElementById("reset-button");
resetButton.style.display = "none";

const game = new Game(10, [6, 4, 4, 3, 3, 3, 2, 2, 2, 2]);
const gameViewer = new GameViewer();

let areShipsPlaced = false;
let isHorizontal = false;
let shipLength = 0;
let fleet = game.fleet.slice(); //get copy of array instead of reference so it is safe to modify
let timer;

gameViewer.renderBoard(p1BoardDiv, game.player1.gameBoard.getAllSquareStates(), game.boardSize, true);
gameViewer.renderBoard(p2BoardDiv, game.player2.gameBoard.getAllSquareStates(), game.boardSize, false);
renderShipOption();

shipOptionInput.addEventListener("change", (e) => {
    shipLength = e.target.value;
})


randomShipPlacementButton.addEventListener("click", () => {
    if(areShipsPlaced) return;

    game.player1.reset();
    game.player1.placeFleet();
    areShipsPlaced = true;
    fleet = [];
    renderShipOption();
    gameViewer.renderBoard(p1BoardDiv, game.player1.gameBoard.getAllSquareStates(), game.boardSize, true);


    resetButton.style.display = "block";
    gamePrepDiv.style.display = "none";
});

resetButton.addEventListener("click", () => { 
    //game object reset
    game.resetGame();
    gameViewer.renderBoard(p1BoardDiv, game.player1.gameBoard.getAllSquareStates(), game.boardSize, true);
    gameViewer.renderBoard(p2BoardDiv, game.player2.gameBoard.getAllSquareStates(), game.boardSize, false);
    
    //index page reset
    finishMessageH2.textContent = "";
    fleet = game.fleet.slice(); //copy of game.fleet
    renderShipOption();
    areShipsPlaced = false;
    clearTimeout(timer);

    resetButton.style.display = "none";
    gamePrepDiv.style.display = "flex";
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

    if(fleet.length === 0){
        areShipsPlaced = true;
        gamePrepDiv.style.display = "none";
        resetButton.style.display = "flex"
    }
})

p2BoardDiv.addEventListener("click", (e) => {
    if(!areShipsPlaced) return;

    if(e.target.dataset.x === undefined) return;

    //player 1 moves
    const xCoordinate = Number(e.target.dataset.x);
    const yCoordinate = Number(e.target.dataset.y);
    
    let p1MoveResult = game.takeTurn(game.player1, xCoordinate, yCoordinate)

    if(p1MoveResult === "invalid") 
        return;

    gameViewer.renderBoard(p2BoardDiv, game.player2.gameBoard.getAllSquareStates(), game.boardSize, false);

    if(p1MoveResult === "won"){
        finishMessageH2.textContent = `${game.player1.playerName} won the game!`;
        return;
    }

    //player 2 moves (computer)
    timer = setTimeout(() => {
        if(game.takeComputerTurn() === "won")
            finishMessageH2.textContent = `${game.player2.playerName} won the game!`;

        gameViewer.renderBoard(p1BoardDiv, game.player1.gameBoard.getAllSquareStates(), game.boardSize, true);
    }, 1000);
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
        shipOption.textContent = shipLength + "  \u25FC".repeat(shipLength);
        shipOptionInput.appendChild(shipOption);
    })
}