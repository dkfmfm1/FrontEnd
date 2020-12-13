const body = document.querySelector("body");
const IMG_NUMBER = 5;

function paintNumber(randomNumber){
    const img = new Image();
    img.src = `images/${randomNumber}.jpg`;
    img.classList.add("backgroundImg");
    body.prepend(img);
}

function getNumber(){
    const number = Math.ceil(Math.random() * IMG_NUMBER);
    return number 
}

function init(){
    const randomNumber = getNumber();
    paintNumber(randomNumber);
}

init();

