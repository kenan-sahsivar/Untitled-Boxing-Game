function start() {
    if (!isLoading) {
        if (document.getElementById('player-name').value.length < 3) {
            showPopup("Name must be at least 3 characters")
        } else {
            saveState.playerName = document.getElementById('player-name').value
            document.getElementById('name-screen').style.display = 'none'
            document.getElementById('title-container').style.display = 'flex'
            player.leagueName = saveState.playerName.toUpperCase()
            enemy.leagueName = "ENEMY"
            leagueFighters.splice(saveState.rankIndex, 0, [player.leagueName, 0, 0, 0])
        }

    } else {
        try {
            let loaded = JSON.parse(atob(document.getElementById('player-name').value))
            // rankIndex can be 0 (top rank), so check for property presence instead of truthiness
            if (loaded.playerName != null && loaded.rankIndex != null) {
                saveState = loaded;
                isLoading = false
                showPopup("Save state has been loaded")
                document.getElementById('select1').style.display = 'flex'
                document.getElementById('select2').style.display = 'none'
                document.getElementById('select3').style.display = 'none'
                document.getElementById('name-screen').style.display = 'none'
                document.getElementById('title-container').style.display = 'flex'
                updateSaveState()

            } else {
                showPopup("Invalid save state")
            }
        } catch (e) {
            showPopup("Invalid save state")
        }
    }

}

function mainMenu() {
    document.getElementById('select1').style.display = 'flex'
    document.getElementById('select2').style.display = 'none'
    document.getElementById('menuText').innerHTML = 'Main Menu'

    document.getElementById("gameWindow").style.display = 'none'
    document.getElementById("playAgainMenu").style.display = 'none'
    document.getElementById("title-screen").style.display = 'block'
    cancelAnimationFrame(animateLoop)
}

function saveMenu() {
    document.getElementById('select1').style.display = 'none'
    document.getElementById('select3').style.display = 'flex'
    document.getElementById('menuText').innerHTML = 'Select State'
}

function loadSaveState() {
    isLoading = true
    selection = 6
    selected = true
    for (let i = 0; i < leagueFighters.length; i++) {
        if (leagueFighters[i].toString().includes(player.leagueName)) {
            leagueFighters.splice(i, 1)
            break
        }
    }
    document.getElementById('nameBack').style.display = 'block'
    document.getElementById('name-screen-header').innerHTML = 'Paste state here'
    document.getElementById('player-name').placeholder = 'Ex: ZXhhbXBsZ=='
    document.getElementById('player-name').value = ""
    document.getElementById('player-name').style.textTransform = "unSet"
    document.getElementById('submit-name').innerHTML = "Load"
}

function updateSaveState() {
    player.leagueName = saveState.playerName.toUpperCase()
}

function saveSaveState() {
    navigator.clipboard.writeText(btoa(JSON.stringify(saveState)));
    showPopup("Save state has been copied to your clipboard")
}

function select(difficulty) {
    selected = true
    if (difficulty < 5) {
        ai = true
        selection = difficulty
        if (difficulty === 0) enemyStyles.timingStyle = "slow"
        else if (difficulty === 1) enemyStyles.timingStyle = "instant"
        else ai = false
    } else {
        initialized = false
    }
    selection = difficulty
}

function updateLeaderboard(rankIndex) {
    let shown = []
    updatePlayerLeague()
    document.getElementById('leaderboard-list').innerHTML = ""
    let ableToBeShown = 5
    if (rankIndex < 2) {
        for (let i = 0; i < ableToBeShown; i++) {
            shown.push((5-i) + ". " + leagueFighters[4-i][0] + ": " +
                leagueFighters[4-i][1] + "-" + leagueFighters[4-i][2] + "-" + leagueFighters[4-i][3])
        }
    } else if (rankIndex < leagueFighters.length - 3) {
        for (let i = 0; i < ableToBeShown; i++) {
            let redundance = saveState.rankIndex + 3 - i
            shown.push((saveState.rankIndex + 4 - i) + ". " + leagueFighters[redundance][0] + ": " +
            leagueFighters[redundance][1] + "-" + leagueFighters[redundance][2] + "-" + leagueFighters[redundance][3])

        }
    } else {
        for (let i = 0; i < ableToBeShown; i++) {
            let redundance = leagueFighters.length - i - 1
            shown.push((leagueFighters.length - i) + ". " + leagueFighters[redundance][0] + ": " +
                leagueFighters[redundance][1] + "-" + leagueFighters[redundance][2] + "-" + leagueFighters[redundance][3])
        }
    }
    shown.reverse()
    for (let i = 0; i < ableToBeShown; i++) {
        let list = document.getElementById('leaderboard-list')
        let iDiv = document.createElement('div');
        iDiv.className = 'block';
        iDiv.innerHTML = shown[i]
        if (shown[i].includes(player.leagueName)) {
            iDiv.style.color = "#ffe743"
            iDiv.style.textShadow = "0 0 2px #ffde00"
        }
        try {
            if (shown[i+1].includes(player.leagueName)) {
                iDiv.style.color = "#ff0000"
                iDiv.style.textShadow = "0 0 2px #ff0000"
            }
        } catch (e) {}

        list.appendChild(iDiv);
    }
}

function updatePlayerLeague() {
    for (let i = 0; i < leagueFighters.length; i++) {
        if (leagueFighters[i].toString().includes(player.leagueName)) {
            leagueFighters.splice(i, 1)
            break
        }
    }
    leagueFighters.splice(saveState.rankIndex, 0, [player.leagueName, saveState.playerWins, saveState.playerDraws, saveState.playerLosses])
}

function challenge() {
    selection = 11
    selected = true
    initialized = false
    let redundance = leagueFighters[saveState.rankIndex - 1]
    enemy.leagueName = redundance[0]
    saveState.enemyHp = redundance[4]
    saveState.enemyDmg = redundance[5]
    saveState.enemyDef = redundance[6]
}

function showPopup(message) {
    const popup = document.getElementById("popup-toast");
    popup.textContent = message;

    // show
    popup.style.bottom = "40px";
    popup.style.opacity = "1";

    // hide after 2.5 seconds
    setTimeout(() => {
        popup.style.bottom = "-100px";
        popup.style.opacity = "0";
    }, 2500);
}
