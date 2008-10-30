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
                                    title: "Menu Components",
                                    children: [
                                        new Echo.Row({
                                            cellSpacing: "1em",
                                            children: [
                                                new Echo.Column({
                                                    layoutData: {
                                                        alignment: "top"
                                                    },
                                                    insets: "1em",
                                                    cellSpacing: "2em",
                                                    children: [
                                                        new Extras.ContextMenu({
                                                            styleName: "Default",
                                                            children: [
                                                                new Echo.Button({
                                                                    styleName: "Default",
                                                                    insets: "5px 10px",
                                                                    text: "A Button with a ContextMenu (Right-click it!)"
                                                                })
                                                            ],
                                                            events: {
                                                                init: Core.method(this, function(e) {
                                                                    e.source.set("model",
                                                                            this.application.workspace.createMenuModel());
                                                                })
                                                            }
                                                        }),
                                                        new Echo.Column({
                                                            cellSpacing: 5,
                                                            children: [
                                                                this._dropDownMenu = new Extras.DropDownMenu({
                                                                    styleName: "Default",
                                                                    events: {
                                                                        init: Core.method(this, function(e) {
                                                                            e.source.set("model",
                                                                                    this.application.workspace.createMenuModel());
                                                                        })
                                                                    }
                                                                }),
                                                                new Echo.CheckBox({
                                                                    text: "Enable Selection in DropDownMenu",
                                                                    events: {
                                                                        action: Core.method(this, function(e) {
                                                                            this._dropDownMenu.set("selectionEnabled",
                                                                                    e.source.get("selected"));
                                                                        })
                                                                    }
                                                                })
                                                            ]
                                                        }),
                                                        new Echo.Label({
                                                            font: {
                                                                size: "8pt"
                                                            },
                                                            text: "Note: the example menu components above do not have " +
                                                                  "configured event listeners, so selecting an option " +
                                                                  "will cause no action."
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
                                                            text: "A MenuBarPane displays a conventional pull-down menu, such " +
                                                                  "as the one shown at the top of the screen."
                                                        }),
                                                        new Echo.Label({
                                                            text: "A ContextMenu provides the capability to display a context " +
                                                                  "menu for any component."
                                                        }),
                                                        new Echo.Label({
                                                            text: "DropDownMenu is a simple menu control with a small visual " +
                                                                  "footprint.  It can optionally be used as a list selection " +
                                                                  "component."
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
                                    title: "ToolTipContainer",
                                    children: [
                                        new Echo.Row({
                                            cellSpacing: "1em",
                                            children: [
                                                new Extras.ToolTipContainer({
                                                    children: [
                                                        new Echo.Button({
                                                            styleName: "Default",
                                                            insets: "5px 10px",
                                                            text: "A Button in a ToolTipContainer"
                                                        }),
                                                        new Echo.Column({
                                                            background: "#ffffaf",
                                                            insets: "1ex",
                                                            border: "1px outset #ffffaf",
                                                            children: [
                                                                new Echo.Button({
                                                                     textPosition: "top",
                                                                     alignment: "center",
                                                                     icon: "image/demoicon/ChartIcon64.gif",
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
                                                                  "components in a tool tip."
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),
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
                                                            text: "Adjust the ColorSelect to change " +
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
