let buttonColours = ["red", "green", "yellow", "blue"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let clickCount = 0;
let started = false;



$(".btn").click(function() {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


$(document).keydown(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });


function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    switch (name) {
        case "red":
            new Audio("./sounds/red.mp3").play();
            break;
        
        case "blue":
            new Audio("./sounds/blue.mp3").play();
            break;    

        case "green":
            new Audio("./sounds/green.mp3").play();
            break; 
            
        case "yellow":
            new Audio("./sounds/yellow.mp3").play();
            break;  

        case "wrong":
        new Audio("./sounds/wrong.mp3").play();
        break; 
        default: 
            break;
    }
}

function animatePress(currentColour) {
    let keyPress = $("#" + currentColour);
    keyPress.addClass("pressed")
    setTimeout(function() {
        keyPress.removeClass('pressed');
    }, 100);;
    
    
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
            nextSequence();
            userClickedPattern = [];
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("#level-title").text("Game Over.");
        gamePattern = [];
        userClickedPattern = [];
        level = 0;
        clickCount = 0;
        started = false;
        setTimeout(() => {
            $("#level-title").text("Press A Key to Play Again.")
            $(document).keydown(function() {
                if (!started) {
                  $("#level-title").text("Level " + level);
                  nextSequence();
                  started = true;
                }
              });
            }, 2000);
                
    }
};

let year = new Date().getFullYear();
document.getElementById('year').innerHTML = `&copy ${year} Marius Bogdan. All rights reserved.`;


    




