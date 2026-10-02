function checkPlayerFrame(character) {
    if (!character.keys.d && !character.keys.a && !character.isPunching && !character.isDodging && !character.isBlocking) character.stance = "idle"
    if (character.keys.d && !character.keys.a && !character.isPunching && !character.isDodging && !character.isBlocking) character.stance = "rightWalk"
    if (character.keys.a && !character.keys.d && !character.isPunching && !character.isDodging && !character.isBlocking) character.stance = "leftWalk"
    if (character.isBlocking && !character.keys.a && !character.keys.d) character.stance = "block"
    if (character.isBlocking && !character.keys.a && character.keys.d) character.stance = "blockRight"
    if (character.isBlocking && character.keys.a && !character.keys.d) character.stance = "blockLeft"

    if (character.stance === "idle") {
        character.totalAnimationFrames = 2
        character.image = character.idleImage
        character.frame += 1
        if (character.frame > 25) {
            character.animationFrame += 1
            character.frame = 0
        }
    }
    if (character.stance === "block") {
        character.totalAnimationFrames = 2
        character.image = character.blockImage
        character.frame += 1
        if (character.frame > 25) {
            character.animationFrame += 1
            character.frame = 0
        }
    }
    if (character.stance === "rightWalk") {
        character.totalAnimationFrames = 10
        character.image = character.rightWalkImage
        if (character.frame >= 4) {
            character.animationFrame += 1
            character.frame = 0
        }
        character.frame += 1
    }
    if (character.stance === "blockRight") {
        character.totalAnimationFrames = 10
        character.image = character.blockRImage
        if (character.frame >= 4) {
            character.animationFrame += 1
            character.frame = 0
        }
        character.frame += 1
    }
    if (character.stance === "leftWalk") {
        character.totalAnimationFrames = 10
        character.image = character.leftWalkImage

        character.frame += 1
        if (character.frame >= 4) {
            character.animationFrame += 1
            character.frame = 0
        }
    }
    if (character.stance === "blockLeft") {
        character.totalAnimationFrames = 10
        character.image = character.blockLImage

        character.frame += 1
        if (character.frame >= 4) {
            character.animationFrame += 1
            character.frame = 0
        }
    }
    if (character.stance === "jab") {
        character.totalAnimationFrames = 4
        character.image = character.jabImage
        if (character.firstFrame) {
            character.frame = 0
            character.animationFrame = 0
            character.firstFrame = false
        }
        if (character.frame >= 4) {
            character.animationFrame += 1
            character.frame = 0
        }
        character.frame += 1
    }

    if (character.stance === "cross") {
        character.totalAnimationFrames = 6
        character.image = character.crossImage
        if (character.firstFrame) {
            character.frame = 0
            character.animationFrame = 0
            character.firstFrame = false
        }
        if (character.frame >= 4) {
            character.animationFrame += 1
            character.frame = 0
        }
        character.frame += 1
    }

    if (character.stance === "dodge") {
        character.totalAnimationFrames = 4
        character.image = character.dodgeImage
        if (character.firstFrame) {
            character.frame = 0
            character.animationFrame = 0
            character.firstFrame = false
        }
        if (character.frame >= 6) {
            character.animationFrame += 1
            character.frame = 0
        }
        character.frame += 1
    }
}

function movePlayers(character) {
    let speedModifier = 1
    if (character.keys.d && character === enemy) speedModifier = 0.75
    if (character.keys.a && character === player) speedModifier = 0.75
    if (!character.isPunching && !character.isDodging) {
        if (character.keys.a) character.xloc -= character.speed * speedModifier
        if (character.keys.d) character.xloc += character.speed * speedModifier
        if (player.xloc + player.width - 50 > enemy.xloc + 50) {
            if (character === player && character.keys.d) player.xloc -= player.speed
            else enemy.xloc += enemy.speed
        }
        if (character.xloc + 30 < 0) character.xloc += character.speed // adding 30 because hitbox is not exact
        if (character.xloc + character.width - 30 > canvas.width) character.xloc -= character.speed
    }
}

function checkCollision() {
}

function staminaRegen() {
    player.stamina += .1
    if (player.stamina > 100) player.stamina = 100
    enemy.stamina += .1
    if (enemy.stamina > 100) enemy.stamina = 100
}

function checkDodge(character) {
    if (character.isDodging) {
        character.dodgeHold -= 1
        if (character.dodgeHold === 0) {
            character.isDodging = false
            character.dodgeCooldown = 15
            character.canPunch = true
            character.canBlock = true
        }
    }

    if (!character.canDodge) {
        character.dodgeCooldown -= 1
        if (character.dodgeCooldown === 0) {
            character.canDodge = true
        }
    }
}

function dodge(character) {
    if (character.canDodge && character.canPunch && character.stamina > 15) {
        character.canBlock = false
        character.isBlocking = false
        character.firstFrame = true
        character.punchHold = 24
        character.punchFrames = character.punchHold
        character.dodgeHold = 24
        character.isDodging = true
        character.canDodge = false
        character.canPunch = false
        character.stance = "dodge"
        character.stamina -= 15
    }
}

function dealDamage(character) {
    if (player.xloc + player.width - player.punchDistance >= enemy.xloc && character === player) {
        if (!enemy.isDodging) {
            enemy.health -= Math.max(0, (player.damage * player.damageMultiplier) - enemy.defense)
        } else {
            enemy.health += 3
            enemyDodge = 25
            enemyTextHold = 50
        }

    }
    if (enemy.xloc + player.punchDistance <= player.xloc + player.width && character === enemy) {
        if (!player.isDodging) {
            player.health -= Math.max(0, (enemy.damage * enemy.damageMultiplier) - player.defense)
        } else {
            player.health += 3
            playerDodge = 25
            playerTextHold = 50
        }
    }

}

function checkPunching(character) {
    if (character.isPunching) {
        character.punchHold -= 1
        if (character.punchHold === 0) {
            character.punchCooldown = 5
            character.firstFrame = true
            character.isPunching = false
            character.canDodge = true
            character.canBlock = true
        }
    }

    if (character.punchFrames - character.punchHit === character.punchHold && character.isPunching) dealDamage(character)

    if (!character.canPunch) {
        character.punchCooldown -= 1
        if (character.punchCooldown === 0) {
            character.canPunch = true
        }
    }
}

function checkBlocking(character) {
    if (character.keys.blocking && character.canBlock) {
        character.keys.blocking = true
        character.isBlocking = true
        character.stance = "block"
    } else if (!character.keys.blocking) {
        character.isBlocking = false
    }
    if (!character.canBlock && character.isBlocking) {
        character.keys.blocking = false
        character.isBlocking = false
    }
    if (character.isBlocking) {
        character.speed = 1
        character.defense = character.baseDefense + 3
    } else {
        character.speed = 2
        character.defense = character.baseDefense
    }
}

function lPunch(character) {
    if (character.canPunch && character.stamina > 15) {
        character.canBlock = false
        character.isBlocking = false
        character.firstFrame = true
        character.punchHold = 16
        character.punchFrames = character.punchHold
        character.punchHit = 10
        character.isPunching = true
        character.canPunch = false
        character.canDodge = false
        character.stance = "jab"
        character.damageMultiplier = 0.75
        character.stamina -= 20
    }
}

function rPunch(character) {
    if (character.canPunch && character.stamina > 25) {
        character.canBlock = false
        character.isBlocking = false
        character.firstFrame = true
        character.punchHold = 24
        character.punchFrames = character.punchHold
        character.punchHit = 10 // change according to actual frame once animated
        character.isPunching = true
        character.canPunch = false
        character.canDodge = false
        character.stance = "cross"
        character.damageMultiplier = 1
        character.stamina -= 25
    }
}
