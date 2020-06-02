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

var xImageSrc ;
var oImageSrc ;

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

        if (!gameOver) {
            if (!xMoves.includes(parseInt(this.id)) && !oMoves.includes(parseInt(this.id))) { // if square empty
                turn == 'x' ? xMoves.push(parseInt(this.id)) : oMoves.push(parseInt(this.id));
                (turn == 'x') && xImageSrc ? imgName = xImageSrc : imgName = turn;
                (turn == 'o') && oImageSrc ? imgName = oImageSrc : imgName = turn;
                $(this).attr("src", `./img/${imgName}.png`);
                $(this).removeClass('whiteSquare');
                turn = turnFlip[turn];
            } // else ignore click on already used position
            if (checkWinCondition(xMoves)) {
                console.log("x wins");
                $("#winDisplay").text("X Wins!");
                xWins+=1;
                gameOver = true;
                $('#xWins').text(`X wins: ${xWins}`)
            } else if (checkWinCondition(oMoves)) {
                console.log("o wins");  
                oWins+=1;
                $("#winDisplay").text("O Wins!");
                gameOver = true;
                $('#oWins').text(`O wins: ${oWins}`)
            } else if (xMoves.length+oMoves.length ==9){
                gameOver=true;
                $("#winDisplay").text("Its a Draw!");
                draws+=1;
                $('#draws').text(`Draws: ${draws}`)

            }
        }
    });

    $("#reset").on('click', function () {
        // reset all images to whiteSquare
        $('img').attr('src', './img/whiteSquare.png');
        $('img').addClass("whiteSquare");
        // reset Arrays
        xMoves = [];
        oMoves = [];
        gameOver = false;
        $("#winDisplay").text("");
    })

    $("#xImageUploadBtn").on('click', function(){
        if ($("#imageUpload")[0].value){
            console.log("image detected");
            xImageSrc = $("#imageUpload")[0].value

        } else {
            console.log("no image uploaded");
        }
    })
    $("#oImageUploadBtn").on('click', function(){
        if ($("#imageUpload")[0].value){
            console.log("image detected");
            oImageSrc = $("#imageUpload")[0].value
        } else {
            console.log("no image uploaded");
        }
    })

});

