document.getElementById('settingsButton').addEventListener('click', function(event) {
    const settingsMenu = document.getElementById('settingsMenuContd');
    settingsMenu.classList.add('fade-out');
    setTimeout(function() {
        window.location.href = "#mainmenu"; // Navigate after the fade-out
    }, 500); // 500ms matches the CSS transition
});

document.getElementById('addChannel').addEventListener('click', function(event) {
    event.preventDefault(); // Stop immediate navigation
    const settingsList = document.getElementById('settingsList');
    settingsList.classList.add('fade-out');
    setTimeout(function() {
        window.location.href = "#settingsAddChannel"; // Navigate after the fade-out
    }, 350); // 500ms matches the CSS transition
});

document.getElementById('deleteChannel').addEventListener('click', function(event) {
    event.preventDefault(); // Stop immediate navigation
    const settingsList = document.getElementById('settingsList');
    settingsList.classList.add('fade-out');
    setTimeout(function() {
        window.location.href = "#settingsDeleteChannel"; // Navigate after the fade-out
    }, 350); // 500ms matches the CSS transition
});

window.addEventListener( "pageshow", function ( event ) { // Reloads the page if it was restored from the cache
    if (sessionStorage.getValue('previousRoute') === 'mainmenu') {
        window.location.reload();
        console.log("Previous hash: ", sessionStorage.getValue('previousRoute'));
        const cont = document.getElementById('settingsMenuContd');
        if (cont) {
            cont.classList.add('alt-fade-in');
        }
    } else {
        const cont = document.getElementById('settingsList');
        if (cont) {
            cont.classList.add('alt-fade-in');
        }
    }
});