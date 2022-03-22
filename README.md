# Phaser Microgames
I’m making my own little warioware game as an exercise in learning Phaser. Smaller experiments that I can later make into a full experience seems like the best way to learn this framework, giving me the chance to try out all this exciting stuff in small bursts.

## Goals
Seems like the perfect way to experiment with mobile compatibility. As such, input is focused on touch and the screen needs to be adaptable.

## Overall design doc
### Input
Microgame input is limited to mouse / touch. Some games will be exclusive to desktop or mobile if they rely on the differences of their input, such as cursor or multitouch.

### Difficulty
Each microgame dan be initialized with a 1-3 integer as a difficulty setting, which determines the variation of the game.

### Gamemodes
I love the idea of a hot potato multiplayer mode where players pass the phone in a circle taking turns. It could be similar to multiplayer modes in WW Smooth Moves

### Brainstorming
Could I imitate WW Smooth Moves’ forms by requiring the user to change the phone orientation fo

## Dev Plan
For now I’m not too worried about the framework and technicality of microgames, like varying speed / time. Just taking the opportunity to experiment and make a bunch of microgames. I’m working on a basic debug microgame launcher for now, which will be enough to test / show off the microgames as I make them

## Microgame ideas
#### Clear!
Tetris, with an obvious spot to place the current tetrimino to clear the line. Harder variations might require you to fit into a tricky spot or use the next tetrimino

#### Sort!
Similar to that bomb-omb sorting minigame on the DS and using Phaser’s drag zones, drag objects into two categories to sort them

#### Uncover!
Drag objects away to reveal something hiding under

## To-do
- [ ] get framework in place and working

## Left-off
- I was setting up the timer to be launched on top of whatever microgame is playing
- Next I gotta used the scenes communicating with each other through events. 
- The menu scene should only sleep and resume when microgame is done. Can it recieve events in this state?
- Need to set up events that will emmit from microgames to signal success or failure.