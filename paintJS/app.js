const canvas = document.querySelector(".canvas"),
colors = document.getElementsByClassName("jsColor"),
range = document.getElementById("jsRange"),
mode = document.getElementById("mode"),
save = document.getElementById("save");

const ctx = canvas.getContext('2d');
const canvasSize = 600;
const defaultColor = "#2c2c2c";

ctx.fillStyle = "white";
ctx.strokeStyle = defaultColor;
ctx.fillStyle = defaultColor;
ctx.lineWidth = 2.5;

canvas.width = canvasSize;
canvas.height = canvasSize;

let painting = false;
let filling = false;

function startPainting(){
    painting = true;
}

function stopPainting(){
    painting = false;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseDown(event){
    painting = true;
}

function handleColorChange(event){
    const clickedColor = event.target.style.backgroundColor;
    ctx.strokeStyle = clickedColor;
    ctx.fillStyle = clickedColor;
}

function handleRangeChange(event){
    const inputRange = event.target.value;
    ctx.lineWidth = inputRange;
}

function handleModeButton(){
    if(filling === false){
        filling = true;
        mode.innerText = "paint";
    } else {
        filling = false;
        mode.innerText = "fill";
    }
}

function handleClick(){
    if(filling){
        ctx.fillRect(0, 0, canvasSize, canvasSize);
    }
}

function handleContextMenu(event){
    event.preventDefault();
}

function handleSaveButton(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "download🎨"
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleClick);
    canvas.addEventListener("contextmenu", handleContextMenu);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorChange));

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeButton);
}

if(save){
    save.addEventListener("click", handleSaveButton);
}