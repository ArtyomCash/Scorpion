/*
    Init
 */

function init() {
    gameZone.innerHTML += `<div class="player" style="left: ${player.x}px; top: ${player.y}px;"></div>`;
    player.el = document.querySelector('.player');
}

/*
    Intervals
 */

function intervals() {
    ints.run = setInterval(() => {
        if (player.run) {
            switch (player.side) {
                case 1: // Top
                    if (player.y > + 10 && player.x < gameZone.getBoundingClientRect().right - player.w - 25) {
                        player.y -= player.tiltAngleY;
                        player.el.style.top = `${player.y}px`;
                        player.x += player.tiltAngleX;
                        player.el.style.left = `${player.x}px`;
                    }
                    break;
                case 3: // Bottom
                    if (player.y < gameZone.getBoundingClientRect().bottom - player.h - 25 && player.x > - 10) {
                        player.y += player.tiltAngleY;
                        player.el.style.top = `${player.y}px`;
                        player.x -= player.tiltAngleX;
                        player.el.style.left = `${player.x}px`;
                    }
                    break;
                case 2: // Right
                    if (player.x < gameZone.getBoundingClientRect().right - player.w -25 && player.y > - 10) {
                        player.x += player.tiltAngleX;
                        player.el.style.left = `${player.x}px`;
                        player.y += player.tiltAngleY;
                        player.el.style.top = `${player.y}px`;
                    }
                    break;
                case 4: // Left=
                    if (player.x > + 10 && player.y < gameZone.getBoundingClientRect().bottom - player.h - 25) {
                        player.x -= player.tiltAngleX;
                        player.el.style.left = `${player.x}px`;
                        player.y -= player.tiltAngleY;
                        player.el.style.top = `${player.y}px`;
                    }
                    break;
            }
        }
    }, fps);
    ints.bullet = setInterval(() => {
        let bullets = document.querySelectorAll('.bullet');
        bullets.forEach((bullet) => {
            // let direction = bullet.getAttribute('direction');

            // switch (direction) {
                /*case 'top':
                    if (bullet.getBoundingClientRect().top < 0) {
                        bullet.parentNode.removeChild(bullet);
                    } else {
                        bullet.style.top = bullet.getBoundingClientRect().top - bulletSpeed + 'px';
                    }
                    break;*/
                // case 'right':
                    if (bullet.getBoundingClientRect().right > gameZone.getBoundingClientRect().width) {
                        bullet.parentNode.removeChild(bullet);
                    } else {
                        bullet.style.left = bullet.getBoundingClientRect().left + bulletSpeed + 'px';
                        bullet.style.top = bullet.getBoundingClientRect().top + 6 - bulletSpeed + 'px';
                    }
                    // break;
                /*case 'bottom':
                    if (bullet.getBoundingClientRect().bottom > gameZone.getBoundingClientRect().height) {
                        bullet.parentNode.removeChild(bullet);
                    } else {
                        bullet.style.top = bullet.getBoundingClientRect().top + bulletSpeed + 'px';
                    }
                    break;
                case 'left':
                    if (bullet.getBoundingClientRect().left < 0) {
                        bullet.parentNode.removeChild(bullet);
                    } else {
                        bullet.style.left = bullet.getBoundingClientRect().left - bulletSpeed + 'px';
                    }
                    break;*/
            // }

        })
    }, fps);
}

/*
    Controllers
 */

function addBullet() {

    switch (player.side) {
        case 1:
            gameZone.innerHTML += `<div class="bullet" direction="top" style="left: ${player.x + player.w}px; top: ${player.y + 30}px;"></div>`;
            break;
        /*case 1:
            gameZone.innerHTML += `<div class="bullet" direction="top" style="left: ${(player.x + (player.w / 2)) - 7}px; top: ${player.y - 16}px;"></div>`;
            break;*/
        case 2:
            gameZone.innerHTML += `<div class="bullet" direction="right" style="left: ${player.x + player.w}px; top: ${player.y + 30}px;"></div>`;
            break;
        case 3:
            gameZone.innerHTML += `<div class="bullet" direction="bottom" style="left: ${player.x + player.w}px; top: ${player.y + 30}px;"></div>`;
            break;
        /*case 3:
            gameZone.innerHTML += `<div class="bullet" direction="bottom" style="left: ${player.x + player.w / 2 - 5}px; top: ${player.y + player.h}px;"></div>`;
            break;
        case 4:
            gameZone.innerHTML += `<div class="bullet" direction="left" style="left: ${player.x}px; top: ${player.y + player.h / 2 - 10}px;"></div>`;
            break;*/
        case 4:
            gameZone.innerHTML += `<div class="bullet" direction="left" style="left: ${player.x + player.w}px; top: ${player.y + 30}px;"></div>`;
            break;
    }

    player.el = document.querySelector('.player');
}

function controllers() {
    document.addEventListener('keydown', (e) => {
        switch (e.keyCode) {
            case 38: // Top
                player.el.style.backgroundImage = `url(${player.sprites.top})`;
                player.el.style.transform = `rotate(1deg)`;
                player.el.style.height = `78px`;
                player.el.style.width = `97px`;
                player.el.style.backgroundSize = `cover`;
                player.run = true;
                player.side = 1;
                break;
            case 40: // Bottom
                player.el.style.backgroundImage = `url(${player.sprites.bottom})`;
                player.el.style.transform = `rotate(1deg)`;
                player.el.style.height = `78px`;
                player.el.style.width = `97px`;
                player.el.style.backgroundSize = `cover`;
                player.run = true;
                player.side = 3;
                break;
            case 39: // Right
                player.el.style.backgroundImage = `url(${player.sprites.right})`;
                player.el.style.transform = `rotate(1deg)`;
                player.el.style.height = `78px`;
                player.el.style.width = `97px`;
                player.el.style.backgroundSize = `cover`;
                player.run = true;
                player.side = 2;
                break;
            case 37: //Left
                player.el.style.backgroundImage = `url(${player.sprites.left})`;
                player.el.style.transform = `rotate(1deg)`;
                player.el.style.height = `78px`;
                player.el.style.width = `97px`;
                player.el.style.backgroundSize = `cover`;
                player.run = true;
                player.side = 4;
                break;
            case 32: // shooting
                addBullet();
                break;
                // -------------------------------
            case 87: // Top
                player.el.style.backgroundImage = `url(${player.sprites.top})`;
                player.run = true;
                player.side = 1;
                break;
            case 83: // Bottom
                player.el.style.backgroundImage = `url(${player.sprites.bottom})`;
                player.run = true;
                player.side = 3;
                break;
            case 68: // Right
                player.el.style.backgroundImage = `url(${player.sprites.right})`;
                player.run = true;
                player.side = 2;
                break;
            case 65: //Left
                player.el.style.backgroundImage = `url(${player.sprites.left})`;
                player.run = true;
                player.side = 4;
                break;
        }
    });

    document.addEventListener('keyup', (e) => {
        if ([38, 40, 39, 37, 87, 83, 68, 65].includes(e.keyCode))
            player.run = false;
    })


}

/*
    Start Game
 */

function game() {
    init();
    controllers();
    intervals();
}

let gameZone = document.querySelector('.game-zone'),
    fps = 1000 / 60,
    player = {
        sprites: {
            // top: 'src/sprites/player-top.png',
            top: 'src/sprites/scorpion-right_2shadow.png',
            // right: 'src/sprites/player-right.png',
            // right: 'src/sprites/ant_left_bottom.jpg',
            right: 'src/sprites/scorpion-right_2shadow.png',
            // bottom: 'src/sprites/player-bottom.png',
            bottom: 'src/sprites/scorpion-right_2shadow.png',
            left: 'src/sprites/scorpion-right_2shadow.png',
        },
        el: false,
        x: 500,
        y: 400,
        // step: 2,
        run: false,
        side: 1, //1 (top), 2 (right), 3 (bottom), 4 (left),
        w: 97,
        h: 77,
        tiltAngleY: 12 * 0.1,
        tiltAngleX: 12 * 0.3,
    },
    bulletSpeed = 10,
    ints = {
        run: false,
        bullet: false,
    };

game();
