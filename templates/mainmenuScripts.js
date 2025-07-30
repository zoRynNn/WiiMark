function renderTVSlot(index) { // Channel creation function
    const channel = JSON.parse(localStorage.getItem("channel" + index)); // Channel creation, retrieves the JSON file, if nothing is saved it is null
    let content = `
        <div id="TV" class="hover-container position-relative" style="width: fit-content;">
        <img src="./static/TVborder.png" class="img-fluid" style="object-fit: contain; position: relative; z-index: 2; pointer-events: none;">
        <img src="./static/TVborderHover.png" class="img-fluid hover-image"
            style="width: 100%; height: 100%; z-index: 2; pointer-events: none;">`; // Creates standard TV in HTML, adding the overlay when hovering

    if (channel) { // If there is a channel and an icon, it creates the clickable tv with icon, title and link
        content += `
        <a href="${channel.url}" target="_blank"
            style="position:absolute; top:2%; left: 0.9%; width:100%; height:100%;">
            <img src="${channel.icon}" alt="${channel.title}" style="width:98%; height:98%; object-fit: contain; z-index: 1;">
        </a>
        `;
    } else {
        content += `
        <a target="_blank"
            style="position:absolute; top:1%; width:100%; height:100%; left: 0.1%">
            <img class="channel" src="./static/TVstatichighres.png" style="width:100%; height:100%; object-fit: contain; z-index: 1;">
        </a>
        `;
    }

    content += `</div>`; // Closes the div opened at content
    return content;
}

function populateAllTVs() {
    for (let page = 0; page < 4; page++) { // 3 pages of 12 tvs each
        const grid = document.getElementById("tvGridPage" + (page + 1)); // from the html document, get the corresponding tvGridPage (defined in the carousel div)
        let html = ""; // start with empty html code
        for (let i = 0; i < 12; i++) {
            const globalIndex = page * 12 + i; // get the global index of the tv
            html += renderTVSlot(globalIndex); // once rendered, add it to the html string
        }
        grid.innerHTML = html; // what this basically does is automate the html code that would normally be handwritten, plus adding filled tvs should there be any
    }

    const tvs = document.querySelectorAll('.channel');
    tvs.forEach(tv => {
        const delay = Math.random() * 3;
        tv.style.animationDelay = `${delay}s`;
    });
}

window.addEventListener('DOMContentLoaded', populateAllTVs); // takes the window (the web page) and does all of the above

document.getElementById('settingsButton').addEventListener('click', function(event) {
    event.preventDefault(); // Stop immediate navigation
    const mainMenu = document.getElementById('mainMenuBack');
    mainMenu.classList.add('fade-out');
    const link = this.href;
    setTimeout(function() {
        window.location.href = "#settings"; // Navigate after the fade-out
    }, 500); // 500ms matches the CSS transition
});

// Scrapped zoom into tv feature like the Wii. It's too complex to implement and would require too many assets from the user as well
/*document.querySelector('.carousel-item.active').addEventListener('click', (e) => {
  const screen = document.getElementById('mainMenuBack');
  const tv = document.elementFromPoint(e.clientX, e.clientY);

  if (tv.classList.contains('channel')) {
    // Get the bounding rect of the target element
    //const rect = screen.getBoundingClientRect();
    const tvRect = tv.getBoundingClientRect();

    // Calculate the click position relative to the element
    const offsetX = tvRect.x + tvRect.width / 2;
    const offsetY = tvRect.y + tvRect.height / 2;

    console.log("TV clicked at:", offsetX, offsetY);
    console.log("Closest TV element:", tvRect);

    // Set transform-origin relative to the element
    screen.style.transformOrigin = `${offsetX}px ${offsetY}px`;

    // Apply the scale with a transition
    setTimeout(() => {
      screen.style.transition = 'transform 0.5s ease-in-out';
      screen.style.transform = 'scale(5)';
    }, 250);

    
    setTimeout(() => {
        window.location.href = "#channel"; // Navigate after the fade-out
        
        setTimeout(() => {
            const newScreen = document.getElementById('channelScreen');
            console.log("newScreen:", newScreen);
            if (newScreen) {
                newScreen.style.backgroundImage = `url(${tv.src})`;
            }
        }, 100); // wait for the DOM to update
    }, 500);

  }
});*/

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById("clockDisplayH").textContent = `${hours}`;
    document.getElementById("clockDisplay:").textContent = `:`;
    document.getElementById("clockDisplayM").textContent = `${minutes}`;
}

updateClock();
setInterval(updateClock, 1000);

function getFormattedDate() {
    const date = new Date();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayAbbr = days[date.getDay()];
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${dayAbbr} ${day}/${month}`;
}

function updateDateDisplay() {
    document.getElementById("dateDisplay").textContent = getFormattedDate();
}

updateDateDisplay();
setInterval(updateDateDisplay, 60000);

function getLocalStorageSize() {
    var total = 0;
    for (var x in localStorage) {
        // Value is multiplied by 2 due to data being stored in `utf-16` format, which requires twice the space.
        var amount = (localStorage[x].length * 2) / 1024 / 1024;
        if (!isNaN(amount) && localStorage.hasOwnProperty(x)) {
            console.log(x, localStorage.getItem(x), amount);
            total += amount;
        }
    }
    return total.toFixed(2);
};

document.getElementById('space').textContent = getLocalStorageSize();