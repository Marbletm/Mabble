let nwWindow = nw.Window.get();
let documents = [];

document.addEventListener("DOMContentLoaded", function () {
    documents.push(new Document());
    updateWidth();
});

nwWindow.on('resize', function () {
    updateWidth();
});

function updateWidth() {
    document.getElementById('documents').style.width = `${nwWindow.width}px`;
    const documentElements = document.getElementsByClassName('document');
    for (let i = 0; i < documentElements.length; i++) {
        documentElements.item(i).style.width = `${nwWindow.width / documents.length}px`;
        documentElements.item(i).style.height = `${nwWindow.height - 100}px`;
        // document.getElementsByClassName('context-buttons-separator').item(i).style.width = `${nwWindow.width}px`;
    }
}
