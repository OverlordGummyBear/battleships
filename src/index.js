//import "./styles.css";
import GameBoard from "./modules/gameBoard.js";

let gameBoard = new GameBoard(10);
gameBoard.placeShip([3, 2], 3, true);

gameBoard.receiveAttack(3, 2)
