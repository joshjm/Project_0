let turn = 'x'; // hardcode starting as x. 
const turnFlip = {
    'x': 'o',
    'o': 'x',
} // this is pretty cheeky. Magic number-ish. I guess cyclers arent that bad though
let gameOver = false;
let xWins = 0;
let oWins = 0;
let draws = 0;
let xMoves = [];
let oMoves = [];

// default grid size
let rows = 3;
let cols = 3;

const initArray = function (rows, cols) {
    let arr = []
    for (let i = 0; i < rows; i++) {
        arr[i] = new Array(cols);
    }
    return (arr);
}

let gameBoardArray = initArray(rows, cols);

let oImageSrc = "./img/o.png";
let xImageSrc = "./img/x.png";

const generalizedCheckWinCondition = function (array) {
    for (let row = 0; row < array.length; row++) {
        for (let col = 0; col < array[row].length; col++) {
            let currentVal = array[row][col];
            if (currentVal === 'x' || currentVal === 'o') {
                if (row !== 0 && row !== array.length - 1) { // if not first or last row
                    if ((currentVal === array[row - 1][col]) && (currentVal === array[row + 1][col])) { // vertical line
                        return (currentVal);
                    }
                }
                if ((col !== 0) && (col !== array[row].length - 1)) { // if not first or last col

                    if ((currentVal === array[row][col - 1]) && (currentVal === array[row][col + 1])) { // horizontal line
                        return (currentVal);
                    }
                }
                if ((col !== 0 && col !== array[row].length - 1) && (row !== 0 && row !== array.length - 1)) { // if not on edges of array

                    if ((currentVal === array[row - 1][col - 1]) && (currentVal === array[row + 1][col + 1]) || // left diag
                        (currentVal === array[row - 1][col + 1]) && (currentVal === array[row + 1][col - 1])) { // right diag)
                        return (currentVal);
                    }
                }
            }

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

const resetScores = function () {
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

    $('div.box img').on('click', function (event) {

        if (!gameOver) {
            if (!xMoves.includes(parseInt(this.id)) && !oMoves.includes(parseInt(this.id))) { // if square empty
                let position = this.id.split('-');
                let rowPosition = parseInt(position[0]);
                let colPosition = parseInt(position[1]);

                if (turn == 'x') {
                    xMoves.push([rowPosition, colPosition]);
                    gameBoardArray[rowPosition][colPosition] = 'x'
                } else if (turn == 'o') {
                    oMoves.push([rowPosition, colPosition]);
                    gameBoardArray[rowPosition][colPosition] = 'o'
                }

                (turn == 'x') ? imgName = xImageSrc: imgName = oImageSrc;
                $(this).attr("src", `${imgName}`);
                $(this).removeClass('whiteSquare');
                turn = turnFlip[turn];
            } // else ignore click on already used position
            if (generalizedCheckWinCondition(gameBoardArray) === 'x') {
                console.log("x wins");
                $("#winDisplay").text("X Wins!");
                xWins += 1;
                gameOver = true;
                updateTurn();

            } else if (generalizedCheckWinCondition(gameBoardArray) === 'o') {
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
        gameBoardArray = initArray(3, 3);

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
    $("#setGridSize").on('click', function () {
        rows = parseInt($("#rowsInput")[0].value);
        cols = parseInt($("#colsInput")[0].value);
        // remove existing grid

        //create new grid, and assign the classes and ids of each box

        // put a white square img in each box with correct id
    })

});