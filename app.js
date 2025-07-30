document.body.innerHTML = `
    <div id="app"></div>
`;

class Router{
    constructor(routes){
        this.bgm_intro = new Audio("./static/wiimenuintro.flac");
        this.bgm = new Audio("./static/wiibgm.flac");
        this.routes = routes;
        window.addEventListener('hashchange', this.handleRouteChange.bind(this));
        this.handleRouteChange();
    }

    async handleRouteChange() {
        const hash = window.location.hash.slice(1);
        this.previousHash = this.currentHash;
        this.currentHash = hash;
        if (this.previousHash) {
            sessionStorage.setItem('previousRoute', this.previousHash);
            sessionStorage.setItem('currentRoute', this.currentHash);
        }
        console.log("Current hash:", window.location.hash);
        console.log("Parsed hash:", hash);

        if (!hash || hash.startsWith('/') || hash === "" || hash === "#") {
            document.getElementById('app').innerHTML = await (await fetch('./templates/warning.html')).text();
            const fadeScript = document.createElement('script');
            fadeScript.src = './templates/warningScripts.js';
            document.body.appendChild(fadeScript);
            return;
        }

        const route = this.routes[hash];
        console.log("Route:", route);

        if (route) {
            try {
                const res = await fetch(route);
                const html = await res.text();
                document.getElementById('app').innerHTML = html;
                document.querySelectorAll('script[src*="./templates/"]').forEach(el => el.remove()); // <-- NEEDS TESTIN
                if (hash === 'mainmenu'){
                    setTimeout(() => {
                        this.bgm.loop = true; // Loop the background music
                        this.bgm_intro.play().once = true; // Play intro music once
                        this.bgm_intro.addEventListener("ended", () => {
                            this.bgm.play();
                        }, { once: true }); // Only attach once
                    }, 1000);

                    // Clear any previously added dynamic scripts (optional)

                    // Dynamically load script
                    /*const loadchannelsScript = document.createElement('script');
                    loadchannelsScript.src = './templates/loadChannels.js';*/

                    const mainmenuScripts = document.createElement('script');
                    mainmenuScripts.src = './templates/mainmenuScripts.js';

                    await new Promise(resolve => setTimeout(resolve, 0)); // Let DOM update

                    /*await new Promise((resolve, reject) => {
                        loadchannelsScript.onload = resolve;
                        loadchannelsScript.onerror = reject;
                        document.body.appendChild(loadchannelsScript);
                    });*/

                    await new Promise((resolve, reject) => {
                        mainmenuScripts.onload = resolve;
                        mainmenuScripts.onerror = reject;
                        document.body.appendChild(mainmenuScripts);
                    });

                    if (typeof populateAllTVs === 'function') {
                        populateAllTVs();
                    } else {
                        console.warn("populateAllTVs is not defined after loading scripts.");
                    }
                } else if (hash === 'settings') {
                    this.bgm.pause();
                    const settingsScripts = document.createElement('script');
                    settingsScripts.src = './templates/settingsScripts.js';
                    
                    await new Promise(resolve => setTimeout(resolve, 0)); // Let DOM update
                    await new Promise((resolve, reject) => {
                        settingsScripts.onload = resolve;
                        settingsScripts.onerror = reject;
                        document.body.appendChild(settingsScripts);
                    });
                } else if(hash === 'settingsDeleteChannel'){
                    this.bgm.pause();
                    const deleteChannelScripts = document.createElement('script');
                    deleteChannelScripts.src = './templates/settingsDeleteChannelScripts.js';
                    
                    await new Promise(resolve => setTimeout(resolve, 0)); // Let DOM update
                    await new Promise((resolve, reject) => {
                        deleteChannelScripts.onload = resolve;
                        deleteChannelScripts.onerror = reject;
                        document.body.appendChild(deleteChannelScripts);
                    });
                } else if(hash === 'settingsAddChannel'){
                    this.bgm.pause();
                    const addChannelScripts = document.createElement('script');
                    addChannelScripts.src = './templates/settingsAddChannelScripts.js';
                    
                    await new Promise(resolve => setTimeout(resolve, 0)); // Let DOM update
                    await new Promise((resolve, reject) => {
                        addChannelScripts.onload = resolve;
                        addChannelScripts.onerror = reject;
                        document.body.appendChild(addChannelScripts);
                    });
                } else {
                    console.warn("No specific script handling for this route:", hash);
                }
            } catch (err) {
                document.getElementById('app').innerHTML = '<h1>Error loading page</h1>';
            }
        } else {
            document.getElementById('app').innerHTML = '<h1>404 Not Found</h1>';
        }

        const sfxScript = document.createElement('script');
        sfxScript.src = './templates/sfx.js';
        await new Promise((resolve, reject) => {
            sfxScript.onload = resolve;
            sfxScript.onerror = reject;
            document.body.appendChild(sfxScript);
        });

        const bgmScript = document.createElement('script');
        bgmScript.src = './templates/bgm.js';
        await new Promise((resolve, reject) => {
            bgmScript.onload = resolve;
            bgmScript.onerror = reject;
            document.body.appendChild(bgmScript);
        });
    }
}

const routes = {
    warning: './templates/warning.html',
    mainmenu: './templates/mainmenu.html',
    settings: './templates/settings.html',
    settingsAddChannel: './templates/settingsAddChannel.html',
    settingsDeleteChannel: './templates/settingsDeleteChannel.html',
    channel: './templates/channel.html',
}

const clickSound = new Audio("./static/wiiclick.mp3");
document.addEventListener("click", () => {
    // Restart the sound if it's already playing
    clickSound.currentTime = 0;
    clickSound.play();
});

const router = new Router(routes);
router.handleRouteChange();