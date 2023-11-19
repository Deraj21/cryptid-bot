# Cryptid Bot

## Basic Idea
My wife and I enjoy the board game “Cryptid,” but it can only be played with 3 or more people. There is a variant that allows for 2 people, but it’s actually just a 4 player game, and each player gets 2 clues and 2 colors of tokens. I want to fix this by creating a “robot” (an app) that will act as the 3rd person.

### Requirements
- The app displays the board and structures for the particular game setup
- **Player's Turn**
  - Players can “ask” the bot about a hex, specifically: "According to its clue, can the Cryptid reside here?"
    - The bot replies with a yes or no (placing a cylinder or a cube respectively)
  - Players place their own cubes and cylinders when asked questions or when a player they ask responds with a cube; this is so that the bot is kept up-to-date on where it can place pieces.
- A player can also search a spot to see if the cryptid is there
- When it’s the bot’s turn, a players take turns taking the role of the bot, asking or searching.

### How to pull it off
- board data is collected by the `setup screen`
  - where the board pieces go, and are they rotated?
  - are we in advanced mode?
  - where are the structures placed?
  - which colors are playing?
  - which colors are bots, and which are people?
- the `play screen` uses html5 canvas to display the board and structures
- once the player starts the game, a new 

---

## Tech Used
- react, react-router, redux
- materialUI (mui), 

---

`LAST`
- menu items only display what is legal
  - bot cannot asked about a hex they already played on
  - players cannot play on a hex they already played on
  - no one can play on a hex that has a "no" marker on it

`NEXT`
- bug fixes
- TESTING


