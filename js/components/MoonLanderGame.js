const MoonLanderGame = () => {
    const main = document.querySelector("main");
    const tittle = document.querySelector("tittle");

    const spaceShip = document.createElement('div');
    spaceShip.classList.add('spaceShip');
    main.innerHTML = "";
    main.appendChild(spaceShip);
    let movementAble = true;
    let horizontalSpeed = 250;
    let horizontalDirection;
    let runing = false;

    // function horizontalMovement() {
    //         movementAble=true;
    //         const movement = setInterval(()=>{
    //             const spaceShipLeftPosition = spaceShip.offsetLeft;
    //             const spaceShipWidth = spaceShip.offsetWidth ;
    //             const screenRightMargin = window.innerWidth;
    //             if(spaceShipLeftPosition+spaceShipWidth < screenRightMargin && movementAble) {
    //                 spaceShip.style.left = `${spaceShip.offsetLeft+1}px`
    //                 console.log("avance")
    //             } else {
    //                 clearInterval(movement)
    //                 console.log("parado")
    //             };
                
    //         }, horizontalSpeed)
    //     // clearInterval(movement);
        
    //     console.log("funciona")
    // }

    function adjustHorizontalSpeed(direction) {
        switch(horizontalDirection) {
            case 'Left':
                if(direction==='ArrowLeft' && horizontalSpeed>1) {
                    horizontalSpeed--;
                } else if(direction==='ArrowRight' && horizontalSpeed<250) {
                    horizontalSpeed++;
                };
                break;
            case 'Right':
                if(direction==='ArrowLeft' && horizontalSpeed<250) {
                    horizontalSpeed++;
                } else if(direction==='ArrowRight' && horizontalSpeed>1) {
                    horizontalSpeed--;
                };
                break;
        }
    }

    function horizontalMovement(direction) {
        runing = true;
        // console.log(direction);
        // movementAble=true;
        let movement;
        const spaceShipLeftPosition = spaceShip.offsetLeft;
        const spaceShipWidth = spaceShip.offsetWidth ;
        const screenRightMargin = window.innerWidth;
        // const containerRightMargin = spaceShip.parentElement.innerWidth+spaceShip.parentElement.offsetLeft;
        
        if(horizontalSpeed>=250 && direction==='ArrowLeft') {
            horizontalDirection='Left';
        } else if (horizontalSpeed>=250 && direction==='ArrowRight') {
            horizontalDirection='Right';
        };

        adjustHorizontalSpeed(direction)

        switch(horizontalDirection) {
            case 'Left':
                if(spaceShipLeftPosition > 0) {
                    spaceShip.style.left = `${spaceShip.offsetLeft-1}px`;
                    console.log("avance izquierda");
                } else {
                    console.log("fin carrera");
                    horizontalDirection = undefined;
                    horizontalSpeed = 250;
                    runing = false;
                    return;
                }
                // console.log(spaceShip.offsetLeft);
                break;
            case 'Right':
                if(spaceShipLeftPosition+spaceShipWidth < screenRightMargin) {
                    spaceShip.style.left = `${spaceShip.offsetLeft+1}px`;
                    console.log("avance derecha");
                } else {
                    console.log("fin carrera");
                    horizontalDirection = undefined;
                    horizontalSpeed = 250;
                    runing = false;
                    return;
                }
                // console.log(spaceShip.offsetLeft);
                break;
        }

        // if(spaceShipLeftPosition+spaceShipWidth < screenRightMargin && movementAble) {
        //     spaceShip.style.left = `${spaceShip.offsetLeft+1}px`;
        //     console.log("avance");
        // } else {
        //     // clearTimeout(movement);
        //     console.log("parado");
        //     return;
        // };
        
        if(horizontalSpeed>=250) {
            console.log("detenido");
            horizontalDirection = undefined;
            runing = false;
            return;
        }
        movement = setTimeout(horizontalMovement, horizontalSpeed)
    }
    
    // console.log(spaceShipLeftPosition)
    // console.log(spaceShipWidth)
    // console.log(screenRightMargin)

    document.addEventListener('keydown', e => {
        const pressedKey = e.code;
        console.log(pressedKey)
        // console.log(e)
        switch(pressedKey) {
            case 'Enter':
                horizontalSpeed=30;
                horizontalDirection='Right';
                horizontalMovement();
                break;
            // case 'Space':
            //     if(movementAble){
            //         movementAble=false;
            //         console.log("false");
            //         break;
            //     } else if(!movementAble) {
            //         movementAble=true;
            //         console.log("true");
            //         break;
            //     }
            //     break;
            case 'ArrowLeft':
            case 'ArrowRight':
                !runing ?horizontalMovement(pressedKey) :adjustHorizontalSpeed(pressedKey);
                console.log(horizontalSpeed);
                break;
        }
        
    });
};

window.moonLanderGame = MoonLanderGame;

export default MoonLanderGame;