var gamePattern=[];
var buttonColors=["green","red","yellow","blue"];
var userClickedPattern=[]
var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


$(".btn").click(function(){
    userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    check(userClickedPattern.length-1);
});


function check(currentLevel){
    console.log(gamePattern);
    console.log(userClickedPattern);
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        //console.log("Success ");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence()}
            ,1000);
        }
    }
    else{
        //console.log("Failure");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
        $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}



function nextSequence(){
    userClickedPattern=[]
    level++;
    $("#level-title").text("Level " + level);
    var randomNum = Math.random()*4
    randomNum = Math.floor(randomNum); 
    var randomChosenColor = buttonColors[randomNum];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    
}

function playSound(name){
    var aud = new Audio("sounds/"+name+".mp3");
    aud.play();
}

function animatePress(color){
    $("#"+color).addClass("pressed");
    setTimeout(function(){
        $("#"+color).removeClass("pressed")
    },100);
}

function startOver(){
    gamePattern=[];
    started=false;
    level=0;
}