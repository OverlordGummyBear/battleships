import GameBoard from "../modules/gameBoard.js";

let gameBoard;

beforeEach(() => {
    gameBoard = new GameBoard(10);
});

//checkValidShipPlacement
test("validShipPlacement: check empty board with random length", () => {
    expect(gameBoard.checkValidShipPlacement([6,1], 4, false)).toBe(true)
})

//placeShip
test("placeShip: only shipIndex where the ship was placed", () => {
    expect(gameBoard.placeShip([4,4], 3, false)).toBe(true);
    expect(gameBoard.board[4][4].shipIndex).toBe(0);
    expect(gameBoard.board[5][4].shipIndex).toBe(0);
    expect(gameBoard.board[6][4].shipIndex).toBe(0);

    expect(gameBoard.board[4][3].shipIndex).toBe(null);
    expect(gameBoard.board[4][7].shipIndex).toBe(null);
});

test("placeShip: cannot place ship where another ship is", () => {
    expect(gameBoard.placeShip([4,4], 3, false)).toBe(true);
    expect(gameBoard.placeShip([4,4], 3, false)).toBe(false);
    expect(gameBoard.board[4][4].shipIndex).toBe(0);
});

test("placeShip: cannot place ship where another ship is", () => {
    expect(gameBoard.placeShip([4,4], 3, false)).toBe(true);
    expect(gameBoard.placeShip([2,4], 3, true)).toBe(false);
    
    expect(gameBoard.board[2][4].shipIndex).toBe(null);
    expect(gameBoard.board[3][4].shipIndex).toBe(null);
    expect(gameBoard.board[4][4].shipIndex).toBe(0);
});

test("placeShip: startX is less than 0", () => {
    expect(gameBoard.placeShip([-1, 2], 3, true)).toBe(false);
});

test("placeShip: startY is less than 0", () => {
    expect(gameBoard.placeShip([2, -1], 3, true)).toBe(false);
});

test("placeShip: ship end overflow the board", () => {
    expect(gameBoard.placeShip([8, 1], 3, true)).toBe(false);
    expect(gameBoard.board[8][1].shipIndex).toBe(null);
});

//receiveAttack
test("receiveAttack: square with ship is hit", () => {
    gameBoard.placeShip([4,4], 2, true);

    expect(gameBoard.receiveAttack(4,4)).toBe("hit");
});

test("receiveAttack: square with ship is not hit", () => {
    expect(gameBoard.receiveAttack(4,4)).toBe("miss");
});

test("receiveAttack: square with ship is hit twice", () => {
    gameBoard.placeShip([4,4], 2, true);
    
    expect(gameBoard.receiveAttack(4,4)).toBe("hit");
    expect(gameBoard.receiveAttack(4,4)).toBe("invalid");
});

test("receiveAttack: square with no ship is hit twice", () => {
    expect(gameBoard.receiveAttack(4,4)).toBe("miss");
    expect(gameBoard.receiveAttack(4,4)).toBe("invalid");
});

test("receiveAttack: y is outOfBounds", () => {
    expect(gameBoard.receiveAttack(-1,4)).toBe("invalid");
});

test("receiveAttack: x is outOfBounds", () => {
    expect(gameBoard.receiveAttack(4,10)).toBe("invalid");
});


//isFleetSunk
test("isFleetSunk: one ship total not sunk", () => {
    gameBoard.placeShip([3, 2], 3, true);
    gameBoard.receiveAttack(3, 2);
    gameBoard.receiveAttack(4, 2)

    expect(gameBoard.isFleetSunk()).toBe(false);
});

test("isFleetSunk: one ship total is sunk", () => {
    gameBoard.placeShip([3, 2], 3, true);
    gameBoard.receiveAttack(3, 2);
    gameBoard.receiveAttack(4, 2);
    gameBoard.receiveAttack(5, 2);

    expect(gameBoard.isFleetSunk()).toBe(true);
});

test("isFleetSunk: two ships only one sunk", () => {
    gameBoard.placeShip([3, 2], 2, true);
    gameBoard.placeShip([0, 0], 2, false);

    gameBoard.receiveAttack(3, 2);
    gameBoard.receiveAttack(4, 2);

    expect(gameBoard.isFleetSunk()).toBe(false);
});

test("isFleetSunk: two ships all sunk", () => {
    gameBoard.placeShip([3, 2], 2, true);
    gameBoard.placeShip([0, 0], 2, false);

    gameBoard.receiveAttack(3, 2);
    gameBoard.receiveAttack(4, 2);

    gameBoard.receiveAttack(0, 0);
    gameBoard.receiveAttack(0, 1);

    expect(gameBoard.isFleetSunk()).toBe(true);
});

test("isFleetSunk: no ship in fleet", () => {
    expect(() => gameBoard.isFleetSunk()).toThrow("There are no ships in the fleet");
});