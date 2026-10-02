document.addEventListener("keydown", function(e) {
    if (game) {
        if (e.key.toLowerCase() === 'a') {
            player.keys.a = true
            player.keys.d = false
        }
        if (e.key.toLowerCase() === 'd') {
            player.keys.a = false
            player.keys.d = true

        }
        if (e.key === ' ') {
            dodge(player)
        }
        if (e.key.toLowerCase() === 's' && player.canBlock) {
            if (!player.keys.blocking) {
                player.keys.blocking = true
                player.isBlocking = true
                player.stance = "block"
            }
        }
        if (e.key.toLowerCase() === 'g') {
            lPunch(player)
        }
        if (e.key.toLowerCase() === 'h') {
            rPunch(player)
        }

        if (!ai) {
            if (e.key === 'ArrowLeft') {
                enemy.keys.a = true
                enemy.keys.d = false
            }
            if (e.key === 'ArrowRight') {
                enemy.keys.a = false
                enemy.keys.d = true
            }
            if (e.key === '/') {
                dodge(enemy)
            }
            if (e.key=== 'ArrowDown' && enemy.canBlock) {
                if (!enemy.keys.blocking) {
                    enemy.keys.blocking = true
                    enemy.isBlocking = true
                    enemy.stance = "block"
                }
            }
            if (e.key.toLowerCase() === 'k') {
                lPunch(enemy)
            }
            if (e.key.toLowerCase() === 'l') {
                rPunch(enemy)
            }
        }
    }



    if (e.key === "Enter" && !initialized && selected) {
        e.preventDefault()
        leagueFight = selection === 11;
        if (selection === 10) {
            mainMenu()
        } else if (selection === 9) {
            playAgainF()
            initialized = true
        } else if (selection === 8) {
            saveMenu()
        } else if (selection === 7) {
            isLoading = false
            document.getElementById('menuText').innerHTML = 'Main Menu'
            document.getElementById('nameBack').style.display = 'none'
            document.getElementById('name-screen-header').innerHTML = "What's your name?"
            document.getElementById('player-name').placeholder = 'ENTER NAME'
            document.getElementById('player-name').value = ""
            document.getElementById('player-name').style.textTransform = "uppercase"
            document.getElementById('submit-name').innerHTML = "Start"
            document.getElementById('select1').style.display = 'flex'
            document.getElementById('rank-board').style.display = 'none'
            document.getElementById('select2').style.display = 'none'
            document.getElementById('select3').style.display = 'none'
            document.getElementById('name-screen').style.display = 'none'
            document.getElementById('title-container').style.display = 'flex'
            document.getElementById('title-screen').style.display = 'flex'
        } else if (selection === 6) {
            document.getElementById('name-screen').style.display = 'flex'
            document.getElementById('title-container').style.display = 'none'
        } else if (selection === 5) {
            ai = true
            document.getElementById('select1').style.display = 'none'
            document.getElementById('select2').style.display = 'none'
            document.getElementById('select3').style.display = 'none'
            document.getElementById('title-screen').style.display = 'none'
            document.getElementById('rank-board').style.display = 'block'
            if (saveState.rankIndex === 0) document.getElementById('challenge').style.display = 'none'
            else document.getElementById('challenge').style.display = 'flex'
            updateLeaderboard(saveState.rankIndex)
        } else {
            if (selection === 3) {
                document.getElementById('select1').style.display = 'none'
                document.getElementById('select2').style.display = 'flex'
                document.getElementById('menuText').innerHTML = 'Select Difficulty'
            } else {
                document.getElementById("gameWindow").style.display = 'block'
                document.getElementById('rank-board').style.display = 'none'
                document.getElementById("title-screen").style.display = 'none'
                initialize()
                initialized = true
            }
        }
        selected = false
        if (leagueFight && saveState.rankIndex !== 0) {
            enemy.leagueName = leagueFighters[saveState.rankIndex - 1][0]
            enemy.health = saveState.enemyHp
            enemy.damage = saveState.enemyDmg
            enemy.defense = saveState.enemyDef
            enemy.baseDefense = saveState.enemyDef
            enemyStyles.timingStyle = "instant"
            document.getElementById('playAgain').style.display = 'none'
        } else {
            enemy.leagueName = "ENEMY"
            saveState.enemyHp = 100
            saveState.enemyDmg = 10
            saveState.enemyDef = 0
            enemy.baseDefense = 0
            document.getElementById('playAgain').style.display = 'flex'
        }
    }

})

document.addEventListener("keyup", function(e) {
    if (e.key.toLowerCase() === 'a') {
        player.keys.a = false
        if (!player.keys.d && !player.isPunching) player.firstFrame = true
    }
    if (e.key.toLowerCase() === 'd') {
        player.keys.d = false
        if (!player.keys.a && !player.isPunching) player.firstFrame = true
    }
    if (e.key.toLowerCase() === 's' && player.keys.blocking) {
        player.keys.blocking = false
        player.isBlocking = false
    }

    if (!ai) {
        if (e.key === 'ArrowLeft') {
            enemy.keys.a = false
            if (!enemy.keys.d && !enemy.isPunching) enemy.firstFrame = true
        }
        if (e.key === 'ArrowRight') {
            enemy.keys.d = false
            if (!enemy.keys.a && !enemy.isPunching) enemy.firstFrame = true
        }
        if (e.key === 'ArrowDown' && enemy.keys.blocking) {
            enemy.keys.blocking = false
            enemy.isBlocking = false
        }
    }
})

const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove 'clicked' class from all buttons first
        buttons.forEach(btn => btn.classList.remove('clicked'));
        // Add 'clicked' class to the one you clicked
        button.classList.add('clicked');
    });
});
