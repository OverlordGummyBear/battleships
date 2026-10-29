class GameViewer{
    constructor(){ }

    renderBoard(container, boardState, boardLength, showShips){
        container.style.setProperty("--board-length", boardLength);
        container.textContent = "";

        for(let i = 0; i < boardLength; i++){
            for(let j = 0; j < boardLength; j++){
                const squareDiv = document.createElement("div");
                squareDiv.classList = "";
                squareDiv.dataset.x = j;
                squareDiv.dataset.y = i;

                container.appendChild(squareDiv);

                let squareInfo = boardState[i][j];

                if(squareInfo === "hit")
                    squareDiv.classList = "hit";
                else if(squareInfo === "miss")
                    squareDiv.classList = "miss board-square";
                else if(squareInfo === "ship" && showShips)
                    squareDiv.classList = "ship board-square";
                else 
                    squareDiv.classList = "board-square"
            }
        }
    }
}

export default GameViewer;