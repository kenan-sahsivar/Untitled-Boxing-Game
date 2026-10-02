const createImage = function(src, x, y, w, h, health, stamina, damage, defense, speed, stance) {
    const img = new Image();
    img.src = src
    img.xloc = x
    img.yloc = y
    img.width = w;
    img.height = h;
    img.health = health
    img.stamina = stamina
    img.damage = damage
    img.defense = defense
    img.baseDefense = defense
    img.speed = speed
    img.stance = stance
    img.leagueName = ""

    img.idleImage = new Image()
    img.rightWalkImage = new Image()
    img.leftWalkImage = new Image()
    img.jabImage = new Image()
    img.crossImage = new Image()
    img.dodgeImage = new Image()
    img.blockImage = new Image()
    img.blockRImage = new Image()
    img.blockLImage = new Image()
    img.image = img.idleImage

    img.totalAnimationFrames = 2
    img.animationFrame = 0
    img.frame = 0

    img.canPunch = true
    img.isPunching = false
    img.punchHold = 0
    img.punchFrames = 0
    img.punchHit = 0
    img.punchCooldown = 0
    img.damageMultiplier = 1
    img.punchDistance = 60

    img.keys = {
        a: false,
        d: false,
        blocking: false
    }

    img.dodgeHold = 0
    img.isDodging = false
    img.canDodge = true
    img.dodgeCooldown = 0

    img.canBlock = true
    img.isBlocking = false

    img.firstFrame = true

    return img;
}

let player = createImage("Resources/Player/player.png", 100, 240, 200, 200, 100, 100, 10, 0, 2, "idle")

player.idleImage.src = 'Resources/Player/PlayerIdle.png'
player.rightWalkImage.src = 'Resources/Player/PlayerRWalk.png'
player.leftWalkImage.src = 'Resources/Player/PlayerLWalk.png'
player.jabImage.src = 'Resources/Player/PlayerJab.png'
player.crossImage.src = 'Resources/Player/playerCross.png'
player.dodgeImage.src = 'Resources/Player/playerDodge.png'
player.blockImage.src = 'Resources/Player/playerBlock.png'
player.blockRImage.src = 'Resources/Player/blockRight.png'
player.blockLImage.src = 'Resources/Player/blockLeft.png'

let enemy = createImage("Resources/Enemy/enemy.png", 700, 240, 200, 200, 100, 100, 10, 0, 2, "idle")

enemy.idleImage.src = 'Resources/Enemy/enemyIdle.png'
enemy.leftWalkImage.src = 'Resources/Enemy/enemyWalkLeft.png'
enemy.rightWalkImage.src = 'Resources/Enemy/enemyWalkRight.png'
enemy.jabImage.src = 'Resources/Enemy/enemyJab.png'
enemy.crossImage.src = 'Resources/Enemy/enemyCross.png'
enemy.dodgeImage.src = 'Resources/Enemy/enemyDodge.png'
enemy.blockImage.src = 'Resources/Enemy/enemyBlock.png'
enemy.blockRImage.src = 'Resources/Enemy/EBlockRight.png'
enemy.blockLImage.src = 'Resources/Enemy/EBlockLeft.png'

let enemyStyles = {
    moveStyle: "neutral", // either maintaining distance, closing distance, or neutral
    idleStyle: "neutral", // either defensive w/ guard, neutral, or counter-ready
    counterStyle: "counter", // either dodging to escape, or dodging to counter
    attackStyle: "poke", // poke, burst, counter, pressure
    timingStyle: "instant" // slow, or instant
}

let leagueFight = false
const leagueFighters = [
    ["KING K.O.", 18, 0, 0, 100, 10, 2],
    ["THE PHANTOM", 16, 2, 0, 95, 9, 1],
    ["RED VIPER", 15, 0, 3, 90, 8, 0],
    ["DEADEYE", 12, 2, 2, 85, 8, 0],
    ["STEELHAND", 14, 1, 5, 80, 8, 0],
    ["GHOST JAB", 12, 3, 3, 75, 7, 0],
    ["BULLET BLAKE", 11, 5, 4, 70, 7, 0],
    ["HAYMAKER", 9, 3, 5, 65, 7, 0],
    ["CRUSHER", 8, 2, 3, 60, 6, 0],
    ["MAD DOG", 6, 1, 4, 55, 6, 0],
    ["DUMPSTER DAVID", 5, 2, 1, 50, 6, 0],
    ["KNOCKOUT NED", 3, 0, 2, 50, 5, 0],
    ["SMASH MAN", 2, 1, 2, 50, 5, 0],
    ["AVERAGE JOE", 1, 0, 1, 50, 5, 0]
]

let saveState = {
    playerName: "",
    rankIndex: 14,
    playerWins: 0,
    playerDraws: 0,
    playerLosses: 0,
    playerDamage: 10,

    enemyHp: 50,
    enemyDmg: 10,
    enemyDef: 0,
}
