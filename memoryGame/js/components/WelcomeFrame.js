const WelcomeFrame = () => {
    const main = document.querySelector("main");
    const HTMLContent = `
        <div class="welcomeContainer">
            <h2 class="welcomeText">Welcome!</h2>
            <h2 class="welcomeText">Please select a game to start having fun...</h2>
        </div>`
        main.innerHTML = HTMLContent
}

export default WelcomeFrame;