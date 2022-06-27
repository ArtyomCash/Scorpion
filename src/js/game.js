/*
    Init
 */
function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}
/*

*/
function gameOver() {

    player.life = 3;
    let liveLevel = document.querySelector('.level-life');
    liveLevel.style.width = '90px';

    let start = document.getElementById ('game');
    start.style.display = 'block';

    document.getElementById("oneLive").remove();

    clearInterval(ints.run);
    clearInterval(ints.bullet);
    clearInterval(ints.generateEnemy);
    clearInterval(ints.enemyBullet);
    clearInterval(ints.checkEnemyBulletForPlayer);
    clearInterval(ints.enemyShots);
    clearInterval(ints.scorpionClaw);
    clearInterval(ints.enemy);

    let scorpionClaw = document.querySelectorAll('.scorpion-claw');

    scorpionClaw.forEach((scorpionClaws) => {
        scorpionClaws.parentNode.removeChild(scorpionClaws);
    });

    let enemies = document.querySelectorAll('.enemy');

    enemies.forEach((enemy) => {
        enemy.parentNode.removeChild(enemy);
    });

    let enemyBullets = document.querySelectorAll('.enemy-bullet');

    enemyBullets.forEach((bullet) => {
        bullet.parentNode.removeChild(bullet);
    });

    let bullets = document.querySelectorAll('.bullet');

    bullets.forEach((bullet) => {
        bullet.parentNode.removeChild(bullet);
    });

    player.el.parentNode.removeChild(player.el);
    // game();
}

function startGame() {
    let start = document.getElementById ('game');
    start.style.display = 'none';

    points = 0;
    document.querySelector('.points').innerText = points;
    attacks = 0;

    document.querySelector('.attack').innerText = attacks;

    game();
}

function next() {

    player.life -= 1;

    if (player.life === 0) {
        gameOver();
    } else {
        clearInterval(ints.enemy);
        clearInterval(ints.run);
        clearInterval(ints.bullet);
        clearInterval(ints.generateEnemy);
        clearInterval(ints.enemyBullet);
        clearInterval(ints.checkEnemyBulletForPlayer);
        clearInterval(ints.enemyShots);
        clearInterval(ints.scorpionClaw);

        let scorpionClaw = document.querySelectorAll('.scorpion-claw');

        scorpionClaw.forEach((scorpionClaws) => {
            scorpionClaws.parentNode.removeChild(scorpionClaws);
        });

        let enemies = document.querySelectorAll('.enemy');

        enemies.forEach((enemy) => {
            enemy.parentNode.removeChild(enemy);
        });

        let enemyBullets = document.querySelectorAll('.enemy-bullet');

        enemyBullets.forEach((bullet) => {
            bullet.parentNode.removeChild(bullet);
        });

        let bullets = document.querySelectorAll('.bullet');

        bullets.forEach((bullet) => {
            bullet.parentNode.removeChild(bullet);
        });

        player.el.parentNode.removeChild(player.el);

        game();
    }
}

function init() {
    gameZone.innerHTML += `<div class="player" style="left: ${player.x}px; top: ${player.y}px;"></div>`;
    player.el = document.querySelector('.player');

    // уровень жизни персонажа
    let info = document.querySelector('.info');
    let levelLife = document.querySelector('.level-life');
    switch (player.life) {
        case 3:
            // liveLevel.style.width = '60px';
            // document.querySelector('.level-life').innerHTML = `<img src="src/sprites/heart-1.png" class="life__image">`;
            info.innerHTML += `<div id="oneLive" class="level-life" style="top: 19px; left: 115px"></div>`;
            info.innerHTML += `<div id="twoLive" class="level-life" style="top: 19px; left: 190px"></div>`;
            info.innerHTML += `<div id="threeLive" class="level-life" style="top: 19px; left: 265px"></div>`;
            break;
        case 2:
            document.getElementById("threeLive").remove();
            break;
        case 1:
            document.getElementById("twoLive").remove();
            break;
        case 0:
            // document.getElementById("oneLive").remove();
            next();
            break;
    }
}

/*
    Intervals
 */

function intervals() {
    ints.run = setInterval(() => {
        if (player.run) {
            switch (player.side) {
                case 1: // Top - работает
                    if (player.y > + 10 && player.x < gameZone.getBoundingClientRect().right - player.w - 25) {
                        player.y -= player.tiltAngleY;
                        player.el.style.top = `${player.y}px`;
                        player.x += player.tiltAngleX;
                        player.el.style.left = `${player.x}px`;
                    }
                    break;
                case 3: // Bottom работает
                    if (player.y < gameZone.getBoundingClientRect().bottom - player.h - 25 && player.x > - 10) {
                        player.y += player.tiltAngleY;
                        player.el.style.top = `${player.y}px`;
                        player.x -= player.tiltAngleX;
                        player.el.style.left = `${player.x}px`;
                    }
                    break;
                case 2: // Right - работает
                    if (player.x < gameZone.getBoundingClientRect().right - player.w -25 && player.y > - 10 && player.y < gameZone.getBoundingClientRect().bottom - player.h - 25 && player.x > - 10) {
                        player.x += player.tiltAngleX;
                        player.el.style.left = `${player.x}px`;
                        player.y += player.tiltAngleY;
                        player.el.style.top = `${player.y}px`;
                    }
                    break;
                case 4: // Left - работает
                    if (player.x > + 10 && player.y < gameZone.getBoundingClientRect().bottom - player.h - 25 && player.y > + 10 && player.x < gameZone.getBoundingClientRect().right - player.w - 25 ) {
                        player.x -= player.tiltAngleX;
                        player.el.style.left = `${player.x}px`;
                        player.y -= player.tiltAngleY;
                        player.el.style.top = `${player.y}px`;
                    }
                    break;
            }
        }
    },  10);
    ints.bullet = setInterval(() => {
        let bullets = document.querySelectorAll('.bullet');
        // bullets.style.left = '500px';
        bullets.forEach((bullet) => {

            if (bullet.getBoundingClientRect().right > gameZone.getBoundingClientRect().width) {
                bullet.parentNode.removeChild(bullet);
            } else {
                bullet.style.left = bullet.getBoundingClientRect().left + bulletSpeed + 'px';
                bullet.style.top = bullet.getBoundingClientRect().top + 6 - bulletSpeed + 'px';
            }

        })
    }, fps);
    ints.enemyBullet = setInterval(() => {
        let bullets = document.querySelectorAll('.enemy-bullet');
        bullets.forEach((bullet) => {
            let direction = bullet.getAttribute('direction');
            switch (direction) {
                case 'left':
                    if (bullet.getBoundingClientRect().left < 0) {
                        bullet.parentNode.removeChild(bullet);
                    } else {
                        bullet.style.left = bullet.getBoundingClientRect().left - 3 + 'px';
                        bullet.style.top = bullet.getBoundingClientRect().top +1 + 'px';
                    }
                    break;
            }
            let scorpionClaw = document.querySelectorAll('.scorpion-claw');
            scorpionClaw.forEach((claw) => {

                let direction = claw.getAttribute('direction');

                if (['top', 'left', 'right'].includes(direction)) {
                    if (
                        claw.getBoundingClientRect().top < bullet.getBoundingClientRect().bottom &&
                        claw.getBoundingClientRect().bottom > bullet.getBoundingClientRect().top &&
                        claw.getBoundingClientRect().right > bullet.getBoundingClientRect().left &&
                        claw.getBoundingClientRect().left < bullet.getBoundingClientRect().right
                    ) {
                        bullet.parentNode.removeChild(bullet);
                        claw.parentNode.removeChild(claw);
                        attacks += 1;
                        document.querySelector('.attack').innerText = attacks;
                    }
                }
            });
        })
    }, 10);
    ints.enemy = setInterval(() => {
        let enemies = document.querySelectorAll('.enemy');
        enemies.forEach(enemy => {

            const playerPosTop = player.el.getBoundingClientRect().top,
                  playerPosRight = player.el.getBoundingClientRect().right,
                  playerPosBottom = player.el.getBoundingClientRect().bottom,
                  playerPosLeft = player.el.getBoundingClientRect().left,
                  enemyPosTop = enemy.getBoundingClientRect().top,
                  enemyPosRight = enemy.getBoundingClientRect().right,
                  enemyPosBottom = enemy.getBoundingClientRect().bottom,
                  enemyPosLeft = enemy.getBoundingClientRect().left;
            if (
                playerPosTop < enemyPosBottom &&
                playerPosBottom > enemyPosTop &&
                playerPosRight > enemyPosLeft &&
                playerPosLeft < enemyPosRight
            ) {
                next();
            }
            // попадание в противника (муравьёв)
            let bullets = document.querySelectorAll('.bullet');

            bullets.forEach(bullet => {

                if (
                    bullet.getBoundingClientRect().top < enemy.getBoundingClientRect().bottom &&
                    bullet.getBoundingClientRect().bottom > enemy.getBoundingClientRect().top &&
                    bullet.getBoundingClientRect().right > enemy.getBoundingClientRect().left &&
                    bullet.getBoundingClientRect().left < enemy.getBoundingClientRect().right
                ) {
                      enemy.parentNode.removeChild(enemy);

                      bullet.parentNode.removeChild(bullet);
                      points += 1;
                      document.querySelector('.points').innerText = points;
                }
            });

            // попадание клешни в монстра (муровья)
            // let scorpionClaw = document.querySelectorAll('.scorpion-claw');
            /*scorpionClaw.forEach((claw) => {

                let direction = claw.getAttribute('direction');

                if (['top', 'left', 'right'].includes(direction)) {
                    if (
                        claw.getBoundingClientRect().top < enemy.getBoundingClientRect().bottom &&
                        claw.getBoundingClientRect().bottom > enemy.getBoundingClientRect().top &&
                        claw.getBoundingClientRect().right > enemy.getBoundingClientRect().left &&
                        claw.getBoundingClientRect().left < enemy.getBoundingClientRect().right
                    ) {
                        enemy.parentNode.removeChild(enemy);
                        claw.parentNode.removeChild(claw);
                        points += 1;
                        document.querySelector('.points').innerText = points;
                    }
                } /!*else {
                          enemy.parentNode.removeChild(enemy);
                          claw.parentNode.removeChild(claw);
                             console.log('непонятно 2');
                    if (
                        claw.getBoundingClientRect().bottom > enemy.getBoundingClientRect().top &&
                        claw.getBoundingClientRect().right > enemy.getBoundingClientRect().left &&
                        claw.getBoundingClientRect().left < enemy.getBoundingClientRect().right
                    ) {
                        enemy.parentNode.removeChild(enemy);
                        claw.parentNode.removeChild(claw);
                        points += 1;
                        document.querySelector('.inner-points').innerText = points;
                    }
                }*!/

            });*/

    // направление движения монстра --------------
            let direction = enemy.getAttribute('direction');
            switch (direction) {
                case 'right':
                    if (enemy.getBoundingClientRect().left > gameZone.getBoundingClientRect().width) {
                        enemy.parentNode.removeChild(enemy);
                    } else {
                        enemy.style.left = enemy.getBoundingClientRect().left - 3 + 'px';
                        enemy.style.top = enemy.getBoundingClientRect().top + 1 + 'px';
                    }
                    break;
            }
        })
    }, fps);
    // появление муравьёв
    ints.generateEnemy = setInterval(() => {

        let direction = randomInteger(1, 4);

        switch (direction) {
            case 1: //Left
                gameZone.innerHTML += `<div class="enemy" style=" 
                top: ${gameZone.getBoundingClientRect().height - player.h - 750}px;
                left: ${gameZone.getBoundingClientRect().width - player.w - 600}px;" direction="right"></div>`;
                break;
            case 2: //Left
                gameZone.innerHTML += `<div class="enemy" style=" 
                top: ${gameZone.getBoundingClientRect().height - player.h - 680}px;
                left: ${gameZone.getBoundingClientRect().width - player.w - 400}px;" direction="right"></div>`;
                break;
            case 3: //Left
                gameZone.innerHTML += `<div class="enemy" style=" 
                top: ${gameZone.getBoundingClientRect().height - player.h - 588}px;
                left: ${gameZone.getBoundingClientRect().width - player.w - 250}px;" direction="right"></div>`;
                break;
        }

        player.el = document.querySelector('.player');
    }, enemyGenerateSpeed);
    ints.enemyShots = setInterval(() => {
        let enemies = document.querySelectorAll('.enemy');
        enemies.forEach((enemy) => {

            let direction = enemy.getAttribute('direction');

            switch (direction) {
                case 'right':
                    if (
                        player.el.getBoundingClientRect().top > enemy.getBoundingClientRect().top - 100 &&
                        player.el.getBoundingClientRect().top < enemy.getBoundingClientRect().bottom + 100 &&
                        player.el.getBoundingClientRect().right < enemy.getBoundingClientRect().left
                    ) {
                        // alert('в зоне видимости')
                        gameZone.innerHTML += `<div class="enemy-bullet" direction="left" 
                            style="left: ${enemy.getBoundingClientRect().left}px; top: ${enemy.getBoundingClientRect().top}px;"></div>`;
                            player.el = document.querySelector('.player');
                    }
                    break;
            }
        })
    }, enemyShotsSpeed);
    ints.scorpionClaw = setInterval(() => {
        let scorpionClaw = document.querySelectorAll('.scorpion-claw');
        scorpionClaw.forEach(claw => {

            if (claw.getBoundingClientRect().right > gameZone.getBoundingClientRect().width) {
                claw.parentNode.removeChild(claw);
            } else {
                claw.style.left = claw.getBoundingClientRect().left +'px';
                claw.style.top = claw.getBoundingClientRect().top + 'px';
            }
        })

    }, 200);
    // нельзя нажимать на кнопку чаще чем 1 раз в 5 секунд
    /*if (ints.scorpionClaw) {
        console.log('поставили мину');
        ints.scorpionClaw = false;
        setTimeout(function() {
            ints.scorpionClaw = true;
        }, 5000)
    }*/

    // время которое клешня находиться на поле
    /*ints.scorpionClawTrue = setInterval(() => {
        let scorpionClawStop = document.querySelectorAll('.scorpion-claw');
        scorpionClawStop.forEach(clawStop => {
            if (ints.scorpionClaw) {
                clawStop.parentNode.removeChild(clawStop);
            }
        });
    }, 5000);*/

    /*ints.scorpionClawTrue = setInterval(() => {
        let scorpionClawStop = document.querySelectorAll('.scorpion-claw');
        scorpionClawStop.forEach(clawStop => {
            if (ints.scorpionClaw) {
                console.log('поставили мину');
                ints.scorpionClaw = false;
                setTimeout(function() {
                    ints.scorpionClaw = true;
                    clawStop.parentNode.removeChild(clawStop);
                }, 5000)
            }

           /!* if (ints.scorpionClaw) {
                clawStop.parentNode.removeChild(clawStop);
            }*!/
        });

    }, 5000);*/

    // деревья -------------------
    ints.treePlanting = setInterval(() => {
        let trees = document.querySelectorAll('.tree');

        trees.forEach(tree => {
            const playerPosTop = player.el.getBoundingClientRect().top, // ошибка в этой строке после 3й игры
                playerPosRight = player.el.getBoundingClientRect().right,
                playerPosBottom = player.el.getBoundingClientRect().bottom,
                playerPosLeft = player.el.getBoundingClientRect().left,
                treePosTop = tree.getBoundingClientRect().top,
                treePosRight = tree.getBoundingClientRect().right,
                treePosBottom = tree.getBoundingClientRect().bottom,
                treePosLeft = tree.getBoundingClientRect().left;

            if (
                playerPosTop < treePosBottom &&
                playerPosBottom > treePosTop &&
                playerPosRight > treePosLeft &&
                playerPosLeft < treePosRight
            ) {
                player.y = player.y + player.tiltAngleY + 10;
                player.x = player.x - player.tiltAngleX + 10;
            }
        });

        let treesRight = document.querySelectorAll('.tree-right');
        treesRight.forEach(tree => {
            const playerPosTop = player.el.getBoundingClientRect().top,
                playerPosRight = player.el.getBoundingClientRect().right,
                playerPosBottom = player.el.getBoundingClientRect().bottom,
                playerPosLeft = player.el.getBoundingClientRect().left,
                treePosTop = tree.getBoundingClientRect().top,
                treePosRight = tree.getBoundingClientRect().right,
                treePosBottom = tree.getBoundingClientRect().bottom,
                treePosLeft = tree.getBoundingClientRect().left;

            if (
                playerPosTop < treePosBottom &&
                playerPosBottom > treePosTop &&
                playerPosRight > treePosLeft &&
                playerPosLeft < treePosRight
            ) {
                player.y = player.y - player.tiltAngleY - 10;
                player.x = player.x - player.tiltAngleX -10;
            }
        });

    }, fps);
    ints.checkEnemyBulletForPlayer = setInterval(() => {
        let bullets = document.querySelectorAll('.enemy-bullet');
        bullets.forEach((bullet) => {

            let direction = bullet.getAttribute('direction');

            if (['top', 'left', 'right'].includes(direction)) {
                if (
                    bullet.getBoundingClientRect().top < player.el.getBoundingClientRect().bottom &&
                    bullet.getBoundingClientRect().bottom > player.el.getBoundingClientRect().top &&
                    bullet.getBoundingClientRect().right > player.el.getBoundingClientRect().left &&
                    bullet.getBoundingClientRect().left < player.el.getBoundingClientRect().right
                ) {
                    next();
                }
            } else {
                if (
                    bullet.getBoundingClientRect().bottom > player.el.getBoundingClientRect().top &&
                    bullet.getBoundingClientRect().right > player.el.getBoundingClientRect().left &&
                    bullet.getBoundingClientRect().left < player.el.getBoundingClientRect().right
                ) {
                    next();
                }
            }

        });
    }, fps);
}

/*
    Controllers
 */

function addBullet() {
    switch (player.side) {
        case 1:
            gameZone.innerHTML += `<div class="bullet" direction="top" style="left: ${player.x + player.w - 75}px; top: ${player.y -7}px;"></div>`;
            break;
        /*case 1:
            gameZone.innerHTML += `<div class="bullet" direction="top" style="left: ${(player.x + (player.w / 2)) - 7}px; top: ${player.y - 16}px;"></div>`;
            break;*/
        case 2:
            gameZone.innerHTML += `<div class="bullet" direction="right" style="left: ${player.x + player.w -75}px; top: ${player.y -7}px;"></div>`;
            break;
        case 3:
            gameZone.innerHTML += `<div class="bullet" direction="bottom" style="left: ${player.x + player.w -75}px; top: ${player.y -7}px;"></div>`;
            break;
        /*case 3:
            gameZone.innerHTML += `<div class="bullet" direction="bottom" style="left: ${player.x + player.w / 2 - 5}px; top: ${player.y + player.h}px;"></div>`;
            break;
        case 4:
            gameZone.innerHTML += `<div class="bullet" direction="left" style="left: ${player.x}px; top: ${player.y + player.h / 2 - 10}px;"></div>`;
            break;*/
        case 4:
            gameZone.innerHTML += `<div class="bullet" direction="left" style="left: ${player.x + player.w -75}px; top: ${player.y -7}px;"></div>`;
            break;
    }

    player.el = document.querySelector('.player');
}

function addScorpionClaw() {
    switch (player.side) {
        case 1:
            gameZone.innerHTML += `<div class="scorpion-claw" direction="top" style="left: ${player.x + player.w - 2}px; top: ${player.y -7}px;"></div>`;
            break;
        case 2:
            gameZone.innerHTML += `<div class="scorpion-claw" direction="top" style="left: ${player.x + player.w - 2}px; top: ${player.y -7}px;"></div>`;
            break;
        case 3:
            gameZone.innerHTML += `<div class="scorpion-claw" direction="top" style="left: ${player.x + player.w - 2}px; top: ${player.y -7}px;"></div>`;
            break;
        case 4:
            gameZone.innerHTML += `<div class="scorpion-claw" direction="top" style="left: ${player.x + player.w - 2}px; top: ${player.y -7}px;"></div>`;
            break;
    }
    player.el = document.querySelector('.player');
}

function controllers() {
    document.addEventListener('keydown', (e) => {
        switch (e.keyCode) {
            case 38: // Top
                player.run = true;
                player.side = 1;
                break;
            case 40: // Bottom
                player.run = true;
                player.side = 3;
                break;
            case 39: // Right
                player.run = true;
                player.side = 2;
                break;
            case 37: //Left
                player.run = true;
                player.side = 4;
                break;
            case 32: // shooting
                addBullet();
                break;
            case 67: // кидает клешню
                addScorpionClaw();
                break;
            case 13: // кидает клешню
                startGame();
                break;
                // -------------------------------
        }
    });

    document.addEventListener('keyup', (e) => {
        if ([38, 40, 39, 37, 87, 83, 68, 65].includes(e.keyCode))
            player.run = false;
    })

}
controllers();

/*
    Start Game
 */

function game() {
    init();
    intervals();
    // controllers();
}

let gameZone = document.querySelector('.game-zone'),
    fps = 1000 / 60,
    points = 0;
    attacks = 0;
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
        x: 400,
        y: 500,
        // step: 2,
        run: false,
        side: 1, //1 (top), 2 (right), 3 (bottom), 4 (left),
        w: 97,
        h: 77,
        tiltAngleY: 12 * 0.1,
        tiltAngleX: 12 * 0.3,
        life: 3,
        lifeVolume: 30,
    },
    trees = {
        x: 468,
        y: 209,
    },
    bulletSpeed = 10,
    enemyBulletSpeed = 10,
    clawSpeed = 10,
    enemyGenerateSpeed = 1000,
    enemyShotsSpeed = 1000,
    ints = {
        run: false,
        bullet: false,
        scorpionClaw: false,
        scorpionClawTrue: true,
        treePlanting: true,
        treeGeneration: false,
        checkEnemyBulletForPlayer: false,
        checkedEnemyBulletForClaw: false,
    };

game();
