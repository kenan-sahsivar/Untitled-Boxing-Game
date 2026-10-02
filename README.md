# Untitled Boxing Game

**A hand-crafted 2D boxing fighter built from scratch in HTML5 Canvas & JavaScript**  
*AP Computer Science Principles (AP CSP) Final Project — developed well beyond the course curriculum*

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Canvas API](https://img.shields.io/badge/Canvas%20API-Game%20Engine-0A66C2?style=flat-square)
![Aseprite](https://img.shields.io/badge/Art-Aseprite%20Pixel%20Art-7D929E?style=flat-square)
![Status](https://img.shields.io/badge/Status-Playable-success?style=flat-square)

---

## Overview

Untitled Boxing Game is a complete browser-based fighting game: real-time combat, stamina management, frame-timed attacks, defensive systems, adaptive AI, local 2-player mode, a ranked league climb, and clipboard-based save/load; implemented without frameworks or game engines, using vanilla js.


**Every line of gameplay code and nearly every visual asset was created by me.** Character sprites, animations, UI art, and the tutorial graphics were hand-drawn in [Aseprite](https://www.aseprite.org/). The only non–hand-drawn asset is `background.png`.

---

## Demo Preview

<p align="center">
  <img src="Resources/Player%20Keybinds/image5.jpg" alt="Gameplay overview — Player vs Player or AI" width="720">
</p>

<p align="center"><em>Full match view: dual fighters, animated HUD, and a 3:00 round clock</em></p>

---

## Features

### Real-Time Combat System
- **Light jab** and **heavy cross** with different startup, stamina cost, and damage multipliers
- **Directional blocking** that raises defense but slows movement
- **Dodge** with invulnerability windows. A successful dodge *rewards* a small health recovery and a “DODGED!” feedback animation
- **Stamina economy** gating offense and defense; stamina regenerates over time
- **Hit timing** tied to animation frames (damage applies on a specific punch frame, not on button press)
- **Knockout or decision** wins: deplete health, or lead on remaining HP when the timer hits zero

### Adaptive AI Opponent
The CPU is not a single “attack randomly” script. It continuously re-evaluates style based on match state:

| Style Layer | Behaviors |
|-------------|-----------|
| **Movement** | Aggressive (close distance), passive (retreat), or neutral (hold mid-ring) |
| **Idle / Guard** | Guard up, stay open, or counter-ready based on HP and stamina |
| **Attack** | Poke (prefer jabs) vs pressure (prefer crosses) depending on stamina advantage |
| **Counter** | Escape dodges vs counter dodges when the player is mid-punch |
| **Timing** | Beginner AI reacts slowly; Advanced AI reacts much more aggressively |

The AI also responds to **clock pressure** (more aggressive under 45 seconds), **stamina gaps**, and **range** (attacks only when in punch distance).

### Difficulty & Modes
- **Practice → Beginner** — slower AI timing (easier to read and punish)
- **Practice → Advanced** — faster, more punishing AI reactions
- **Practice → 2 Player** — full local multiplayer with separate keybinds
- **Ranked League** — climb a 14-fighter ladder; each opponent has unique HP, damage, and defense

### Ranked League Progression
Start at the bottom of the board and challenge the fighter above you. Wins raise your rank and update W-D-L records on the leaderboard. Higher opponents are significantly stronger, and reaching **KING K.O.** is the endgame goal. 

League roster includes characters such as *Average Joe*, *Dumpster David*, *Haymaker*, *The Phantom*, and *King K.O.*, each with tuned stats.

### Save / Load System
Progress is serialized to a Base64 save string, copied to the clipboard, and can be pasted back later without the use of a backend or any accounts. Ideal for continuing a ranked climb across sessions.

### Animation & Presentation
- Per-stance sprite sheets: idle, walk L/R, jab, cross, dodge, block, block-walk L/R
- Frame-capped ~60 FPS game loop
- Animated health/stamina bars with delayed “hurt” indicators
- Cinematic text animations
- Pixel-perfect rendering

---

## How to Play

### HUD & Core Rules

<p align="center">
  <img src="Resources/Player%20Keybinds/image1.jpg" alt="HUD: player and enemy health and stamina bars" width="720">
</p>

<p align="center"><em>Health (red) and stamina (green) for both fighters - manage stamina or your offense shuts down</em></p>

<br>

<p align="center">
  <img src="Resources/Player%20Keybinds/image4.jpg" alt="Game timer win condition" width="720">
</p>

<p align="center"><em>Rounds last 3:00. If time expires, the fighter with the highest remaining health wins</em></p>

### Combat Tips
- **Jabs** are faster and cheaper but deal less damage (0.75× multiplier).
- **Crosses** cost more stamina and take longer, but deal full damage.
- **Blocking** adds defense and enables block-walk animations, but halves movement speed.
- **Dodging** costs stamina and has a cooldown. Landing it during an opponent’s punch window rewards the player a health bonus.
- Backing up while pressuring (and vice versa) matters: spacing decides whether punches connect.

---

## Controls

Tutorial images were drawn for an in-game tutorial that did not ship in the final build due to a time constraint. They remain the canonical control reference:

### Player 1

<p align="center">
  <img src="Resources/Player%20Keybinds/image2.jpg" alt="Player 1 keybinds" width="560">
</p>

| Action | Key |
|--------|-----|
| Strafe left | `A` |
| Strafe right | `D` |
| Block | `S` |
| Light hit (jab) | `G` |
| Heavy hit (cross) | `H` |
| Dodge | `Space` |

### Player 2 (Local Multiplayer)

<p align="center">
  <img src="Resources/Player%20Keybinds/image3.jpg" alt="Player 2 keybinds" width="560">
</p>

| Action | Key |
|--------|-----|
| Strafe left | `←` |
| Strafe right | `→` |
| Block | `↓` |
| Light hit (jab) | `K` |
| Heavy hit (cross) | `L` |
| Dodge | `/` |

### Menus
Click a menu option to highlight it, then press **Enter** to confirm (Practice, Ranked, Save/Load, difficulty, challenge, play again, etc.).

---

## Technical Architecture

Built as a modular vanilla JS app — no React, no Phaser, no external game libraries.

```
FinalProject2025 - Final/
├── index.html           # UI shells: name entry, menus, canvas, league board
├── styles.css           # Retro “Press Start 2P” presentation
├── js/
│   ├── canvas.js        # Canvas setup & pixel rendering flags
│   ├── entities.js      # Fighter factory, sprites, league roster, save schema
│   ├── state.js         # Shared runtime / animation state
│   ├── combat.js        # Movement, punches, dodge, block, damage timing
│   ├── ai.js            # Multi-layer CPU style & controller
│   ├── render.js        # Background, sprites, HUD bars, VFX text
│   ├── game.js          # 60 FPS loop, round timer, match resolution
│   ├── menu.js          # Menus, league UI, save/load, popups
│   └── input.js         # Keyboard + menu selection wiring
└── Resources/
    ├── Player/          # Hand-drawn player sprites + Aseprite sources
    ├── Enemy/           # Hand-drawn enemy sprites + Aseprite sources
    ├── Background/      # Ring clock art + background
    └── Player Keybinds/ # Tutorial boards (controls & mechanics)
```

## Art Pipeline

| Asset | Method |
|-------|--------|
| Player & enemy idle, walk, jab, cross, dodge, block sheets | Hand-drawn & animated in Aseprite |
| HUD clock | Hand-drawn in Aseprite |
| Tutorial / keybind boards | Hand-drawn tutorial graphics |
| Ring background (`background.png`) | External asset (only exception) |

Source `.aseprite` files are included under `Resources/**/AsepriteFiles/` so the full art pipeline is part of the repository — not just exported PNGs.

---

## Getting Started

### Requirements
- A modern browser (Chrome, Edge, Firefox, or Safari)
- No build step, package manager, or server required for local play

### Run locally
1. Clone this repository  
2. Open `index.html` in your browser  
   - Or serve the folder with any static server (e.g. VS Code Live Server) if your browser restricts local file loading

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
# then open index.html
```
---

## Academic Context

This project was created as the **AP Computer Science Principles** final project. AP CSP introduces foundational ideas (algorithms, abstraction, data, the Internet). This game intentionally went further:

- Real-time simulation and frame timing  
- State machines for combat and AI
- Data persistence without a backend  
- Modular code organization across multiple JS files  
- End-to-end ownership of **design, art, animation, and engineering**

It demonstrates that the same principles taught in CSP scale into a full interactive product when pushed with enough ambition.

---



## Known Scope Notes

- In-game tutorial screens (the Keybind boards above + other pages) were designed and drawn but not wired into the final menu flow; they live in `Resources/Player Keybinds/` and are documented here.
- Sound design was considered but deprioritized for the AP CSP deadline.
- Title remains “Untitled Boxing Game” as a deliberate working name from development.

---

## License

This project is provided for portfolio and educational viewing.  
All original code and hand-drawn assets © the author. Please do not redistribute the art assets as your own work.

---

<p align="center">
  <strong>Built entirely by me, coded from scratch, with the use of AI for stylistic choices (CSS).</strong>
</p>
