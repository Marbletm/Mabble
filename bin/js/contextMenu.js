class ContextMenu {
    constructor() {
        this.menu = null;
        this.init();
    }

    init() {
        let menu = new nw.Menu();

        // Add some items with label
        menu.append(new nw.MenuItem({
            label: 'Item A',
            click: function () {
                alert('You have clicked at "Item A"');
            }
        }));
        menu.append(new nw.MenuItem({label: 'Item B'}));
        menu.append(new nw.MenuItem({type: 'separator'}));
        menu.append(new nw.MenuItem({label: 'Item C'}));

        document.addEventListener("DOMContentLoaded", function () {
            document.body.addEventListener('contextmenu', function (ev) {
                // Prevent showing default context menu
                ev.preventDefault();

                // Popup the native context menu at place you click
                menu.popup(ev.x, ev.y);
                this.menu = menu;
                if (this.cb !== undefined) this.cb(this.menu);

                return false;
            }, false);
        });
    }

    onReady(cb) {
        if (this.menu === null) {
            this.cb = cb;
            return;
        }
        cb(this.menu);
    }

    get() {
        return this.menu;
    }

}

let contextMenu = new ContextMenu();
