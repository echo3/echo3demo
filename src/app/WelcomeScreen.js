DemoApp.WelcomeScreen = Core.extend(Echo.ContentPane, {

    _msg: null,

    $construct: function() {
        this._msg = DemoApp.getMessages(null);
        var west = new Date().getTimezoneOffset() >= 60;
        Echo.ContentPane.call(this, {
            styleName: west ? "Photo.EarthWest" : "Photo.EarthEast",
            children: [
                new Echo.WindowPane({
                    styleName: "GlassBlue",
                    contentWidth: "32em",
                    insets: "1em 2em",
                    positionX: "10%",
                    positionY: "90%",
                    maximizeEnabled: true,
                    title: this._msg["WelcomeScreen.WindowTitle"],
                    closable: false,
                    children: [
                        new Echo.Column({
                            cellSpacing: "1em",
                            children: [
                                new Echo.Label({
                                    text: this._msg["WelcomeScreen.WelcomeText"]
                                }),
                                new Echo.Label({
                                    text: this._msg["WelcomeScreen.DevelopmentText"]
                                }),
                                new Echo.Label({
                                    text: this._msg["WelcomeScreen.NavHelpText"]
                                })
                            ]
                        })
                    ]
                })
            ]
        });
    }
});
