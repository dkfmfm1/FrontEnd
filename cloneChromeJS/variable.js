const title = document.querySelector(".title");

const clicked = "clicked";

function clickHandler(){
    title.classList.toggle(clicked);
}

function init(){
    title.addEventListener("click", clickHandler);
}

init();