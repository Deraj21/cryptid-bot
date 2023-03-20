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
- the `play screen` uses canvas to display the board, and structures
- once the player starts the game, a new 

---

## Tech Used
- react, react-router, redux
- materialUI (mui), 

---

## Todo
### "play game" functionality
- ~~have a (couple few) design session(s)~~
- ~~try to get map data from that one cryptid board setup site~~
- ~~`LEFT OFF:` convert setup data to board data~~
  - ~~"grid" of hexes~~
- using Canvas, display:
  - board pieces
  - structures
- make no/yes markers in some art program
- display
  - no markers
  - yes markers
- add custom menu on click

### other
- test, test, test

### future ideas
- reset chunk placement button (prevents user from having to reload page and start from scratch)
- map chunks can be swapped
- bot can take its own turn (randomly selects a player and a hex and asks)
  - (way down the line) bot acts like a player, and decides who to ask where based on what information it still needs
- map solver visualization tool
  - map can highlight areas of the map based on inputted clues, to see the overlap
  - ex: all hexes 3 from blue structure colored in blue, hexes within 1 of forest highlighted in red, and the overlapping purple hexes are the possibilities

---

## Bugs
- board chunks can be placed on top of other board chunks, effectively 'deleting' one of the chunks from being able to be placed
- sometimes board chunks won't allow drag and drop
- would be nice if board chunks retained their rotation state when being moved
- there's some crazy animation stuff going on when rotating, and dragging-dropping
  - maybe set all css animation settings to 0s and then start experimenting from there
- should not be able to place multiple structures on one hex





