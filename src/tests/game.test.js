import Game from "../modules/game.js";

//takeTurn
test("takeTurn: valid shots switches player", () => {
    const game = new Game(10, [1]);

    expect(game.takeTurn(game.player1, 0, 0)).toContain["hit", "miss"];
    expect(game.currentPlayer).toEqual(game.player2);
});

test("takeTurn: rejects wrong player on fresh game", () => {
    const game = new Game(10, [1]);

    expect(game.takeTurn(game.player2, 0, 1)).toBe("invalid");
});

test("takeTurn: player tries to take two turns in a row", () => {
    const game = new Game(10, [1]);

    expect(game.takeTurn(game.player1, 0, 0)).toContain["hit", "miss"];
    expect(game.takeTurn(game.player1, 0, 1)).toBe("invalid");
});

test("takeTurn: rejects the game when it is finished", () => {
    const game = new Game(1, [1]);

    expect(game.takeTurn(game.player1, 0, 0)).toBe("won");
    expect(game.takeTurn(game.player2, 0, 0)).toBe("invalid");
});

test("takeTurn: invalid shot does not switch turn", () => {
    const game = new Game(10, [1]);
    game.player1.placeFleet(10);

    expect(game.takeTurn(game.player1, 0, 0)).toContain["hit", "miss"];
    expect(game.takeTurn(game.player2, 0, 1)).toContain["hit", "miss"];

    expect(game.takeTurn(game.player1, -1, -1)).toBe("continue");
    expect(game.currentPlayer).toEqual(game.player1);
});

test("takeTurn: repeat shot does not cost the player their turn", () => {
    const game = new Game(10, [1]);
    game.player1.placeFleet(10);

    expect(game.takeTurn(game.player1, 0, 0)).toContain["hit", "miss"];
    expect(game.takeTurn(game.player2, 0, 1)).toContain["hit", "miss"];

    expect(game.takeTurn(game.player1, 0, 0)).toBe("continue");
    expect(game.currentPlayer).toEqual(game.player1);
});

test("takeTurn: attacks affect the opponents board and not the players own board", () => {
    const game = new Game(10, [1]);
    game.player1.placeFleet(10);

    expect(game.takeTurn(game.player1, 0, 0)).toContain["hit", "miss"];
    expect(game.takeTurn(game.player2, 8, 8)).toContain["hit", "miss"];

    //if each players own board was affected by their previous shot, they should return "continue"
    expect(game.takeTurn(game.player1, 8, 8)).toContain["hit", "miss"]; 
    expect(game.takeTurn(game.player2, 0, 0)).toContain["hit", "miss"];
});

test("takeTurn: winning shot return ´won´", () => {
    const game = new Game(1, [1]);

    expect(game.takeTurn(game.player1, 0, 0)).toBe("won");
});

//takeComputerTurn
test("takeComputerTurn: finished game return invalid", () => {
    const game = new Game(1, [1]);
    expect(game.takeTurn(game.player1, 0, 0)).toBe("won");
    expect(game.takeComputerTurn()).toBe("invalid");
});

test("takeComputerTurn: should reject method when computer is not currentPlayer", () => {
    const game = new Game(10, [5]);
    game.player1.placeFleet(10);
    expect(game.takeComputerTurn()).toBe("invalid");
});

test("takeComputerTurn: never shoots the same square twice", () => {
    const boardSize = 5;
    const game = new Game(boardSize, [2, 3]);
    game.player1.placeFleet(10);

    for(let k = 0; k < boardSize * boardSize; k++){
        const humanResult = game.takeTurn(game.player1, k % boardSize, Math.floor(k / boardSize));
        if(humanResult === "won") break;

        expect(game.takeComputerTurn()).not.toBe("invalid");
        if(game.isGameFinished) break;
    }
});

test("takeComputerTurn: exactly one square on opponents board is shot after method is called", () => {
    const boardLength = 10;
    const game = new Game(boardLength, [5]);
    game.player1.placeFleet(10);
    game.takeTurn(game.player1, 0, 0);

    expect(game.takeComputerTurn()).not.toBe("invalid");

    const player1BoardState = game.player1.gameBoard.getAllSquareStates();

    let hitCount = 0;
    for(let i = 0; i < boardLength; i++)
        for(let j = 0; j < boardLength; j++)
            if(player1BoardState[i][j] === "hit" || player1BoardState [i][j] === "miss")
                hitCount++;

    expect(hitCount).toBe(1);
});

describe("takeComputerTurn: feeding results back to the computer player", () => {
    let game;

    beforeEach(() => {
        game = new Game(10, [5]);

        const humanResult = game.takeTurn(game.player1, 0, 0);
        expect(humanResult).not.toBe("invalid");
        expect(game.currentPlayer).toBe(game.player2);
    });

    test("a hit queues the adjacent squares of the shot coordinate", () => {
        game.player1.gameBoard.placeShip([3, 4], 2, true);

        jest.spyOn(game.player2, "generateInformedMove").mockReturnValueOnce([3, 4]);
        const addAdjacentSpy = jest.spyOn(game.player2, "addAdjacentHitSquares");

        const result = game.takeComputerTurn();

        expect(result).toBe("hit");
        expect(addAdjacentSpy).toHaveBeenCalledTimes(1);
        expect(addAdjacentSpy).toHaveBeenCalledWith(3, 4);
    });

    test("a miss does not queue any adjacent squares", () => {
        game.player1.gameBoard.placeShip([8, 8], 2, true);

        jest.spyOn(game.player2, "generateInformedMove").mockReturnValueOnce([3, 4]);
        const addAdjacentSpy = jest.spyOn(game.player2, "addAdjacentHitSquares");

        const result = game.takeComputerTurn();

        expect(result).toBe("miss");
        expect(addAdjacentSpy).not.toHaveBeenCalled();
    });
});

//changePlayer (strictly not necessary as not used outside class)
test("changePlayer: player changes when calling method", () => {
    const game = new Game(10, []);

    expect(game.currentPlayer).toEqual(game.player1);

    game.changePlayer();

    expect(game.currentPlayer).toEqual(game.player2);

    game.changePlayer();

    expect(game.currentPlayer).toEqual(game.player1);
});

//checkWinner (strictly not necessary as not used outside class)
test("checkWinner: currentOpponent fleet has not sunk", () => {
    const game = new Game(2, [2,2]);
    expect(game.player2.gameBoard.receiveAttack(0,0)).toBe("hit");
    expect(game.player2.gameBoard.receiveAttack(1,0)).toBe("hit");
    expect(game.player2.gameBoard.receiveAttack(0,1)).toBe("hit");

    expect(game.checkWinner()).toBeFalsy();
});

test("checkWinner: currentOpponent fleet has sunk", () => {
    const game = new Game(2, [2,2]);
    expect(game.player2.gameBoard.receiveAttack(0,0)).toBe("hit");
    expect(game.player2.gameBoard.receiveAttack(1,0)).toBe("hit");
    expect(game.player2.gameBoard.receiveAttack(0,1)).toBe("hit");
    expect(game.player2.gameBoard.receiveAttack(1,1)).toBe("hit");

    expect(game.checkWinner()).toBeTruthy();
});

//resetGame
test("reset: game does reset when actions has been taken", () => {
    const game = new Game(1, [1]);

    expect(game.isGameFinished).toBeFalsy();

    expect(game.takeTurn(game.player1, 0,0)).toBe("won");

    expect(game.checkWinner()).toBeTruthy();
    expect(game.isGameFinished).toBeTruthy();

    game.resetGame();

    expect(game.checkWinner()).toBeFalsy();
    expect(game.isGameFinished).toBeFalsy();
});

test("reset: current player goes back to player 1 after a mid-game reset", () => {
    const game = new Game(10, [5]);

    expect(game.currentPlayer).toBe(game.player1);

    const result = game.takeTurn(game.player1, 0, 0);
    expect(result).not.toBe("invalid");
    expect(result).not.toBe("won");

    expect(game.currentPlayer).toBe(game.player2);

    game.resetGame();

    expect(game.isGameFinished).toBeFalsy();
    expect(game.currentPlayer).toBe(game.player1);
});

test("resetGame: resets both players", () => {
    const game = new Game(10, [5]);
    const spy1 = jest.spyOn(game.player1, "reset");
    const spy2 = jest.spyOn(game.player2, "reset");

    game.resetGame();

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
});