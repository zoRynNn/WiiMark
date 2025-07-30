function renderTVSlot(index) { // Channel creation function
    const channel = JSON.parse(localStorage.getItem("channel" + index)); // Channel creation, retrieves the JSON file, if nothing is saved it is null
    let content = `
        <div class="hover-container position-relative" style="width: fit-content;">
        <img src="/static/tvStatic.png" class="img-fluid" style="object-fit: contain;">
        <img src="/static/hoverTV.png" class="img-fluid hover-image"
            style="width: 97%; height: 95%; padding-top: 1.2vh; padding-left: 0.6vw;">`; // Creates standard TV in HTML, adding the overlay when hovering

    if (channel) { // If there is a channel and an icon, it creates the clickable tv with icon, title and link
        content += `
        <a href="${channel.url}" target="_blank"
            style="position:absolute; top:3%; left:4%; width:100%; height:100%;">
            <img class="channel" src="${channel.icon}" alt="${channel.title}" style="width:18vw; height:20vh; object-fit: contain;">
        </a>
        `; // if there is a channel, creates a clickable tv with icon, title and link
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

window.addEventListener('pageshow', populateAllTVs); // takes the window (the web page) and does all of the above