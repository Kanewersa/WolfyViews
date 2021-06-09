import {Window} from "./window.js";
import {TopPanel} from "./top-panel.js";
import {MenuBar} from "./menu-bar.js";

export class UIFactory {
    constructor(body) {
        this.body = body;
    }

    createWindow(manager, options) {
        this.loadHtml("window.html", manager.windowGroup, loadWindow)

        function loadWindow() {
            let windowHtml = manager.windowGroup.lastChild;
            let window = new Window(windowHtml, options);
            manager.windows.push(window);

            windowHtml.addEventListener('mousedown', function () {
                manager.focusWindow(window);
            });
        }
    }

    createMenuBar() {
        this.loadHtml("menubar.html", this.body, loadMenu);

        function loadMenu() {
            let menuHtml = document.getElementById('menu-bar');
            let menuBar = new MenuBar(menuHtml);
        }
    }

    createTopPanel() {
        this.loadHtml("toppanel.html", this.body, loadPanel);

        function loadPanel() {
            let panelHtml = document.getElementById('top-panel');
            let topPanel = new TopPanel(panelHtml);
        }
    }

    loadHtml(file, target, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '../views/elements/' + file, true);
        xhr.addEventListener('load', function () {
            // Error handling
            if (this.readyState!==4) return;
            if (this.status!==200) return;
            target.insertAdjacentHTML('beforeend', this.responseText)
        });

        xhr.addEventListener('loadend', callback);
        xhr.send()
    }
}