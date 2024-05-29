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
            <h2 id="time-left">60</h2>
        </div>
        <div class="grid">${divList}</div>
    </div>`;
    main.innerHTML = HTMLContent;

}

window.whackAMoleGame = WhackAMoleGame;

export default WhackAMoleGame