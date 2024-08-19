// import Swal from 'sweetalert2';

const ConnectFourGame = () => {
    const main = document.querySelector("main");
    const title = document.querySelector("title");
    let divList = "";
    const unitsPerLine = 7;

    function boardFiller() {
        let currentLine = 1;
        for (let i = 1; i < 50; i++) {
            let lineFirstIndex = ((currentLine-1)*unitsPerLine)+1;
                if ((i >= 43) & (i < 50)) divList += `<div class="cell taken" hidden></div>`;
                else {
                    if(i==lineFirstIndex+unitsPerLine) currentLine ++;
                    divList += `<div class="cell" line="${currentLine}" player=""><div class="circle"></div></div>`;
                }
        }
    }
    boardFiller();

    const htmlContent = `
        <div class="connectContainer">
            <div class="infoText">
                <h3>The current player is: <span>Player <span id="currentPlayer">1</span></span></h3>
                <h3 id="result"></h3>
            </div>
            <div class="grid">${divList}</div>
        </div>
    `;

    main.innerHTML = htmlContent;
    title.innerHTML = "Connect Four Game";
    
    const grid = document.querySelector(".grid");
    const squares = document.querySelectorAll(".cell");
    const result = document.querySelector("#result");
    const displayCurrentPlayer = document.querySelector("#currentPlayer");
    let currentPlayer = 1;

    function playerColor () {
        const playersColors = ["red", "yellow"];
        const playerNumber = parseInt(displayCurrentPlayer.textContent);
        displayCurrentPlayer.parentElement.className = "";
        displayCurrentPlayer.parentElement.classList.add(`${playersColors[playerNumber-1]}`);
        result.className = "";
        result.classList.add(`${playersColors[playerNumber-1]}`);
    }
    playerColor();

    function winnerTest(element, index) {
        const refIndexes = [1, 6, 7, 8];
        let currentPlayerTest = element.getAttribute("player");
        let currentLineTest = element.getAttribute("line");

        for(let i=0; i<refIndexes.length; i++) {
            let accumulator = 0;
            let indexAccumulator = 0;
            let lineAccumulator = 1;

            switch (refIndexes[i]) {
                case 1:
                    while(index-refIndexes[i]-indexAccumulator>=0 && 
                        currentPlayerTest === squares[index-refIndexes[i]-indexAccumulator].getAttribute("player") && 
                        currentLineTest === squares[index-refIndexes[i]-indexAccumulator].getAttribute("line")) {
                        indexAccumulator ++;
                        accumulator ++;
                        console.log(`accumulator-1=${accumulator}`);
                    }
                    indexAccumulator = 0;
                    while(index+refIndexes[i]+indexAccumulator<42 && 
                        currentPlayerTest === squares[index+refIndexes[i]+indexAccumulator].getAttribute("player") && 
                        currentLineTest === squares[index+refIndexes[i]+indexAccumulator].getAttribute("line")) {
                        indexAccumulator ++;
                        accumulator ++;
                        console.log(`accumulator+1=${accumulator}`);
                    }
                    console.log("OK 1");
                    break;
                case 6:
                case 7:
                case 8:
                    while(index-refIndexes[i]-indexAccumulator>=0 && 
                        currentPlayerTest === squares[index-refIndexes[i]-indexAccumulator].getAttribute("player") && 
                        +currentLineTest-lineAccumulator === +squares[index-refIndexes[i]-indexAccumulator].getAttribute("line")) {
                        indexAccumulator += refIndexes[i];
                        lineAccumulator ++;
                        accumulator ++;
                        console.log(`accumulator-${refIndexes[i]}=${accumulator}`);
                    }
                    indexAccumulator = 0;
                    lineAccumulator = 1;
                    while(index+refIndexes[i]+indexAccumulator<42 && 
                        currentPlayerTest === squares[index+refIndexes[i]+indexAccumulator].getAttribute("player") && 
                        +currentLineTest+lineAccumulator === +squares[index+refIndexes[i]+indexAccumulator].getAttribute("line")) {
                        indexAccumulator += refIndexes[i];
                        lineAccumulator ++;
                        accumulator ++;
                        console.log(`accumulator+${refIndexes[i]}=${accumulator}`);
                    }
                    console.log(`OK ${refIndexes[i]}`);
                    break;
            };
            if(accumulator>=3) {
                result.innerHTML = `Player ${currentPlayerTest.charAt(0).toUpperCase() + currentPlayerTest.slice(1)} Wins`;
                console.log(element)
                return true;
            }
        }
        return false;
    }

    for(let i=0; i<squares.length-7; i++) {
        squares[i].onclick = function(e){
            if(squares[i+7].classList.contains("taken") && !squares[i].classList.contains("taken")) {
                squares[i].classList.add("taken");
                if(currentPlayer === 1) {
                    squares[i].classList.add("playerOne");
                    squares[i].setAttribute("player", "one");
                    currentPlayer = 2;
                } else if(currentPlayer === 2) {
                    squares[i].classList.add("playerTwo");
                    squares[i].setAttribute("player", "two");
                    currentPlayer = 1;
                }
                if(winnerTest(e.target.parentElement, i)) return grid.classList.add("freezed");
                displayCurrentPlayer.innerHTML = currentPlayer;
                playerColor();
                
            } else {
                Swal.fire({
                    title: "Cant go here",
                    showConfirmButton: false,
                    icon: false,
                    timer: 1000,
                    toast: true,
                    position: "bottom-end",
                    color: "black",
                    background: "rgba(255,89,89, 0.85)"
                })
            }
        }
    }
};
window.connectFourGame = ConnectFourGame;

export default ConnectFourGame;
