# Battleship

A browser-based Battleship game where you play against the computer. Each class are tested using jest. 

## Features
- Human vs. computer on a 10x10 board
- Place your fleet manually: pick a ship size from the dropdown, tick or untick **Horizontal**, and click a square. A hover preview shows where the ship will go and whether the placement is valid
- Or place your whole fleet at random with one button
- The computer places its own fleet randomly
- The computer shoots at random squares, and after a hit it tries the neighbouring squares first
- Repeat shots and shots off the board are rejected without costing the player their turn
- Win message when a fleet is sunk, and a reset button to start a new game

### Design

- **The classes own the rules and the state.** `Ship`, `GameBoard`, `Player`, `ComputerPlayer` and `Game` contain no DOM code, so the whole game can be played and tested without a browser.
- **The viewer only draws.** `GameViewer` receives a snapshot of square states (`untouched`, `ship`, `hit`, `miss`) and renders it. It never sees the board object, so unshot ships on the opponent's board can't leak to the page.
- **`index.js`.** Allows the game to be played in the browser. It turns clicks into calls on `Game` and asks the viewer to redraw the result.

## Getting Started

### Install

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Then open `http://localhost:8080`.

### Run the tests

```bash
npm test
```

Tests are written with [Jest](https://jestjs.io/) and cover the ship, gameboard, player, computer player and game logic.

## How to play

1. Choose a ship size from the dropdown, set the orientation with the **Horizontal** checkbox, and click a square on your board to place it. Repeat until the whole fleet is placed, or click **Place fleet randomly**.
2. Click squares on the opponent's board to fire. Red squares are hits and light squares are misses.
3. The computer fires back after each of your shots.
4. The first player to sink the other's entire fleet wins. Use **Reset** to play again.

## Tech

- JavaScript (ES modules, classes with private fields)
- Webpack
- Jest
- HTML and CSS