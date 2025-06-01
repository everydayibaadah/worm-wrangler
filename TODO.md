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
- [ ] **Worm Animations:**
  - [ ] Animate worms peeking up and hiding instead of instant appear/disappear.
  - [ ] Utilize the existing `movingWorm` images in `animationEffect` or create new sprites.
- [ ] **Sound Design:**
  - [ ] Add unique sound effects for special worms/items.
  - [ ] Add a sound cue when the game timer is low (e.g., last 5 seconds).
  - [ ] Create and integrate a sound effect for when a bomb is clicked.

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
