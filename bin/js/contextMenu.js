let menu = new nw.Menu();
menu.append(new nw.MenuItem({
    label: 'Open new tab',
    click: function () {
        try { document.getElementById('none-displayed').remove();
        } catch(e) {}
        documents.push(new Document());
        updateWidth();
    }
}));

// menu.append(new nw.MenuItem({label: 'Item B'}));
// menu.append(new nw.MenuItem({type: 'separator'}));
// menu.append(new nw.MenuItem({label: 'Item C'}));

document.addEventListener("DOMContentLoaded", function () {
    document.body.addEventListener('contextmenu', function (ev) {
        // Prevent showing default context menu
        ev.preventDefault();
        menu.popup(ev.x, ev.y);
        this.menu = menu;
        if (this.cb !== undefined) this.cb(this.menu);

        return false;
    }, false);
});
