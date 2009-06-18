DemoApp.WindowPaneScreen = Core.extend(Echo.ContentPane, {

    _msg: null,
    _colorContent: null,
    _colorSelect: null,
    _configWindow: null,

    _closeEnableButton: null,
    _maximizeEnableButton: null,
    _minimizeEnableButton: null,
    _moveEnableButton: null,
    _resizeEnableButton: null,
    _resizeMaximumEnableButton: null,
    _resizeMinimumEnableButton: null,

    $construct: function() {
        this._msg = DemoApp.getMessages(null);

        var closeGroup = Echo.Application.generateUid();
        var maximizeGroup = Echo.Application.generateUid();
        var minimizeGroup = Echo.Application.generateUid();
        var moveGroup = Echo.Application.generateUid();
        var resizeGroup = Echo.Application.generateUid();
        var resizeMaximumGroup = Echo.Application.generateUid();
        var resizeMinimumGroup = Echo.Application.generateUid();
    
        Echo.ContentPane.call(this, {
            background: "#524f47",
            children: [
                new Extras.TabPane({
                    styleName: "Default.Top.Surround",
                    insets: "10px 20px",
                    borderType: Extras.TabPane.BORDER_TYPE_SURROUND,
                    tabInset: 28,
                    children: [
                        new Echo.ContentPane({
                            styleName: "Photo.Countryside",
                            layoutData: {
                                title: this._msg["WindowPaneScreen.TabCountryside"]
                            }
                        }),
                        new Echo.ContentPane({
                            styleName: "Photo.Coral",
                            layoutData: {
                                activeForeground: "#ffffff",
                                activeBackground: "#000000",
                                title: this._msg["WindowPaneScreen.TabCoral"]
                            }
                        }),
                        this._colorContent = new Echo.ContentPane({
                            layoutData: {
                                title: this._msg["WindowPaneScreen.TabColorWindowTitle"]
                            },
                            background: "#ffffff",
                            children: [
                                new Echo.WindowPane({
                                    styleName: "GlassBlue2",
                                    contentWidth: "19em",
                                    movable: false,
                                    closable: false,
                                    resizable: false,
                                    title: this._msg["WindowPaneScreen.ChooseColor"],
                                    positionX: 0,
                                    positionY: 0,
                                    insets: "1em",
                                    children: [
                                        this._colorSelect = new Extras.ColorSelect({
                                            events: {
                                                property: Core.method(this, function(e) {
                                                    if (e.propertyName == "color") {
                                                        this._processSetColor(e);
                                                    }
                                                })
                                            }
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                this._configWindow = new Echo.WindowPane({
                    styleName: "Default",
                    width: "32em",
                    height: "22em",
                    positionX: "64%",
                    positionY: "17%",
                    closable: true,
                    maximizeEnabled: true,
                    title: this._msg["WindowPaneScreen.ConfigurationTitle"],
                    events: {
                        windowClosing: Core.method(this, this._processConfigurationClose)
                    },
                    children: [
                        new Extras.TabPane({
                            styleName: "Default.Top",
                            defaultContentInsets: "8px 15px",
                            children: [
                                new Echo.Column({
                                    layoutData: {
                                        title: this._msg["WindowPaneScreen.ConfigurationHelpTab"],
                                        icon: "image/icon/Icon24Help.png"
                                    },
                                    cellSpacing: 8,
                                    children: [
                                       new Echo.Label({
                                           text: this._msg["WindowPaneScreen.ConfigurationHelpText1"]
                                       }),
                                       new Echo.Label({
                                           text: this._msg["WindowPaneScreen.ConfigurationHelpText2"]
                                       })
                                    ]
                                }),
                                new Echo.Column({
                                    layoutData: {
                                        title: this._msg["WindowPaneScreen.ConfigurationMoveTab"],
                                        icon: "image/icon/Icon24Move.png"
                                    },
                                    children: [
                                        this._moveEnableButton = new Echo.RadioButton({
                                            group: moveGroup,
                                            text: this._msg["WindowPaneScreen.ConfigurationMoveEnable"],
                                            selected: true,
                                            events: {
                                                action: Core.method(this, this._processConfigMoveEnable)
                                            }
                                        }),
                                        new Echo.RadioButton({
                                            group: moveGroup,
                                            text: this._msg["WindowPaneScreen.ConfigurationMoveDisable"],
                                            events: {
                                                action: Core.method(this, this._processConfigMoveEnable)
                                            }
                                        })
                                    ]
                                }),
                                new Echo.Column({
                                    layoutData: {
                                        title: this._msg["WindowPaneScreen.ConfigurationResizeTab"],
                                        icon: "image/icon/Icon24Fullscreen.png"
                                    },
                                    cellSpacing: "1em",
                                    children: [
                                        new Echo.Column({
                                            children: [
                                                this._resizeEnableButton = new Echo.RadioButton({
                                                    group: resizeGroup,
                                                    text: this._msg["WindowPaneScreen.ConfigurationResizeEnable"],
                                                    selected: true,
                                                    events: {
                                                        action: Core.method(this, this._processConfigResizeEnable)
                                                    }
                                                }),
                                                new Echo.RadioButton({
                                                    group: resizeGroup,
                                                    text: this._msg["WindowPaneScreen.ConfigurationResizeDisable"],
                                                    events: {
                                                        action: Core.method(this, this._processConfigResizeEnable)
                                                    }
                                                })
                                            ]
                                        }),
                                        new Echo.Column({
                                            children: [
                                                this._resizeMinimumEnableButton = new Echo.RadioButton({
                                                    group: resizeMinimumGroup,
                                                    text: this._msg["WindowPaneScreen.ConfigurationResizeMinimumEnable"],
                                                    events: {
                                                        action: Core.method(this, this._processConfigResizeMinimum)
                                                    }
                                                }),
                                                new Echo.RadioButton({
                                                    group: resizeMinimumGroup,
                                                    selected: true,
                                                    text: this._msg["WindowPaneScreen.ConfigurationResizeMinimumDisable"],
                                                    events: {
                                                        action: Core.method(this, this._processConfigResizeMinimum)
                                                    }
                                                })
                                            ]
                                        }),
                                        new Echo.Column({
                                            children: [
                                                this._resizeMaximumEnableButton = new Echo.RadioButton({
                                                    group: resizeMaximumGroup,
                                                    text: this._msg["WindowPaneScreen.ConfigurationResizeMaximumEnable"],
                                                    events: {
                                                        action: Core.method(this, this._processConfigResizeMaximum)
                                                    }
                                                }),
                                                new Echo.RadioButton({
                                                    group: resizeMaximumGroup,
                                                    selected: true,
                                                    text: this._msg["WindowPaneScreen.ConfigurationResizeMaximumDisable"],
                                                    events: {
                                                        action: Core.method(this, this._processConfigResizeMaximum)
                                                    }
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new Echo.Column({
                                    layoutData: {
                                        title: this._msg["WindowPaneScreen.ConfigurationControlsTab"],
                                        icon: "image/icon/Icon24Preferences.png"
                                    },
                                    cellSpacing: "1em",
                                    children: [
                                        new Echo.Column({
                                            children: [
                                                this._closeEnableButton = new Echo.RadioButton({
                                                    group: closeGroup,
                                                    text: this._msg["WindowPaneScreen.ConfigurationCloseEnable"],
                                                    selected: true,
                                                    events: {
                                                        action: Core.method(this, this._processConfigCloseEnable)
                                                    }
                                                }),
                                                new Echo.RadioButton({
                                                    group: closeGroup,
                                                    text: this._msg["WindowPaneScreen.ConfigurationCloseDisable"],
                                                    events: {
                                                        action: Core.method(this, this._processConfigCloseEnable)
                                                    }
                                                })
                                            ]
                                        }),
                                        new Echo.Column({
                                            children: [
                                                this._maximizeEnableButton = new Echo.RadioButton({
                                                    group: maximizeGroup,
                                                    text: this._msg["WindowPaneScreen.ConfigurationMaximizeEnable"],
                                                    selected: true,
                                                    events: {
                                                        action: Core.method(this, this._processConfigMaximizeEnable)
                                                    }
                                                }),
                                                new Echo.RadioButton({
                                                    group: maximizeGroup,
                                                    text: this._msg["WindowPaneScreen.ConfigurationMaximizeDisable"],
                                                    events: {
                                                        action: Core.method(this, this._processConfigMaximizeEnable)
                                                    }
                                                })
                                            ]
                                        }),
                                        new Echo.Column({
                                            children: [
                                                this._minimizeEnableButton = new Echo.RadioButton({
                                                    group: minimizeGroup,
                                                    text: this._msg["WindowPaneScreen.ConfigurationMinimizeEnable"],
                                                    events: {
                                                        action: Core.method(this, this._processConfigMinimizeEnable)
                                                    }
                                                }),
                                                new Echo.RadioButton({
                                                    group: minimizeGroup,
                                                    text: this._msg["WindowPaneScreen.ConfigurationMinimizeDisable"],
                                                    selected: true,
                                                    events: {
                                                        action: Core.method(this, this._processConfigMinimizeEnable)
                                                    }
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                new Echo.WindowPane({
                    styleName: "GlassBlue",
                    title: this._msg["WindowPaneScreen.TranslucentTitle"],
                    width: "30em",
                    closable: false,
                    positionX: "95%",
                    positionY: "55%",
                    background: "#f5e6c2",
                    insets: "1em 2em",
                    children: [
                        new Echo.Column({
                            cellSpacing: 8,
                            children: [
                                new Echo.Label({
                                    text: this._msg["WindowPaneScreen.TranslucentText1"]
                                }),
                                new Echo.Label({
                                    text: this._msg["WindowPaneScreen.TranslucentText2"]
                                })
                            ]
                        })
                    ]
                }),
                new Echo.WindowPane({
                    styleName: "TransGreen",
                    title: this._msg["WindowPaneScreen.ModalTitle"],
                    closable: false,
                    positionX: "52%",
                    positionY: "95%",
                    insets: "1em 2em",
                    children: [
                        new Echo.Column({
                            cellSpacing: 8,
                            children: [
                                new Echo.Label({
                                    text: this._msg["WindowPaneScreen.ModalText1"]
                                })
                            ]
                        })
                    ]
                })
            ]
        });
    },
    
    _processConfigCloseEnable: function(e) {
        this._configWindow.set("closable", !!this._closeEnableButton.get("selected"));
    },
    
    _processConfigMaximizeEnable: function(e) {
        this._configWindow.set("maximizeEnabled", !!this._maximizeEnableButton.get("selected"));
    },
    
    _processConfigMinimizeEnable: function(e) {
        this._configWindow.set("minimizeEnabled", !!this._minimizeEnableButton.get("selected"));
    },
    
    _processConfigMoveEnable: function(e) {
        this._configWindow.set("movable", !!this._moveEnableButton.get("selected"));
    },
    
    _processConfigResizeEnable: function(e) {
        this._configWindow.set("resizable", !!this._resizeEnableButton.get("selected"));
    },
    
    _processConfigResizeMinimum: function(e) {
        var on = !!this._resizeMinimumEnableButton.get("selected");
        this._configWindow.set("minimumWidth", on ? 300 : null);
        this._configWindow.set("minimumHeight", on ? 200 : null);
    },
    
    _processConfigResizeMaximum: function(e) {
        var on = !!this._resizeMaximumEnableButton.get("selected");
        this._configWindow.set("maximumWidth", on ? 640 : null);
        this._configWindow.set("maximumHeight", on ? 480 : null);
    },
    
    _processSetColor: function(e) {
        this._colorContent.set("background", this._colorSelect.get("color"));
        this._colorContent.set("layoutData", {
            title: this._msg["WindowPaneScreen.TabColorWindowTitle"],
            activeBackground: this._colorSelect.get("color")
        });
    }
});
