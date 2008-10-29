DemoApp.ExtrasWidgetsScreen = Core.extend(Echo.ContentPane, {
    
    _msg: null,
    _colorSelect: null,
    _colorSelectLabel: null,

    $construct: function() {
        this._msg = DemoApp.getMessages(null);
        Echo.ContentPane.call(this, {
            children: [
                new Echo.Row({
                    children: [
                        new Echo.Column({
                            layoutData: {
                                alignment: "top"
                            },
                            insets: "1em",
                            cellSpacing: "1em",
                            children: [
                                new Extras.Group({
                                    title: "CalendarSelect",
                                    children: [
                                        new Echo.Row({
                                            cellSpacing: "1em",
                                            children: [
                                                new Extras.CalendarSelect({
                                                    layoutData: {
                                                        alignment: "top"
                                                    }
                                                }),
                                                new Echo.Column({
                                                    layoutData: {
                                                        alignment: "top"
                                                    },
                                                    cellSpacing: "1em",
                                                    children: [
                                                        new Echo.Label({
                                                            text: "The CalendarSelect component provides the " +
                                                                  "capability to select dates from a visual representation of " + 
                                                                  "a calendar."
                                                        }),
                                                        new Echo.Label({
                                                            text: "It features animated transitions when selecting " +
                                                                  "a month or year."
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new Extras.Group({
                                    title: "ToolTipContainer",
                                    children: [
                                        new Echo.Row({
                                            cellSpacing: "1em",
                                            children: [
                                                new Extras.ToolTipContainer({
                                                    children: [
                                                        new Echo.Button({
                                                            styleName: "Default",
                                                            text: "A Button in a ToolTipContainer"
                                                        }),
                                                        new Echo.Column({
                                                            background: "#ffffaf",
                                                            insets: "1ex",
                                                            border: "1px outset #ffffaf",
                                                            children: [
                                                                new Echo.Label({
                                                                     text: "This is a custom tool tip."
                                                                }),
                                                                new Echo.Label({
                                                                     text: "This is a custom tool tip."
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                new Echo.Column({
                                                    layoutData: {
                                                        alignment: "top"
                                                    },
                                                    cellSpacing: "1em",
                                                    children: [
                                                        new Echo.Label({
                                                            text: "The ToolTipContainer component lets you place arbitrary " +
                                                                  "components in a tool tip that appears when the user rolls " +
                                                                  "the mouse over a component."
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        new Echo.Column({
                            layoutData: {
                                alignment: "top"
                            },
                            cellSpacing: "1em",
                            insets: "1em",
                            children: [
                                new Extras.Group({
                                    title: "ColorSelect",
                                    children: [
                                        new Echo.Row({
                                            cellSpacing: "1em",
                                            children: [
                                                this._colorSelect = new Extras.ColorSelect({
                                                    layoutData: {
                                                        alignment: "top"
                                                    },
                                                    color: "#3f3f7f",
                                                    displayValue: true,
                                                    events: {
                                                        property: Core.method(this, function(e) {
                                                            if (e.propertyName == "color") {
                                                                this._colorSelectLabel.set("foreground", e.source.get("color"));
                                                            }
                                                        })
                                                    }
                                                }),
                                                new Echo.Column({
                                                    layoutData: {
                                                        alignment: "top"
                                                    },
                                                    cellSpacing: "1em",
                                                    children: [
                                                        new Echo.Label({
                                                            text: "The ColorSelect component enables a user " + 
                                                                    "to select an RGB color " +
                                                                    "quickly using a visual component."
                                                        }),
                                                        this._colorSelectLabel = new Echo.Label({
                                                            foreground: "#3f3f7f",
                                                            text: "Adjusting the ColorSelect shown at left will change " +
                                                                  "the color of this text."
                                                        }),
                                                        new Echo.CheckBox({
                                                            text: "Display Hex Color Value",
                                                            selected: true,
                                                            events: {
                                                                action: Core.method(this, function(e) {
                                                                    this._colorSelect.set("displayValue", e.source.get("selected"));
                                                                })
                                                            }
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
                })
            ]
        });
    }
});
