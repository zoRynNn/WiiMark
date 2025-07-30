document.addEventListener('click', function(event) {
    const screen = document.getElementById('warning');
    screen.classList.add('fade-out');
    setTimeout(function() {
        window.location.href = "#mainmenu"; // Navigate after the fade-out
    }, 2000); // 500ms matches the CSS transition
})