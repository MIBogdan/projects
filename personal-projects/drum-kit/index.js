
let buttonsLength = document.querySelectorAll(".drum").length;

for (i=0; i < buttonsLength; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function() {
        let mouseKey = this.getAttribute("class").slice(0, 1);
        keyboardPress(mouseKey);
    });
}



document.addEventListener("keydown", function(event) {
    keyboardPress(event.key);
    if (event.key === testVar) {
        buttonAnimation(event.key);
    } else {
        return false;
    }
});

function keyboardPress(keyStroke) {
    switch (keyStroke) {
        case "w":
            new Audio("./sounds/tom-1.mp3").play();
            testVar = "w";
            break;

        case "a":
            new Audio("./sounds/tom-2.mp3").play();
            testVar = "a";
            break;

        case "s":
            new Audio("./sounds/tom-3.mp3").play();
            testVar = "s";
            break;

        case "d":
            new Audio("./sounds/tom-4.mp3").play();
            testVar = "d";
            break;

        case "j":
            new Audio("./sounds/crash.mp3").play();
            testVar = "j";
            break;

        case "k":
            new Audio("./sounds/kick-bass.mp3").play();
            testVar = "k";
            break;

        case "l":
            new Audio("./sounds/snare.mp3").play();
            testVar = "l";
            break;
    
        default:
            break;
    }
}

let testVar = "";

function buttonAnimation(keyStroke) {
    let keyPressed = document.querySelector("." + keyStroke);
    keyPressed.classList.add("pressed");
    setTimeout(function() {
        keyPressed.classList.remove("pressed");
    }, 100);
}



let year = new Date().getFullYear();
document.getElementById('year').innerHTML = `&copy ${year} Marius Bogdan. All rights reserved.`;
