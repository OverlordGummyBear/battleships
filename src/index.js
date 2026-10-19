//import "./styles.css";
import GameBoard from "./modules/gameBoard.js";

let gameBoard = new GameBoard(10);

gameBoard.placeShip(0, 0, 3, true);

console.log(gameBoard.board)
console.log(gameBoard.receiveAttack(0,0));
console.log(gameBoard.isFleetSunk())
console.log(gameBoard.receiveAttack(1,0));
console.log(gameBoard.isFleetSunk())
console.log(gameBoard.receiveAttack(2,0));
console.log(gameBoard.isFleetSunk())