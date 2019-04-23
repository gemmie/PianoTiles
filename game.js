$('#startbutton').click(() => {
    reset();
    game();
});


var score = 0;
var previousLane = 0;
var generatedBlacks = 0;
var gameOverFlag = true;

//generateTiles();

$('.lane').click(function () {
    console.log(this);
    if (!gameOverFlag && !$(this).hasClass('black')) {
        gameOver();
    }
});

function generateTiles() {
    let laneNo = Math.trunc(Math.random() * 3);
    if (previousLane === laneNo) {
        laneNo = Math.round(Math.random() * laneNo);
    }
    previousLane = laneNo;
    let lane = $('#lane' + laneNo);
    $(lane).html("<div class='black' style= 'background-color: black; height: 25%; position: relative'></div>");
    generatedBlacks++;
    let child = $(lane).children().last()[0];
    console.log(lane);
    const length = lane[0].offsetHeight - child.offsetHeight;
    console.log(length);
    $(child).click(function (e) {
        if (!gameOverFlag) {
            console.log("clicked");
            console.log(this);
            score++;
            this.stop();
            $(this).remove();
            e.preventDefault();
            e.stopPropagation();
        }
    });
    $(child).animate({top: '+=' + length}, {duration: 5000, easing: 'linear'});

}

function game() {
    generateTiles();
  //  while (!gameOverFlag) {
        console.log("here");
        let tiles = $('.black');
        let lastTile = tiles[tiles.length - 1];


        if(lastTile.offsetTop > $('#lane0').offsetTop) {
            generateTiles();
        }

 //   }
}


function gameOver() {
    gameOverFlag = true;
    $('.black').remove();
    console.log("game over");
    $('#startbutton').html("TRY AGAIN");
}

function reset() {
    gameOverFlag = false;
    score = 0;
    generatedBlacks = 0;
    previousLane = 0;
    $('#startbutton').html("START");
    generateTiles();
}
