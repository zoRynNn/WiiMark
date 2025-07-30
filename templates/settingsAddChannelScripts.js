(function () {
    const form = document.getElementById('addChannelForm');
    if (!form) {
        console.error('[addChannel] #addChannelForm not found.');
        return;
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Stop form POST

        const channel_name  = form.elements['channel_name'].value.trim();
        const channel_url   = form.elements['channel_url'].value.trim();
        const imageInput    = form.elements['channel_image'];

        if (!channel_name || !channel_url || !imageInput.files[0]) {
            alert("Please fill in all fields and select an image.");
            return;
        }

        // Optional: Validate URL
        try { new URL(channel_url); } catch { alert("Invalid URL."); return; }

        const file = imageInput.files[0];
        const reader = new FileReader();

        reader.onload = function(event) {
            const base64Image = event.target.result; // <-- This is data:image/png;base64,...

            // Assign next ID
            let id = 0;
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key.startsWith('channel')) {
                    const num = parseInt(key.slice('channel'.length), 10);
                    if (!isNaN(num) && num >= id) id = num + 1;
                }
            }

            localStorage.setItem("channel" + id, JSON.stringify({
                title: channel_name,
                url: channel_url,
                icon: base64Image
            }));

            alert("Channel saved!");
            window.location.hash = '#mainmenu'; // Navigate back
        };

        reader.readAsDataURL(file); // Convert file to base64
    });
})();

document.getElementById('settingsButton').addEventListener('click', function(event) {
    event.preventDefault(); // Stop immediate navigation
    const mainMenu = document.getElementById('addChannelForm');
    mainMenu.classList.add('fade-out');
    const link = this.href;
    setTimeout(function() {
        window.location.href = "#settings";
    }, 500); // 500ms matches the CSS transition
});