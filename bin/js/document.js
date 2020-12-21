class Document {
    static idCounter = 0;

    constructor() {
        this.id = Document.getID();
        this.element = null;
        this.oldText = '';
        this.textElement = null;
        this.currentFilePath = null;

        this.init();
    }

    static getID() {
        const id = Document.idCounter;
        Document.idCounter++;
        return id;
    }

    init() {
        const fs = nw.require('fs');
        const id = this.id;
        const txt = fs.readFileSync('html/document.html', 'utf8');

        document.getElementById('documents').insertAdjacentHTML('beforeend' ,txt.replace('{{id}}', id));
        this.element = document.getElementById(`${id}`);
        this.textElement = this.element.getElementsByClassName('text').item(0);

        const element = this.element;
        this.element.getElementsByClassName('load').item(0).onclick = function () {
            element.getElementsByClassName('load-file').item(0).click();
        };
        this.element.getElementsByClassName('load').item(0).getElementsByClassName('load-file').item(0).addEventListener('input', this.load.bind(this));
        this.element.getElementsByClassName('save').item(0).onclick = this.save.bind(this);
        this.element.getElementsByClassName('delete').item(0).onclick = this.new.bind(this);
        this.element.getElementsByClassName('close').item(0).onclick = this.selfDestruct.bind(this);
    }

    load() {
        const contextButtons = this.element.getElementsByClassName('context-buttons').item(0);
        const load = contextButtons.getElementsByClassName('load').item(0);
        this.currentFilePath = load.getElementsByClassName('load-file').item(0).value;

        const fs = nw.require('fs');
        let txt = fs.readFileSync(this.currentFilePath, 'utf8');

        try {
            let obj = JSON.parse(txt);
            txt = JSON.stringify(obj, null, 4);
        } catch (e) {}

        this.element.getElementsByClassName('text').item(0).innerHTML = txt;
        this.oldText = txt;
    }

    save() {
        const fs = nw.require('fs');
        if (this.currentFilePath !== null) {
            const content = this.textElement.innerHTML;
            fs.writeFileSync(this.currentFilePath, content);
            this.oldText = content;
        } else {
            const save = this.element.getElementsByClassName('save-file').item(0);
            const element = this.textElement;
            save.addEventListener('input', function() {
                const path = save.value;
                const content = element.innerHTML;
                fs.writeFileSync(path, content);
                this.oldText = content;
            });
            save.click();
        }
    }

    async new() {
        const element = this.textElement;
        if(element.innerHTML !== this.oldText) {
            if(await Document.aboutToDeleteAlert()) return;
        }

        this.oldText = '';
        this.currentFilePath = null;
        element.innerHTML = '';
    }

    async selfDestruct() {
        if (this.isChanged()) {
            if (await Document.aboutToDeleteAlert()) {
                return;
            }
        }

        this.element.remove();
        for(let i = 0; i < documents.length; i++) {
            const document = documents[i];
            if (document === this) {
                documents.splice(i, 1);
                break;
            }
        }

        if(documents.length === 0) {
            const fs = nw.require('fs');
            const txt = fs.readFileSync('html/none.html', 'utf8');
            document.getElementById('documents').insertAdjacentHTML('beforeend', txt);
        }
        updateWidth();
    }

    static async aboutToDeleteAlert() {
        return !await swal({
            title: "Are you sure?",
            text: "You're about to perform an action that will erase your progress so far. Are you sure that you want to proceed?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        });
    }

    isChanged() {
        return this.oldText !== this.element.getElementsByClassName('text').item(0).innerHTML;
    }
}
