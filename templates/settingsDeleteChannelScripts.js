function deleteList() {
    const deleteList = document.getElementById('deleteList');
    deleteList.innerHTML = ''; // Clear existing content
    
    if(localStorage.length == 0){
        const noChannelsMessage = document.createElement('div');
        noChannelsMessage.innerHTML = 'No channels to delete';
        noChannelsMessage.style.textAlign = 'center';
        noChannelsMessage.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.5)';
        noChannelsMessage.style.top = '50%';
        noChannelsMessage.style.fontSize = '2em';
        noChannelsMessage.style.color = '#ffffffff';
        noChannelsMessage.style.marginTop = '20px';
        noChannelsMessage.style.fontFamily = 'Rodin, sans-serif';
        deleteList.appendChild(noChannelsMessage);
        deleteList.style.top = '45%';
        deleteList.style.transform = 'translateY(-45%)';
        deleteList.style.overflowY = 'hidden';
    } else{
        for (let i = localStorage.length-1; i >= 0; i--) {
            let key = localStorage.key(i);
            if (key.startsWith('channel')) {
                let channel = JSON.parse(localStorage.getItem(key));
                let button = document.createElement('div');
                button.className = 'settings';
                button.style = 'width: 75vw; height: 20vh; max-height: 20vh; object-fit: contain; position: relative; background: url(./static/settingsOption.png) no-repeat center center; background-size: 100% 100%; color: #313031; display: flex; align-items: center; justify-content: center; text-align: center; font-family: Rodin, sans-serif; font-size: 2em; cursor: pointer;';
                button.style.margin = '10px';
                button.innerHTML = channel.title + '<br>' + channel.url;
                button.onclick = function() {
                    localStorage.removeItem(key);
                    deleteList.removeChild(button);
                    alert("Channel deleted!");
                };
                deleteList.appendChild(button);
            }
        }
    }
};

deleteList(); // Call the function to populate the delete list

document.getElementById('settingsButton').addEventListener('click', function(event) {
    event.preventDefault(); // Stop immediate navigation
    const mainMenu = document.getElementById('deleteList');
    mainMenu.classList.add('fade-out');
    const link = this.href;
    setTimeout(function() {
        window.location.href = "#settings";
    }, 500); // 500ms matches the CSS transition
});