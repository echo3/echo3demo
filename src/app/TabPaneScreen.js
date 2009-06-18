DemoApp.TabPaneScreen = Core.extend(Echo.ContentPane, {

    $static: {
        
        IMAGE_BORDER: {
            contentInsets: "8px 14px 14px 8px",
            borderInsets: "17px 23px 23px 17px",
            topLeft: "image/window/simple/BorderTopLeft.png",
            top: "image/window/simple/BorderTop.png",
            topRight: "image/window/simple/BorderTopRight.png",
            left: "image/window/simple/BorderLeft.png",
            right: "image/window/simple/BorderRight.png",
            bottomLeft: "image/window/simple/BorderBottomLeft.png",
            bottom: "image/window/simple/BorderBottom.png",
            bottomRight: "image/window/simple/BorderBottomRight.png"
        },

        TAB_ACTIVE_IMAGE_BORDER: {
            contentInsets: "8px 14px 0px 8px",
            borderInsets: "17px 23px 0px 17px",
            topLeft: "image/window/simple/BorderTopLeft.png",
            top: "image/window/simple/BorderTop.png",
            topRight: "image/window/simple/BorderTopRight.png",
            left: "image/window/simple/BorderLeft.png",
            right: "image/window/simple/BorderRight.png",
            bottomLeft: null,
            bottom: null,
            bottomRight: null
        },
        
        TAB_INACTIVE_IMAGE_BORDER: {
            contentInsets: "8px 14px 1px 8px",
            borderInsets: "17px 23px 1px 17px",
            topLeft: "image/window/simple/BorderTopLeft.png",
            top: "image/window/simple/BorderTop.png",
            topRight: "image/window/simple/BorderTopRight.png",
            left: "image/window/simple/BorderLeft.png",
            right: "image/window/simple/BorderRight.png",
            bottomLeft: null,
            bottom: null,
            bottomRight: null
        }
    },
    
    _msg: null,
    _tabPane: null,
    _activeTabBorder: null,
    _activeTabBackground: null,
    _activeTabBackgroundImage: null,
    _activeTabForeground: null,
    _inactiveTabBorder: null,
    _inactiveTabBackground: null,
    _inactiveTabBackgroundImage: null,
    _inactiveTabForeground: null,
    _addButton: null,
    _removeButton: null,
    _tabCount: 3,

    $construct: function() {
        this._msg = DemoApp.getMessages(null);
        Echo.ContentPane.call(this, {
            children: [
                new Echo.SplitPane({
                    styleName: "DefaultResizableLarge",
                    orientation: Echo.SplitPane.ORIENTATION_HORIZONTAL_TRAILING_LEADING,
                    separatorPosition: 170,
                    children: [
                        new Echo.Column({
                            layoutData: {
                                background: "#c7d0f4"
                            },
                            insets: "10px 15px",
                            cellSpacing: 10,
                            children: [
                                new Echo.Label({
                                    text: this._msg["TabPaneScreen.Description.1"]
                                }),
                                new Echo.Label({
                                    text: this._msg["TabPaneScreen.Description.2"]
                                })
                            ]
                        }),
                        this._tabPane = new Extras.TabPane({
                            layoutData: {
                                backgroundImage: "image/bgpictures/Sisters.jpg"
                            },
                            insets: 20,
                            borderType: Extras.TabPane.BORDER_TYPE_SURROUND,
                            tabIconTextMargin: 3,
                            background: "#ffffff",
                            tabSpacing: -20,
                            imageBorder: DemoApp.TabPaneScreen.IMAGE_BORDER,
                            tabActiveBackground: "#ffffff",
                            tabActiveBackgroundInsets: "8px 14px 0px 8px",
                            tabActiveHeightIncrease: 3,
                            tabActiveImageBorder: DemoApp.TabPaneScreen.TAB_ACTIVE_IMAGE_BORDER,
                            tabActiveInsets: "4px 10px",
                            tabCloseEnabled: true,
                            tabCloseIcon: "image/icon/Icon16TabClose.png",
                            tabCloseIconRolloverEnabled: true,
                            tabCloseIconTextMargin: 8,
                            tabInactiveBackground: "#e7e7e7",
                            tabInactiveBackgroundInsets: "8px 14px 1px 8px",
                            tabInactiveImageBorder: DemoApp.TabPaneScreen.TAB_INACTIVE_IMAGE_BORDER,
                            tabInactiveBackgroundImage: {
                                url: "image/fill/LightedSilver.png",
                                repeat: "repeat-x",
                                y: "53%"
                            },
                            tabInactiveInsets: "4px 10px",
                            tabRolloverEnabled: true,
                            tabRolloverForeground: "#ffffff",
                            tabRolloverBackgroundImage: {
                                url: "image/fill/GradientBlue.png",
                                y: "50%"
                            },
                            tabRolloverCloseIcon: "image/icon/Icon16TabCloseRollover.png",
                            events: {
                                tabClose: Core.method(this, function(e) {
                                    this._tabPane.remove(e.tab);
                                    this._updateControls();
                                })
                            },
                            children: [
                                new Echo.Column({
                                    layoutData: {
                                        title: this._msg["TabPaneScreen.ConfiguratorTab"],
                                        icon: "image/icon/Icon24Preferences.png"
                                    },
                                    insets: "10px 20px",
                                    cellSpacing: 10,
                                    children: [
                                        new Echo.Grid({
                                            width: "100%",
                                            insets: "5px 10px",
                                            border: "2px groove #c5ae69",
                                            size: 4,
                                            children: [
                                                new Echo.Label({
                                                    layoutData: {
                                                        background: "#f0dcbb",
                                                        rowSpan: 2
                                                    }
                                                }),
                                                new Echo.Label({
                                                    layoutData: {
                                                        alignment: "top",
                                                        background: "#f0ecbb",
                                                        rowSpan: 2
                                                    },
                                                    text: this._msg["TabPaneScreen.PromptForeground"]
                                                }),
                                                new Echo.Label({
                                                    layoutData: {
                                                        alignment: "top",
                                                        background: "#f0ecbb",
                                                        rowSpan: 2
                                                    },
                                                    text: this._msg["TabPaneScreen.PromptBackground"]
                                                }),
                                                new Echo.Label({
                                                    layoutData: {
                                                        background: "#f0ecbb"
                                                    },
                                                    text: this._msg["TabPaneScreen.PromptBorder"]
                                                }),
                                                this._imageBorder = new Echo.CheckBox({
                                                    text: "Use Image Border",
                                                    events: {
                                                        property: Core.method(this, function(e) {
                                                            var selected = this._imageBorder.get("selected");
                                                            this._activeTabBorder.setEnabled(!selected);
                                                            this._inactiveTabBorder.setEnabled(!selected);
                                                            this._rolloverTabBorder.setEnabled(!selected);
                                                        })
                                                    }
                                                }),
                                                new Echo.Label({
                                                    layoutData: {
                                                        background: "#f0d6c1",
                                                        alignment: "trailing"
                                                    },
                                                    text: this._msg["TabPaneScreen.PromptActiveTab"]
                                                }),
                                                this._activeTabForeground = new Extras.ColorSelect({
                                                    layoutData: {
                                                        alignment: "top"
                                                    },
                                                    styleName: "Junior"
                                                }),
                                                new Echo.Column({
                                                    layoutData: {
                                                        alignment: "top"
                                                    },
                                                    children: [
                                                        this._activeTabBackground = new Extras.ColorSelect({
                                                            styleName: "Junior"
                                                        }),
                                                        this._activeTabBackgroundImage = new Echo.CheckBox({
                                                            text: "Image",
                                                            events: {
                                                                property: Core.method(this, function(e) {
                                                                    this._activeTabBackground.setEnabled(
                                                                            !this._activeTabBackgroundImage.get("selected"));
                                                                })
                                                            }
                                                        })
                                                    ]
                                                }),
                                                this._activeTabBorder = new Extras.ColorSelect({
                                                    layoutData: {
                                                        alignment: "top"
                                                    },
                                                    styleName: "Junior"
                                                }),
                                                new Echo.Label({
                                                    layoutData: {
                                                        background: "#f0d6c1",
                                                        alignment: "trailing"
                                                    },
                                                    text: this._msg["TabPaneScreen.PromptInactiveTab"]
                                                }),
                                                this._inactiveTabForeground = new Extras.ColorSelect({
                                                    layoutData: {
                                                        alignment: "top"
                                                    },
                                                    styleName: "Junior"
                                                }),
                                                new Echo.Column({
                                                    layoutData: {
                                                        alignment: "top"
                                                    },
                                                    children: [
                                                        this._inactiveTabBackground = new Extras.ColorSelect({
                                                            styleName: "Junior"
                                                        }),
                                                        this._inactiveTabBackgroundImage = new Echo.CheckBox({
                                                            text: "Image",
                                                            events: {
                                                                property: Core.method(this, function(e) {
                                                                    this._inactiveTabBackground.setEnabled(
                                                                            !this._inactiveTabBackgroundImage.get("selected"));
                                                                })
                                                            }
                                                        })
                                                    ]
                                                }),
                                                this._inactiveTabBorder = new Extras.ColorSelect({
                                                    layoutData: {
                                                        alignment: "top"
                                                    },
                                                    styleName: "Junior"
                                                }),
                                                new Echo.Label({
                                                    layoutData: {
                                                        background: "#f0d6c1",
                                                        alignment: "trailing"
                                                    },
                                                    text: this._msg["TabPaneScreen.PromptRolloverTab"]
                                                }),
                                                this._rolloverTabForeground = new Extras.ColorSelect({
                                                    layoutData: {
                                                        alignment: "top"
                                                    },
                                                    styleName: "Junior"
                                                }),
                                                new Echo.Column({
                                                    layoutData: {
                                                        alignment: "top"
                                                    },
                                                    children: [
                                                        this._rolloverTabBackground = new Extras.ColorSelect({
                                                            styleName: "Junior"
                                                        }),
                                                        this._rolloverTabBackgroundImage = new Echo.CheckBox({
                                                            text: "Image",
                                                            events: {
                                                                property: Core.method(this, function(e) {
                                                                    this._rolloverTabBackground.setEnabled(
                                                                            !this._rolloverTabBackgroundImage.get("selected"));
                                                                })
                                                            }
                                                        })
                                                    ]
                                                }),
                                                this._rolloverTabBorder = new Extras.ColorSelect({
                                                    layoutData: {
                                                        alignment: "top"
                                                    },
                                                    styleName: "Junior"
                                                })
                                            ]
                                        }),
                                        new Echo.Row({
                                            layoutData: {
                                                alignment: "center"
                                            },
                                            children: [
                                                this._addButton = new Echo.Button({
                                                    styleName: "Default",
                                                    text: this._msg["TabPaneScreen.AddTab"],
                                                    icon: "image/icon/Icon24Add.png",
                                                    events: {
                                                        action: Core.method(this, this._processAddTab)
                                                    }
                                                }),
                                                this._removeButton = new Echo.Button({
                                                    styleName: "Default",
                                                    text: this._msg["TabPaneScreen.RemoveTab"],
                                                    icon: "image/icon/Icon24Remove.png",
                                                    events: {
                                                        action: Core.method(this, this._processRemoveTab)
                                                    }
                                                }),
                                                new Echo.Button({
                                                    styleName: "Default",
                                                    text: this._msg["TabPaneScreen.Update"],
                                                    icon: "image/icon/Icon24Refresh.png",
                                                    events: {
                                                        action: Core.method(this, this._processUpdateTabPane)
                                                    }
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new Echo.ContentPane({
                                    layoutData: {
                                        title: this._msg["TabPaneScreen.WindowPanesTab"],
                                        icon: "image/icon/Icon24Display.png"
                                    },
                                    children: [
                                        new Echo.Column({
                                            insets: 10,
                                            children: [
                                                new Echo.Label({
                                                    text: this._msg["TabPaneScreen.WindowPanesMessage"]
                                                })
                                            ]
                                        }),
                                        new Echo.WindowPane({
                                            title: this._msg["TabPaneScreen.WindowPaneInATabPane"],
                                            maximizeEnabled: true,
                                            positionX: "50%",
                                            positionY: "50%",
                                            width: "85%",
                                            height: "85%",
                                            closable: false,
                                            background: "#b9eca5",
                                            styleName: "TransGreen",
                                            children: [
                                                new Extras.TabPane({
                                                    tabPosition: Extras.TabPane.TAB_POSITION_BOTTOM,
                                                    insets: "5px 10px",
                                                    tabActiveBackground: "#17c759",
                                                    tabInactiveBackground: "#d0ff3f",
                                                    children: [
                                                        new Echo.ContentPane({
                                                            layoutData: {
                                                                title: this._msg["TabPaneScreen.MoreTab"]
                                                            },
                                                            styleName: "Photo.Fern",
                                                            children: [
                                                                new Echo.WindowPane({
                                                                    maximizeEnabled: true,
                                                                    styleName: "GlassBlue2",
                                                                    closable: false,
                                                                    positionX: "50%",
                                                                    positionY: "50%",
                                                                    width: "85%",
                                                                    height: "85%",
                                                                    title: this._msg["TabPaneScreen.AnotherEmbeddedWindowPane"],
                                                                    children: [
                                                                        new Extras.TabPane({
                                                                            tabActiveBackground: "#f06b7e",
                                                                            tabActiveBorder: "3px outset #9f2137",
                                                                            tabInactiveBackground: "#ffd23f",
                                                                            tabInactiveBorder: "3px outset #c4a328",
                                                                            borderType: Extras.TabPane.BORDER_TYPE_SURROUND,
                                                                            children: [
                                                                                new Echo.Label({
                                                                                    layoutData: {
                                                                                        title: this._msg["TabPaneScreen.JustTab"]
                                                                                    }
                                                                                }),
                                                                                new Echo.Label({
                                                                                    layoutData: {
                                                                                        title: this._msg["TabPaneScreen.AnotherTab"]
                                                                                    }
                                                                                }),
                                                                                new Echo.Label({
                                                                                    layoutData: {
                                                                                        title: this._msg["TabPaneScreen.TabPaneTab"]
                                                                                    }
                                                                                })
                                                                            ]
                                                                        })
                                                                    ]
                                                                })
                                                            ]
                                                        }),
                                                        new Echo.ContentPane({
                                                            layoutData: {
                                                                title: this._msg["TabPaneScreen.WindowPanesTab"]
                                                            },
                                                            styleName: "Photo.Leaf",
                                                            children: [
                                                                new Echo.WindowPane({
                                                                    maximizeEnabled: true,
                                                                    styleName: "Default",
                                                                    closable: false,
                                                                    positionX: "50%",
                                                                    positionY: "50%",
                                                                    width: "65%",
                                                                    height: "65%",
                                                                    title: this._msg["TabPaneScreen.YetAnotherWindowPane"],
                                                                    children: [
                                                                        new Extras.TabPane({
                                                                            tabActiveBackground: "#ffffff",
                                                                            tabInactiveBackground: "#afafef",
                                                                            children: [
                                                                                new Echo.Label({
                                                                                    layoutData: {
                                                                                        title: this._msg["TabPaneScreen.AnotherTab"]
                                                                                    }
                                                                                }),
                                                                                new Echo.Label({
                                                                                    layoutData: {
                                                                                        title: this._msg["TabPaneScreen.TabPaneTab"]
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
                                })
                            ]
                        })
                    ]
                })
            ]
        });
        
        this._activeTabBackground.set("color", "#ffffff");
        this._activeTabForeground.set("color", "#000000");
        this._activeTabBorder.set("color", "#3bb467");
        this._inactiveTabBackground.set("color", "#ffffff");
        this._inactiveTabForeground.set("color", "#000000");
        this._inactiveTabBorder.set("color", "#819488");
        this._inactiveTabBackgroundImage.set("selected", "true");
        this._rolloverTabForeground.set("color", "#ffffff");
        this._rolloverTabBackground.set("color", "#1515cf");
        this._rolloverTabBackgroundImage.set("selected", "true");
        this._rolloverTabBorder.set("color", "#abcdef");
        
        this._imageBorder.set("selected", "true");
        this._removeButton.setEnabled(false);
    },
    
    _processAddTab: function(e) {
        var background = this._randomPastelColor();
        this._tabPane.add(new Echo.ContentPane({
            layoutData: {
                title: "Tab " + this._tabCount++,
                icon: "image/icon/Icon24Document.png",
                activeBackground: background,
                closeEnabled: true
            },
            background: background,
            children: [
                new Echo.Column({
                    insets: 20,
                    children: [
                        new Echo.Label({
                            text: this._msg["TabPaneScreen.DynamicTabLabel"]
                        })
                    ]
                })
            ]
        }));
        this._updateControls();
    },
    
    _processRemoveTab: function(e) {
        this._tabPane.remove(this._tabPane.getComponentCount() - 1);
        this._updateControls();
    },
    
    _processUpdateTabPane: function(e) {
        this._tabPane.set("tabActiveBackground", this._activeTabBackground.get("color"));
        this._tabPane.set("tabActiveForeground", this._activeTabForeground.get("color"));
        this._tabPane.set("tabActiveBorder", this._imageBorder.get("selected") ? 
                null : ("2px groove " + this._activeTabBorder.get("color")));
        this._tabPane.set("tabActiveBackgroundImage", 
                this._activeTabBackgroundImage.get("selected") ? "image/fill/GradientWhiteSilver.png" : null);
                
        this._tabPane.set("tabInactiveBackground", this._inactiveTabBackground.get("color"));
        this._tabPane.set("tabInactiveForeground", this._inactiveTabForeground.get("color"));
        this._tabPane.set("tabInactiveBorder", this._imageBorder.get("selected") ? 
                null : ("2px groove " + this._inactiveTabBorder.get("color")));
        this._tabPane.set("tabInactiveBackgroundImage", 
                this._inactiveTabBackgroundImage.get("selected") ? "image/fill/LightedSilver.png" : null);
    
        this._tabPane.set("tabRolloverBackground", this._rolloverTabBackground.get("color"));
        this._tabPane.set("tabRolloverForeground", this._rolloverTabForeground.get("color"));
        this._tabPane.set("tabRolloverBorder", this._imageBorder.get("selected") ? 
                null : ("2px groove " + this._rolloverTabBorder.get("color")));
        this._tabPane.set("tabRolloverBackgroundImage", 
                this._rolloverTabBackgroundImage.get("selected") ? { url: "image/fill/GradientBlue.png", y: "50%" } : null);
                
        if (this._imageBorder.get("selected")) {
            this._tabPane.set("imageBorder", DemoApp.TabPaneScreen.IMAGE_BORDER);
            this._tabPane.set("tabInactiveImageBorder", DemoApp.TabPaneScreen.TAB_INACTIVE_IMAGE_BORDER);
            this._tabPane.set("tabActiveImageBorder", DemoApp.TabPaneScreen.TAB_ACTIVE_IMAGE_BORDER);
            this._tabPane.set("tabSpacing", -20);
        } else {
            this._tabPane.set("imageBorder", null);
            this._tabPane.set("tabInactiveImageBorder", null);
            this._tabPane.set("tabActiveImageBorder", null);
            this._tabPane.set("tabSpacing", null);
        }
    },
    
    _randomPastelColor: function() {
        return "#" + Math.floor(Math.random() * 64 + 192).toString(16) +
                Math.floor(Math.random() * 64 + 192).toString(16) +
                Math.floor(Math.random() * 64 + 192).toString(16);
    },
    
    _updateControls: function() {
        this._addButton.setEnabled(this._tabPane.getComponentCount() < 15);
        this._removeButton.setEnabled(this._tabPane.getComponentCount() > 2);
    }
});
