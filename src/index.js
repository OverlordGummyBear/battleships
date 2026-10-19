//import "./styles.css";
import GameBoard from "./modules/gameBoard.js";

let gameBoard = new GameBoard(10);

gameBoard.placeShip([0, 0], 3, true);
gameBoard.placeShip([0, 1], 3, false);

console.log(gameBoard.board)