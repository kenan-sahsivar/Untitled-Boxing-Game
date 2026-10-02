let canvas = document.getElementById("gameWindow");
let ctx = canvas.getContext("2d", {antialias: false});
ctx.imageSmoothingEnabled = false;
canvas.style.imageRendering = "pixelated"; // For modern browsers
let menu = document.getElementById("playAgainMenu");

let background = new Image()
background.src = "Resources/Background/background.png"

let clock = new Image()
clock.src = "Resources/Background/clock.png"

let animateLoop
