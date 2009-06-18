DemoApp.AutomaticDemo = { };


/**
 * Dialog to configure and launch an automatic demo session.
 */
DemoApp.AutomaticDemo.StartDialog = Core.extend(Echo.WindowPane, {

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
            title: this._msg["AutomaticDemo.WindowTitle"],
            icon: "image/icon/Icon16Play.gif",
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
                                    icon: "image/icon/Icon24Play.png",
                                    events: {
                                        action: Core.method(this, this._start)
                                    }
                                }),
                                new Echo.Button({
                                    styleName: "ControlPane.Button",
                                    text: this._msg["Generic.Cancel"],
                                    icon: "image/icon/Icon24Cancel.png",
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

DemoApp.AutomaticDemo.StopDialog = Core.extend(Echo.WindowPane, {

    _msg: null,

    $construct: function(performanceTest, showFps) {
        this._msg = DemoApp.getMessages();
    
        Echo.WindowPane.call(this, {
            modal: true,
            styleName: "GlassBlue2",
            title: this._msg[performanceTest ? "PerformanceTest.WindowTitle" : "AutomaticDemo.RunWindowTitle"],
            icon: performanceTest ? "image/icon/Icon16Performance.gif" : "image/icon/Icon16Play.gif",
            iconInsets: "6px 10px",
            closable: false,
            resizable: false,
            movable: false,
            minimumHeight: "50px",
            positionX: "100%",
            positionY: "100%",
            width: "20em"
        });
        
        if (showFps) {
            this.add(new Echo.SplitPane({
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
                                url: "image/fill/GlassPurple.png",
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
                                url: "image/fill/GlassRed.png",
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
                            action: Core.method(this, this._stop)
                        }
                    })
                ]
            }));
        } else {
            this.add(new Echo.Panel({
                backgroundImage: {
                    url: "image/fill/GlassRed.png",
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
                            action: Core.method(this, this._stop)
                        }
                    })
                ]
            }));
        }
    },
    
    _stop: function(e) {
        this.fireEvent({ type: "stop", source: this });
    }
});

/**
 * Core.Web.Scheduler.Runnable to launch various screens at intervals for the automatic demo.
 */
DemoApp.AutomaticDemo.Runnable = Core.extend(Core.Web.Scheduler.Runnable, {

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
    
    $construct: function(launcher, stopDialog, sections, performanceTest, interval, randomOrder, transitionStyle) {
        this._launcher = launcher;
        this._stopDialog = stopDialog;
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
    
        if (this._stopDialog.fpsLabel) {
            if (this._count === 0) {
                this._lastExec = new Date().getTime();
            }
    
            ++this._count;

            if (this._count % 10 === 0) {
                var time = new Date().getTime();
                this._stopDialog.fpsLabel.set("text", Math.round(100000 / (time - this._lastExec)) / 10);
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
            this._launcher.setTransition(DemoApp.Util.randomItem(DemoApp.AutomaticDemo.Runnable.ALL_TRANSITIONS), true);
            break;
        case "RandomPan":
            this._launcher.setTransition(DemoApp.Util.randomItem(DemoApp.AutomaticDemo.Runnable.PAN_TRANSITIONS), true);
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
 * Dialog to launch performance test.
 */
DemoApp.AutomaticDemo.PerformanceTestDialog = Core.extend(Echo.WindowPane, {

    _msg: null,
    _workspace: null,
    
    $construct: function(workspace) {
        this._workspace = workspace;
        this._msg = DemoApp.getMessages();
        
        Echo.WindowPane.call(this, {
            styleName: DemoApp.pref.windowStyleName,
            modal: true,
            width: 400,
            title: this._msg["PerformanceTest.WindowTitle"],
            icon: "image/icon/Icon16Performance.gif",
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
                                    icon: "image/icon/Icon24Play.png",
                                    events: {
                                        action: Core.method(this, this._start)
                                    }
                                }),
                                new Echo.Button({
                                    styleName: "ControlPane.Button",
                                    text: this._msg["Generic.Cancel"],
                                    icon: "image/icon/Icon24Cancel.png",
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
DemoApp.AutomaticDemo.PerformanceTestResultDialog = Core.extend(Echo.WindowPane, {

    _msg: null,
    
    $construct: function(fps) {
        this._msg = DemoApp.getMessages();
        
        fps = Math.round(fps * 10) / 10;

        Echo.WindowPane.call(this, {
            styleName: DemoApp.pref.windowStyleName,
            modal: true,
            positionX: "50%",
            positionY: "50%",
            width: 550,
            resizable: false,
            title: this._msg["PerformanceTest.WindowTitle"],
            icon: "image/icon/Icon16Performance.gif",
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
                                    icon: "image/icon/Icon24Ok.png",
                                    events: {
                                        action: Core.method(this, this._close)
                                    }
                                })
                            ]
                        }),
                        new Echo.Row({
                            layoutData: {
                                backgroundImage: "image/fill/GlassPurple.png" 
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

