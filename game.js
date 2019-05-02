$('#startbutton').click(() => {
    reset();
    game();
});


var score = 0;
var previousLane = 0;
var generatedBlacks = 0;
var gameOverFlag = true;
var interval;

//generateTiles();

$('.lane').click(function () {
   // console.log(this);
    if (!gameOverFlag && !$(this).hasClass('black')) {
        gameOver();
    }
});

function generateTiles() {
    let laneNo = Math.trunc(Math.random() * 3);
    if (previousLane === laneNo) {
        laneNo = Math.round(Math.random() * 3);
    }
    //laneNo = 0;
    previousLane = laneNo;
    let lane = $('#lane' + laneNo);

    $(lane).prepend("<div class='black' style= 'background-color: black; width: 100%;height: 25%; position: absolute; top: 0px'></div>");
    generatedBlacks++;
    let child = $(lane).children().first()[0];
    console.log($(child));
    const length = lane[0].offsetHeight - child.offsetHeight;
    $(child).click(function (e) {
        if (!gameOverFlag) {
            console.log("clicked");
//            console.log(this);
            score++;
            $(this).stop();
            $(this).remove();
            e.preventDefault();
            e.stopPropagation();
        }
    });
    $(child).animate({top: '+=' + length}, {duration: 3000, easing: 'linear'});

}

function game() {
    interval = window.setInterval(generateTiles, 900);
}


function gameOver() {
    gameOverFlag = true;
    $('.black').remove();
    console.log("game over");
    $('#startbutton').html("TRY AGAIN");
    window.clearInterval(interval)
}

function reset() {
    gameOverFlag = false;
    score = 0;
    generatedBlacks = 0;
    previousLane = 0;
    $('#startbutton').html("START");
    generateTiles();
}
