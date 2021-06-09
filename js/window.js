import {loadWindowOptions} from './window-options.js'
import {changeIcon} from './helpers.js'
import {Themes} from "./themes.js";

export class Window {
    constructor(htmlElement, options) {
        this.html = htmlElement;
        this.border = htmlElement.children[1];
        this.innerHtml = htmlElement.children[0];
        this.header = this.innerHtml.children[0];
        this.content = this.innerHtml.children[1];
        this.active = false;
        this.maximized = false;
        this.position = [800, 300];
        this.size = [800, 400];
        this.lastMaximizedSize = [this.position, this.size];
        this.buttons = {}
        loadWindowOptions(this, options);
        this.loadTheme(null, Themes.CurrentTheme)
    }

    get size() {
        return this._size;
    }

    set size(newSize) {
        this._size = newSize;
        this.html.style.width = newSize[0] + 'px';
        this.html.style.height = newSize[1] + 'px';
        this.border.style.width = newSize[0] + 10 + 'px';
        this.border.style.height = newSize[1] + 10 + 'px';
    }

    get position() {
        return this._position;
    }

    set position(newPosition) {
        this._position = newPosition;
        this.html.style.left = newPosition[0] + 'px';
        this.html.style.top = newPosition[1] + 'px';
        this.border.style.left = newPosition[0] - 5 + 'px';
        this.border.style.top = newPosition[1] - 5 + 'px';
    }


    toggleContent() {
        this.header.classList.toggle('rotate');
        this.html.classList.toggle('hidden');
        this.content.classList.toggle('hidden');
        this.border.classList.toggle('hidden')
    }


    maximizeWindow() {
        if (this.maximized) {
            changeIcon(this.buttons['Maximize'], 'maximize.svg');
            this.position = this.lastMaximizedSize[0];
            this.size = this.lastMaximizedSize[1];
            this.maximized = false;
        } else {
            changeIcon(this.buttons['Maximize'], 'minimize.svg');

            this.lastMaximizedSize = [this.position, this.size];

            this.html.style.width = '100%';
            this.html.style.height = '100%';

            this.position = [0, 0]
            this.maximized = true;
        }
    }

    loadTheme(oldTheme, newTheme) {
        if (oldTheme != null) {
            this.header.classList.remove(oldTheme.windowColor);
            this.innerHtml.classList.remove(oldTheme.mainColor);
            this.innerHtml.classList.remove(oldTheme.textColor);
        }

        this.header.classList.add(newTheme.windowColor);
        this.innerHtml.classList.add(newTheme.mainColor);
        this.innerHtml.classList.add(newTheme.textColor);
    }

    close() {
        this.html.classList.add('fade-out');
        let window = this;
        setTimeout(function () {
            window.html.parentElement.removeChild(window.html);
        }, 200);
    }
}