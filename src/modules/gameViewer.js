class GameViewer{
    constructor(){
    }

    renderBoard(container, boardState, boardLength, showShips){
        container.style.setProperty("--board-length", boardLength);

        for(let i = 0; i < boardLength; i++){
            for(let j = 0; j < boardLength; j++){
                const squareDiv = document.createElement("div");
                squareDiv.classList = "board-square";
                squareDiv.dataset.x = i;
                squareDiv.dataset.y = j;

                container.appendChild(squareDiv);

                let squareIndex = Number("" + i + j);
                let squareInfo = boardState[squareIndex];

                console.log(squareInfo)

                if(squareInfo === "hit")
                    squareDiv.classList = "hit";
                else if(squareIndex === "miss")
                    squareDiv.classList = "miss";
                else if(squareInfo === "ship")
                    squareDiv.classList = "ship";
            }
        }
    }
}

export default GameViewer;