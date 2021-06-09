import {Themes} from "./themes.js";

export class TopPanel {
    constructor(htmlElement) {
        this.html = htmlElement;
        this.allowPanelHiding();
        this.loadTheme(null, Themes.CurrentTheme);
    }

    allowPanelHiding() {
        let rotateButton = this.html.getElementsByClassName('rotatable')[0];
        rotateButton.addEventListener('click', togglePanel);
        let html = this.html;

        function togglePanel() {
            html.classList.toggle('rotate');
            html.classList.toggle('hidden');
        }
    }

    loadTheme(oldTheme, newTheme) {
        if (oldTheme != null) {
            this.html.classList.remove(oldTheme.windowColor);
            this.html.children[1].classList.remove(oldTheme.windowColor);
        }

        this.html.classList.add(newTheme.windowColor);
        this.html.children[1].classList.add(newTheme.windowColor);
    }
}