import GameBoard from "../modules/gameBoard.js";

let gameBoard;

beforeEach(() => {
    gameBoard = new GameBoard(10);
});

//checkValidShipPlacement
test("validShipPlacement: check empty board with random length", () => {
    expect(gameBoard.checkValidShipPlacement([6,1], 4, false)).toBe(true)
});

test("validShipPlacement: coordinates inside board, but ship-end is not (x)", () => {
    expect(gameBoard.checkValidShipPlacement([7, 1], 4, true)).toBe(false);
});

test("validShipPlacement: coordinates inside board, but ship-end is not (y)", () => {
    expect(gameBoard.checkValidShipPlacement([1, 7], 4, false)).toBe(false);
});

test("validShipPlacement: occupied square is not valid", () => {
    expect(gameBoard.placeShip([2,2], 2, true)).toBe(true);
    expect(gameBoard.checkValidShipPlacement([2,2], 2, false)).toBe(false);
});

test("validShipPlacement: placement where x is lower than 0 is not valid", () => {
    expect(gameBoard.checkValidShipPlacement([-1, 2], 2, true)).toBe(false);
});

test("validShipPlacement: placement where x is higher than the board length is not valid", () => {
    expect(gameBoard.checkValidShipPlacement([gameBoard.boardLength, 2], 2, true)).toBe(false);
});

test("validShipPlacement: placement where y  is lower than 0 is not valid", () => {
    expect(gameBoard.checkValidShipPlacement([2, -1], 2, true)).toBe(false);
});

test("validShipPlacement: placement where y  is higher than the board length is not valid", () => {
    expect(gameBoard.checkValidShipPlacement([2, gameBoard.boardLength], 2, true)).toBe(false);
});

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

//getAllSquaresStates
test("getAllSquaresStates: squares are by default untouched", () => {
    let states = gameBoard.getAllSquareStates();

    for(let i = 0; i < gameBoard.boardLength; i++)
        for(let j = 0; j < gameBoard.boardLength; j++)
            expect(states[i][j]).toBe("untouched");
});

test("getAllSquaresStates: misses are recorded", () => {
    expect(gameBoard.receiveAttack(6,1)).toBe("miss");
    expect(gameBoard.receiveAttack(7,1)).toBe("miss");

    let states = gameBoard.getAllSquareStates();
    expect(states[6][1]).toBe("miss");
    expect(states[7][1]).toBe("miss");
});

test("getAllSquaresStates: ships are recorded", () => {
    expect(gameBoard.placeShip([2,2], 3, false)).toBe(true);

    let states = gameBoard.getAllSquareStates();
    expect(states[2][2]).toBe("ship");
    expect(states[2][3]).toBe("ship");
    expect(states[2][4]).toBe("ship");
});

test("getAllSquaresStates: hits are recorded", () => {
    expect(gameBoard.placeShip([2,7], 2, false)).toBe(true);
    expect(gameBoard.receiveAttack(2,7)).toBe("hit");
    expect(gameBoard.receiveAttack(2,8)).toBe("hit");

    let states = gameBoard.getAllSquareStates();
    expect(states[2][7]).toBe("hit");
    expect(states[2][8]).toBe("hit");
});

test("getAllSquaresStates: untouched squares remain untouched when operations are done on the board", () => {
    expect(gameBoard.placeShip([2,2], 3, false)).toBe(true);
    expect(gameBoard.receiveAttack(2,2)).toBe("hit");
    expect(gameBoard.receiveAttack(7,2)).toBe("miss");

    let states = gameBoard.getAllSquareStates();
    let untouchedCounter = 0

    for(let i = 0; i < gameBoard.boardLength; i++)
        for(let j = 0; j < gameBoard.boardLength; j++)
            if(states[j][i] === "untouched")
                untouchedCounter++;

    expect(untouchedCounter).toBe(100 - 4);
});


//clearBoard
test("clearBoard: placed ships are removed", () => {
     expect(gameBoard.placeShip([4,4], 3, false)).toBe(true);
     gameBoard.clearBoard();
     expect(() => gameBoard.isFleetSunk()).toThrow("There are no ships in the fleet");
});

test("clearBoard: hits are removed", () => {
    expect(gameBoard.placeShip([4,4], 2, true)).toBe(true);
    expect(gameBoard.receiveAttack(4,4)).toBe("hit");
    gameBoard.clearBoard();
    expect(gameBoard.receiveAttack(4,4)).toBe("miss"); //second shot would be invalid without the clearBoard method
});

test("clearBoard: misses are removed", () => {
    expect(gameBoard.receiveAttack(4,4)).toBe("miss");
    gameBoard.clearBoard();
    expect(gameBoard.receiveAttack(4,4)).toBe("miss"); //second shot would be invalid without the clearBoard method
});

test("clearBoard: fleet is reset", () => {
    expect(gameBoard.placeShip([4,4], 2, true)).toBe(true);
    expect(gameBoard.fleet.length).toBe(1);
    gameBoard.clearBoard()
    expect(gameBoard.fleet.length).toBe(0);
});

test("clearBoard: board size is preserved", () => {
    gameBoard.clearBoard();
    expect(gameBoard.receiveAttack(gameBoard.boardLength - 1, 0)).toBe("miss");
    expect(gameBoard.receiveAttack(gameBoard.boardLength, 0)).toBe("invalid");
    expect(gameBoard.receiveAttack(0, gameBoard.boardLength - 1)).toBe("miss");
    expect(gameBoard.receiveAttack(0, gameBoard.boardLength)).toBe("invalid");
});