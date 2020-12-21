class Document {
    static idCounter = 0;

    constructor() {
        this.id = Document.getID();
        this.element = new HTMLDivElement;
        this.oldText = '';
        this.currentFilePath = null;
    }

    static getID() {
        const id = Document.idCounter;
        Document.idCounter++;
        return id;
    }

    init() {
        const fs = nw.require('fs');
        const id = this.id;
        const txt = fs.readFileSync('../html/document.html', 'utf8');

        this.element = document.getElementById('documents').insertAdjacentHTML('beforeend' ,txt.replace('{{id}}', id));

        document.getElementById('load').onclick = function () {
            document.getElementById('load-file').click();
        };
        document.getElementById('load-file').addEventListener('input', loadFile);

        document.getElementById('save').onclick = saveFile;
        document.getElementById('delete').onclick = newFile;
    }

    load() {
        currentFilePath = this.element.getElementsByClassName('load-file').item(0).value;
        const fs = nw.require('fs');
        let txt = fs.readFileSync(currentFilePath, 'utf8');

        try {
            let obj = JSON.parse(txt);
            txt = JSON.stringify(obj, null, 4);
        } catch (e) {}

        this.element.getElementsByClassName('text').item(0).innerHTML = txt;
        this.oldText = txt;
    }

    save() {
        const fs = nw.require('fs');
        if (currentFilePath !== null) {
            const content = this.element.getElementsByClassName('text').item(0).innerHTML;
            fs.writeFileSync(currentFilePath, content);
            oldText = content;
        } else {
            const save = document.getElementsByClassName('save-file').item(0);
            save.addEventListener('input', function() {
                const path = save.value;
                const content = this.element.getElementsByClassName('text').item(0).innerHTML;
                fs.writeFileSync(path, content);
                oldText = content;
            });
            save.click();
        }
    }

    async new() {
        const element = this.element.getElementsByClassName('text').item(0);
        if(element.innerHTML !== oldText) {
            if(await aboutToDeleteAlert()) return;
        }

        oldText = '';
        currentFilePath = null;
        element.innerHTML = '';
    }

    async aboutToDeleteAlert() {
        return !await swal({
            title: "Are you sure?",
            text: "You're about to perform an action that will erase your progress so far. Are you sure that you want to proceed?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        });
    }
}
