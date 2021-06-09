import {Themes} from "./themes.js";

function collapseMenuItems(menu) {
    for(let i = 0; i < menu.items.length; i++) {
        menu.items[i].children[0].classList.add('hidden');
    }
}

export class MenuBar {
    constructor(htmlElement) {
        this.html = htmlElement;
        this.items = this.html.getElementsByClassName('item');
        let bar = this;

        document.addEventListener('mousedown', function (e) {
            if (!e.target.matches('.item')) {
                collapseMenuItems(bar);
            }
        });

        for(let i = 0; i < this.items.length; i++) {
            this.items[i].addEventListener("click", function (e) {
                if (e.target.matches('.item')) {
                    bar.expandItem(e.target);
                } else {
                    // TODO: Implement menu actions
                    console.log("Implement menu actions.");
                }
            });
        }

        this.loadTheme(null, Themes.CurrentTheme);
    }

    expandItem(item) {
        collapseMenuItems(this);
        item.children[0].classList.remove('hidden');
    }

    loadTheme(oldTheme, newTheme) {
        if (oldTheme != null) {
            this.html.classList.remove(oldTheme.windowColor);
            for(let i = 0; i < this.items.length; i++) {
                this.items[i].children[0].classList.remove(oldTheme.windowColor);
            }
        }

        this.html.classList.add(newTheme.windowColor);
        for(let i = 0; i < this.items.length; i++) {
            this.items[i].children[0].classList.add(newTheme.windowColor);
        }
    }
}