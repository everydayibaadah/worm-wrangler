# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial project setup.

## [0.1.0] - 2025-05-31

### Added

- Basic game structure and functionality.
- Worm popping and clicking mechanics.
- Scoring system.
- Game timer.
- Sound effects for hit, miss, and game completion.
- Initial UI for intro and game pages.

## [0.2.0] - 2025-05-31

### Added

- **Difficulty Levels:** Implemented Easy, Medium, and Hard difficulty settings affecting game timer, miss limits, worm pop-up speed, and display duration. Players can select difficulty on the intro page. (Implemented in `javascript/gamePageScript.js`, `javascript/introPage.js`, `index.html`)
- **Special Item: Golden Worm:** A rare worm that awards significantly more points (25 points). It has a distinct golden appearance. (Implemented in `javascript/gamePageScript.js`, `css/gamePageCss.css`)
- **Special Item: Time Worm:** A special worm that adds extra seconds to the game timer when collected. It has a distinct appearance. (Implemented in `javascript/gamePageScript.js`, `css/gamePageCss.css`)
- **Special Item: Bomb/Obstacle:** An item that, if clicked, deducts points and counts as multiple misses. It has a distinct appearance. (Implemented in `javascript/gamePageScript.js`, `css/gamePageCss.css`)
