export class Theme {
    constructor(mainColor, windowColor, textColor) {
        this.mainColor = mainColor;
        this.windowColor = windowColor;
        this.textColor = textColor;
    }
}

export class Themes {
    static Available = {
        "Dark": new Theme("medium-dark", "darker", "text-light"),
        "Light": new Theme("light", "cyan", ""),
    }

    static CurrentTheme = null;

    static Get(themeName) {
        this.CurrentTheme = Themes.Available[themeName];
        return this.CurrentTheme;
    }
}
