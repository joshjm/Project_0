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

# AI
This game implements the **Minimax** algorithm, and is generalized to work with any grid size, and run on any turn. 

Minimax basically lays out a tree of all the possible future moves of the board. When a game over state is reached  (a draw or a win), the board is given a score (-1, 0 or 1) depending on whether it was the player at the top of the tree who won. ie, if the peson running the algorithm wins. 

Depending on each turn of the game (ie the level of the tree) the scores of sibling branches are chosen between as a move choice by either taking the minimum score (if it was not the player at the top of the trees turn) or by taking the maximum score. 

These scores are propagated back up the tree, with alternating minimizing or maximizing depending on whos turn it was at that branch. 

Ultimatly this should lead back to first branch point, and allow a decision to be made about what the next move of the game should be. 

This allows you to rank all the possible next moves against each other, and pick and optimal move. 
