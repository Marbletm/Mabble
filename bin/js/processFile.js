let currentFilePath = null;
let oldText = '';

function loadFile() {
    currentFilePath = document.getElementById('load-file').value;

    // Read file with Node.js API
    let fs = nw.require('fs');
    fs.readFile(currentFilePath, 'utf8', function(err, txt) {
        if (err) {
            console.error(err);
            return;
        }

        try {
            let obj = JSON.parse(txt);
            txt = JSON.stringify(obj, null, 4);
        } catch (e) {
            // Do nothing
        }

        document.getElementById('text').innerHTML = txt;
        oldText = txt;
    });
}

function saveFile() {
    let fs = nw.require('fs');
    if (currentFilePath !== null) {
        let content = document.getElementById('text').innerHTML;
        fs.writeFile(currentFilePath, content, function(err, txt) {
            if (err) {
                console.error(err);
            }
            oldText = txt;
        });
    } else {
        let save = document.getElementById('save-file');
        save.addEventListener('input', function() {
            let path = save.value;
            let content = document.getElementById('text').innerHTML;
            fs.writeFile(path, content, function(err, txt) {
                if (err) {
                    console.error(err);
                }
                oldText = txt;
            });
        });
        save.click();
    }
}

async function newFile() {
    let element = document.getElementById('text');
    if(element.innerHTML !== oldText) {
        if(await aboutToDeleteAlert()) return;
    }

    oldText = '';
    currentFilePath = null;
    element.innerHTML = '';
}

async function aboutToDeleteAlert() {
    return !await swal({
        title: "Are you sure?",
        text: "You're about to perform an action that will erase your progress so far. Are you sure that you want to proceed?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    });
}
