# Cryptid Bot

## Basic Idea
Rachel and I enjoy the board game “Cryptid,” but it can only be played with 3 or more people. There is a variant that allows for 2 people, but it’s actually just a 4 player game, but each player gets 2 clues and 2 colors of tokens. I want to fix this by creating a “robot” (an app) that will act as the 3rd person.

## How to pull it off
- The app displays the board and structures for the particular game setup
- During their turn, players can “ask” the bot about a hex, and if according to their clue, can the Cryptid reside there
  - The bot replies with a yes or no (placing a cylinder or a cube respectively)
- A player can also search a spot to see if the cryptid is there
- When it’s the robot’s turn, they randomly select a player, and randomly select a hex that doesn’t already have a cube on it. The player answers yes or no.
  - If no, the bot will play a cube somewhere randomly on the board where the cryptid cannot be, according to their clue
- The bot will never initiate a search

## todo before starting the "play game" functionality
- ~~add spacing around the color-player-picker drop-downs~~
- add "finished" button at the bottom
- add "advanced mode" toggle
- add structure placement bar
  - "advanced mode" toggle adds / removes the black structures

## Bugs
- board chunks can be placed on top of other board chunks, effectily 'deleting' one of the chunks from being able to be placed
- sometimes board chunks won't allow drag and drop
- would be nice if board chunks retained their rotation state when being moved

