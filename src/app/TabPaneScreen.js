DemoApp.TabPaneScreen = Core.extend(Echo.ContentPane, {

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
                                backgroundImage: "image/bgpictures/Coral.jpg"
                            },
                            insets: 20,
                            tabActiveBorder: "2px groove #3bb467",
                            tabInactiveBorder: "2px groove #819488",
                            borderType: Extras.TabPane.BORDER_TYPE_SURROUND,
                            tabInset: 30,
                            tabActiveBackground: "#ffffff",
                            background: "#ffffff",
                            tabInactiveBackgroundImage: "image/LightBlueLineBackground.png",
                            children: [
                                new Echo.Column({
                                    layoutData: {
                                        title: this._msg["TabPaneScreen.ConfiguratorTab"]
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
                                                        background: "#f0dcbb"
                                                    }
                                                }),
                                                new Echo.Label({
                                                    layoutData: {
                                                        background: "#f0ecbb"
                                                    },
                                                    text: this._msg["TabPaneScreen.PromptForeground"]
                                                }),
                                                new Echo.Label({
                                                    layoutData: {
                                                        background: "#f0ecbb"
                                                    },
                                                    text: this._msg["TabPaneScreen.PromptBackground"]
                                                }),
                                                new Echo.Label({
                                                    layoutData: {
                                                        background: "#f0ecbb"
                                                    },
                                                    text: this._msg["TabPaneScreen.PromptBorder"]
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
                                                            text: "Image"
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
                                                            text: "Image"
                                                        })
                                                    ]
                                                }),
                                                this._inactiveTabBorder = new Extras.ColorSelect({
                                                    layoutData: {
                                                        alignment: "top"
                                                    },
                                                    styleName: "Junior"
                                                })
                                            ]
                                        }),
                                        new Echo.Column({
                                            children: [
                                                this._addButton = new Echo.Button({
                                                    styleName: "Default",
                                                    text: this._msg["TabPaneScreen.AddTab"],
                                                    icon: "image/Icon24Yes.gif",
                                                    events: {
                                                        action: Core.method(this, this._processAddTab)
                                                    }
                                                }),
                                                this._removeButton = new Echo.Button({
                                                    styleName: "Default",
                                                    text: this._msg["TabPaneScreen.RemoveTab"],
                                                    icon: "image/Icon24No.gif",
                                                    events: {
                                                        action: Core.method(this, this._processRemoveTab)
                                                    }
                                                }),
                                                new Echo.Button({
                                                    styleName: "Default",
                                                    text: this._msg["TabPaneScreen.Update"],
                                                    icon: "image/Icon24Refresh.gif",
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
                                        title: this._msg["TabPaneScreen.WindowPanesTab"]
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
        this._removeButton.setEnabled(false);
    },
    
    _processAddTab: function(e) {
        this._tabPane.add(new Echo.ContentPane({
            layoutData: {
                title: "Tab " + this._tabCount++
            },
            background: this._randomPastelColor(),
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
        this._addButton.setEnabled(this._tabPane.getComponentCount() < 5);
        this._removeButton.setEnabled(true);
    },
    
    _processRemoveTab: function(e) {
        this._tabPane.remove(this._tabPane.getComponentCount() - 1);
        this._addButton.setEnabled(true);
        this._removeButton.setEnabled(this._tabPane.getComponentCount() > 2);
    },
    
    _processUpdateTabPane: function(e) {
        this._tabPane.set("tabActiveBackground", this._activeTabBackground.get("color"));
        this._tabPane.set("tabActiveForeground", this._activeTabForeground.get("color"));
        this._tabPane.set("tabActiveBorder", "2px groove " + this._activeTabBorder.get("color"));
        this._tabPane.set("tabActiveBackgroundImage", 
                this._activeTabBackgroundImage.get("selected") ? "image/ControlPaneFill.png" : null);
        this._tabPane.set("tabInactiveBackground", this._inactiveTabBackground.get("color"));
        this._tabPane.set("tabInactiveForeground", this._inactiveTabForeground.get("color"));
        this._tabPane.set("tabInactiveBorder", "2px groove " + this._inactiveTabBorder.get("color"));
        this._tabPane.set("tabInactiveBackgroundImage", 
                this._inactiveTabBackgroundImage.get("selected") ? "image/LightBlueLineBackground.png" : null);
    
    },
    
    _randomPastelColor: function() {
        return "#" + Math.floor(Math.random() * 64 + 192).toString(16) +
                Math.floor(Math.random() * 64 + 192).toString(16) +
                Math.floor(Math.random() * 64 + 192).toString(16);
    }
});
