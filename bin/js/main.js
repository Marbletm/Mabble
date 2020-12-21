let nwWindow = nw.Window.get();

document.addEventListener("DOMContentLoaded", function () {

    document.getElementById('load').onclick = function () {
        document.getElementById('load-file').click();
    };
    document.getElementById('load-file').addEventListener('input', loadFile);

    document.getElementById('save').onclick = saveFile;
    document.getElementById('delete').onclick = newFile;

});
