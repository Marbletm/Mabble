class MenuBar {
    constructor() {
        this.menu = null;
        this.cb = null;
        this.init();
    }

    init() {
        let menu = new nw.Menu({type: 'menubar'});

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

        this.menu = menu;

        console.log(this.cb);
        if (this.cb !== null) {
            this.cb(this.menu);
            console.log('heya');
        }
    }

    onReady(cb) {
        if (this.menu === null) {
            this.cb = cb;
            console.log('not ready');
            console.log(this.cb);
            return;
        }
        cb(this.menu);
    }

    get() {
        return this.menu;
    }

}

let menuBar = new MenuBar();

menuBar.onReady(function (menu) {
    nw.Window.get().menu = menu;
});

