import Player from "../modules/player.js";

//placeFleet
test("placeFleet: space for all ships", () => {
    const testFleet = [2,3,4,5,6,7];
    const fleetSum = testFleet.reduce((acc, current) => acc + current, 0);
    const player = new Player("Test", 10, testFleet);

    player.placeFleet(100)

    expect(player.fleet.length).toBe(testFleet.length);

    let squareState = player.gameBoard.getAllSquareStates();

    let occupiedShipSquares = 0;
    for(let i = 0; i < player.gameBoard.boardLength; i++)
        for(let j = 0; j < player.gameBoard.boardLength; j++)
            if(squareState[i][j] === "ship") occupiedShipSquares++;

    expect(occupiedShipSquares).toBe(fleetSum);
});

test("placeFleet: empty fleet should not throw", () => {
    const emptyFleet = [];
    const player = new Player("Test", 10, emptyFleet);

    player.placeFleet(100);

    expect(player.fleet.length).toBe(0);
});

test("placeFleet: ship exactly fit the gameBoard", () => {
    const testFleet = [10];
    const player = new Player("Test", 10, testFleet);

    player.placeFleet(100)

    expect(player.fleet.length).toBe(testFleet.length);
});

test("placeFleet: ship doesn't the gameBoard", () => {
    const testFleet = [11];
    const player = new Player("Test", 10, testFleet);

    expect(() => player.placeFleet(100)).toThrow("A ships cannot be placed as it is longer than the gameBoard itself");
});

test("placeFleet: not enough room for fleet", () => {
    const testFleet = [3, 3, 2, 2];
    const player = new Player("Test", 3, testFleet);

    expect(() => player.placeFleet(100)).toThrow("There is not enough space on the board for the fleet");
});

test("placeFleet: exactly enough room for fleet", () => {
    const testFleet = [3, 3, 3];
    const player = new Player("Test", 3, testFleet);

    player.placeFleet(100);

    expect(player.fleet.length).toBe(testFleet.length);
});

test("placeFleet: maxTries is 0", () => {
    const testFleet = [3, 3, 3];
    const player = new Player("Test", 3, testFleet);

    expect(() => player.placeFleet(0)).toThrow("maxTries need to be a positive integer");
});

test("placeFleet: maxTries is null", () => {
    const testFleet = [3, 3, 3];
    const player = new Player("Test", 3, testFleet);

    expect(() => player.placeFleet(null)).toThrow("maxTries need to be a positive integer");
});

//fill array with 2 length ships to fill the board and then try to place ship as long as the board (way to test cutoff limit)
test("placeFleet: absoluteMaxTries is reached", () => {
    for(let i = 0; i < 100; i++){
        let testFleet = Array(100).fill(2); 
        testFleet.push(50);
        let player = new Player("Test", 50, testFleet);

        expect(() => player.placeFleet(50)).toThrow("Have tried to place fleet too many times, but is unable to do so");
    }
});


//reset
test("reset clears the gameBoard", () => {
    const player = new Player("Test", 5, [5]);
    expect(player.gameBoard.placeShip([0,0], 5, true)).toBe(true);

    expect(player.gameBoard.receiveAttack(0,0)).toBe("hit");
    expect(player.gameBoard.receiveAttack(0,0)).toBe("invalid");

    player.reset()

    expect(player.gameBoard.receiveAttack(0,0)).toBe("miss");
});