import {Window} from "./window.js";

export class WindowManager {
    constructor(windowGroup) {
        this.windowGroup = windowGroup;
        this.windows = [];
    }

    focusWindow(focusedWindow) {
        let index = this.windows.indexOf(focusedWindow);
        if (index === 0) {
            return;
        }

        this.windows.unshift(this.windows.splice(index, 1)[0]);

        let zIndex = 1000;
        for (let index in this.windows) {
            let window = this.windows[index];
            window.active = false;
            window.html.style.zIndex = zIndex;
            zIndex -= 20;
        }

        focusedWindow.active = true;
    }

    loadHtml(file, target) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', file, true);
        xhr.addEventListener('load', function () {
            // Error handling
            if (this.readyState!==4) return;
            if (this.status!==200) return;
            target.insertAdjacentHTML('beforeend', this.responseText)
        });

        return xhr
    }

    loadTheme(oldTheme, newTheme) {
        for (let index in this.windows) {
            let window = this.windows[index].loadTheme(oldTheme, newTheme);
        }
    }
}