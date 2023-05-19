var level = 0;
var gameSequence = [];
var userSequence = [];
gameStart = false;

$(document).keydown(function(){
    if(gameStart === false) {
        nextSequence();
        gameStart = true;
    }
})

function checkAnswer(index){
    if(gameSequence[index] === userSequence[index]){
        // great.
    }
    else{
        gameOver();
        newGame();
    }
    if(index === (gameSequence.length-1)) {
        setTimeout(() => {
            nextSequence();
        }, 1000);
    }
}

$(".col").click(function(){
    var key = this.classList[2];
    userSequence.push(key);
    $("."+key).addClass("click");
    setTimeout(function(){
        $("."+key).removeClass("click");
    }, 50);
    (new Audio("sounds/"+key+".mp3")).play();
    checkAnswer(userSequence.length-1);
})

function nextSequence(){
    userSequence = [];
    $("h1").text("Level " + level);
    level++;
    var randNum = Math.floor(Math.random()*4)+1;
    var key = "B"+randNum;
    $("."+key).fadeOut(50).fadeIn();
    (new Audio("sounds/"+key+".mp3")).play();
    gameSequence.push(key);
}

function gameOver(){
    $("h1").text("Game Over, Press Any Key to Restart")
    $("body").css("backgroundColor", "red");
    setTimeout(function(){
        $("body").css("backgroundColor", "rgb(29, 29, 86)");
    }, 200);
    (new Audio("sounds/GameOver.mp3")).play();
}

function newGame(){
    level = 0;
    gameSequence = [];
    gameStart = false;
}