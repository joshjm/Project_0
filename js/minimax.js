$(document).ready(function () {
    $('#aiMove').on('click', function () {
        let move;
        let bestScore = -Infinity;

        for (let row = 0; row < gameBoardArray.length; row++) {
            for (let col = 0; col < gameBoardArray[row].length; col++) {

                if (gameBoardArray[row][col] == undefined) { // if the spot is free                    

                    // NOTE seems to be an issue with referencing places on the array? 
                    gameBoardArray[row][col] = turn; // put the gameboard in the state we want to evaluate
                    let currentScore = minimax(gameBoardArray, false); // evaluate it
                    gameBoardArray[row][col] = undefined; // reset the gameboard

                    if (currentScore > bestScore) {
                        move = [row, col];
                        bestScore = currentScore;
                    }
                }
            }
        }
        // after checking all spots
        $(`#${move[0]}-${move[1]}`).click();
    });

});



/**
 * The minimax function calls this function recursively to determine what the best possible move is.
 * This is the constant function that assigns the score to the board at the end of the tree. 
 * @param {arr} board is the array representing the game state
 * @param {int} depth is the current depth down the decision tree
 * @param {int} maximizing determines if we are the maximizing player
 */
const minimax = function (board, maximizing) {

    let score;
    let result = generalizedCheckWinCondition(board);

    if (result != undefined) { // checking for base case
        switch (result) {
            case 'x':
                turn == 'x' ? score = 1 : score = -1;
                return (score);
            case 'o':
                turn == 'o' ? score = 1 : score = -1;
                return (score);
            case 'draw':
                score = 0;
                return (score);
        }
    }
    // recursive case
    if (maximizing) {
        let bestScore = -Infinity;
        for (let row = 0; row < gameBoardArray.length; row++) {
            for (let col = 0; col < gameBoardArray[row].length; col++) {
                if (gameBoardArray[row][col] == undefined) {
                    gameBoardArray[row][col] = turn; // we are maximizing for the current players turn to make the best move
                    // out of all the possible moves
                    let score = minimax(board, false); // if its a base case this will get the score for the current possible move
                    gameBoardArray[row][col] = undefined; // undo the changes before we check the next move in the next iteration of the loop
                    bestScore = Math.max(score, bestScore); // so check all the possible moves, and get the score of the best move. 
                }
            }
        }
        return (bestScore);
    } else {
        let worstScore = Infinity;
        for (let row = 0; row < gameBoardArray.length; row++) {
            for (let col = 0; col < gameBoardArray[row].length; col++) {
                if (gameBoardArray[row][col] == undefined) {
                    gameBoardArray[row][col] = turnFlip[turn];
                    let score = minimax(board, true);
                    gameBoardArray[row][col] = undefined;
                    worstScore = Math.min(score, worstScore);
                }
            }
        }
        return (worstScore);
    }

}