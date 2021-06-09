import {WindowManager} from "./window-manager.js";
import {Themes} from "./themes.js";
import {UIFactory} from "./uifactory.js";

document.addEventListener("DOMContentLoaded", function () {
    Themes.Get("Dark");
    let windowGroup = document.getElementById('window-group');
    let windowManager = new WindowManager(windowGroup);

    let uiFactory = new UIFactory(document.getElementById('body'));
    uiFactory.createWindow(windowManager, {
        "AllowClosing": true,
        "AllowDragging": true,
        "AllowMaximize": true,
        "AllowHideContent": true,
        "AllowResize": true,
    });

    uiFactory.createMenuBar()
    uiFactory.createTopPanel()
});