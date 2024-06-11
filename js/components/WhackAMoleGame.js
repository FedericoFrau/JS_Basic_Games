const WhackAMoleGame = () => {
    const title = document.querySelector("title");
    const main = document.querySelector("main");
    title.innerHTML = "Whack A Mole Game"
    let divList = ""
    for(let i=1; i<10; i++) {divList += `<div class="square" id="${i}"></div>`};
    const HTMLContent = `
    <div class="whackAMoleContainer">
        <div class="infoText">
            <h1>Whack a mole!</h1>
            <h2>Your Score:</h2>
            <h2 id="score">0</h2>
            <h2>Second left:</h2>
            <h2 id="timeLeft">60</h2>
        </div>
        <div class="grid">${divList}</div>
    </div>`;
    main.innerHTML = HTMLContent;

    const squares = document.querySelectorAll(".square");
    const mole = document.querySelectorAll(".mole");
    const timeLeft = document.querySelector("#timeLeft");
    const score = document.querySelector("#score");
    let hitPosition;
    let result = 0;
    let currentTime = timeLeft.textContent

    function randomSquare() {
        squares.forEach(square => {
            square.classList.remove("mole")
        })
        let randomPosition = squares[Math.floor(Math.random() * 9)]
        randomPosition.classList.add("mole")
        hitPosition = randomPosition.id
    }
    
    squares.forEach(square => {
        square.addEventListener("mousedown", () => {
            if(square.id === hitPosition) {
                result++
                score.textContent = result
            }
        })
    })

    function moveMole() {
        let timerId = null
        timerId = setInterval(randomSquare, 1000)
    }
    moveMole()

    function countDown() {
        currentTime--
        timeLeft.textContent = currentTime
        if(currentTime === 0) {
            clearInterval(timerId)
            alert(`GAME OVER! Your final score is ${result}`)
            WhackAMoleGame()
        }
    }

    let timerId = setInterval(countDown, 1000)

}

window.whackAMoleGame = WhackAMoleGame;

export default WhackAMoleGame