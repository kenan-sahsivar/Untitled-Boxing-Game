function initialize() {
    ctx.drawImage(player, player.xloc, player.yloc, player.width, player.height)
    ctx.drawImage(enemy, enemy.xloc, enemy.yloc, enemy.width, enemy.height)
    clear()
    player.health = 100
    player.stamina = 100
    enemy.health = 100
    enemy.stamina = 100
    game = true
    gameOverYloc = 300
    resultsYloc = 300
    playAgainYloc = 300
    time = 180
    player.xloc = 100
    enemy.xloc = 700
    resultsDisplayed = false
    lastFrameTime = 0
    animateGame()
}

function playAgainF() {
    cancelAnimationFrame(animateLoop)
    document.getElementById("playAgainMenu").style.display = 'none'
    initialize()
}

function reduceTime() {
    if (game) {
        timeFrame++
        frame++
        if (timeFrame === 60) {
            time--
            timeFrame = 0
        }
    }
    if (game && (time === 0 || player.health <= 0 || enemy.health <= 0)) {
        game = false
        player.keys.a = false
        player.keys.d = false
        enemy.keys.a = false
        enemy.keys.d = false
        gameOver = 25
        gameOverHold = 150
        if (!(player.stance === "block")) {
            player.stance = "idle"
        }
        if (!(enemy.stance === "block")) {
            enemy.stance = "idle"
        }
        let playerRatio = player.health / 100
        let enemyRatio = enemy.health / saveState.enemyHp
        if (playerRatio > enemyRatio) winner = 1
        else winner = 2
        if (leagueFight) {
            if (winner === 1) {
                saveState.playerWins++
                // Record the opponent's loss before moving the player up in rank
                if (saveState.rankIndex - 1 >= 0) {
                    leagueFighters[saveState.rankIndex - 1][3]++
                }
                saveState.rankIndex--
            } else {
                saveState.playerLosses++
                if (saveState.rankIndex - 1 >= 0) {
                    leagueFighters[saveState.rankIndex - 1][1]++
                }
            }
        }
    }

}

function animateGame(now) {
    if (now === undefined) now = performance.now()
    // Cap simulation to ~60fps across high-refresh-rate displays
    if (now - lastFrameTime < 1000 / 60) {
        animateLoop = requestAnimationFrame(animateGame);
        return
    }
    lastFrameTime = now
    clear()
    drawPlayers()
    dodgeConfirmAnimation()
    drawBars()
    if (game) {
        movePlayers(player)
        enemyController()
        movePlayers(enemy)
        checkCollision()
        checkDodge(player)
        checkDodge(enemy)
        checkPunching(player)
        checkPunching(enemy)
        checkBlocking(player)
        checkBlocking(enemy)
        staminaRegen()
        reduceTime()
        determineEnemyStyle()
    } else {
        ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    gameOverAnimation()
    resultsAnimation()
    animateHealth()
    animateStamina()
    animateLoop = requestAnimationFrame(animateGame);
}
