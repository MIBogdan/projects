let randomNumber1 = Math.floor(Math.random() * 6) + 1;
let randomPicture1 = "./images/dice" + randomNumber1 + ".png";
let newPicture1 = document.querySelector(".img1").setAttribute("src", randomPicture1);

let randomNumber2 = Math.floor(Math.random() * 6) + 1;
let randomPicture2 = "./images/dice" + randomNumber2 + ".png";
let newPicture2 = document.querySelector(".img2").setAttribute("src", randomPicture2);
let titleText = document.querySelector("h1");

if (randomNumber1 > randomNumber2) {
    titleText.innerHTML = "Player 1 won.";
} else if (randomNumber1 < randomNumber2) {
    titleText.innerHTML = "Player 2 won.";
} else {
    titleText.innerHTML = "Draw.";
}

let year = new Date().getFullYear();
document.getElementById('year').innerHTML = `&copy ${year} Marius Bogdan. All rights reserved.`;