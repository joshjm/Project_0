var turn = 'x'; // hardcode starting as x. 
var turnFlip = {
    'x': 'o',
    'o': 'x',
} // this is pretty cheeky. Magic number-ish. I guess cyclers arent that bad though
var gameOver = false;

var xMoves = [];
var oMoves = [];

const checkWinCondition = function (moveArray) {
    const combos = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9], 
        [3, 5, 7]
    ];
    for (let comboIndex = 0; comboIndex < combos.length; comboIndex++) {
        let combo = combos[comboIndex];
        let condition = combo.every((e) => moveArray.includes(e));
        if (condition) {
            console.log("game over");
            return (true);
        }
    }
}

$(document).ready(function () {
    $('img').on('click', function (event) {
        if (xMoves.length+oMoves.length ==9){
            gameOver=true;
            alert("Cats Game.");
        }
        if (!gameOver) {
            if (!xMoves.includes(parseInt(this.id)) && !oMoves.includes(parseInt(this.id))) { // if square empty
                turn == 'x' ? xMoves.push(parseInt(this.id)) : oMoves.push(parseInt(this.id));
                $(this).attr("src", `./img/${turn}.png`);
                turn = turnFlip[turn];
            } // else ignore click on already used position
            if (checkWinCondition(xMoves)) {
                console.log("x wins");
                alert("x's Game.");

                gameOver = true;
            } else if (checkWinCondition(oMoves)) {
                alert("o's Game.");
                console.log("o wins");
                gameOver = true;

            }
        }
    });

    $("#reset").on('click', function () {
        // reset all images to whiteSquare
        $('img').attr('src', './img/whiteSquare.png');
        // reset Arrays
        xMoves = [];
        oMoves = [];
        gameOver = false;
 
    })

});