# Worm Wrangler - Gameplay Improvements TODO

This file lists potential improvements and new features for the Worm Wrangler game.

## Gameplay Mechanics & Features

### Difficulty Levels

- [ ] Implement Easy, Medium, Hard difficulty settings.
  - [ ] Adjust worm pop-up speed based on difficulty.
  - [ ] Adjust worm display duration based on difficulty.
  - [ ] Adjust game timer length based on difficulty.
  - [ ] Adjust maximum allowed misses based on difficulty.
  - [ ] Adjust number of worms required to win (if applicable) based on difficulty.
- [ ] Add UI on the intro page to select difficulty.

### Special Worms/Items

- [ ] **Golden Worm:**
  - [ ] Appears rarely.
  - [ ] Awards significantly more points (e.g., 25 points).
  - [ ] Different visual appearance.
- [ ] **Time Worm:**
  - [ ] Adds a few extra seconds to the timer when collected.
  - [ ] Distinct visual appearance.
- [ ] **Bomb/Obstacle:**
  - [ ] Clicking deducts points, reduces time, or counts as multiple misses.
  - [ ] Distinct visual appearance.
  - [ ] Ensure it doesn't make the game unfairly difficult.

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

## UI/UX Improvements

- [ ] **Game Over Screen:**
  - [ ] Display more detailed statistics (e.g., accuracy %, worms missed, special items collected).
- [ ] **Pause Functionality:**
  - [ ] Implement a way to pause and resume the game.
  - [ ] Ensure the timer and game state are correctly handled.

## Code & Technical Refinements

- [ ] **Refactor `startGame()` function:**
  - [ ] Break down into smaller, more focused functions for better readability and maintainability.
- [ ] **Review and Centralize Game Configuration:**
  - [ ] Group game parameters (timer duration, miss limits, worm speeds for different difficulties) into a configuration object or constants at the top of the script for easier tweaking.
- [ ] **Improve `popUpWorm()` Logic:**
  - [ ] Ensure a worm doesn't try to pop up in a hole that already has an active worm (if display times can overlap).
- [ ] **Code Comments:**
  - [ ] Add more comments to explain complex sections of the code or non-obvious logic.
