function determineEnemyStyle() {
    let eHP_placeHolder = enemy.health * (100/saveState.enemyHp)
    if (eHP_placeHolder >= player.health) { // movement
        if (timeFrame%60 === 0) {
            if (Math.random() > 0.1) enemyStyles.moveStyle = "aggressive"
            else enemyStyles.moveStyle = "neutral"
            if (time < 45) enemyStyles.moveStyle = "aggressive"
        }
    } else {
        if (time%3 === 0) {
            if (Math.random() > 0.5) enemyStyles.moveStyle = "neutral"
            else if (Math.random() > 0.5) enemyStyles.moveStyle = "passive"
            else enemyStyles.moveStyle = "aggressive"

            if (player.stamina < enemy.stamina - 30) enemyStyles.moveStyle = "aggressive"
        }
    }
    if (Math.random() > 0.5) {
        if (frame%90 === 0 && eHP_placeHolder > 50) {
            let rNum = Math.random()
            if (rNum > 0.66) enemyStyles.idleStyle = "guard"
            else if (rNum > 0.33) enemyStyles.idleStyle = "neutral"
            else enemyStyles.idleStyle = "counter"
        } else if (frame%90 === 0) {
            if (Math.random() > 0.33) enemyStyles.idleStyle = "guard"
            else enemyStyles.idleStyle = "neutral"
        }
    } else {
        if (frame%90 === 0) {
            if (eHP_placeHolder < player.health) enemyStyles.idleStyle = "counter"
            if (enemy.stamina < 50) enemyStyles.idleStyle = "guard"
            if (player.health < eHP_placeHolder) enemyStyles.idleStyle = "neutral"
            if (enemy.xloc + player.punchDistance <= player.xloc + player.width && enemy.stamina < 75) enemyStyles.idleStyle = "guard"
        }
    }

    // counter
    if (enemyStyles.moveStyle === "aggressive") enemyStyles.counterStyle = "counter"
    else enemyStyles.counterStyle = "escape"

    if (enemy.stamina > player.stamina) enemyStyles.attackStyle = "poke"
    else enemyStyles.attackStyle = "pressure"
}

function enemyController() {
    if (ai) {
        if (timeFrame === 10 && enemyStyles.moveStyle === "aggressive") {
            if (enemy.xloc - enemy.punchDistance >= player.xloc + player.width) {
                enemy.keys.a = true
                enemy.keys.d = false
            }
            let test = Math.random()
            if (test > 0.7 && player.stamina >= enemy.stamina - 20) {
                enemy.keys.a = false
                enemy.keys.d = true
            }
        }
        if (timeFrame === 10 && enemyStyles.moveStyle === "passive") {
            enemy.keys.a = false
            enemy.keys.d = true
            if (enemy.xloc + enemy.width - 30 >= canvas.width) {
                enemy.keys.a = false
                enemy.keys.d = false
            }
        }
        if (timeFrame === 10 && enemyStyles.moveStyle === "neutral") {
            if (enemy.xloc + enemy.punchDistance < canvas.width/2) {
                enemy.keys.a = false
                enemy.keys.d = true
            } else {
                enemy.keys.a = true
                enemy.keys.d = false
            }
        }

        if (enemy.xloc + player.punchDistance <= player.xloc + player.width && timeFrame%3 === 0){
            let chance = Math.random()
            let timing = 0.3
            if (enemyStyles.timingStyle === "slow") timing = 0.04
            if (chance < timing && enemyStyles.attackStyle === "poke") {
                if (Math.random() > 0.3) lPunch(enemy)
                else rPunch(enemy)
            }
            if (chance < timing && enemyStyles.attackStyle === "pressure") {
                if (Math.random() > 0.3) rPunch(enemy)
                else lPunch(enemy)
            }
        }

        if (enemyStyles.idleStyle === "neutral") {
            enemy.keys.blocking = false
        }
        else enemy.keys.blocking = (enemyStyles.idleStyle === "guard")

        if (player.isPunching && enemy.xloc + player.punchDistance <= player.xloc + player.width && (player.punchFrames - player.punchHit < player.punchHold)) {
            if (enemyStyles.timingStyle === "slow" && Math.random() < 0.05) {
                dodge(enemy)
            } else if (enemyStyles.timingStyle === "instant" && Math.random() < 0.6) {
                dodge(enemy)
            }
        }
    }
}
