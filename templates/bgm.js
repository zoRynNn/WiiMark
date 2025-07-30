const bgm_intro = new Audio("./static/wiimenuintro.flac");
const bgm = new Audio("./static/wiibgm.flac");
bgm.loop = true; // Loop the background music

document.addEventListener('DOMContentLoaded', () => {
    if(sessionStorage.getItem('currentRoute') === 'mainmenu') {
            bgm_intro.play().once = true; // Play intro music once
            bgm_intro.addEventListener("ended", () => {
            bgm.play();
        }, { once: true }); // Only attach once
    }
}, { once: true }); // Ensure this runs only once on the first click