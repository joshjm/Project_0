var turn = 'x'; // hardcode starting as x. 
var turnFlip = {
    'x': 'o',
    'o': 'x',
} // this is pretty cheeky. Magic number-ish. I guess cyclers arent that bad though
var gameOver = false;
var xWins = 0;
var oWins = 0;
var draws = 0;
var xMoves = [];
var oMoves = [];

var oImageSrc = "./img/o.png";
var xImageSrc = "./img/x.png";

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
const updateTurn = function () {
    $('#turn').text(turn);
    localStorage.setItem("xWins", xWins);
    localStorage.setItem("oWins", oWins);
    localStorage.setItem("draws", draws);
    $('#xWins').text(`X wins: ${xWins}`)
    $('#oWins').text(`O wins: ${oWins}`)
    $('#draws').text(`Draws: ${draws}`)
}

const resetScores = function(){
    xWins = 0;
    oWins = 0; 
    draws = 0; 
    updateTurn();
}

$(document).ready(function () {
    xWins = parseInt(localStorage.getItem('xWins'));
    oWins = parseInt(localStorage.getItem('oWins'));
    draws = parseInt(localStorage.getItem('draws'));
    updateTurn()

    $('img').on('click', function (event) {

        if (!gameOver) {
            if (!xMoves.includes(parseInt(this.id)) && !oMoves.includes(parseInt(this.id))) { // if square empty
                turn == 'x' ? xMoves.push(parseInt(this.id)) : oMoves.push(parseInt(this.id));
                (turn == 'x') ? imgName = xImageSrc: imgName = oImageSrc;
                $(this).attr("src", `${imgName}`);
                $(this).removeClass('whiteSquare');
                turn = turnFlip[turn];
            } // else ignore click on already used position
            if (checkWinCondition(xMoves)) {
                console.log("x wins");
                $("#winDisplay").text("X Wins!");
                xWins += 1;
                gameOver = true;
                updateTurn();
            } else if (checkWinCondition(oMoves)) {
                console.log("o wins");
                oWins += 1;
                $("#winDisplay").text("O Wins!");
                gameOver = true;
                updateTurn();
            } else if (xMoves.length + oMoves.length == 9) {
                gameOver = true;
                $("#winDisplay").text("Its a Draw!");
                draws += 1;
                updateTurn();
            }
            updateTurn()
        }
    });

    $("#resetBoard").on('click', function () {
        // reset all images to whiteSquare
        $('img').attr('src', './img/whiteSquare.png');
        $('img').addClass("whiteSquare");
        // reset Arrays
        xMoves = [];
        oMoves = [];
        gameOver = false;
        $("#winDisplay").text("");
        updateTurn()
    })

    $("#resetScores").on('click', resetScores)

    $("#xImageUploadBtn").on('click', function () {
        try {
            let file = document.getElementById("file");
            xImageSrc = URL.createObjectURL(file.files[0]);
        } catch (error) {
            alert("please upload image");
        }

    })
    $("#oImageUploadBtn").on('click', function () {
        try {
            let file = document.getElementById("file");
            oImageSrc = URL.createObjectURL(file.files[0]);
        } catch (error) {
            alert("please upload image");
        }

    })

});