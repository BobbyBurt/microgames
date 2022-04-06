# Phaser Microgames
I’m making my own little warioware game as an exercise in learning Phaser. Smaller experiments that I can later make into a full experience seems like the best way to learn this framework, giving me the chance to try out all this exciting stuff in small bursts.

<br /> 

## Goals
Seems like the perfect way to experiment with mobile compatibility. As such, input is focused on touch and the screen needs to be adaptable.

<br /> 

## Overall design doc
### Input
Microgame input is limited to mouse / touch. Some games will be exclusive to desktop or mobile if they rely on the differences of their input, such as cursor or multitouch.

### Visuals
I should take the most inspiration from the original WW, since it's pretty simple. Often it's just small simple sprites on a solid colour background. That'll really help reduce scaling complexity

### Difficulty
Each microgame dan be initialized with a 1-3 integer as a difficulty setting, which determines the variation of the game.

### Time
Timer time varies depending on the stage and how many microgames in the player is. I'll have to make microgames with variable time in mind. On top of screen scaling...
Timer visual can be a hand counting down in place of WW's bomb. Or is that lame

### Gamemodes
I love the idea of a hot potato multiplayer mode where players pass the phone in a circle taking turns, similar to multiplayer modes in WW Smooth Moves. To encourage players to pass the botone to the next player, a bomb could be shortening it's fuse after the microgame until the next player has the device. If the bomb explodes on you, (which will happen instantly if you lose a microgame,) then you're out.

### Brainstorming
Could I imitate WW Smooth Moves’ forms by requiring the user to change the phone orientation fo

<br /> 

## Dev Plan
For now I’m not too worried about the framework and technicality of microgames, like varying speed / time. Just taking the opportunity to experiment and make a bunch of microgames. I’m working on a basic debug microgame launcher for now, which will be enough to test / show off the microgames as I make them

<br /> 

## To-do

- [ ] ability to select microgame in menu scene
- [ ] Obvious win / lose feedback in menu scene
- [ ] learn how best to do audio
  - [ ] add audio to icebreaker microgame
- [ ] give icebreaker a visual treatment with original assets.
  - [ ] improve break feedback
- [x] microgame scene which all microgames extend to reduce redundancy
  - [x] REDO - set menu to start icebreaker, set main to start menu
- [x] scalemanager stuff
  - [x] REDO - refactor boot into scalemaster
  - [x] REDO - set camera center to 0,0 on resize by setting scroll
  - [x] figure out how to call resize functions on each scene's create
  - [ ] setup scalemanager to have public functions and variables. Not sure how to do that properly
  - [x] turn resize function into an event with a function callback (didn't work for me for some reason)

### eventually

- [ ] setup timer to accept variable time
- [ ] figure out how to make a game scene to extend

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

### Remember!
Instructions like "cut green wire, then red, then blue." Player can't do anything and automatically wins.

### Shoot imposter!
POV you're holding a gun and you're looking at a person and a robot clone of him fight. Tap on the the robot to shoot him, don't hit the real person.

### Slice!
Papa Louie style pizza cutting. Might ask for 4 slices, 6, or 8

### Cut!
Open panel of a bomb with red, green and blue wire. Cut in the order given in *Remember!*

### Dial!
Dial the number to a pizza place or police, depending on the situation

### Steal!
Based on that John Travolta game on NG, steal a guy's possessions by tapping on them when he isn't looking

### Find!
Pointer is a flashlight that helps you locate a little guy running around

- - - -