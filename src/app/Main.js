init = function() {
    Core.Web.init();
    if (Echo.DebugConsole) {
        Echo.DebugConsole.install();
    }
    var app = new DemoApp();
    var client = new Echo.FreeClient(app, document.getElementById("rootArea"));
    client.addResourcePath("Echo", "lib/echo/");
    client.addResourcePath("Extras", "lib/extras/");
    app.setStyleSheet(DemoApp.StyleSheet);
    client.init();
};

/**
 * Echo.Application implementation.
 * Root namespace.
 */
DemoApp = Core.extend(Echo.Application, {

    $static: {
    
        pref: {
            transitionsEnabled: true,
            windowStyleName: "GlassBlue2",
            sourceViewerBackground: "#000000",
            sourceViewerForeground: "#00ff00"
        },
        
        getMessages: function() {
            return DemoApp.Messages.get();
        }
    },
    
    _sections: null,
    
    $construct: function() {
        Echo.Application.call(this);
        
        this._msg = DemoApp.getMessages();
        this._sections = [
            new DemoApp.Workspace.SectionData(this._msg["SectionTitle.Welcome"], [
                new DemoApp.Workspace.ScreenData(
                    this._msg["WelcomeScreen.Title"], 
                    "image/demoicon/WelcomeIcon16.gif", 
                    "image/demoicon/WelcomeIcon64.gif",
                    function(container) { 
                        container.setContent(new DemoApp.WelcomeScreen()) 
                    },
                    "app/WelcomeScreen.js"
                )
            ]),
            new DemoApp.Workspace.SectionData(this._msg["SectionTitle.CoreComponents"], [
                new DemoApp.Workspace.ScreenData(
                    this._msg["WindowPaneScreen.Title"], 
                    "image/demoicon/WindowPaneIcon16.gif", 
                    "image/demoicon/WindowPaneIcon64.gif",
                    function(container) {
                        container.setContent(new DemoApp.WindowPaneScreen()) 
                    },
                    "app/WindowPaneScreen.js"
                ),
                new DemoApp.Workspace.ScreenData(
                    this._msg["SplitPaneScreen.Title"], 
                    "image/demoicon/SplitPaneIcon16.gif", 
                    "image/demoicon/SplitPaneIcon64.gif",
                    function(container) { 
                        container.setContent(new DemoApp.SplitPaneScreen()) 
                    },
                    "app/SplitPaneScreen.js"
                ),
                new DemoApp.Workspace.ScreenData(
                    this._msg["BasicComponentsScreen.Title"], 
                    "image/demoicon/BasicComponentsIcon16.gif", 
                    "image/demoicon/BasicComponentsIcon64.gif",
                    function(container) { 
                        container.setContent(new DemoApp.BasicComponentsScreen()) 
                    },
                    "app/BasicComponentsScreen.js"
                ),
                new DemoApp.Workspace.ScreenData(
                    this._msg["LayoutContainersScreen.Title"], 
                    "image/demoicon/LayoutContainersIcon16.gif", 
                    "image/demoicon/LayoutContainersIcon64.gif",
                    function(container) { 
                        container.setContent(new DemoApp.LayoutContainersScreen()) 
                    },
                    "app/LayoutContainersScreen.js"
                )
            ]),
            new DemoApp.Workspace.SectionData(this._msg["SectionTitle.Technology"], [
                new DemoApp.Workspace.ScreenData(
                    this._msg["JSDevelopmentScreen.Title"], 
                    "image/demoicon/JSDevelopmentIcon16.gif", 
                    "image/demoicon/JSDevelopmentIcon64.gif",
                    function(container) { 
                        container.setContent(new DemoApp.JSDevelopmentScreen()) 
                    },
                    "app/JSDevelopmentScreen.js"
                ),
                new DemoApp.Workspace.ScreenData(
                    this._msg["JavaDevelopmentScreen.Title"], 
                    "image/demoicon/JavaDevelopmentIcon16.gif", 
                    "image/demoicon/JavaDevelopmentIcon64.gif",
                    function(container) { 
                        container.setContent(new DemoApp.JavaDevelopmentScreen()) 
                    },
                    "app/JavaDevelopmentScreen.js"
                )
            ]),
            new DemoApp.Workspace.SectionData(this._msg["SectionTitle.Extras"], [
                new DemoApp.Workspace.ScreenData(
                    this._msg["AccordionPaneScreen.Title"], 
                    "image/demoicon/AccordionPaneIcon16.gif", 
                    "image/demoicon/AccordionPaneIcon64.gif",
                    function(container) { 
                        container.setContent(new DemoApp.AccordionPaneScreen()) 
                    },
                    "app/AccordionPaneScreen.js"
                ),
                new DemoApp.Workspace.ScreenData(
                    this._msg["TabPaneScreen.Title"], 
                    "image/demoicon/TabPaneIcon16.gif", 
                    "image/demoicon/TabPaneIcon64.gif",
                    function(container) { 
                        container.setContent(new DemoApp.TabPaneScreen()) 
                    },
                    "app/TabPaneScreen.js"
                ),
                new DemoApp.Workspace.ScreenData(
                    this._msg["RichTextScreen.Title"], 
                    "image/demoicon/RichTextIcon16.gif", 
                    "image/demoicon/RichTextIcon64.gif",
                    function(container) { 
                        container.setContent(new DemoApp.RichTextScreen()) 
                    },
                    "app/RichTextScreen.js"
                )
            ])
        ];
        
        var workspace = new DemoApp.Workspace(this._sections);
        this.rootComponent.add(workspace);
        
        // Enable the following line to launch a specific screen at startup.
        //workspace.setContent(new DemoApp.WindowPaneScreen());
    }
});

/**
 * Help/About Dialog.  Displays general application information, credits, and copyrights.
 */
DemoApp.AboutDialog = Core.extend(Echo.WindowPane, {

    _msg: null,
    
    $construct: function() {
        this._msg = DemoApp.getMessages();
        
        Echo.WindowPane.call(this, {
            styleName: DemoApp.pref.windowStyleName,
            width: "40em",
            height: "30em",
            title: this._msg["About.WindowTitle"],
            iconInsets: "6px 10px",
            icon: "image/Icon16Info.gif",
            modal: true,
            closable: true,
            events: {
                close: function(e) {
                    e.source.parent.remove(e.source);
                }
            },
            children: [
                new Echo.ContentPane({
                    backgroundImage: "image/BlueLineBackground.png",
                    children: [
                        new Extras.TabPane({
                            tabActiveBackground: "#ffffff",
                            tabInactiveBackground: "#afafef",
                            background: "#ffffff",
                            children: [
                                new Echo.Column({
                                    insets: "15px 25px",
                                    cellSpacing: 10,
                                    layoutData: {
                                        title: this._msg["About.GeneralTab"]
                                    },
                                    children: [
                                        new Echo.Label({
                                            icon: "image/NextApp.png"
                                        }),
                                        new Echo.Label({
                                            text: this._msg["About.General1"]
                                        }),
                                        new DemoApp.HtmlLabel({
                                            html: this._msg["About.General2"]
                                        }),
                                        new DemoApp.HtmlLabel({
                                            html: this._msg["About.General3"]
                                        })
                                    ]
                                }),
                                new Echo.Column({
                                    insets: "15px 25px",
                                    cellSpacing: 10,
                                    layoutData: {
                                        title: this._msg["About.PhotographyTab"]
                                    },
                                    children: [
                                        new DemoApp.HtmlLabel({
                                            html: this._msg["About.Photography1"]
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

/**
 * Dialog to configure and launch an automatic demo session.
 */
DemoApp.AutomaticDemoDialog = Core.extend(Echo.WindowPane, {

    _intervalButtons: null,
    _transitionSelect: null,
    _transitionSelectLastId: null,
    _speedFast: null,
    _speedLudicrous: null,
    _orderRandom: null,
    _msg: null,
    _workspace: null,
    
    $construct: function(workspace) {
        this._workspace = workspace;
        this._msg = DemoApp.getMessages();
        var groupSpeedButtons = Echo.Application.generateUid();
        var groupOrderButtons = Echo.Application.generateUid();
        
        Echo.WindowPane.call(this, {
            styleName: DemoApp.pref.windowStyleName,
            modal: true,
            width: "40em",
            height: "30em", 
            title: this._msg["AutomaticDemo.WindowTitle"],
            icon: "image/Icon16Play.gif",
            iconInsets: "6px 10px",
            events: {
                close: Core.method(this, this._close)
            },
            children: [
                new Echo.SplitPane({
                    autoPositioned: true,
                    orientation: Echo.SplitPane.ORIENTATION_VERTICAL_BOTTOM_TOP,
                    children: [
                        new Echo.Row({
                            styleName: "ControlPane",
                            children: [
                                new Echo.Button({
                                    styleName: "ControlPane.Button",
                                    text: this._msg["Generic.Start"],
                                    icon: "image/Icon24Play.gif",
                                    events: {
                                        action: Core.method(this, this._start)
                                    }
                                }),
                                new Echo.Button({
                                    styleName: "ControlPane.Button",
                                    text: this._msg["Generic.Cancel"],
                                    icon: "image/Icon24No.gif",
                                    events: {
                                        action: Core.method(this, this._close)
                                    }
                                })
                            ]
                        }),
                        new Echo.Column({
                            insets: "10px 30px",
                            cellSpacing: 15,
                            children: [
                                new Echo.Label({
                                    text: this._msg["AutomaticDemo.Description"]
                                }),
                                new Echo.Column({
                                    styleName: "PreferencesColumn",
                                    children: [
                                        new Echo.Label({
                                            styleName: "PreferencesTitle",
                                            text: this._msg["AutomaticDemo.SpeedPrompt"]
                                        }),
                                        new Echo.Row({
                                            cellSpacing: 40,
                                            children: [
                                                new Echo.RadioButton({
                                                    group: groupSpeedButtons,
                                                    text: this._msg["AutomaticDemo.SpeedNormal"],
                                                    selected: true,
                                                    events: {
                                                        action: Core.method(this, this._processSpeedChange)
                                                    }
                                                }),
                                                this._speedFast = new Echo.RadioButton({
                                                    group: groupSpeedButtons,
                                                    text: this._msg["AutomaticDemo.SpeedFast"],
                                                    events: {
                                                        action: Core.method(this, this._processSpeedChange)
                                                    }
                                                }),
                                                this._speedLudicrous = new Echo.RadioButton({
                                                    group: groupSpeedButtons,
                                                    text: this._msg["AutomaticDemo.SpeedLudicrous"],
                                                    events: {
                                                        action: Core.method(this, this._processSpeedChange)
                                                    }
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new Echo.Column({
                                    styleName: "PreferencesColumn",
                                    children: [
                                        new Echo.Label({
                                            styleName: "PreferencesTitle",
                                            text: this._msg["AutomaticDemo.OrderPrompt"]
                                        }),
                                        new Echo.Row({
                                            cellSpacing: 40,
                                            children: [
                                                new Echo.RadioButton({
                                                    group: groupOrderButtons,
                                                    text: this._msg["AutomaticDemo.OrderSequential"],
                                                    selected: true
                                                }),
                                                this._orderRandom = new Echo.RadioButton({
                                                    group: groupOrderButtons,
                                                    text: this._msg["AutomaticDemo.OrderRandom"]
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new Echo.Column({
                                    styleName: "PreferencesColumn",
                                    children: [
                                        new Echo.Label({
                                            styleName: "PreferencesTitle",
                                            text: this._msg["AutomaticDemo.TransitionPrompt"]
                                        }),
                                        this._transitionSelect = new Echo.SelectField({
                                            items: [
                                                { id: "Random", text: this._msg["AutomaticDemo.TransitionRandom"] },
                                                { id: "Fade", text: this._msg["AutomaticDemo.TransitionFade"] },
                                                { id: "RandomPan", text: this._msg["AutomaticDemo.TransitionRandomPan"] },
                                                { id: "PanRight", text: this._msg["AutomaticDemo.TransitionPanRight"] },
                                                { id: "None", text: this._msg["AutomaticDemo.TransitionNone"] }
                                            ],
                                            selectedId: DemoApp.pref.transitionsEnabled ? "Random" : "None"
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                })
            ]
        });
    },
    
    _processSpeedChange: function(e) {
        if (e.source == this._speedLudicrous) {
            this._transitionSelectLastId = this._transitionSelect.get("selectedId");
            this._transitionSelect.set("selectedId", "None");
            this._transitionSelect.setEnabled(false);
        } else {
            if (!this._transitionSelect.isEnabled()) {
                this._transitionSelect.set("selectedId", this._transitionSelectLastId);
                this._transitionSelect.setEnabled(true);
            }
        }
    },
    
    _start: function(e) {
        var interval = this._speedLudicrous.get("selected") ? 1 : (this._speedFast.get("selected") ? 1500 : 4500);
        this._workspace.startAutomaticDemo(false, interval, !!this._speedLudicrous.get("selected"),
                this._transitionSelect.get("selectedId"));
        this.parent.remove(this);
    },
    
    _close: function(e) {
        this.parent.remove(this);
    }
});

/**
 * Core.Web.Scheduler.Runnable to launch various screens at intervals for the automatic demo.
 */
DemoApp.AutomaticDemoRunnable = Core.extend(Core.Web.Scheduler.Runnable, {

    $static: {
        ALL_TRANSITIONS: [ 
            Extras.TransitionPane.TYPE_FADE,
            Extras.TransitionPane.TYPE_CAMERA_PAN_UP,
            Extras.TransitionPane.TYPE_CAMERA_PAN_LEFT,
            Extras.TransitionPane.TYPE_CAMERA_PAN_RIGHT,
            Extras.TransitionPane.TYPE_CAMERA_PAN_DOWN
        ],
        PAN_TRANSITIONS: [ 
            Extras.TransitionPane.TYPE_CAMERA_PAN_UP,
            Extras.TransitionPane.TYPE_CAMERA_PAN_LEFT,
            Extras.TransitionPane.TYPE_CAMERA_PAN_RIGHT,
            Extras.TransitionPane.TYPE_CAMERA_PAN_DOWN
        ]
    },

    _screens: null,
    _launcher: null,
    _lastExec: 0,
    _count: 0,
    _performanceTest: false,
    _startTime: null,
    
    $construct: function(launcher, sections, performanceTest, interval, randomOrder, transitionStyle) {
        this._launcher = launcher;
        this._performanceTest = performanceTest;
        this._interval = interval;
        this._randomOrder = randomOrder;
        this._transitionStyle = transitionStyle;
    
        this._screens = [];
        for (var i = 0; i < sections.length; ++i) {
            for (var j = 0; j < sections[i].screens.length; ++j) {
                this._screens.push(sections[i].screens[j]);
            }
        }
        
        this._count = 0;
    },

    repeat: true,

    timeInterval: null,
    
    run: function() {
        if (this._performanceTest && this._startTime == null) {
            this._startTime = new Date().getTime();
        }
    
        if (this._launcher.fpsLabel) {
            if (this._count == 0) {
                this._lastExec = new Date().getTime();
            }
    
            ++this._count;

            if (this._count % 10 == 0) {
                var time = new Date().getTime();
                this._launcher.fpsLabel.set("text", parseInt(100000 / (time - this._lastExec)) / 10);
                this._lastExec = time;
                
                if (this._performanceTest && time > this._startTime + 30000) {
                    var averageFps = (this._count - 1) / ((time - this._startTime) / 1000);
                    this._launcher.stopAutomaticDemo(averageFps);
                    return;
                }
            }
        }
    
        this.timeInterval = this._interval;
        switch (this._transitionStyle) {
        case "Random":
            this._launcher.setTransition(DemoApp.Util.randomItem(DemoApp.AutomaticDemoRunnable.ALL_TRANSITIONS), true);
            break;
        case "RandomPan":
            this._launcher.setTransition(DemoApp.Util.randomItem(DemoApp.AutomaticDemoRunnable.PAN_TRANSITIONS), true);
            break;
        case "Fade":
            this._launcher.setTransition(Extras.TransitionPane.TYPE_FADE, true);
            break;
        case "PanRight":
            this._launcher.setTransition(Extras.TransitionPane.TYPE_CAMERA_PAN_RIGHT, true);
            break;
        case "None":
            this._launcher.setTransition(Extras.TransitionPane.TYPE_IMMEDIATE, true);
            break;
        }
        if (this._randomOrder) {
            this._launcher.launchScreen(DemoApp.Util.randomItem(this._screens));
        } else {
            this._launcher.launchScreen(this._launcher.getNextScreen());
        }
    }
});

/**
 * Color selection button widget.  Colored button launches a color select window when clicked.
 */
DemoApp.ColorSelectButton = Core.extend(Echo.Button, {

    _msg: null,
    _color: null,
    _window: null,
    _colorSelect: null,

    $construct: function(color) {
        this._msg = DemoApp.getMessages();
        this.color = color ? color : "#000000",
        Echo.Button.call(this, {
            width: 50,
            height: 20,
            border: "1px outset " + this.color,
            background: this.color,
            events: {
                action: Core.method(this, this._processAction)
            }
        });
    },
    
    _apply: function(e) {
        this.color = this._colorSelect.get("color");
        this.set("border", "1px outset " + this.color);
        this.set("background", this.color);
        this._window.parent.remove(this._window);
        this._window = null;
        this._colorSelect = null;
    },
    
    _close: function(e) {
        this._window.parent.remove(this._window);
        this._window = null;
        this._colorSelect = null;
    },
    
    _processAction: function() {
        var contentPane = this;
        while (!(contentPane instanceof Echo.ContentPane)) {
            contentPane = contentPane.parent;
        }
        
        this._window = new Echo.WindowPane({
            styleName: DemoApp.pref.windowStyleName,
            title: "Select Color",
            width: 220,
            height: 260,
            modal: true,
            events: {
                close: Core.method(this, this._close)
            },
            children: [
                new Echo.SplitPane({
                    autoPositioned: true,
                    orientation: Echo.SplitPane.ORIENTATION_VERTICAL_BOTTOM_TOP,
                    children: [
                        new Echo.Row({
                            styleName: "ControlPane",
                            children: [
                                new Echo.Button({
                                    styleName: "ControlPane.Button",
                                    text: this._msg["Generic.Ok"],
                                    icon: "image/Icon24Yes.gif",
                                    events: {
                                        action: Core.method(this, this._apply)
                                    }
                                }),
                                new Echo.Button({
                                    styleName: "ControlPane.Button",
                                    text: this._msg["Generic.Cancel"],
                                    icon: "image/Icon24No.gif",
                                    events: {
                                        action: Core.method(this, this._close)
                                    }
                                })
                            ]
                        }),
                        this._colorSelect = new Extras.ColorSelect({
                            layoutData: {
                                insets: "5px 10px"
                            },
                            color: this.color,
                            hueWidth: 16,
                            saturationHeight: 128,
                            valueWidth: 128
                        })
                    ]
                })
            ]
        });
        
        contentPane.add(this._window);
    }
});

/**
 * Window to provide information about downloading the demo application.
 */
DemoApp.DownloadWindow = Core.extend(Echo.WindowPane, {

    _msg: null,

    $construct: function() {
        this._msg = DemoApp.getMessages();
        Echo.WindowPane.call(this, {
            styleName: DemoApp.pref.windowStyleName,
            title: this._msg["DownloadWindow.Title"],
            icon:  "image/Icon16Download.gif",
            iconInsets: "6px 10px",
            insets: 10,
            events: {
                close: function(e) {
                    e.source.parent.remove(e.source);
                }
            },
            children: [
                new DemoApp.HtmlLabel({
                    html: this._msg["DownloadWindow.Message"]
                })
            ]
        });
    }
});

/**
 * Window used to display windowed demo screens. 
 */
DemoApp.ScreenWindow = Core.extend(Echo.WindowPane, {
    
    $construct: function(screen) {
        Echo.WindowPane.call(this, {
            icon: screen.icon16,
            iconInsets: "6px 10px",
            title: screen.title,
            styleName: DemoApp.pref.windowStyleName,
            width: 600,
            height:500,
            maximizeEnabled: true,
            events: {
                close: function(e) {
                    e.source.parent.remove(e.source);
                }
            }
        });
        
        if (screen.launchFunction) {
            screen.launchFunction(this);
        }
    },
    
    setContent: function(content) {
        this.removeAll();
        this.add(content);
    }
});

/**
 * Label component which renders arbitrary HTML.
 */
DemoApp.HtmlLabel = Core.extend(Echo.Component, {
    componentType: "DemoApp.HtmlLabel"
});

/**
 * Synchronization peer for HtmlLabel component.
 */
DemoApp.HtmlLabelSync = Core.extend(Echo.Render.ComponentSync, {

    $load: function() {
        Echo.Render.registerPeer("DemoApp.HtmlLabel", this);
    },

    renderAdd: function(update, parentElement) {
        this._spanElement = document.createElement("span");
        Echo.Sync.Font.render(this.component.render("font"), this._spanElement);
        Echo.Sync.Color.renderFB(this.component, this._spanElement);
        this._spanElement.innerHTML = this.component.render("html", "");
        parentElement.appendChild(this._spanElement);
    },

    renderDispose: function(update) {
        this._spanElement = null;
    },
    
    renderUpdate: function(update) {
        var element = this._spanElement;
        var containerElement = element.parentNode;
        this.renderDispose(update);
        containerElement.removeChild(element);
        this.renderAdd(update, containerElement);
        return false; // Child elements not supported: safe to return false.
    }
});

/**
 * Dialog to launch performance test.
 */
DemoApp.PerformanceTestDialog = Core.extend(Echo.WindowPane, {

    _msg: null,
    _workspace: null,
    
    $construct: function(workspace) {
        this._workspace = workspace;
        this._msg = DemoApp.getMessages();
        
        Echo.WindowPane.call(this, {
            styleName: DemoApp.pref.windowStyleName,
            modal: true,
            width: 400,
            height: 300, 
            title: this._msg["PerformanceTest.WindowTitle"],
            icon: "image/Icon16Performance.gif",
            iconInsets: "6px 10px",
            events: {
                close: Core.method(this, this._close)
            },
            children: [
                new Echo.SplitPane({
                    autoPositioned: true,
                    orientation: Echo.SplitPane.ORIENTATION_VERTICAL_BOTTOM_TOP,
                    children: [
                        new Echo.Row({
                            styleName: "ControlPane",
                            children: [
                                new Echo.Button({
                                    styleName: "ControlPane.Button",
                                    text: this._msg["Generic.Start"],
                                    icon: "image/Icon24Play.gif",
                                    events: {
                                        action: Core.method(this, this._start)
                                    }
                                }),
                                new Echo.Button({
                                    styleName: "ControlPane.Button",
                                    text: this._msg["Generic.Cancel"],
                                    icon: "image/Icon24No.gif",
                                    events: {
                                        action: Core.method(this, this._close)
                                    }
                                })
                            ]
                        }),
                        new Echo.Column({
                            insets: "10px 30px",
                            cellSpacing: 15,
                            children: [
                                new Echo.Label({
                                    text: this._msg["PerformanceTest.Description"]
                                })
                            ]
                        })
                    ]
                })
            ]
        });
    },
    
    _start: function(e) {
        this._workspace.startAutomaticDemo(true);
        this.parent.remove(this);
    },
    
    _close: function(e) {
        this.parent.remove(this);
    }
});

/**
 * Dialog to display performance test results.
 */
DemoApp.PerformanceTestResultDialog = Core.extend(Echo.WindowPane, {

    _msg: null,
    
    $construct: function(fps) {
        this._msg = DemoApp.getMessages();
        
        fps = parseInt(fps * 10) / 10;

        Echo.WindowPane.call(this, {
            styleName: DemoApp.pref.windowStyleName,
            modal: true,
            positionX: 32767,
            positionY: 32767,
            width: 550,
            height: 142, 
            resizable: false,
            title: this._msg["PerformanceTest.WindowTitle"],
            icon: "image/Icon16Performance.gif",
            iconInsets: "6px 10px",
            events: {
                close: Core.method(this, this._close)
            },
            children: [
                new Echo.SplitPane({
                    autoPositioned: true,
                    orientation: Echo.SplitPane.ORIENTATION_VERTICAL_BOTTOM_TOP,
                    children: [
                        new Echo.Row({
                            styleName: "ControlPane",
                            children: [
                                new Echo.Button({
                                    styleName: "ControlPane.Button",
                                    text: this._msg["Generic.Ok"],
                                    icon: "image/Icon24Yes.gif",
                                    events: {
                                        action: Core.method(this, this._close)
                                    }
                                })
                            ]
                        }),
                        new Echo.Row({
                            layoutData: {
                                backgroundImage: "image/FpsBackground.png" 
                            },
                            insets: "10px 30px",
                            cellSpacing: 8,
                            foreground: "#ffffff",
                            children: [
                                new Echo.Label({
                                    text: this._msg["PerformanceTest.ResultPre"]
                                }),
                                new Echo.Label({
                                    font: { size: 30 },
                                    text: fps
                                }),
                                new Echo.Label({
                                    text: this._msg["PerformanceTest.ResultPost"]
                                })
                            ]
                        })
                    ]
                })
            ]
        });
    },
    
    _close: function(e) {
        this.parent.remove(this);
    }
});

/**
 * Dialog for editing user application preferences.
 */
DemoApp.PreferencesDialog = Core.extend(Echo.WindowPane, {

    _transitionsEnabled: null,
    _sourceViewerForeground: null,
    _sourceViewerBackground: null,
    _windowStyleNameSelect: null,
    
    $construct: function() {
        this._msg = DemoApp.getMessages();
        var groupAnimatedScreenTransitions = Echo.Application.generateUid();
            
        Echo.WindowPane.call(this, {
            styleName: DemoApp.pref.windowStyleName,
            modal: true,
            width: "40em",
            height: "30em", 
            title: this._msg["PrefDialog.WindowTitle"],
            icon: "image/Icon16Preferences.gif",
            iconInsets: "6px 10px",
            events: {
                close: Core.method(this, this._close)
            },
            children: [
                new Echo.SplitPane({
                    autoPositioned: true,
                    orientation: Echo.SplitPane.ORIENTATION_VERTICAL_BOTTOM_TOP,
                    children: [
                        new Echo.Row({
                            styleName: "ControlPane",
                            children: [
                                new Echo.Button({
                                    styleName: "ControlPane.Button",
                                    text: this._msg["Generic.Ok"],
                                    icon: "image/Icon24Yes.gif",
                                    events: {
                                        action: Core.method(this, this._apply)
                                    }
                                }),
                                new Echo.Button({
                                    styleName: "ControlPane.Button",
                                    text: this._msg["Generic.Cancel"],
                                    icon: "image/Icon24No.gif",
                                    events: {
                                        action: Core.method(this, this._close)
                                    }
                                })
                            ]
                        }),
                        new Echo.Column({
                            insets: "10px 30px",
                            cellSpacing: 15,
                            children: [
                                new Echo.Column({
                                    styleName: "PreferencesColumn",
                                    children: [
                                        new Echo.Label({
                                            styleName: "PreferencesTitle",
                                            text: this._msg["PrefDialog.PromptAnimations"]
                                        }),
                                        new Echo.Row({
                                            cellSpacing: 40,
                                            children: [
                                                this._transitionsEnabled = new Echo.RadioButton({
                                                    group: groupAnimatedScreenTransitions,
                                                    text: this._msg["Generic.Enabled"],
                                                    selected: DemoApp.pref.transitionsEnabled
                                                }),
                                                new Echo.RadioButton({
                                                    group: groupAnimatedScreenTransitions,
                                                    text: this._msg["Generic.Disabled"],
                                                    selected: !DemoApp.pref.transitionsEnabled
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new Echo.Column({
                                    styleName: "PreferencesColumn",
                                    children: [
                                        new Echo.Label({
                                            styleName: "PreferencesTitle",
                                            text: this._msg["PrefDialog.PromptWindowAppearance"]
                                        }),
                                        this._windowStyleNameSelect = new Echo.SelectField({
                                            items: [
                                                { id: "Default", text: this._msg["PrefDialog.WindowStyle.BlueShadow"] },
                                                { id: "GlassBlue2", text: this._msg["PrefDialog.WindowStyle.GlassBlueDark"] },
                                                { id: "GlassBlue", text: this._msg["PrefDialog.WindowStyle.GlassBlueLight"] },
                                                { id: "TransGreen", text: this._msg["PrefDialog.WindowStyle.TransGreen"] },
                                                { id: "None", text: this._msg["PrefDialog.WindowStyle.Default"] }
                                            ],
                                            selectedId: DemoApp.pref.windowStyleName == null ? "None" : DemoApp.pref.windowStyleName
                                        })
                                    ]
                                }),
                                new Echo.Column({
                                    styleName: "PreferencesColumn",
                                    children: [
                                        new Echo.Label({
                                            styleName: "PreferencesTitle",
                                            text: this._msg["PrefDialog.PromptSourceViewerColors"]
                                        }),
                                        new Echo.Row({
                                            cellSpacing: 40,
                                            children: [
                                                new Echo.Row({
                                                    cellSpacing: 10,
                                                    children: [
                                                        new Echo.Label({
                                                            text: this._msg["PrefDialog.PromptForeground"]
                                                        }),
                                                        this._sourceViewerForeground = new DemoApp.ColorSelectButton(
                                                                DemoApp.pref.sourceViewerForeground)
                                                    ]
                                                }),
                                                new Echo.Row({
                                                    cellSpacing: 10,
                                                    children: [
                                                        new Echo.Label({
                                                            text: this._msg["PrefDialog.PromptBackground"]
                                                        }),
                                                        this._sourceViewerBackground = new DemoApp.ColorSelectButton(
                                                                DemoApp.pref.sourceViewerBackground)
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
    },
    
    _apply: function(e) {
        DemoApp.pref.windowStyleName = this._windowStyleNameSelect.get("selectedId") == "None" 
                ? null : this._windowStyleNameSelect.get("selectedId");
        DemoApp.pref.transitionsEnabled = this._transitionsEnabled.get("selected");
        DemoApp.pref.sourceViewerBackground = this._sourceViewerBackground.color;
        DemoApp.pref.sourceViewerForeground = this._sourceViewerForeground.color;
        this.parent.remove(this);
    },
    
    _close: function(e) {
        this.parent.remove(this);
    }
});

DemoApp.SourcePane = Core.extend(Echo.ContentPane, {

    _msg: null,
    
    $construct: function(data) {
        this._msg = DemoApp.getMessages();
        Echo.ContentPane.call(this, data);
        var url = this.render("url");
        if (url) {
            var conn = new Core.Web.HttpConnection(url, "GET");
            conn.addResponseListener(Core.method(this, this._responseListener));
            try {
                conn.connect();
            } catch (ex) {
                this.add(new Echo.Label({
                    text: this._msg["SourcePane.XHRError"]
                }));
            }
        }
    },
    
    _responseListener: function(e) {
        this.add(new DemoApp.SourceView({
            code: e.source.getResponseText()
        }));
    }
});

/**
 * SourceView component.  Displays formatted source code.
 * Optionally supports settings syntax colors for
 * C-style comments.
 */
DemoApp.SourceView = Core.extend(Echo.Component, {

    componentType: "DemoApp.SourceView"
});

/**
 * SourceView synchronization peer.
 */
DemoApp.SourceViewSync = Core.extend(Echo.Render.ComponentSync, {

    $load: function() {
        Echo.Render.registerPeer("DemoApp.SourceView", this);
    },
    
    renderAdd: function(update, parentElement) {
        var code = this.component.render("code", "");
        var lines = code.split("\n");
        var inBlockComment = false;

        this._divElement = document.createElement("div");
        this._divElement.style.padding = "2px 1ex 2px 9ex";
        for (var i = 0; i < lines.length; ++i) {
            var line = lines[i];
            var trimmedLine = DemoApp.Util.trim(line);
            
            if (DemoApp.Util._BLOCK_COMMENT_START.test(trimmedLine)) {
                inBlockComment = true;
            }
            
            if (DemoApp.Util.BLANK_LINE.test(line)) {
                var blankDiv = document.createElement("div");
                blankDiv.style.height = "1em";
                this._divElement.appendChild(blankDiv);
                continue;
            }
            
            var lineDiv = document.createElement("div");
            if (DemoApp.Util._LINE_COMMENT.test(trimmedLine)) {
                Echo.Sync.Color.render(this.component.render("lineCommentColor"), lineDiv, "color");
            } else if (inBlockComment) {
                Echo.Sync.Color.render(this.component.render("blockCommentColor"), lineDiv, "color");
            }
            lineDiv.style.paddingLeft = DemoApp.Util.countLeadingSpaces(line) + "ex";
            lineDiv.style.textIndent = "-8ex";
            lineDiv.appendChild(document.createTextNode(trimmedLine));
            this._divElement.appendChild(lineDiv);

            if (DemoApp.Util._BLOCK_COMMENT_END.test(trimmedLine)) {
                inBlockComment = false;
            }
        }        
        
        parentElement.appendChild(this._divElement);
    },

    renderDispose: function(update) {
        this._divElement = null;
    },

    renderUpdate: function(update) {
        var element = this._divElement;
        var containerElement = element.parentNode;
        this.renderDispose(update);
        containerElement.removeChild(element);
        this.renderAdd(update, containerElement);
        return false; // Child elements not supported: safe to return false.
    }
});

/**
 * Source code viewing window.
 * Retrieves arbitrary source code from URL.
 */
DemoApp.SourceWindow = Core.extend(Echo.WindowPane, {

    _msg: null,

    $construct: function(screen) {
        this._msg = DemoApp.getMessages();

        var title, icon, url;
        if (screen instanceof DemoApp.Workspace.ScreenData) {
            title = screen.title;
            icon = screen.icon16;
            url = screen.sourceUrl;
        } else {
            title = screen;
            icon = null;
            url = screen;
        }
    
        Echo.WindowPane.call(this, {
            icon: icon,
            iconInsets: "6px 10px",
            title: this._msg["SourceWindow.TitlePrompt"] + " \"" + title + "\"",
            styleName: DemoApp.pref.windowStyleName,
            width: "50em",
            height: "40em",
            maximizeEnabled: true,
            events: {
                close: function(e) {
                    e.source.parent.remove(e.source);
                }
            },
            children: [
                new DemoApp.SourcePane({
                    background: DemoApp.pref.sourceViewerBackground,
                    foreground: DemoApp.pref.sourceViewerForeground,
                    font: { typeface: ["Courier New", "courier", "monospace"] },
                    url: url
                })
            ]
        });
    }
});

/**
 * Utility methods.
 */
DemoApp.Util = {

    _LEADING_SPACES: /^(\s*)/,
    _TRAILING_SPACES: /(\s*)$/,
    _BLOCK_COMMENT_START: /^\/\*/,
    _BLOCK_COMMENT_END: /\*\//,
    _LINE_COMMENT: /^\/\//,
    BLANK_LINE: /^\s*$/,

    /**
     * Determiens the number of leading spaces in a string.
     *
     * @param s the string to evaluate
     * @return the number of leading spaces
     * @type Number
     */
    countLeadingSpaces: function(s) {
        return this._LEADING_SPACES.exec(s)[1].length;
    },

    /**
     * Determiens the number of trailing spaces in a string.
     *
     * @param s the string to evaluate
     * @return the number of trailing spaces
     * @type Number
     */
    countTrailingSpaces: function(s) {
        return this._TRAILING_SPACES.exec(s)[1].length;
    },

    /**
     * Returns a random item from an array.
     *
     * @param array the array to evaluate
     * @return a random item
     */
    randomItem: function(array) {
        return array[Math.floor(Math.random() * array.length)];
    },

    /**
     * Trims leading and trailing spaces from a string.
     *
     * @param s the string to evaluate
     * @return the string with no leading/trailing spaces
     */
    trim: function(s) {
        var leading = this._LEADING_SPACES.exec(s)[1].length;
        var trailing = this._TRAILING_SPACES.exec(s)[1].length;
        return s.substring(leading);
    }
};

/**
 * Workspace component: the primary user interface of the demo application.
 */ 
DemoApp.Workspace = Core.extend(Echo.ContentPane, {

    $static: {
    
        /**
         * Data object representing a section (collection of demo screens).
         */
        SectionData: Core.extend({

            $construct: function(title, screens) {
                this.title = title;
                this.screens = screens;
            }
        }),

        /**
         * Data object representing a launchable demo screen.
         */
        ScreenData: Core.extend({

            $construct: function(title, icon16, icon64, launchFunction, sourceUrl) {
                this.id = Echo.Application.generateUid();
                this.title = title;
                this.icon16 = icon16;
                this.icon64 = icon64;
                this.launchFunction = launchFunction;
                this.sourceUrl = sourceUrl;
            }
        })
    },

    _launchPanel: null,
    _contentArea: null,
    _menu: null,
    _screenMap: null,
    _activeScreen: null,
    _sections: null,
    _activeScreenLaunchButton: null,
    _stopWindow: null,
    fpsLabel: null,

    $construct: function(sections) {
        this._sections = sections;
        this._msg = DemoApp.getMessages();

        Echo.ContentPane.call(this, {
            children: [
                new Echo.SplitPane({
                    separatorWidth: 6,
                    separatorPosition: "18%",
                    resizable: true,
                    separatorHorizontalImage: "image/MainSeparator.png",
                    children: [
                        new Echo.SplitPane({
                            orientation: Echo.SplitPane.ORIENTATION_VERTICAL_TOP_BOTTOM,
                            separatorPosition: 52,
                            layoutData: {
                                minimumSize: "1em",
                                maximumSize: "33%"
                            },
                            children: [
                                new Echo.Label({
                                    icon: "image/Logo.png",
                                    layoutData: {
                                        overflow: Echo.SplitPane.OVERFLOW_HIDDEN,
                                        alignment: "center",
                                        backgroundImage: { url: "image/LogoBackground.png", repeat: "repeat-x" }
                                    }
                                }),
                                this._launchPanel = new Extras.AccordionPane({
                                    styleName: "Default",
                                    background: "#313131",
                                    foreground: "#ffffff",
                                    defaultContentInsets: "5px 10px"
                                })
                            ]
                        }),
                        new Echo.SplitPane({
                            orientation: Echo.SplitPane.ORIENTATION_VERTICAL_TOP_BOTTOM,
                            autoPositioned: true,
                            separatorHeight: 1,
                            separatorColor: "#000000",
                            children: [
                                this._menu = new Extras.MenuBarPane({
                                    styleName: "Default",
                                    events: {
                                        action: Core.method(this, this._processMenuAction)
                                    }
                                }),
                                new Echo.SplitPane({
                                    orientation: Echo.SplitPane.ORIENTATION_VERTICAL_BOTTOM_TOP,
                                    autoPositioned: true,
                                    separatorHeight: 1,
                                    separatorColor: "#000000",
                                    children: [
                                        new Echo.Row({
                                            insets: 8,
                                            alignment: "center",
                                            cellSpacing: 100,
                                            layoutData: {
                                                overflow: Echo.SplitPane.OVERFLOW_HIDDEN,
                                                backgroundImage: "image/NavigationBackground.png"
                                            },
                                            children: [
                                                new Echo.Button({
                                                    icon: "image/PreviousArrow.gif",
                                                    rolloverIcon: "image/PreviousArrowRollover.gif",
                                                    text: this._msg["Navigation.Previous"], 
                                                    foreground: "#ffffff",
                                                    rolloverForeground: "#c9fdd2",
                                                    font: { bold: true, italic: true },
                                                    iconTextMargin: 10,
                                                    textPosition: "left",
                                                    rolloverEnabled: true,
                                                    events: {
                                                        action: Core.method(this, this._processPrevious)
                                                    }
                                                }),
                                                new Echo.Button({
                                                    icon: "image/NextArrow.gif",
                                                    rolloverIcon: "image/NextArrowRollover.gif",
                                                    text: this._msg["Navigation.Next"], 
                                                    foreground: "#ffffff",
                                                    rolloverForeground: "#c9fdd2",
                                                    font: { bold: true, italic: true },
                                                    iconTextMargin: 10,
                                                    textPosition: "right",
                                                    rolloverEnabled: true,
                                                    events: {
                                                        action: Core.method(this, this._processNext)
                                                    }
                                                })
                                            ]
                                        }),
                                        this._contentArea = new Extras.TransitionPane({
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                })
            ]
        });
                
        this._menu.set("model", this._createMenuModel());
        this._createLaunchPanel();
        
        this.launchScreen(this.getNextScreen());
    },
    
    _createLaunchPanel: function() {
        this._screenMap = { };
        for (var i = 0; i < this._sections.length; ++i) {
            var column = new Echo.Column({
                styleName: "LaunchPanel",
                layoutData: {
                    title: this._sections[i].title
                }
            });
            this._launchPanel.add(column);
            for (var j = 0; j < this._sections[i].screens.length; ++j) {
                var screen = this._sections[i].screens[j];
                column.add(new Echo.Button({
                    id: screen.id,
                    styleName: "LaunchPanel",
                    icon: screen.icon64,
                    text: screen.title,
                    actionCommand: screen.id,
                    events: {
                        action: Core.method(this, this._processLauncherClick)
                    }
                }));
                this._screenMap[screen.id] = screen;
            }
        }
    },
    
    _createMenuModel: function() {
        var launchMenu = new Extras.MenuModel(null, this._msg["Menu.LaunchMenu"], null);
        var windowedLaunchMenu = new Extras.MenuModel(null, this._msg["Menu.StartWindowedDemoMenu"], null);
        
        for (var i = 0; i < this._sections.length; ++i) {
            for (var j = 0; j < this._sections[i].screens.length; ++j) {
                var screen = this._sections[i].screens[j];
                launchMenu.addItem(new Extras.OptionModel("L:" + screen.id, screen.title, screen.icon16));
                windowedLaunchMenu.addItem(new Extras.OptionModel("W:" + screen.id, screen.title, screen.icon16));
            }
        }
        launchMenu.addItem(new Extras.SeparatorModel());
        launchMenu.addItem(windowedLaunchMenu);
        launchMenu.addItem(new Extras.SeparatorModel());
        launchMenu.addItem(new Extras.OptionModel("autodemo", this._msg["Menu.StartAutoDemo"], "image/Icon16Play.gif"));
        launchMenu.addItem(new Extras.OptionModel("perftest", this._msg["Menu.PerformanceTest"], "image/Icon16Performance.gif"));
    
        var menuModel = new Extras.MenuModel(null, null, null, [
            launchMenu,
            new Extras.MenuModel(null, this._msg["Menu.ToolsMenu"], null, [
                new Extras.OptionModel("viewsource", this._msg["Menu.ViewSource"], "image/Icon16JavaScript.gif"),
                new Extras.MenuModel(null, this._msg["Menu.ViewSourceMenu"], null, [
                    new Extras.OptionModel("viewsource.main", this._msg["Menu.ViewSourceMain"], null),
                    new Extras.OptionModel("viewsource.ss", this._msg["Menu.ViewSourceStyleSheet"], null),
                    new Extras.OptionModel("viewsource.msg", this._msg["Menu.ViewSourceMessages"], null),
                    new Extras.SeparatorModel(),
                    new Extras.OptionModel("viewsource.html", this._msg["Menu.ViewSourceHtml"], null)
                ]),
                new Extras.SeparatorModel(),
                new Extras.OptionModel("preferences", this._msg["Menu.Preferences"], "image/Icon16Preferences.gif"),
                new Extras.SeparatorModel(),
                new Extras.OptionModel("download", this._msg["Menu.Download"], "image/Icon16Download.gif")
            ]),
            new Extras.MenuModel(null, this._msg["Menu.HelpMenu"], null, [
                new Extras.OptionModel("about", this._msg["Menu.About"], "image/Icon16Info.gif")
            ])
        ]);
        return menuModel;
    },
    
    getNextScreen: function() {
        var activeFound = this._activeScreen == null;
        for (var k = 0; k < 2; ++k) {
            for (var i = 0; i < this._sections.length; ++i) {
                for (var j = 0; j < this._sections[i].screens.length; ++j) {
                    var screen = this._sections[i].screens[j];
                    if (activeFound && screen.launchFunction) {
                        return screen;
                    }
                    if (this._activeScreen == screen) {
                        activeFound = true;
                    }
                }
            }
        }
    },
    
    getPreviousScreen: function() {
        var activeFound = this._activeScreen == null;
        for (var k = 0; k < 2; ++k) {
            for (var i = this._sections.length - 1; i >= 0; --i) {
                for (var j = this._sections[i].screens.length - 1; j >= 0; --j) {
                    var screen = this._sections[i].screens[j];
                    if (activeFound && screen.launchFunction) {
                        return screen;
                    }
                    if (this._activeScreen == screen) {
                        activeFound = true;
                    }
                }
            }
        }
    },
    
    launchScreen: function(screen) {
        if (this._activeScreenLaunchButton) {
            this._activeScreenLaunchButton.setStyleName("LaunchPanel");
            this._activeScreenLaunchButton = null;
        }
        
        this._activeScreen = screen;
        
        for (var i = 0; i < this._launchPanel.children.length && !this._activeScreenLaunchButton; ++i) {
            var column = this._launchPanel.children[i]
            for (var j = 0; j < column.children.length && !this._activeScreenLaunchButton; ++j) {
                var launchButton = column.children[j];
                if (launchButton.get("id") == screen.id) {
                    this._activeScreenLaunchButton = launchButton;
                    this._activeScreenLaunchButton.setStyleName("LaunchPanel.Selected");
                    this._launchPanel.set("activeTab", column.renderId);
                }
            }
        }
        
        if (screen.launchFunction) {
            screen.launchFunction(this);
        }
    },
    
    _launchScreenWindowed: function(screen) {
        var screenWindow = new DemoApp.ScreenWindow(screen);
        this.add(screenWindow);
    },
    
    _processLauncherClick: function(e) {
        if (this._screenMap[e.actionCommand]) {
            this.setTransition(Extras.TransitionPane.TYPE_FADE);
            var screen = this._screenMap[e.actionCommand];
            this.launchScreen(screen);
        }
    },
    
    _processMenuAction: function(e) {
        switch (e.modelId) {
        case "about":
            this.add(new DemoApp.AboutDialog());
            break;
        case "autodemo":
            this.add(new DemoApp.AutomaticDemoDialog(this));
            break;
        case "download":
            this.add(new DemoApp.DownloadWindow());
            break;            
        case "perftest":
            this.add(new DemoApp.PerformanceTestDialog(this));
            break;
        case "preferences":
            this.add(new DemoApp.PreferencesDialog(this.application));
            break;
        case "viewsource":
            this.add(new DemoApp.SourceWindow(this._activeScreen));
            break;
        case "viewsource.main":
            this.add(new DemoApp.SourceWindow("app/Main.js"));
            break;
        case "viewsource.ss":
            this.add(new DemoApp.SourceWindow("app/Default.StyleSheet.js"));
            break;
        case "viewsource.msg":
            this.add(new DemoApp.SourceWindow("app/Messages.js"));
            break;
        case "viewsource.html":
            this.add(new DemoApp.SourceWindow("index.html"));
            break;
        default:
            if (e.modelId.substring(0,2) == "L:") {
                var screen = this._screenMap[e.modelId.substring(2)];
                this.launchScreen(screen);
            } else if (e.modelId.substring(0,2) == "W:") {
                var screen = this._screenMap[e.modelId.substring(2)];
                this._launchScreenWindowed(screen);
            }
            break;
        }
    },
    
    _processNext: function(e) {
        this.setTransition(Extras.TransitionPane.TYPE_CAMERA_PAN_RIGHT);
        this.launchScreen(this.getNextScreen());
    },
    
    _processPrevious: function(e) {
        this.setTransition(Extras.TransitionPane.TYPE_CAMERA_PAN_LEFT);
        this.launchScreen(this.getPreviousScreen());
    },
    
    setContent: function(content) {
        this._contentArea.removeAll();
        this._contentArea.add(content);
    },
    
    setTransition: function(type, overridePreferences) {
        this._contentArea.set("type", overridePreferences || DemoApp.pref.transitionsEnabled 
                ? type : Extras.TransitionPane.TYPE_IMMEDIATE);    
    },
    
    startAutomaticDemo: function(performanceTest, interval, randomOrder, transitionStyle) {
        if (performanceTest) {
            interval = 0;
            transitionStyle = "None";
        }
    
        this._stopWindow = new Echo.WindowPane({
            modal: true,
            styleName: "GlassBlue2",
            title: this._msg[performanceTest ? "PerformanceTest.WindowTitle" : "AutomaticDemo.RunWindowTitle"],
            icon: performanceTest ? "image/Icon16Performance.gif" : "image/Icon16Play.gif",
            iconInsets: "6px 10px",
            closable: false,
            resizable: false,
            movable: false,
            positionX: "100%",
            positionY: "100%",
            height: "8em",
            width: "20em"
        });
        
        if (interval > 1) {
            this._stopWindow.add(new Echo.ContentPane({
                overflow: Echo.ContentPane.OVERFLOW_HIDDEN,
                backgroundImage: {
                    url: "image/StopBackground.png",
                    y: "50%"
                },
                children: [
                    new Echo.Button({
                        foreground: "#ffffef",
                        font: { size: 30 },
                        insets: 5,
                        alignment: {
                            horizontal: "center",
                            vertical: "middle"
                        },
                        text: this._msg["AutomaticDemo.StopMessage"],
                        events: {
                            action: Core.method(this, this.stopAutomaticDemo)
                        }
                    })
                ]
            }));
        } else {
            this._launchPanel.set("animationTime", 0);
            this._stopWindow.add(new Echo.SplitPane({
                orienation: Echo.SplitPane.ORIENTATION_HORIZONTAL_LEFT_RIGHT,
                separatorPosition: "40%",
                resizable: false,
                separatorWidth: 1,
                separatorColor: "#000000",
                children: [
                    new Echo.Column({
                        foreground: "#ffffff",
                        layoutData: {
                            backgroundImage: {
                                url: "image/FpsBackground.png",
                                y: "50%"
                            }
                        },
                        children: [
                            this.fpsLabel = new Echo.Label({
                                layoutData: {
                                    alignment: "center"
                                },
                                font: { size: 22 },
                                text: "-.-"
                            }),
                            new Echo.Label({
                                layoutData: {
                                    alignment: "center"
                                },
                                font: { size: 8 },
                                text: this._msg["AutomaticDemo.Fps"]
                            })
                        ]
                    }),
                    new Echo.Button({
                        layoutData: {
                            backgroundImage: {
                                url: "image/StopBackground.png",
                                y: "50%"
                            }
                        },
                        foreground: "#ffffef",
                        font: { size: 30 },
                        insets: 5,
                        alignment: {
                            horizontal: "center",
                            vertical: "middle"
                        },
                        text: this._msg["AutomaticDemo.StopMessage"],
                        events: {
                            action: Core.method(this, this.stopAutomaticDemo)
                        }
                    })
                ]
            }));
        }
        
        
        this.add(this._stopWindow);
        
        this._autoDemoRunnable = new DemoApp.AutomaticDemoRunnable(this, this._sections, performanceTest, interval, 
                randomOrder, transitionStyle);
        Core.Web.Scheduler.add(this._autoDemoRunnable);
    },
    
    stopAutomaticDemo: function(performanceTestFps) {
        this.remove(this._stopWindow);
        this._stopWindow = null;
        this.fpsLabel = null;
        this._launchPanel.set("animationTime", null);

        Core.Web.Scheduler.remove(this._autoDemoRunnable);
        this._autoDemoRunnable = null;
        
        if (typeof(performanceTestFps) == "number") {
            this.add(new DemoApp.PerformanceTestResultDialog(performanceTestFps));
        }
        
        this.launchScreen(this._sectionsg.screens[0]);
    }
});
