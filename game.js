$('#startbutton').on("click",() => {
    reset();
    game();
});

const maxNoOfTiles = 150;
var score = 0;
var previousLane = 0;
var generatedBlacks = 0;
var gameOverFlag = true;
var interval;
var checkInterval;


var bottomLine =$("#lane0")[0].offsetHeight;

$('.lane').on("click",function () {
    gameOver();
});

function generateTiles() {
    let laneNo = Math.trunc(Math.random() * 3);
    if (previousLane === laneNo) {
        laneNo = Math.round(Math.random() * laneNo);
    }

    previousLane = laneNo;
    let lane = $('#lane' + laneNo);

    $(lane).prepend("<div class='black' style= 'background-color: black; width: 100%;height: 25%; position: absolute; top: 0px'></div>");
    generatedBlacks++;
    let child = $(lane).children().first()[0];
    const length = lane[0].offsetHeight - child.offsetHeight;
    $(child).on("click",function (e) {
        if (!gameOverFlag) {
            score++;
            $(this).stop();
            $(this).remove();
            e.preventDefault();
            e.stopPropagation();
        }
    });
    $(child).animate({top: '+=' + length}, {duration: 3000, easing: 'linear'});
}


function checkIfGameOver() {
    let blacks = $(".black");
    let max = 0;
    let idx = 0;
    for (let i = 0; i < blacks.length; i++) {
        let top = blacks[i].offsetTop;
        if(top > max){
            max = top;
            idx = i;
        }
    }
    if (max + blacks[idx].offsetHeight >= bottomLine) {
        gameOver();
    }
}
function game() {
    interval = window.setInterval(generateTiles, 950);
    checkInterval = window.setInterval(checkIfGameOver, 5);
}


function gameOver() {
    $('.black').stop();
    $('#startbutton').html("TRY AGAIN");
    window.clearInterval(interval);
    window.clearInterval(checkInterval);
}

function reset() {
    gameOverFlag = false;
    score = 0;
    generatedBlacks = 0;
    previousLane = 0;
    $('#startbutton').html("START");
    $(".black").remove();
    generateTiles();
}
