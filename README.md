# This is my tic-tac-toe game

[Check the game out here](https://gorff.github.io/Project_0/)

## Description of features

This games lets you play a game of tic tac toe and;
* Use any image you want as your player icon - without persisting the image data
* Tracks your scores using local storage
* Lets you select and grid size to play on
* Has the capability to detect wins/losses/draws on any arbritrary grid size. It is even well behaved on grids smaller than 3x3.
* Clear scores from memory.

Most updating of UI is done via JQuery, player icons images are updated using `URL.createObjectURL`. Some CSS styling is given by [water.css](https://watercss.kognise.dev/). 