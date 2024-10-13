const MoonLanderGame = () => {
    const main = document.querySelector("main");
    const title = document.querySelector("title");
    
    const moonLand = document.createElement('div');
    const spaceShip = document.createElement('div');
    const altitudeMonitor = document.createElement('div');
    const horizontalSpeedMonitor = document.createElement('div');
    const verticalSpeedMonitor = document.createElement('div');
    const infoMonitors = document.createElement('div');
    infoMonitors.classList.add('infoMonitors');
    altitudeMonitor.classList.add('altitudeMonitor');
    horizontalSpeedMonitor.classList.add('horizontalSpeedMonitor');
    verticalSpeedMonitor.classList.add('verticalSpeedMonitor');
    moonLand.classList.add('moonLand');
    spaceShip.classList.add('spaceShip');
    main.innerHTML = '';
    infoMonitors.appendChild(altitudeMonitor);
    infoMonitors.appendChild(horizontalSpeedMonitor);
    infoMonitors.appendChild(verticalSpeedMonitor);
    moonLand.appendChild(infoMonitors);
    moonLand.appendChild(spaceShip);
    main.appendChild(moonLand);
    title.innerHTML = 'Moon Lander Game';
    let gravity;
    let spaceShipLaunched = false;
    let horizontalSpeed = 250;
    let horizontalDirection;
    let horizontalRuning = false;
    let verticalSpeed = 250;
    let verticalDirection;
    let verticalRuning = false;

    const horizontalSpeedMonitorUpdate = ()=> horizontalSpeedMonitor.innerHTML = `Horizontal Speed: <span class='telemetryValue'>${horizontalSpeed}</span>`;
    const verticalSpeedMonitorUpdate = ()=> verticalSpeedMonitor.innerHTML = `Vertical Speed: <span class='telemetryValue'>${verticalSpeed}</span>`;
    const altitudeMonitorUpdate = ()=> altitudeMonitor.innerHTML = `Altitude: <span class='telemetryValue'>${moonLand.clientHeight - spaceShip.offsetTop - spaceShip.offsetHeight}</span>`;

    const stopHorizontalMove = ()=> {
        horizontalDirection = undefined;
        horizontalSpeed = 250;
        horizontalRuning = false;
        horizontalSpeedMonitorUpdate();
        altitudeMonitorUpdate();
        console.log("horizontal move stopped")
    };

    const stopVerticalMove = ()=> {
        verticalDirection = undefined;
        verticalSpeed = 250;
        verticalRuning = false;
        verticalSpeedMonitorUpdate();
        altitudeMonitorUpdate();
        console.log("vertical move stopped")
    };

    function adjustVerticalSpeed(directionKey) {
        // console.log('adjVspeed->', directionKey)
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
        // console.log(verticalSpeed);
        // console.log('gravity adjusted')
        gravity = setTimeout(gravityAdjust,200)
    };
    //TODO implement 'requestAnimationFrame()'
    function verticalMovement(directionKey) {
        altitudeMonitorUpdate();
        verticalSpeedMonitorUpdate();
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
                } else {
                    stopVerticalMove();
                    console.log("upper end reached");
                    return;
                }
                break;
            case 'Down':
                if(spaceShipTopPosition+spaceShipHeight < containerBottomMargin) {
                    spaceShip.style.top = `${spaceShip.offsetTop+1}px`;
                } else if (verticalSpeed>245 && (spaceShipTopPosition+spaceShipHeight === containerBottomMargin)) {
                    stopVerticalMove();
                    stopHorizontalMove();
                    clearTimeout(gravity);
                    document.removeEventListener('keydown', keysListener);
                    console.log("successfully landing");
                    return;
                } else if (verticalSpeed<245 && (spaceShipTopPosition+spaceShipHeight === containerBottomMargin)) {
                    stopVerticalMove();
                    stopHorizontalMove();
                    clearTimeout(gravity);
                    document.removeEventListener('keydown', keysListener);
                    console.log("crashed!");
                    return;
                }
                break;
        }
        if(verticalSpeed>=250) {
            stopVerticalMove();
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
    //TODO implement 'requestAnimationFrame()'
    function horizontalMovement(directionKey) {
        console.log('hMov run')
        // console.log(horizontalDirection)
        horizontalSpeedMonitorUpdate();
        horizontalRuning = true;
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
                } else {
                    stopHorizontalMove();
                    console.log("left end reached");
                    return;
                }
                break;
            case 'Right':
                if(spaceShipLeftPosition+spaceShipWidth < containerRightMargin) {
                    spaceShip.style.left = `${spaceShip.offsetLeft+1}px`;
                } else {
                    stopHorizontalMove();
                    console.log("right end reached");
                    return;
                }
                break;
        }
        
        if(horizontalSpeed>=250) {
            stopHorizontalMove();
            console.log("stopped");
            return;
        }
        setTimeout(horizontalMovement, horizontalSpeed)
    }

    document.activeElement.blur();
    function keysListener(e) {
        e.preventDefault();
        const pressedKey = e.code;
        // console.log(pressedKey)
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
    }
    document.addEventListener('keydown', keysListener);
};

window.moonLanderGame = MoonLanderGame;

export default MoonLanderGame;