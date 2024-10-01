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
    let gravity;
    let spaceShipLaunched = false;
    let horizontalSpeed = 250;
    let horizontalDirection;
    let horizontalRuning = false;

    let verticalSpeed = 250;
    let verticalDirection;
    let verticalRuning = false;

    const stopHorizontalMove = ()=> {
        horizontalDirection = undefined;
        horizontalSpeed = 250;
        horizontalRuning = false;
        console.log("horizontal move stopped")
    }

    const stopVerticalMove = ()=> {
        verticalDirection = undefined;
        verticalSpeed = 250;
        verticalRuning = false;
        console.log("vertical move stopped")
    }

    function adjustVerticalSpeed(directionKey) {
        console.log('adjVspeed->', directionKey)
        switch(verticalDirection) {
            case 'Up':
                if(directionKey==='ArrowUp' && verticalSpeed>1) {
                    verticalSpeed--;
                } else if(directionKey==='ArrowDown' && verticalSpeed<250) {
                    verticalSpeed++;
                };
                break;
            case 'Down':
                if(directionKey==='ArrowUp' && verticalSpeed<250) {
                    verticalSpeed++;
                } else if(directionKey==='ArrowDown' && verticalSpeed>1) {
                    verticalSpeed--;
                };
                break;
        }
    };

    function gravityAdjust() {
        !verticalRuning&&spaceShipLaunched ?verticalMovement('ArrowDown') :adjustVerticalSpeed('ArrowDown');
        console.log(verticalSpeed);
        // console.log('gravity adjusted')
        gravity = setTimeout(gravityAdjust,500)
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

        directionKey ?adjustVerticalSpeed(directionKey) :null;

        switch(verticalDirection) {
            case 'Up':
                if(spaceShipTopPosition > 0) {
                    spaceShip.style.top = `${spaceShip.offsetTop-1}px`;
                    console.log("subida");
                } else {
                    stopVerticalMove();
                    console.log("fin carrera superior");
                    return;
                }
                // console.log(spaceShip.offsetTop);
                break;
            case 'Down':
                if(spaceShipTopPosition+spaceShipHeight < containerBottomMargin) {
                    spaceShip.style.top = `${spaceShip.offsetTop+1}px`;
                    console.log("bajada");
                } else if (verticalSpeed>245 && (spaceShipTopPosition+spaceShipHeight === containerBottomMargin)) {
                    stopVerticalMove();
                    stopHorizontalMove();
                    clearTimeout(gravity);
                    console.log("successfully landing");
                    return;
                } else if (verticalSpeed<245 && (spaceShipTopPosition+spaceShipHeight === containerBottomMargin)) {
                    stopVerticalMove();
                    stopHorizontalMove();
                    clearTimeout(gravity);
                    console.log("crashed!");
                    return;
                }
                // else {
                //     console.log("fin carrera inferior");
                //     verticalDirection = undefined;
                //     verticalSpeed = 250;
                //     verticalRuning = false;
                //     return;
                // }
                // console.log(spaceShip.offsetTop);
                break;
        }
        if(verticalSpeed>=250) {
            stopVerticalMove();
            // console.log("detenido");
            return;
        }
        setTimeout(verticalMovement, verticalSpeed)
    };

    function adjustHorizontalSpeed(directionKey) {
        console.log('adjHspeed->', directionKey)
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

        directionKey ?adjustHorizontalSpeed(directionKey) :null;

        switch(horizontalDirection) {
            case 'Left':
                if(spaceShipLeftPosition > 0) {
                    spaceShip.style.left = `${spaceShip.offsetLeft-1}px`;
                    console.log("avance izquierda");
                } else {
                    stopHorizontalMove();
                    console.log("fin carrera");
                    return;
                }
                // console.log(spaceShip.offsetLeft);
                break;
            case 'Right':
                if(spaceShipLeftPosition+spaceShipWidth < containerRightMargin) {
                    spaceShip.style.left = `${spaceShip.offsetLeft+1}px`;
                    console.log("avance derecha");
                } else {
                    stopHorizontalMove();
                    console.log("fin carrera");
                    return;
                }
                // console.log(spaceShip.offsetLeft);
                break;
        }
        
        if(horizontalSpeed>=250) {
            stopHorizontalMove();
            console.log("detenido");
            return;
        }
        movement = setTimeout(horizontalMovement, horizontalSpeed)
    }

    document.activeElement.blur();
    document.addEventListener('keydown', e => {
        e.preventDefault();
        const pressedKey = e.code;
        console.log(pressedKey)
        // console.log(e)
        switch(pressedKey) {
            case 'Enter':
                if(!spaceShipLaunched) {
                    horizontalSpeed=249;
                    horizontalDirection='Right';
                    horizontalMovement();

                    verticalSpeed=60;
                    verticalDirection='Down';
                    verticalMovement();
                    gravityAdjust();

                    spaceShipLaunched=true;
                }
                break;
            case 'ArrowLeft':
            case 'ArrowRight':
                !horizontalRuning&&spaceShipLaunched ?horizontalMovement(pressedKey) :adjustHorizontalSpeed(pressedKey);
                console.log(horizontalSpeed);
                break;
            case 'ArrowUp':
            // case 'ArrowDown':
                !verticalRuning&&spaceShipLaunched ?verticalMovement(pressedKey) :adjustVerticalSpeed(pressedKey);
                console.log(verticalSpeed);
                break;
        }
        
    });
};

window.moonLanderGame = MoonLanderGame;

export default MoonLanderGame;