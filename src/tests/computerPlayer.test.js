import ComputerPlayer from "../modules/computerPlayer.js";

//generateRandomValidMove
test("generateRandomValidMove: exhaustive test", () => {
    let boardMaxLength = 20;

    for(let i = 1; i < boardMaxLength; i++){
        let player = new ComputerPlayer("Test", i, []);
        let startValidMoves = player.validMoves.length;
        let usedMoves = new Set();

        for(let j = 0; j < startValidMoves; j++){
            let move = player.generateRandomValidMove();
            usedMoves.add(`${move[0]},${move[1]}`);

            expect(move[0]).toBeGreaterThanOrEqual(0);
            expect(move[0]).toBeLessThan(i);
            expect(move[1]).toBeGreaterThanOrEqual(0);
            expect(move[1]).toBeLessThan(i);
        }

        expect(usedMoves.size).toBe(i*i);
    }
});

//generateInformedMove()
test("generateInformedMove: no moves in informedMoves array", () => {
    const boardLength = 10;
    const player = new ComputerPlayer("Test", boardLength, []);

    for(let i = 0; i < boardLength * boardLength; i++){
        let move = player.generateInformedMove();
        expect(move[0]).toBeGreaterThanOrEqual(0);
        expect(move[0]).toBeLessThan(boardLength);
    }
});

test("generateInformedMove: there are moves in the informedMove array", () => {
    const player = new ComputerPlayer("Test", 10, []);

    player.addAdjacentHitSquares(2,3);

    const moves = [];
    for(let i = 0; i < 4; i++)
    moves.push(player.generateInformedMove());

    expect(moves).toEqual(expect.arrayContaining([[2,2],[2,4],[1,3],[3,3]]));
    expect(moves).toHaveLength(4);

    let fifthMove = player.generateInformedMove();
    expect([[2,2],[2,4],[1,3],[3,3]]).not.toContainEqual(fifthMove);
});


//addAdjacentHitSquares
test("addAdjacentHitSquares: adjacent squares are all valid coordinates", () => {
    const player = new ComputerPlayer("Test", 10, []);
    player.addAdjacentHitSquares(5,5);

    expect(player.informedMoves).toEqual(expect.arrayContaining([[4,5],[6,5],[5,4],[5,6]]));
    expect(player.validMoves).not.toEqual(expect.arrayContaining([[4,5],[6,5],[5,4],[5,6]]));
});

test("addAdjacentHitSquares: square cannot be queued twice", () => {
    const player = new ComputerPlayer("Test", 10, []);
    player.addAdjacentHitSquares(5,5);
    player.addAdjacentHitSquares(5,7);

    expect(player.informedMoves).toHaveLength(7); //if it queued [5,6] twice the length should have been 8
});

test("addAdjacentHitSquares: only 2 adjacent squares have negative coordinates", () => {
    const player = new ComputerPlayer("Test", 10, []);
    player.addAdjacentHitSquares(0,0);

    expect(player.informedMoves).toEqual(expect.arrayContaining([[0,1], [1,0]]));
    expect(player.validMoves).not.toEqual(expect.arrayContaining([[0,1], [1,0]]));
});

test("addAdjacentHitSquares: coordinate is negative, but an adjacent square coordinate is valid", () => {
    const player = new ComputerPlayer("Test", 10, []);
    player.addAdjacentHitSquares(-1, 0);

    expect(player.informedMoves).toHaveLength(0);
    expect(player.validMoves).toHaveLength(100);
});

test("addAdjacentHitSquares: coordinate is higher than boardLength, but an adjacent square coordinate is valid", () => {
    const player = new ComputerPlayer("Test", 10, []);
    player.addAdjacentHitSquares(10, 9);

    expect(player.informedMoves).toHaveLength(0);
    expect(player.validMoves).toHaveLength(100);
});

test("addAdjacentHitSquares: only 2 adjacent squares have value higher than boardLength", () => {
    const player = new ComputerPlayer("Test", 10, []);
    player.addAdjacentHitSquares(9,9);

    expect(player.informedMoves).toEqual(expect.arrayContaining([[8,9], [9,8]]));
    expect(player.validMoves).not.toEqual(expect.arrayContaining([[8,9], [9,8]]));
});

test("addAdjacentHitSquares: coordinate and all adjacent squares have negative values", () => {
    const player = new ComputerPlayer("Test", 10, []);
    player.addAdjacentHitSquares(-2, -3);

    expect(player.informedMoves).toHaveLength(0);
    expect(player.validMoves).toHaveLength(100);
});

test("addAdjacentHitSquares: coordinate and all adjacent squares value higher than boardLength ", () => {
    const player = new ComputerPlayer("Test", 10, []);
    player.addAdjacentHitSquares(12, 15);

    expect(player.informedMoves).toHaveLength(0);
    expect(player.validMoves).toHaveLength(100);
});

//reset
test("reset clears the gameBoard and place fleet automatically", () => {
    let fleet = [2,2,2,3,3,3,4,4,6];
    const player = new ComputerPlayer("Test", 10, fleet);

    expect(player.fleet.length).toBe(fleet.length);
    expect(["hit", "miss"]).toContain(player.gameBoard.receiveAttack(0, 0));
    expect(player.gameBoard.receiveAttack(0,0)).toBe("invalid");

    player.reset()

    expect(["hit", "miss"]).toContain(player.gameBoard.receiveAttack(0, 0));
    expect(player.fleet.length).toBe(fleet.length);
});