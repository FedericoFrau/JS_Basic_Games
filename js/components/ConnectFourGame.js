// import Swal from 'sweetalert2';

const ConnectFourGame = () => {
    const main = document.querySelector("main");
    const title = document.querySelector("title");
    let divList = "";

    for (let i = 1; i < 50; i++) {
        if ((i >= 43) & (i < 50)) divList += `<div class="cell taken" hidden></div>`;
        else divList += `<div class="cell"><div class="circle"></div></div>`;
    }

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
    
    const squares = document.querySelectorAll(".cell");
    const result = document.querySelector("#result");
    const displayCurrentPlayer = document.querySelector("#currentPlayer");
    let currentPlayer = 1;

    function playerColor () {
        const playersColors = ["red", "yellow"]
        const playerNumber = parseInt(displayCurrentPlayer.textContent)
        displayCurrentPlayer.parentElement.classList.add(`${playersColors[playerNumber-1]}`);
        displayCurrentPlayer.parentElement.classList.remove(`${playersColors[playerNumber]}`);
    }
    playerColor();

    for(let i=0; i<squares.length-7; i++) {
        const abc = () => {
            squares[i].onclick = function(){
                if(squares[i+7].classList.contains("taken") && !squares[i].classList.contains("taken")) {
                    if(currentPlayer === 1) {
                        squares[i].classList.add("taken")
                        squares[i].classList.add("playerOne")
                        currentPlayer = 2
                        displayCurrentPlayer.innerHTML = currentPlayer
                    } else if(currentPlayer === 2) {
                        squares[i].classList.add("taken")
                        squares[i].classList.add("playerTwo")
                        currentPlayer = 1
                        displayCurrentPlayer.innerHTML = currentPlayer
                    }
                } else {
                    Swal.fire({
                        title: "Cant go here",
                        showConfirmButton: false,
                        icon: false,
                        timer: 1000,
                        // backdrop: false,
                        toast: true,
                        position: "bottom-end",
                        color: "black",
                        background: "rgba(255,89,89, 0.85)"
                    })
                }
                playerColor()
                // if(displayCurrentPlayer.textContent === "1") console.log(displayCurrentPlayer.textContent)
            }
        }
        abc()
    }    

};
window.connectFourGame = ConnectFourGame;

export default ConnectFourGame;
