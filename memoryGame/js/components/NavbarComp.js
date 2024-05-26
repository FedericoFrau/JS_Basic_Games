import '../components/MemoryGame.js'

const gamesList = [
    {
        name: "Memory Game",
        functionName: "memoryGame()"
    },
    {
        name: "Whack A Mole",
        functionName: "whackAMole()"
    }
]

const NavbarComp = () => {
    const header = document.querySelector("header")
    
    let gamesButtons = ""
    const adition = gamesList.forEach(game => { 
        gamesButtons +=`
        <button 
        class="gameBtn" 
        type="button"
        onclick="${game.functionName}"
        >${game.name}</button>
        `
    })

    const HTMLContent = `
    <div class="navbarContainer">
    ${gamesButtons}
    </div>
    `
    header.innerHTML = HTMLContent
}
    
export default NavbarComp