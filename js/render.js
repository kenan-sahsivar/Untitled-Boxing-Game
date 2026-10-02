function clear() {
    ctx.drawImage(background, 76, 0, 960, 540, 0, 0, 960, 540)
    ctx.drawImage(clock, 0, 0, 258, 200, 285, 0, 387, 300)
}

function drawPlayers() {
    checkPlayerFrame(enemy)
    checkPlayerFrame(player)
    // player src / src x / src y / src width / src height / player x / player y / player width / player height
    ctx.drawImage(player.image, 200 * (player.animationFrame%player.totalAnimationFrames), 0, 200, 200, player.xloc, player.yloc, player.width, player.height)
    ctx.drawImage(enemy.image, 200 * (enemy.animationFrame%enemy.totalAnimationFrames), 0, 200, 200, enemy.xloc, enemy.yloc, enemy.width, enemy.height)
}

function animateHealth() {
    if (player.health > 100) player.health = 100
    if (enemy.health > saveState.enemyHp) enemy.health = saveState.enemyHp

    // ratio for player is 100 to 435
    let enemyRatio = 100/saveState.enemyHp // use this whenever you display enemy health
    playerHealthTX += (5 + (player.health * 4.3) - playerHealthTX) * 0.1
    playerHealthBX = playerHealthTX - 40

    enemyHealthTX += ((955 - (enemyRatio * enemy.health * 4.3)) - enemyHealthTX) * 0.1
    enemyHealthBX = enemyHealthTX + 40

    playerHurtIndicatorTX += (5 + (player.health * 4.3) - playerHurtIndicatorTX) * 0.025
    playerHurtIndicatorBX = playerHurtIndicatorTX - 40

    enemyHurtIndicatorTX += ((955 - (enemyRatio * enemy.health * 4.3)) - enemyHurtIndicatorTX) * 0.025
    enemyHurtIndicatorBX = enemyHurtIndicatorTX + 40
}

function animateStamina() {
    playerStaminaTX += (5 + (player.stamina * 3.5) - playerStaminaTX) * 0.1
    playerStaminaBX = playerStaminaTX - 25

    enemyStaminaTX += ((955 - (enemy.stamina * 3.5)) - enemyStaminaTX) * 0.1
    enemyStaminaBX = enemyStaminaTX + 25

    playerStaminaIndicatorTX += (5 + (player.stamina * 3.5) - playerStaminaIndicatorTX) * 0.025
    playerStaminaIndicatorBX = playerStaminaIndicatorTX - 25

    enemyStaminaIndicatorTX += ((955 - (enemy.stamina * 3.5)) - enemyStaminaIndicatorTX) * 0.025
    enemyStaminaIndicatorBX = enemyStaminaIndicatorTX + 25
}

function drawBars() {
    ctx.fillStyle = "#000000"

    ctx.beginPath(); // health bar border player
    ctx.moveTo(0, 0);
    ctx.lineTo(450, 0);
    ctx.lineTo(400, 50);
    ctx.lineTo(0, 50);
    ctx.closePath();
    ctx.fill()

    ctx.beginPath(); // health bar border enemy
    ctx.moveTo(960, 0);
    ctx.lineTo(510, 0);
    ctx.lineTo(560, 50);
    ctx.lineTo(960, 50);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#474747"

    ctx.beginPath(); // full health bar player
    ctx.moveTo(5, 5);
    ctx.lineTo(435, 5);
    ctx.lineTo(395, 45);
    ctx.lineTo(5, 45);
    ctx.closePath();
    ctx.fill()

    ctx.beginPath(); // full health bar enemy
    ctx.moveTo(955, 5);
    ctx.lineTo(525, 5);
    ctx.lineTo(565, 45);
    ctx.lineTo(955, 45);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#ff4141"

    ctx.beginPath(); // hurt indicator player
    ctx.moveTo(5, 5);
    ctx.lineTo(playerHurtIndicatorTX, 5);
    ctx.lineTo(playerHurtIndicatorBX, 45);
    ctx.lineTo(5, 45);
    ctx.closePath();
    ctx.fill()

    ctx.beginPath(); // hurt indicator enemy
    ctx.moveTo(955, 5);
    ctx.lineTo(enemyHurtIndicatorTX, 5);
    ctx.lineTo(enemyHurtIndicatorBX, 45);
    ctx.lineTo(955, 45);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#cc0000"

    ctx.beginPath(); // real health bar player
    ctx.moveTo(5, 5);
    ctx.lineTo(playerHealthTX, 5);
    ctx.lineTo(playerHealthBX, 45);
    ctx.lineTo(5, 45);
    ctx.closePath();
    ctx.fill()

    ctx.beginPath(); // real health bar enemy
    ctx.moveTo(955, 5);
    ctx.lineTo(enemyHealthTX, 5);
    ctx.lineTo(enemyHealthBX, 45);
    ctx.lineTo(955, 45);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#000000" // cutoff


    ctx.beginPath(); // stamina bar border player
    ctx.moveTo(0, 50);
    ctx.lineTo(365, 50);
    ctx.lineTo(333, 83);
    ctx.lineTo(0, 83);
    ctx.closePath();
    ctx.fill()

    ctx.beginPath(); // stamina bar border enemy
    ctx.moveTo(960, 50);
    ctx.lineTo(595, 50);
    ctx.lineTo(625, 83);
    ctx.lineTo(960, 83);
    ctx.closePath();
    ctx.fill()

    ctx.fillStyle = "#474747"

    ctx.beginPath(); // full stamina bar player
    ctx.moveTo(5, 52);
    ctx.lineTo(355, 52);
    ctx.lineTo(330, 77);
    ctx.lineTo(5, 77);
    ctx.closePath();
    ctx.fill()

    ctx.beginPath(); // full stamina bar enemy
    ctx.moveTo(955, 52);
    ctx.lineTo(605, 52);
    ctx.lineTo(630, 77);
    ctx.lineTo(955, 77);
    ctx.closePath();
    ctx.fill()

    ctx.fillStyle = "#ff4141"

    ctx.beginPath(); // stamina drain indicator player
    ctx.moveTo(5, 52);
    ctx.lineTo(playerStaminaIndicatorTX, 52);
    ctx.lineTo(playerStaminaIndicatorBX, 77);
    ctx.lineTo(5, 77);
    ctx.closePath();
    ctx.fill()

    ctx.beginPath(); // stamina drain indicator enemy
    ctx.moveTo(955, 52);
    ctx.lineTo(enemyStaminaIndicatorTX, 52);
    ctx.lineTo(enemyStaminaIndicatorBX, 77);
    ctx.lineTo(955, 77);
    ctx.closePath();
    ctx.fill()

    ctx.fillStyle = "#49ff2f"

    ctx.beginPath(); // real stamina bar player
    ctx.moveTo(5, 52);
    ctx.lineTo(playerStaminaTX, 52);
    ctx.lineTo(playerStaminaBX, 77);
    ctx.lineTo(5, 77);
    ctx.closePath();
    ctx.fill()

    ctx.beginPath(); // real stamina bar enemy
    ctx.moveTo(955, 52);
    ctx.lineTo(enemyStaminaTX, 52);
    ctx.lineTo(enemyStaminaBX, 77);
    ctx.lineTo(955, 77);
    ctx.closePath();
    ctx.fill()

    ctx.fillStyle = "#000000" // cutoff
    ctx.fillRect(0, 5, 5, 75);
    ctx.fillRect(955, 5, 5, 75);

    ctx.fillStyle = "#b3b3b3" // cutoff
    ctx.textAlign = "center";
    ctx.font = "50px 'Press Start 2P'";
    seconds =  time%60
    if (seconds < 10) seconds = "0" + seconds;
    ctx.fillText(Math.trunc(time/60) + ":" + seconds, 485, 230);

    ctx.fillStyle = "#ffffff"
    ctx.textAlign = "left";

    ctx.font = "20px 'Press Start 2P'"
    ctx.fillText(player.leagueName, 15, 35);
    ctx.textAlign = "right";

    ctx.fillText(enemy.leagueName, 945, 35);

    ctx.textAlign = "center";
}

function dodgeConfirmAnimation() {
    if (playerDodge > 0) playerDodge -= 2
    if (playerTextHold > 0 || playerDodge > 0) {
        playerTextHold -= 1
    }
    if (enemyDodge > 0) enemyDodge -= 2
    if (enemyTextHold > 0 || enemyDodge > 0) {
        enemyTextHold -= 1
    }

    ctx.fillStyle = "#ff8103"
    ctx.textAlign = "center";
    ctx.strokeStyle = 'black'
    ctx.miterLimit = 2;
    ctx.lineJoin = 'circle';
    ctx.globalAlpha = playerTextHold * 0.02;
    if (playerDodge > 0 || playerTextHold > 0) {
        ctx.lineWidth = 5;
        ctx.font = (45 + playerDodge) + "px 'Press Start 2P'";
        ctx.strokeText("DODGED!", 200, 230);
        ctx.lineWidth = 1;
        ctx.fillText("DODGED!", 200, 230);
    }
    ctx.globalAlpha = enemyTextHold * 0.02;
    if (enemyDodge > 0 || enemyTextHold > 0) {
        ctx.lineWidth = 5;
        ctx.font = (45 + enemyDodge) + "px 'Press Start 2P'";
        ctx.strokeText("DODGED!", 800, 230);
        ctx.lineWidth = 1;
        ctx.fillText("DODGED!", 800, 230);
    }

    ctx.globalAlpha = 1
}

function gameOverAnimation() {
    if (gameOver > 0) gameOver -= 2

    if (gameOverHold > 0 || gameOver > 0) {
        gameOverHold -= 1
        gameOverYloc -= 1
    }

    ctx.fillStyle = "#ffffff"
    if (!game) {
        ctx.lineWidth = 5;
        ctx.font = (65 + gameOver) + "px 'Press Start 2P'";
        ctx.strokeText("GAME OVER!", canvas.width/2, gameOverYloc);
        ctx.lineWidth = 1;
        ctx.fillText("GAME OVER!", canvas.width/2, gameOverYloc);
    }
    ctx.globalAlpha = 1;
}

function resultsAnimation() {
    if (results > 0) results -= 2
    if (playAgain > 0) playAgain -= 2

    if (resultsHold > 0 || results > 0) {
        resultsHold -= 1
        resultsYloc -= 1
    }

    if (playAgainHold > 0 || playAgain > 0) {
        playAgainHold -= 1
        playAgainYloc -= 1
    }

    ctx.fillStyle = "#ffffff"
    if (gameOverHold === 80) {
        results = 20
        resultsHold = 100
        resultsDisplayed = true
    }

    if (resultsHold === 20) {
        playAgain = 20
        playAgainHold = 20
        menu.style.display = 'block'
    }
    let playAgainText
    if (leagueFight) playAgainText = "League Updated"
    else playAgainText = "Play Again?"

    if (!game && gameOverHold < 80) {
        ctx.lineWidth = 5;
        ctx.font = (30 + results) + "px 'Press Start 2P'";
        ctx.strokeText("Player " + winner + " Wins!", canvas.width / 2, resultsYloc);
        if (!game && resultsHold < 20 && resultsDisplayed) {
            ctx.font = (45 + playAgain) + "px 'Press Start 2P'";
            ctx.strokeText(playAgainText, canvas.width / 2, playAgainYloc);
        }
        ctx.lineWidth = 1;
        ctx.font = (30 + results) + "px 'Press Start 2P'";
        ctx.fillText("Player " + winner + " Wins!", canvas.width / 2, resultsYloc);
        if (!game && resultsHold < 20 && resultsDisplayed) {
            ctx.font = (45 + playAgain) + "px 'Press Start 2P'";
            ctx.fillText(playAgainText, canvas.width / 2, playAgainYloc);
        }
    }

    ctx.globalAlpha = 1;
}
