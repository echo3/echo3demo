var label;
var content = new Echo.ContentPane({
    children: [
        new Echo.SplitPane({ 
            styleName: "DefaultResizableLarge",
            orientation: Echo.SplitPane.ORIENTATION_HORIZONTAL,
            children: [
                new Echo.Column({
                    layoutData: {
                        background: "#4f4f5f",
                        insets: 5
                    },
                    children: [
                        new Echo.Button({
                            styleName: "Default",
                            text: "Alpha",
                            events: {
                                action: function(e) {
                                    label.set("text", "A");
                                }
                            }
                        }),
                        new Echo.Button({
                            styleName: "Default",
                            text: "Bravo",
                            events: {
                                action: function(e) {
                                    label.set("text", "B");
                                }
                            }
                        })
                    ]
                }),
                label = new Echo.Label({
                    layoutData: {
                        alignment: "center"
                    },
                    font: { size: 200 },
                    text: "?"
                })
            ]
        })
    ]
});
