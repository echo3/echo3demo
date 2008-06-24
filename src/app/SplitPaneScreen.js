DemoApp.SplitPaneScreen = Core.extend(Echo.ContentPane, {

    _msg: null,

    $construct: function() {
        this._msg = DemoApp.getMessages(null);
        Echo.ContentPane.call(this, {
            background: "#ffffff",
            children: [
                new Echo.SplitPane({
                    styleName: "DefaultResizableLarge",
                    separatorPosition: 220,
                    children: [
                        new Echo.SplitPane({
                            styleName: "DefaultResizableLarge",
                            orientation: Echo.SplitPane.ORIENTATION_VERTICAL_TOP_BOTTOM,
                            separatorPosition: 350,
                            children: [
                                new Echo.Label({
                                    layoutData: {
                                        backgroundImage: {
                                            url: "image/bgpictures/Moonlight.jpg",
                                            x: 1,
                                            y: 1
                                        },
                                        insets: "8px 15px"
                                    },
                                    text: this._msg["SplitPaneScreen.PrimaryDescription"]
                                }),
                                new Echo.ContentPane({
                                    backgroundImage: {
                                        url: "image/bgpictures/Fireworks.jpg",
                                        x: "-150",
                                        y: "50%"
                                    }
                                })
                            ]
                        }),
                        new Echo.SplitPane({
                            styleName: "DefaultResizableLarge",
                            orientation: Echo.SplitPane.ORIENTATION_HORIZONTAL_TRAILING_LEADING,
                            separatorPosition: 200,
                            children: [
                                new Echo.SplitPane({
                                    styleName: "DefaultResizableLarge",
                                    orientation: Echo.SplitPane.ORIENTATION_VERTICAL_BOTTOM_TOP,
                                    separatorPosition: 300,
                                    children: [
                                        new Echo.Label({
                                            layoutData: {
                                                backgroundImage: {
                                                    url: "image/bgpictures/Moonlight.jpg",
                                                    x: "99%",
                                                    y: "99%"
                                                },
                                                insets: "8px 15px"
                                            },
                                            foreground: "#ffffff",
                                            text: this._msg["SplitPaneScreen.SecondaryDescription"]
                                        }),
                                        new Echo.ContentPane({
                                            backgroundImage: {
                                                url: "image/bgpictures/Fireworks.jpg",
                                                x: "-225",
                                                y: "50%"
                                            }
                                        })
                                    ]
                                }),
                                new Echo.SplitPane({
                                    styleName: "DefaultResizableLarge",
                                    orientation: Echo.SplitPane.ORIENTATION_VERTICAL_TOP_BOTTOM,
                                    separatorPosition: "50%",
                                    children: [
                                        new Echo.SplitPane({
                                            styleName: "DefaultResizableLarge",
                                            orientation: Echo.SplitPane.ORIENTATION_VERTICAL_BOTTOM_TOP,
                                            separatorPosition: "50%",
                                            children: [
                                                new Echo.ContentPane({
                                                    styleName: "Photo.Poinsettia"
                                                }),
                                                new Echo.ContentPane({
                                                    styleName: "Photo.Leaf"
                                                })
                                            ]
                                        }),
                                        new Echo.SplitPane({
                                            styleName: "DefaultResizableLarge",
                                            orientation: Echo.SplitPane.ORIENTATION_VERTICAL_TOP_BOTTOM,
                                            separatorPosition: "50%",
                                            children: [
                                                new Echo.ContentPane({
                                                    styleName: "Photo.Fern"
                                                }),
                                                new Echo.ContentPane({
                                                    styleName: "Photo.Winter"
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                })
            ]
        });
    }
});
