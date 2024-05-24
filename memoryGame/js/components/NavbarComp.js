// import '../../styles/navbarComp.css';
import '../components/MemoryGame.js'

const header = document.querySelector("header")

const NavbarComp = () => {
  return (header.innerHTML = `
    <div class="navbarContainer">

        <button 
        class="gameBtn" 
        type="button"
        onclick="memoryGame()"
        >Memory Game</button>

        <button 
        class="gameBtn" 
        type="button"
        onclick=""
        >Juego 2</button>

        <button 
        class="gameBtn" 
        type="button"
        onclick=""
        >Juego 3</button>

        <button 
        class="gameBtn" 
        type="button"
        onclick=""
        >Juego 4</button>
        
    </div>
  `)
}

export default NavbarComp