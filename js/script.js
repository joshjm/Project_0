var turn = 'x'; // hardcode starting as x. 
var turnFlip = {
    'x': 'o',
    'o': 'x',
} // this is pretty cheeky. Magic number-ish. I guess cyclers arent that bad though

var playArray = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

/**
 * takes an x or y position and converts its into a 0,1, or 2 based on which third it lies in.
 * @param {num} position 
 */
const getMoveFromPos = function (val) {
    if (val < 33) {
        return (0);
    } else if ((val >= 33) && (val < 66)) {
        return (1);
    } else if (val >= 66) {
        return (2);
    }
}

const refreshBoard = function () {
    for (let i = 0; i < playArray.length; i++) {
        let row = [];
        for (let j = 0; j < playArray.length; j++) {
            // console.log(playArray[i][j]);
            let entry = playArray[i][j];
            if(entry){
                console.log("value here", entry);
                var $img = $(`<img src="./img/${turn}.png">`);
                $img.addClass(turn);
                $img.css("left", event.pageX);
                $img.css("top", event.pageY);
                $img.appendTo('.content');
            }
            row.push(playArray[i][j]);
        }

    }
}

$(document).ready(function () {
    var mousePositionRelativeToBoard = {};
    $('#board').on('click', function (event) {
        // translate the currently clicked position into which square was clicked. 
        // need to translate global mosue pos to relative to the image. 
        let move = {}
        console.log("image clicked");
        var offset = $(this).offset();
        mousePositionRelativeToBoard.x = 100 * (event.pageX - offset.left) / this.width;
        mousePositionRelativeToBoard.y = 100 * (event.pageY - offset.top) / this.width;
        // console.log(mousePositionRelativeToBoard);
        move.x = getMoveFromPos(mousePositionRelativeToBoard.x);
        move.y = getMoveFromPos(mousePositionRelativeToBoard.y);
        if (!playArray[move.y][move.x]) {
            playArray[move.y][move.x] = turn;
            // console.log(playArray);
            turn = turnFlip[turn];
        } // else ignore click on already used position
        refreshBoard();
        // Dont worry about positioning images yet. 
        // #############################################################
       
        // #############################################################
    });
});