document.addEventListener('DOMContentLoaded', () => {
    const cardArray = [
        {
            name: "foto1",
            img: "images/006.webp"
        },
        {
            name: "foto2",
            img: "images/008.webp"
        },
        {
            name: "foto3",
            img: "images/009.webp"
        },
        {
            name: "foto4",
            img: "images/010.webp"
        },
        {
            name: "foto5",
            img: "images/041.webp"
        },
        {
            name: "foto6",
            img: "images/222.webp"
        },
        {
            name: "foto7",
            img: "images/002.webp"
        },
        {
            name: "foto8",
            img: "images/003.webp"
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
            card.setAttribute("src", "images/bg.jpg");
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
            cards[optionOneId].setAttribute("src", "images/white.jpg")
            cards[optionTwoId].setAttribute("src", "images/white.jpg")
            if (cardsWon.length === arrayDuplicated.length/2) {
                messageUpdate("Congratulations! You found them all!")
                return
            }
            messageUpdate("You found a match!",2000)
        } else {
            setTimeout(() => {
                cards[optionOneId].setAttribute("src", "images/bg.jpg")
                cards[optionTwoId].setAttribute("src", "images/bg.jpg")
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
})
