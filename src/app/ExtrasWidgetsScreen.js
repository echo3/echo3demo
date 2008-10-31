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
                                    title: this._msg["ExtrasWidgetsScreen.CalendarSelect.Title"],
                                    children: [
                                        new Echo.Row({
                                            cellSpacing: "1em",
                                            children: [
                                                new Extras.CalendarSelect({
                                                    styleName: "Default",
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
                                                            text: this._msg["ExtrasWidgetsScreen.CalendarSelect.Desc1"]
                                                        }),
                                                        new Echo.Label({
                                                            text: this._msg["ExtrasWidgetsScreen.CalendarSelect.Desc2"]
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new Extras.Group({
                                    title: this._msg["ExtrasWidgetsScreen.Menu.Title"],
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
                                                                    text: this._msg["ExtrasWidgetsScreen.Menu.ContextButton"]
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
                                                                    selectionText: this._msg[
                                                                            "ExtrasWidgetsScreen.Menu.DropDownButton"],
                                                                    events: {
                                                                        init: Core.method(this, function(e) {
                                                                            e.source.set("model",
                                                                                    this.application.workspace.createMenuModel());
                                                                        })
                                                                    }
                                                                }),
                                                                new Echo.CheckBox({
                                                                    text: this._msg["ExtrasWidgetsScreen.Menu.DropDownSelection"],
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
                                                            text: this._msg["ExtrasWidgetsScreen.Menu.Note"]
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
                                                            text: this._msg["ExtrasWidgetsScreen.Menu.MenuBarPane.Desc"]
                                                        }),
                                                        new Echo.Label({
                                                            text: this._msg["ExtrasWidgetsScreen.Menu.ContextMenu.Desc"]
                                                        }),
                                                        new Echo.Label({
                                                            text: this._msg["ExtrasWidgetsScreen.Menu.DropDownMenu.Desc"]
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
                                    title: this._msg["ExtrasWidgetsScreen.ToolTip.Title"],
                                    children: [
                                        new Echo.Row({
                                            cellSpacing: "1em",
                                            children: [
                                                new Extras.ToolTipContainer({
                                                    children: [
                                                        new Echo.Button({
                                                            styleName: "Default",
                                                            insets: "5px 10px",
                                                            text: this._msg["ExtrasWidgetsScreen.ToolTip.Button"]
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
                                                                     text: this._msg["ExtrasWidgetsScreen.ToolTip.Tip"]
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
                                                            text: this._msg["ExtrasWidgetsScreen.ToolTip.Desc"]
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new Extras.Group({
                                    title: this._msg["ExtrasWidgetsScreen.ColorSelect.Title"],
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
                                                            text: this._msg["ExtrasWidgetsScreen.ColorSelect.Desc"]
                                                        }),
                                                        this._colorSelectLabel = new Echo.Label({
                                                            foreground: "#3f3f7f",
                                                            text: this._msg["ExtrasWidgetsScreen.ColorSelect.ChangeText"]
                                                        }),
                                                        new Echo.CheckBox({
                                                            text: this._msg["ExtrasWidgetsScreen.ColorSelect.DisplayHex"],
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
