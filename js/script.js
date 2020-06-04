/**
 * Tic Tac Toe game, designed by Joshua McDonald 
 */

// Functions


/**
 * This function initializes an n by m array of empty values, which can then be later
 * filled by moves played in the game. This array needs to be initialized to empty values
 * rather than just dynamically created as the check win condition would throw errors 
 * if it wasnt, due to references outside of the array. 
 * @param {int} rows 
 * @param {int} cols 
 */
const initArray = function (rows, cols) {
    xMoves = [];
    oMoves = [];
    let arr = []
    for (let i = 0; i < rows; i++) {
        arr[i] = new Array(cols);
    }
    return (arr);
}

/**
 * pretty self explanatory, why are you reading this docstring. why am i writing this docstring...
 */
const turnFlip = {
    'x': 'o',
    'o': 'x',
} 


/**
 * checks all positions in a n x m array for win condition.
 * Array holds x's and o's in the positions that have been clicked on the game grid, 
 * and checks to see if there are a chain of 3 matching moves around that position. 
 * 
 * Any value other than x's and o's can be used to fill the array, and it should also 
 * be general enough to allow for a third player if you want to adapt it for that. 
 * @param {array} array 
 */
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
/**
 * Updates UI.
 */
const updateTurn = function () {
    $('#turn').text(turn);
    $('#turn').html(`<img src='./img/${turn}.png' style="height: 1.5rem;">`);
    localStorage.setItem("xWins", xWins);
    localStorage.setItem("oWins", oWins);
    localStorage.setItem("draws", draws);
    $('#xWins').text(`X wins: ${xWins}`)
    $('#oWins').text(`O wins: ${oWins}`)
    $('#draws').text(`Draws: ${draws}`)
}

/**
 * Clears scores. needs to call updateTurn otherwise wont be saved to local storage. 
 */
const resetScores = function () {
    xWins = 0;
    oWins = 0;
    draws = 0;
    updateTurn();
}

/** 
 * handler for turns being taken.
 */
const gridClick = function () {
    console.log("image clicked");
    if (!gameOver) {
        if (!xMoves.includes(this.id) && !oMoves.includes(this.id)) { // if square empty
            let position = this.id.split('-');
            let rowPosition = parseInt(position[0]);
            let colPosition = parseInt(position[1]);

            if (turn == 'x') {
                xMoves.push(this.id);
                gameBoardArray[rowPosition][colPosition] = 'x'
            } else if (turn == 'o') {
                oMoves.push(this.id);
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
            confetti();

        } else if (generalizedCheckWinCondition(gameBoardArray) === 'o') {
            console.log("o wins");
            oWins += 1;
            $("#winDisplay").text("O Wins!");
            gameOver = true;
            confetti();
            updateTurn();

        } else if (xMoves.length + oMoves.length == rows * cols) {
            gameOver = true;
            $("#winDisplay").text("Its a Draw!");
            draws += 1;
            confetti();
            updateTurn();
        }
        updateTurn()
    }
}

// Constants

let turn = 'x'; // hardcode starting as x. 

let gameOver = false;
let xWins = 0;
let oWins = 0;
let draws = 0;
let xMoves = [];
let oMoves = [];


let rows = 3; // default grid size
let cols = 3;


let gameBoardArray = initArray(rows, cols);

let oImageSrc = "./img/o.png";
let xImageSrc = "./img/x.png";


$(document).ready(function () {
    xWins = parseInt(localStorage.getItem('xWins'));
    oWins = parseInt(localStorage.getItem('oWins'));
    draws = parseInt(localStorage.getItem('draws'));
    updateTurn()

    $("#game-board").css({
        "display": "grid",
        "grid-template-rows": "1fr 1fr 1fr",
        "grid-template-columns": "1fr 1fr 1fr",
        "margin": "10%"
    });

    $('div.box img').on('click', gridClick); // create event listener for img click events

    $("#resetBoard").on('click', function () {
        // reset all images to whiteSquare
        $('img').attr('src', './img/whiteSquare.png');
        $('img').addClass("whiteSquare");
        // reset Arrays
        xMoves = [];
        oMoves = [];
        gameBoardArray = initArray(rows, cols);

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
        $("#game-board").empty();
        //create new grid, and assign the classes and ids of each box
        let colString = "";
        for (let i = 0; i < cols; i++) {
            colString += " 1fr"
        }
        $("#game-board").css("grid-template-columns", colString);


        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                let $newBlock = $("<div>").addClass("box");
                $($newBlock).append($(`<img class="whiteSquare" src='./img/whiteSquare.png' id='${row}-${col}'>`));
                if (row === 0) {
                    $($newBlock).addClass('top');
                }
                if (row === rows - 1) {
                    $($newBlock).addClass('bottom');
                }
                if (col === 0) {
                    $($newBlock).addClass('left');
                }
                if (col === cols - 1) {
                    $($newBlock).addClass('right');
                }

                $("#game-board").append($newBlock);
            }
        }
        $('div.box img').on('click', gridClick);
        gameBoardArray = initArray(rows, cols);
    })

});