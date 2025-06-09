# Worm Wrangler - Gameplay Improvements TODO

This file lists potential improvements and new features for the Worm Wrangler game.

## Gameplay Mechanics & Features

### Difficulty Levels

- [x] Implement Easy, Medium, Hard difficulty settings. (Implemented in `javascript/gamePageScript.js` and `javascript/introPage.js`)
  - [x] Adjust worm pop-up speed based on difficulty. (Implemented in `javascript/gamePageScript.js`)
  - [x] Adjust worm display duration based on difficulty. (Implemented in `javascript/gamePageScript.js`)
  - [x] Adjust game timer length based on difficulty. (Implemented in `javascript/gamePageScript.js`)
  - [x] Adjust maximum allowed misses based on difficulty. (Implemented in `javascript/gamePageScript.js`)
  - [x] Adjust number of worms required to win (if applicable) based on difficulty. (Implemented in `javascript/gamePageScript.js`)
- [x] Add UI on the intro page to select difficulty. (Implemented in `index.html`)

### Special Worms/Items

- [x] **Golden Worm:** (Implemented in `javascript/gamePageScript.js` and `css/gamePageCss.css`)
  - [x] Appears rarely. (Implemented in `javascript/gamePageScript.js`)
  - [x] Awards significantly more points (e.g., 25 points). (Implemented in `javascript/gamePageScript.js`)
  - [x] Different visual appearance. (Implemented in `css/gamePageCss.css` and `javascript/gamePageScript.js`)
- [x] **Time Worm:** (Implemented in `javascript/gamePageScript.js` and `css/gamePageCss.css`)
  - [x] Adds a few extra seconds to the timer when collected. (Implemented in `javascript/gamePageScript.js`)
  - [x] Distinct visual appearance. (Implemented in `css/gamePageCss.css` and `javascript/gamePageScript.js`)
- [x] **Bomb/Obstacle:** (Implemented in `javascript/gamePageScript.js` and `css/gamePageCss.css`)
  - [x] Clicking deducts points, reduces time, or counts as multiple misses. (Implemented in `javascript/gamePageScript.js` - deducts points and adds to misses)
  - [x] Distinct visual appearance. (Implemented in `css/gamePageCss.css` and `javascript/gamePageScript.js`)
  - [x] Ensure it doesn't make the game unfairly difficult. (Balanced by chance and penalty values in `GAME_CONFIG`)

### Scoring System Enhancements

- [ ] **Combo Bonus:**
  - [ ] Track consecutive successful worm collections.
  - [ ] Award bonus points for reaching combo milestones.
  - [ ] Visual/audio feedback for combos.
    - [ ] Design visual feedback for combos (e.g., "Combo x3!" graphic, particle effects).
      - [ ] **Asset:** "Combo X!" graphic.
          - **Image Generation Prompt:** `Dynamic "COMBO X[Count]!" text graphic for a game score multiplier. Style: Energetic, slightly fiery or electric, with a sense of achievement. Color: Bright orange/yellow with a darker outline. Font: Playful but clear. Background: Transparent. Provide versions for X2, X3, X4, X5.`
      - [ ] **Asset (if image-based):** Particle effect sprites.
          - **Image Generation Prompt:** `Sprite sheet of small, sparkling particle effects for a game combo bonus. Types: Golden starbursts, shimmering glints, small colorful sparks. Animation: Burst, linger, and fade. Background: Transparent.`
    - [ ] Create a sound effect for achieving/increasing combos.
      - **Audio Generation Prompt:** `Satisfying, escalating sound effect for achieving/increasing a combo streak. Characteristics: Could be a series of ascending musical notes, a 'power-up' type of sound that layers or becomes more complex with each combo increment. Initial combo ~0.5s, subsequent additions shorter and brighter.`
- [ ] **Accuracy Bonus:**
  - [ ] Calculate accuracy (hits vs. misses) at the end of the game.
  - [ ] Award bonus points for high accuracy.

### New Game Modes

- [ ] **Endless Mode:**
  - [ ] Worms appear indefinitely.
  - [ ] Speed/frequency of worms gradually increases.
  - [ ] Game ends after a set number of misses.
  - [ ] Focus on achieving the highest score.
- [ ] **Target Practice Mode:**
  - [ ] Player needs to collect a specific number of worms.
  - [ ] Score is based on the time taken.

## Visual & Audio Feedback

- [ ] **Enhanced Miss Feedback:**
  - [ ] Add a visual cue (e.g., screen flash, "MISS!" text animation) when a miss occurs.
  - [ ] Consider if a specific "MISS!" image graphic is needed or if CSS/JS animation is sufficient.
    - [ ] **Asset (if image-based):** "MISS!" graphic.
        - **Image Generation Prompt:** `Create a bold, impactful "MISS!" text graphic for a game. Style: Cartoonish, slightly distressed or with a motion blur effect. Color: Bright red with a white or yellow outline. Background: Transparent.`
- [ ] **Worm Animations:**
  - [ ] Animate worms peeking up and hiding instead of instant appear/disappear.
  - [ ] Utilize the existing `movingWorm` images in `animationEffect` or create new sprites (e.g., a sequence for peeking, visible, hiding).
    - [ ] **Asset (if new sprites needed):** Worm animation sprite sheet.
        - **Image Generation Prompt:** `Pixel art sprite sheet for a friendly cartoon worm character for a 2D game. Sequence: 1. Worm partially peeking out of a hole (eyes visible). 2. Worm fully emerged from hole. 3. Worm starting to retreat into hole. 4. Worm almost fully retreated. Style: Cute, simple, earthy tones. Background: Transparent.`
- [ ] **Sound Design:**
  - [ ] Add unique sound effects for special worms/items.
    - [ ] Sound effect for Golden Worm collection.
      - **Audio Generation Prompt:** `Short (1-1.5s), magical, rewarding sound effect for collecting a rare "Golden Worm". Characteristics: Bright, positive, a distinct 'chime' or 'sparkle' with a hint of high value. Example: A clear, ascending bell tone with a subtle shimmer.`
    - [ ] Sound effect for Time Worm collection.
      - **Audio Generation Prompt:** `Sound effect (1-2s) for collecting a "Time Worm" that adds time to a game clock. Characteristics: A gentle, positive 'swoosh', 'tick-tock acceleration', or a soft 'chime' with a slight temporal distortion or echo. Should feel beneficial and slightly ethereal.`
  - [ ] Add a sound cue when the game timer is low (e.g., last 5 seconds).
    - **Audio Generation Prompt:** `Tense, rhythmic ticking sound effect for a game timer running low (last 5-10 seconds). Characteristics: Clear 'tick-tock' that gradually increases in speed or pitch to build urgency. Should be loopable or a segment that can be repeated effectively.`
  - [ ] Create and integrate a sound effect for when a bomb is clicked.
    - **Audio Generation Prompt:** `Short, impactful negative sound effect (0.5-1s) for clicking a bomb/obstacle in a game. Characteristics: A dull 'thud', a muffled 'explosion', or a 'sizzle-pop' indicating a penalty. Avoid overly harsh or loud sounds, but clearly negative.`

## UI/UX Improvements

- [ ] **Game Over Screen:**
  - [ ] Display more detailed statistics (e.g., accuracy %, worms missed, special items collected).
- [ ] **Pause Functionality:**
  - [ ] Implement a way to pause and resume the game.
  - [ ] Ensure the timer and game state are correctly handled.
- [ ] **Instructions/How to Play:**
  - [x] Add a "How to Play" section or a dedicated page accessible from the home screen. (Implemented in `index.html`)
  - [x] Explain game objectives, controls, difficulty levels, and special items. (Implemented in `index.html`)
- [ ] **Glove Selection Requirement:**
  - [x] Disable the "Start Game" button on the intro page until a glove is selected. (Implemented in `javascript/introPage.js`)
  - [x] Display a tooltip or message (e.g., "Please select a glove to start!") if the user tries to start without selecting a glove. (Implemented in `javascript/introPage.js`)

## Code & Technical Refinements

- [ ] **Refactor `startGame()` function:**
  - [ ] Break down into smaller, more focused functions for better readability and maintainability.
- [x] **Review and Centralize Game Configuration:** (Implemented in `javascript/gamePageScript.js`)
  - [ ] Group game parameters (timer duration, miss limits, worm speeds for different difficulties) into a configuration object or constants at the top of the script for easier tweaking.
- [ ] **Improve `popUpWorm()` Logic:**
  - [ ] Ensure a worm doesn't try to pop up in a hole that already has an active worm (if display times can overlap).
- [ ] **Code Comments:**
  - [ ] Add more comments to explain complex sections of the code or non-obvious logic.

## Project Management

- [x] Create a CHANGELOG.md file to track project changes. (Implemented in /Users/aramb/Documents/GitHub/worm-wrangler/CHANGELOG.md)
- [x] Create a changelog page on the website that renders CHANGELOG.md. (Implemented in /Users/aramb/Documents/GitHub/worm-wrangler/changelog.html)
