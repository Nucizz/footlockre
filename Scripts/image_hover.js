function defaultState(id) {
    document.getElementById(id).src = document.getElementById(id).src.replace("/2.webp", "/1.webp");
}

function hoverState(id) {
    document.getElementById(id).src = document.getElementById(id).src.replace("/1.webp", "/2.webp");
}