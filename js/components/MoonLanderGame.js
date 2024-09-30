const MoonLanderGame = () => {
    const main = document.querySelector("main");
    const tittle = document.querySelector("tittle");
    
    const moonLand = document.createElement('div');
    const spaceShip = document.createElement('div');
    moonLand.classList.add('moonLand')
    spaceShip.classList.add('spaceShip');
    main.innerHTML = "";
    moonLand.appendChild(spaceShip)
    main.appendChild(moonLand);
    let movementAble = true;
    let spaceShipLaunched = false;
    let horizontalSpeed = 250;
    let horizontalDirection;
    let horizontalRuning = false;

    let verticalSpeed = 250;
    let verticalDirection;
    let verticalRuning = false;

    function adjustVerticalSpeed(directionKey) {
        switch(horizontalDirection) {
            case 'Left':
                if(directionKey==='ArrowLeft' && horizontalSpeed>1) {
                    horizontalSpeed--;
                } else if(directionKey==='ArrowRight' && horizontalSpeed<250) {
                    horizontalSpeed++;
                };
                break;
            case 'Right':
                if(directionKey==='ArrowLeft' && horizontalSpeed<250) {
                    horizontalSpeed++;
                } else if(directionKey==='ArrowRight' && horizontalSpeed>1) {
                    horizontalSpeed--;
                };
                break;
        }
    };

    function gravityAdjust() {
        if(verticalRuning) {
            setTimeout(()=>{
                adjustVerticalSpeed('ArrowDown');
                gravityAdjust;
            },500)
        }
    };

    function verticalMovement(directionKey) {
        verticalRuning = true;
        const spaceShipTopPosition = spaceShip.offsetTop;
        const spaceShipHeight = spaceShip.offsetHeight;
        const containerBottomMargin = moonLand.clientHeight;
        
        if(verticalSpeed>=250 && directionKey==='ArrowUp') {
            verticalDirection='Up';
        } else if (verticalSpeed>=250 && directionKey==='ArrowDown') {
            verticalDirection='Down';
        };

        adjustVerticalSpeed(directionKey)

        switch(verticalDirection) {
            case 'Up':
                if(spaceShipTopPosition > 0) {
                    spaceShip.style.left = `${spaceShip.offsetLeft-1}px`;
                    console.log("avance izquierda");
                } else {
                    console.log("fin carrera");
                    verticalDirection = undefined;
                    verticalSpeed = 250;
                    verticalRuning = false;
                    return;
                }
                // console.log(spaceShip.offsetLeft);
                break;
            case 'Down':
                if(spaceShipTopPosition+spaceShipHeight < containerBottomMargin) {
                    spaceShip.style.left = `${spaceShip.offsetLeft+1}px`;
                    console.log("avance derecha");
                } else {
                    console.log("fin carrera");
                    verticalDirection = undefined;
                    verticalSpeed = 250;
                    verticalRuning = false;
                    return;
                }
                // console.log(spaceShip.offsetLeft);
                break;
        }
        
        if(verticalSpeed>245 && (spaceShipTopPosition+spaceShipHeight === containerBottomMargin)) {
            console.log("successfully landing");
            verticalDirection = undefined;
            verticalRuning = false;
            return;
        } else if (verticalSpeed<245 && (spaceShipTopPosition+spaceShipHeight === containerBottomMargin)) {
            console.log("crashed!");
            verticalDirection = undefined;
            verticalRuning = false;
            return;
        }
        setTimeout(verticalMovement, verticalSpeed)
    };

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

    function adjustHorizontalSpeed(directionKey) {
        console.log('adjHspeed')
        switch(horizontalDirection) {
            case 'Left':
                if(directionKey==='ArrowLeft' && horizontalSpeed>1) {
                    horizontalSpeed--;
                } else if(directionKey==='ArrowRight' && horizontalSpeed<250) {
                    horizontalSpeed++;
                };
                break;
            case 'Right':
                if(directionKey==='ArrowLeft' && horizontalSpeed<250) {
                    horizontalSpeed++;
                } else if(directionKey==='ArrowRight' && horizontalSpeed>1) {
                    horizontalSpeed--;
                };
                break;
        }
    }

    function horizontalMovement(directionKey) {
        console.log('hMov run')
        console.log(horizontalDirection)
        // movementAble=true;
        horizontalRuning = true;
        let movement;
        const spaceShipLeftPosition = spaceShip.offsetLeft;
        const spaceShipWidth = spaceShip.offsetWidth ;
        const containerRightMargin = moonLand.clientWidth;
        // const screenRightMargin = window.innerWidth;
        
        if(horizontalSpeed>=250 && directionKey==='ArrowLeft') {
            horizontalDirection='Left';
        } else if (horizontalSpeed>=250 && directionKey==='ArrowRight') {
            horizontalDirection='Right';
        };

        adjustHorizontalSpeed(directionKey)

        switch(horizontalDirection) {
            case 'Left':
                if(spaceShipLeftPosition > 0) {
                    spaceShip.style.left = `${spaceShip.offsetLeft-1}px`;
                    console.log("avance izquierda");
                } else {
                    console.log("fin carrera");
                    horizontalDirection = undefined;
                    horizontalSpeed = 250;
                    horizontalRuning = false;
                    return;
                }
                // console.log(spaceShip.offsetLeft);
                break;
            case 'Right':
                if(spaceShipLeftPosition+spaceShipWidth < containerRightMargin) {
                    spaceShip.style.left = `${spaceShip.offsetLeft+1}px`;
                    console.log("avance derecha");
                } else {
                    console.log("fin carrera");
                    horizontalDirection = undefined;
                    horizontalSpeed = 250;
                    horizontalRuning = false;
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
            horizontalRuning = false;
            return;
        }
        movement = setTimeout(horizontalMovement, horizontalSpeed)
    }
    
    // console.log(spaceShipLeftPosition)
    // console.log(spaceShipWidth)
    // console.log(screenRightMargin)

    document.activeElement.blur();
    document.addEventListener('keydown', e => {
        e.preventDefault();
        const pressedKey = e.code;
        console.log(pressedKey)
        // console.log(e)
        switch(pressedKey) {
            case 'Enter':
                if(!spaceShipLaunched) {
                    horizontalSpeed=30;
                    horizontalDirection='Right';
                    horizontalMovement();

                    verticalSpeed=200;
                    verticalDirection='Down';
                    // verticalMovement();
                    // gravityAdjust();

                    spaceShipLaunched=true;
                }
                break;
            case 'ArrowLeft':
            case 'ArrowRight':
                !horizontalRuning&&spaceShipLaunched ?horizontalMovement(pressedKey) :adjustHorizontalSpeed(pressedKey);
                console.log(horizontalSpeed);
                break;
            case 'ArrowUp':
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
        }
        
    });
};

window.moonLanderGame = MoonLanderGame;

export default MoonLanderGame;