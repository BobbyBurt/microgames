# Phaser Microgames
I’m making my own little warioware game as an exercise in learning Phaser. Smaller experiments that I can later make into a full experience seems like the best way to learn this framework, giving me the chance to try out all this exciting stuff in small bursts.

<br /> 

## Goals
Seems like the perfect way to experiment with mobile compatibility. As such, input is focused on touch and the screen needs to be adaptable.

<br /> 

## Overall design doc
### Input
Microgame input is limited to mouse / touch. Some games will be exclusive to desktop or mobile if they rely on the differences of their input, such as cursor or multitouch.

### Difficulty
Each microgame dan be initialized with a 1-3 integer as a difficulty setting, which determines the variation of the game.

### Time
Timer time varies depending on the stage and how many microgames in the player is. I'll have to make microgames with variable time in mind. On top of screen scaling...

### Gamemodes
I love the idea of a hot potato multiplayer mode where players pass the phone in a circle taking turns. It could be similar to multiplayer modes in WW Smooth Moves

### Brainstorming
Could I imitate WW Smooth Moves’ forms by requiring the user to change the phone orientation fo

<br /> 

## Dev Plan
For now I’m not too worried about the framework and technicality of microgames, like varying speed / time. Just taking the opportunity to experiment and make a bunch of microgames. I’m working on a basic debug microgame launcher for now, which will be enough to test / show off the microgames as I make them

<br /> 

## To-do / Left-of
v1
- [x] menu scene should be woken up, not started. Same instance will persist
- [x] simple timer display. it can just be a bar at the bottom
- [x] timer interpolates color. Currently can't figure out how to convert color object to string that can be used for graphic fillstyle
- [x] indicate success or failure in menu scene
- [ ] make a microgame using the most basic baby programming. Give it the fully audio & adaptive visual treatment
v2
- [ ] ability to select microgame in menu scene
- [ ] current screen resize method only allows resizing of elements in "main" scene (?) It should be replaced with an event solution if possible

<br /> 

## Warioware notes
#### Timer
In the original it's 3.7 seconds, in Smooth Moves it's 4.5. This increase in time likely has to do with the indirectness of the wii remote, and that's something I think I should replicate.
Some microgames will bring you back to the main scene before the timer ends, if you beat it especially early

<br /> 

## Microgame ideas
### Clear!
Tetris, with an obvious spot to place the current tetrimino to clear the line. Harder variations might require you to fit into a tricky spot or use the next tetrimino

### Sort!
Similar to that bomb-omb sorting minigame on the DS and using Phaser’s drag zones, drag objects into two categories to sort them

### Uncover!
Drag objects away to reveal something hiding under

### Feed!
Feed the Insaniquarium fish

### Hang up!
Hang up bens phone

### Hide!
Drag pigeons into hiding spots as hunter loads his gun

### Gotta go!
Press the free stall. Others have feet visible under the *doors*

### Censor!
Drag a marker to censor an image. Maybe the eyes of someone

### Close!
Hit the small X on the corner of the mobile ad, or else your ass is going to the App Store

### Ignore!
Don't touch the screen

### Bath!
kid's running around, catch him and drag to bath. Inspired by Calvin & Hobbes.

### Shoot imposter!
POV you're holding a gun and you're looking at a person and a robot clone of him fight. Tap on the the robot to shoot him, don't hit the real person.

### Cut!
Papa Louie style pizza cutting. Might ask for 4 slices, 6, or 8

- - - -