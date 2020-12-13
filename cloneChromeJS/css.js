const cssInput = document.querySelector(".input-css");

function resizable (el, factor) {
    var int = Number(factor);
    function resize() {
        el.style.width = ((el.value.length+1) * int) + 'px'
    }
    var e = 'keyup,keypress,focus,blur,change'.split(',');
    for (var i in e) el.addEventListener(e[i],resize);
    resize();
}

function init(){
    resizable(cssInput, 8);
}

init();