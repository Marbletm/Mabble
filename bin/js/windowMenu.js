async function closeWindow() {
    for(let i = 0; i < documents.length; i++) {
        const document = documents[i];
        if(document.isChanged()) {
            if(await Document.aboutToDeleteAlert()) return;
            break;
        }
    }

    nwWindow.close();
}

function maximizeWindow() {
    nwWindow.toggleFullscreen();
    setTimeout(updateWidth, 100);
}

function minimizeWindow() {
    nwWindow.minimize();
}
