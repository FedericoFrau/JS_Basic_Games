
const MemoryGame = () => {
    const main = document.querySelector("main");
    const HTMLContent = `
        <div class="infoText">
            <h3 class="infoTextLeft">Score: <span id="result">0</span></h3>
            <h3 class="infoTextRight"><span id="message"></span></h3>
        </div>
        <div class="grid"></div>`;
    main.innerHTML = HTMLContent;
    
    const cardArray = [
        {
            name: "foto1",
            img: "assets/img/006.webp"
        },
        {
            name: "foto2",
            img: "assets/img/008.webp"
        },
        {
            name: "foto3",
            img: "assets/img/009.webp"
        },
        {
            name: "foto4",
            img: "assets/img/010.webp"
        },
        {
            name: "foto5",
            img: "assets/img/041.webp"
        },
        {
            name: "foto6",
            img: "assets/img/222.webp"
        },
        {
            name: "foto7",
            img: "assets/img/002.webp"
        },
        {
            name: "foto8",
            img: "assets/img/003.webp"
        }
    ];
    
    
    const arrayDuplicated = []
    const cardArrayDuplicated = () => {
        cardArray.forEach((card) => {
            arrayDuplicated.push(card)
            arrayDuplicated.push(card)
        })
    };
    cardArrayDuplicated()
    
    arrayDuplicated.sort(() => 0.5 - Math.random())
    
    const grid = document.querySelector(".grid");
    const resultDisplay = document.querySelector("#result")
    const message = document.querySelector("#message")
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];
    
    const createBoard = () => {
        for (let i=0; i < arrayDuplicated.length; i++) {
            const card = document.createElement("img");
            card.setAttribute("src", "assets/img/bg.jpg");
            card.setAttribute("data-id", i);
            card.classList.add("backImg");
            card.addEventListener("click", flipCard);
            grid.appendChild(card);
        }
    };
    
    function messageUpdate (text, time) {
        const clearMsg = () => message.textContent = ""
        const delayedClear = () => setTimeout(clearMsg, time)
        if (time) {
            message.textContent = text
            delayedClear()
        } else {
            message.textContent = text
        }
    }
    
    const checkForMatch = () => {
        const cards = document.querySelectorAll("img")
        const optionOneId = cardsChosenId[0]
        const optionTwoId = cardsChosenId[1]
        if (cardsChosen[0] === cardsChosen[1]) {
            cardsWon.push(cardsChosen[0])
            resultDisplay.textContent = cardsWon.length
            cards[optionOneId].setAttribute("src", "assets/img/white.jpg")
            cards[optionTwoId].setAttribute("src", "assets/img/white.jpg")
            if (cardsWon.length === arrayDuplicated.length/2) {
                messageUpdate("Congratulations! You found them all!")
                return
            }
            messageUpdate("You found a match!",2000)
        } else {
            setTimeout(() => {
                cards[optionOneId].setAttribute("src", "assets/img/bg.jpg")
                cards[optionTwoId].setAttribute("src", "assets/img/bg.jpg")
            }, 800);
            messageUpdate("Sorry, try again",2000)
        }
        cardsChosen = []
        cardsChosenId = []
    }
    
    function flipCard() {
        let cardId = this.getAttribute("data-id");
        if (cardId != cardsChosenId[0] & !cardsWon.includes(arrayDuplicated[cardId].name)) {
            cardsChosen.push(arrayDuplicated[cardId].name);
            cardsChosenId.push(cardId);
            this.setAttribute("src", arrayDuplicated[cardId].img);
        }
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 100)
        };
    }
    
    createBoard();
}

window.memoryGame = MemoryGame;

export default MemoryGame



