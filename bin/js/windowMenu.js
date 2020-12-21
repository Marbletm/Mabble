async function closeWindow() {
    if (document.getElementById('text').innerHTML !== oldText) {
        if(await aboutToDeleteAlert()) return;
    }
    nwWindow.close();
}

function maximizeWindow() {
    nwWindow.toggleFullscreen();
}

function minimizeWindow() {
    nwWindow.minimize();
}
