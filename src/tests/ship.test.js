import Ship from "../modules/ship.js"

//constructor
test("error thrown when initialized ship with 0 length", () => {
    expect(() => { const ship = new Ship(0) }).toThrow();
})

test("error thrown when initialized ship with negative length", () => {
    expect(() => { const ship = new Ship(-1) }).toThrow();
})

//hit
test("hitNumb increased by one when hit", () => {
    const ship = new Ship(3);

    expect(ship.hitNumb).toBe(0);
    ship.hit()
    expect(ship.hitNumb).toBe(1);
})


//isSunk;
test("base case: not sunk", () => {
    const ship = new Ship(3);

    expect(ship.isSunk()).toBe(false);
})

test("base case: is sunk", () => {
    const ship = new Ship(1);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
})

