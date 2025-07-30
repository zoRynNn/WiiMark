const hoverSound = new Audio("./static/hover.flac");
const leftArrowSound = new Audio("./static/scrollleft.flac");
const rightArrowSound = new Audio("./static/scrollright.flac");

document.querySelectorAll('#TV, #settingsButton, .arrow-zoom, #sdButton, #msgButton').forEach(el => {
    el.addEventListener('mouseenter', () => {
        hoverSound.currentTime = 0; // Reset sound to start
        hoverSound.play();
    });
});

document.getElementById('leftArrow').addEventListener('click', () => {
    leftArrowSound.currentTime = 0; // Reset sound to start
    leftArrowSound.play();
});

document.getElementById('rightArrow').addEventListener('click', () => {
    rightArrowSound.currentTime = 0; // Reset sound to start
    rightArrowSound.play();
});