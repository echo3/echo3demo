/**
 * Echo.Application implementation.
 * Root namespace.
 */
DemoApp = Core.extend(Echo.Application, {

    $static: {
    
        /** Required JavaScript module URLs for "About" dialog. */
        MODULE_ABOUT: [
            "lib/extras/Application.TabPane.js",
            "lib/extras/Sync.TabPane.js",
            "app/About.js"
        ],
        
        /** Required JavaScript module URLs for Automatic demo system. */
        MODULE_AUTOMATIC_DEMO: [
            "lib/echo/Sync.Composite.js",
            "lib/echo/Sync.List.js",
            "lib/echo/Sync.ToggleButton.js",
            "app/AutomaticDemo.js"
        ],
    
        /** Required JavaScript module URLs for source viewer. */
        MODULE_SOURCE_VIEW: [
            "app/SourceView.js"
        ],
    
        /** Required JavaScript module URLs for preferences dialog. */
        MODULE_PREFERENCES: [
            "lib/echo/Sync.List.js",
            "lib/echo/Sync.ToggleButton.js",
            "lib/extras/Application.ColorSelect.js",
            "lib/extras/Sync.ColorSelect.js",
            "app/Preferences.js"
        ],
    
        /** Required JavaScript module URLs for WindowPane demo screen. */
        MODULE_DEMO_WINDOWPANE: [
            "lib/echo/Sync.ToggleButton.js",
            "lib/extras/Application.TabPane.js",
            "lib/extras/Sync.TabPane.js",
            "lib/extras/Application.ColorSelect.js",
            "lib/extras/Sync.ColorSelect.js",
            "app/WindowPaneScreen.js"
        ],
        
        /** Required JavaScript module URLs for SplitPane demo screen. */
        MODULE_DEMO_SPLITPANE: [
            "app/SplitPaneScreen.js"
        ],
        
        /** Required JavaScript module URLs for Basic Components demo screen. */
        MODULE_DEMO_BASIC_COMPONENTS: [
            "lib/echo/Sync.ToggleButton.js",
            "lib/echo/Sync.Grid.js",
            "lib/echo/Sync.List.js",
            "lib/echo/Sync.TextComponent.js",
            "app/BasicComponentsScreen.js"
        ],
    
        /** Required JavaScript module URLs for Layout Containers demo screen. */
        MODULE_DEMO_LAYOUT_CONTAINERS: [
            "lib/echo/Sync.Grid.js",
            "app/LayoutContainersScreen.js"
        ],
        
        /** Required JavaScript module URLs for JavaScript Development demo screen. */
        MODULE_DEMO_JS_DEVELOPMENT: [
            "lib/echo/Sync.Composite.js",
            "lib/extras/Application.TabPane.js",
            "lib/extras/Sync.TabPane.js",
            "lib/extras/Application.ToolTipContainer.js",
            "lib/extras/Sync.ToolTipContainer.js",
            "app/SourceView.js",
            "app/JSDevelopmentScreen.js"
        ],
        
        /** Required JavaScript module URLs for Java Development demo screen. */
        MODULE_DEMO_JAVA_DEVELOPMENT: [
            "app/SourceView.js",
            "app/JavaDevelopmentScreen.js"
        ],
        
        /** Required JavaScript module URLs for AccordionPane demo screen. */
        MODULE_DEMO_ACCORDIONPANE: [
            "app/AccordionPaneScreen.js"
        ],
        
        /** Required JavaScript module URLs for TabPane demo screen. */
        MODULE_DEMO_TABPANE: [
            "lib/echo/Sync.Grid.js",
            "lib/echo/Sync.ToggleButton.js",
            "lib/extras/Application.ColorSelect.js",
            "lib/extras/Sync.ColorSelect.js",
            "lib/extras/Application.TabPane.js",
            "lib/extras/Sync.TabPane.js",
            "app/TabPaneScreen.js"
        ],
        
        /** Required JavaScript module URLs for RichTextArea demo screen. */
        MODULE_DEMO_RICHTEXTAREA: [
            "lib/echo/Sync.List.js",
            "lib/echo/Sync.Grid.js",
            "lib/echo/Arc.js",
            "lib/echo/Sync.Composite.js",
            "lib/echo/Sync.List.js",
            "lib/echo/Sync.TextComponent.js",
            "lib/extras/Application.BorderPane.js",
            "lib/extras/Sync.BorderPane.js",
            "lib/extras/Application.ColorSelect.js",
            "lib/extras/Sync.ColorSelect.js",
            "lib/extras/Application.RichTextInput.js",
            "lib/extras/Sync.RichTextInput.js",
            "lib/extras/Application.RichTextArea.js",
            "lib/extras/Sync.RichTextArea.js",
            "app/RichTextScreen.js"
        ],
    
        /** Required JavaScript module URLs for Extras Widgets demo screen. */
        MODULE_DEMO_EXTRAS_WIDGETS: [
            "lib/echo/Sync.Composite.js",
            "lib/echo/Sync.ToggleButton.js",
            "lib/extras/Application.CalendarSelect.js",
            "lib/extras/Sync.CalendarSelect.js",
            "lib/extras/Application.ColorSelect.js",
            "lib/extras/Sync.ColorSelect.js",
            "lib/extras/Application.Group.js",
            "lib/extras/Sync.Group.js",
            "lib/extras/Application.BorderPane.js",
            "lib/extras/Sync.BorderPane.js",
            "lib/extras/Application.ToolTipContainer.js",
            "lib/extras/Sync.ToolTipContainer.js",
            "app/ExtrasWidgetsScreen.js"
        ],
        
        /**
         * Set of available locale modules.
         */
        LOCALE_MODULES: {
            "1337": true
        },
        
        /**
         * User preference information.
         */ 
        pref: {
        
            /**
             * Flag indicating whether animated transition effects are enabled.
             * @type Boolean
             */
            transitionsEnabled: true,
            
            /**
             * Default WindowPane style name.
             * @type String
             */
            windowStyleName: "Default",
            
            /**
             * Background color for source code viewer.
             * @type {#Color}
             */
            sourceViewerBackground: "#000000",
            
            /**
             * Foreground color for source code viewer.
             * @type {#Color}
             */
            sourceViewerForeground: "#00ff00"
        },
        
        /**
         * Retrieves resource map for current (globally configured) locale from resource bundle.
         */
        getMessages: function() {
            return DemoApp.Messages.get(DemoApp.locale);
        },
        
        /**
         * Global initialization method.  Creates/starts client/application in "rootArea" element of document.
         */
        init: function() {
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
        },
        
        /**
         * Globally configured locale.
         * @type String
         */
        locale: null
    },

    /**
     * Localized resource map.
     */
    _msg: null,
    
    /**
     * The DemoApp.Workspace being displayed.
     * @type DemoApp.Workspace
     */
    workspace: null,
    
    /** @see Echo.Application#init */
    init: function() {
        this._msg = DemoApp.getMessages();
        var sections = [
            new DemoApp.Workspace.SectionData(this._msg["SectionTitle.Welcome"], [
                new DemoApp.Workspace.ScreenData(
                    this._msg["WelcomeScreen.Title"], 
                    "image/demoicon/WelcomeIcon16.gif", 
                    "image/demoicon/WelcomeIcon64.gif",
                    [],
                    function(container) { 
                        container.setContent(new DemoApp.WelcomeScreen());
                    },
                    "app/WelcomeScreen.js")
            ]),
            new DemoApp.Workspace.SectionData(this._msg["SectionTitle.CoreComponents"], [
                new DemoApp.Workspace.ScreenData(
                    this._msg["WindowPaneScreen.Title"], 
                    "image/demoicon/WindowPaneIcon16.gif", 
                    "image/demoicon/WindowPaneIcon64.gif",
                    DemoApp.MODULE_DEMO_WINDOWPANE,
                    function(container) {
                        container.setContent(new DemoApp.WindowPaneScreen());
                    },
                    "app/WindowPaneScreen.js"),
                new DemoApp.Workspace.ScreenData(
                    this._msg["SplitPaneScreen.Title"], 
                    "image/demoicon/SplitPaneIcon16.gif", 
                    "image/demoicon/SplitPaneIcon64.gif",
                    DemoApp.MODULE_DEMO_SPLITPANE,
                    function(container) {
                        container.setContent(new DemoApp.SplitPaneScreen());
                    },
                    "app/SplitPaneScreen.js"),
                new DemoApp.Workspace.ScreenData(
                    this._msg["BasicComponentsScreen.Title"], 
                    "image/demoicon/BasicComponentsIcon16.gif", 
                    "image/demoicon/BasicComponentsIcon64.gif",
                    DemoApp.MODULE_DEMO_BASIC_COMPONENTS, 
                    function(container) {
                        container.setContent(new DemoApp.BasicComponentsScreen());
                    },
                    "app/BasicComponentsScreen.js"),
                new DemoApp.Workspace.ScreenData(
                    this._msg["LayoutContainersScreen.Title"], 
                    "image/demoicon/LayoutContainersIcon16.gif", 
                    "image/demoicon/LayoutContainersIcon64.gif",
                    DemoApp.MODULE_DEMO_LAYOUT_CONTAINERS,
                    function(container) {
                        container.setContent(new DemoApp.LayoutContainersScreen());
                    },
                    "app/LayoutContainersScreen.js")
            ]),
            new DemoApp.Workspace.SectionData(this._msg["SectionTitle.Technology"], [
                new DemoApp.Workspace.ScreenData(
                    this._msg["JSDevelopmentScreen.Title"], 
                    "image/demoicon/JSDevelopmentIcon16.gif", 
                    "image/demoicon/JSDevelopmentIcon64.gif",
                    DemoApp.MODULE_DEMO_JS_DEVELOPMENT,
                    function(container) {
                        container.setContent(new DemoApp.JSDevelopmentScreen());
                    },
                    "app/JSDevelopmentScreen.js"),
                new DemoApp.Workspace.ScreenData(
                    this._msg["JavaDevelopmentScreen.Title"], 
                    "image/demoicon/JavaDevelopmentIcon16.gif", 
                    "image/demoicon/JavaDevelopmentIcon64.gif",
                    DemoApp.MODULE_DEMO_JAVA_DEVELOPMENT,
                    function(container) {
                        container.setContent(new DemoApp.JavaDevelopmentScreen());
                    },
                    "app/JavaDevelopmentScreen.js")
            ]),
            new DemoApp.Workspace.SectionData(this._msg["SectionTitle.Extras"], [
                new DemoApp.Workspace.ScreenData(
                    this._msg["AccordionPaneScreen.Title"], 
                    "image/demoicon/AccordionPaneIcon16.gif", 
                    "image/demoicon/AccordionPaneIcon64.gif",
                    DemoApp.MODULE_DEMO_ACCORDIONPANE, 
                    function(container) {
                        container.setContent(new DemoApp.AccordionPaneScreen());
                    },
                    "app/AccordionPaneScreen.js"),
                new DemoApp.Workspace.ScreenData(
                    this._msg["TabPaneScreen.Title"], 
                    "image/demoicon/TabPaneIcon16.gif", 
                    "image/demoicon/TabPaneIcon64.gif",
                    DemoApp.MODULE_DEMO_TABPANE,
                    function(container) {
                        container.setContent(new DemoApp.TabPaneScreen());
                    },
                    "app/TabPaneScreen.js"),
                new DemoApp.Workspace.ScreenData(
                    this._msg["RichTextScreen.Title"], 
                    "image/demoicon/RichTextIcon16.gif", 
                    "image/demoicon/RichTextIcon64.gif",
                    DemoApp.MODULE_DEMO_RICHTEXTAREA,
                    function(container) {
                        container.setContent(new DemoApp.RichTextScreen());
                    },
                    "app/RichTextScreen.js"),
                new DemoApp.Workspace.ScreenData(
                    this._msg["ExtrasWidgetsScreen.Title"], 
                    "image/demoicon/WidgetsIcon16.gif", 
                    "image/demoicon/WidgetsIcon64.gif",
                    DemoApp.MODULE_DEMO_EXTRAS_WIDGETS, 
                    function(container) {
                        container.setContent(new DemoApp.ExtrasWidgetsScreen());
                    },
                    "app/ExtrasWidgetsScreen.js")
            ])
        ];
        
        this.workspace = new DemoApp.Workspace(sections);
        this.rootComponent.add(this.workspace);
        
        // Edit/Enable the following line to launch a specific screen at startup.
        // this.workspace.launchScreen(sections[2].screens[0]);
    }
});

/**
 * Window to provide information about downloading the demo application.
 */
DemoApp.DownloadWindow = Core.extend(Echo.WindowPane, {

    /**
     * Localized resource map.
     */
    _msg: null,

    /** Creates a new download window. */
    $construct: function() {
        this._msg = DemoApp.getMessages();
        Echo.WindowPane.call(this, {
            styleName: DemoApp.pref.windowStyleName,
            title: this._msg["DownloadWindow.Title"],
            icon:  "image/icon/Icon16ArrowBottom.png",
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
 * Window component used to display windowed demo screens. 
 */
DemoApp.ScreenWindow = Core.extend(Echo.WindowPane, {
    
    /** 
     * Creates a new ScreenWindow
     *
     * @param {DemoApp.Workspace.ScreenData} screen the screen data object
     */
    $construct: function(screen) {
        Echo.WindowPane.call(this, {
            icon: screen.icon16,
            iconInsets: "6px 10px",
            title: screen.title,
            styleName: DemoApp.pref.windowStyleName,
            width: 600,
            height: 500,
            maximizeEnabled: true,
            events: {
                close: function(e) {
                    e.source.parent.remove(e.source);
                }
            }
        });
    },
    
    /**
     * Sets the content of the window (invoked by the screen's launch function to configure the window).
     * 
     * @param {Echo.Component} content the component to display
     */
    setContent: function(content) {
        this.removeAll();
        this.add(content);
    }
});

/**
 * Workspace component: the primary user interface of the demo application.
 */ 
DemoApp.Workspace = Core.extend(Echo.ContentPane, {

    $static: {
    
        /**
         * Data object representing a section (collection of demo screens).
         */
        SectionData: Core.extend({
        
            /**
             * Section title.
             * @type String
             */
            title: null,
            
            /**
             * Array of DemoApp.WorkSpace.ScreenData objects contained in the section.
             */
            screens: null,

            /**
             * Creates a new section.
             * 
             * @param {String} title the section title
             * @param {Array} array of DemoApp.WorkSpace.ScreenData objects contained in the section
             */
            $construct: function(title, screens) {
                this.title = title;
                this.screens = screens;
            }
        }),

        /**
         * Data object representing a launchable demo screen.
         */
        ScreenData: Core.extend({
        
            /**
             * The screen title.
             * @type String
             */
            title: null,
            
            /** 
             * The 16x16 icon.
             * @type #ImageReference
             */
            icon16: null,

            /** 
             * The 64x64 icon.
             * @type #ImageReference
             */
            icon64: null,
            
            /**
             * Array of JavaScript module URLs which are required to display the screen.
             * @type Array
             */
            modules: null,
            
            /**
             * Function to be invoked to launch the module.
             * @type Function
             */
            launchFunction: null,
            
            /**
             * URL of module source (used by source viewer).
             * @type String
             */
            sourceUrl: null,

            /**
             * Creates a new screen.
             *
             * @param {String} title the screen title
             * @param {#ImageReference} icon16 the 16x16 icon
             * @param {#ImageReference} icon64 the 64x64 icon
             * @param {Array} modules array of JavaScript module URLs which are required to display the screen
             * @param {Function} function to be invoked to launch the module
             * @param {String} sourceUrl URL of module source (used by source viewer)
             */
            $construct: function(title, icon16, icon64, modules, launchFunction, sourceUrl) {
                this.id = Echo.Application.generateUid();
                this.title = title;
                this.icon16 = icon16;
                this.icon64 = icon64;
                this.modules = modules;
                this.launchFunction = launchFunction;
                this.sourceUrl = sourceUrl;
            }
        })
    },

    /**
     * Localized resource map.
     */
    _msg: null,
    
    /**
     * AccordionPane containing section columns.
     * @type Extras.AccordionPane
     */
    _launchPanel: null,
    
    /**
     * The main content area used to display demonstration screens.
     * @type Extras.TransitionPane
     */
    _contentArea: null,
    
    /**
     * Mapping between screen ids and DemoApp.Workspace.ScreenData instances.
     * Used for launching screens by id (e.g., as selected from menu).
     */
    _screenMap: null,
    
    /**
     * The currently displayed screen.
     * @type DemoApp.Workspace.ScreenData
     */
    _activeScreen: null,
    
    /**
     * Array of DemoApp.Workspace.SectionData instances which are available.
     * @type Array
     */
    _sections: null,
    
    /**
     * Launch button for currently active screen.
     * @type Echo.Button
     */
    _activeScreenLaunchButton: null,
    
    /**
     * Window displaying stop controls, displayed when automatic demo/performance test is active.
     * @type Echo.WindowPane
     */
    _stopWindow: null,
    
    /**
     * Label displaying current frames-per-second, used when performance test is active.
     * @type Echo.Label
     */
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
                    separatorHorizontalImage: "image/workspace/MainSeparator.png",
                    separatorHorizontalRolloverImage: "image/workspace/MainSeparatorRollover.png",
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
                                    icon: "image/workspace/Logo.png",
                                    layoutData: {
                                        overflow: Echo.SplitPane.OVERFLOW_HIDDEN,
                                        alignment: "center",
                                        backgroundImage: { url: "image/workspace/LogoBackground.png", repeat: "repeat-x" }
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
                                    styleName: "Workspace",
                                    model: this.createMenuModel(),
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
                                                backgroundImage: "image/workspace/NavigationBackground.png"
                                            },
                                            children: [
                                                new Echo.Button({
                                                    icon: "image/workspace/PreviousArrow.png",
                                                    rolloverIcon: "image/workspace/PreviousArrowRollover.png",
                                                    text: this._msg["Navigation.Previous"], 
                                                    foreground: "#ffffff",
                                                    rolloverForeground: "#c9fdd2",
                                                    font: { bold: true, italic: true },
                                                    iconTextMargin: 5,
                                                    textPosition: "right",
                                                    rolloverEnabled: true,
                                                    events: {
                                                        action: Core.method(this, this._processPrevious)
                                                    }
                                                }),
                                                new Echo.Button({
                                                    icon: "image/workspace/NextArrow.png",
                                                    rolloverIcon: "image/workspace/NextArrowRollover.png",
                                                    text: this._msg["Navigation.Next"], 
                                                    foreground: "#ffffff",
                                                    rolloverForeground: "#c9fdd2",
                                                    font: { bold: true, italic: true },
                                                    iconTextMargin: 5,
                                                    textPosition: "left",
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
            ],
            events: {
                init: Core.method(this, function() {
                    this.launchScreen(this.getNextScreen());
                })
            }
        });
                
        this._createLaunchPanel();
    },
    
    /**
     * Iterates sections/screens to create launch panel component and screen-id to screen mapping.
     */
    _createLaunchPanel: function() {
        this._screenMap = { };
        for (var i = 0; i < this._sections.length; ++i) {
            var column = new Echo.Column({
                styleName: "Workspace.LaunchPanel",
                layoutData: {
                    title: this._sections[i].title
                }
            });
            this._launchPanel.add(column);
            for (var j = 0; j < this._sections[i].screens.length; ++j) {
                var screen = this._sections[i].screens[j];
                column.add(new Echo.Button({
                    id: screen.id,
                    styleName: "Workspace.LaunchPanel",
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
    
    /**
     * Creates a main menu bar model.
     * This method is public because certain demonstration screens may use it for examples.
     *
     * @return the created menu bar model     
     * @type Extras.MenuModel
     */
    createMenuModel: function() {
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
        launchMenu.addItem(new Extras.OptionModel("autodemo", this._msg["Menu.StartAutoDemo"], "image/icon/Icon16Play.gif"));
        launchMenu.addItem(new Extras.OptionModel("perftest", this._msg["Menu.PerformanceTest"], "image/icon/Icon16Performance.gif"));
    
        var menuModel = new Extras.MenuModel(null, null, null, [
            launchMenu,
            new Extras.MenuModel(null, this._msg["Menu.ToolsMenu"], null, [
                new Extras.OptionModel("viewsource", this._msg["Menu.ViewSource"], "image/icon/Icon16Terminal.png"),
                new Extras.MenuModel(null, this._msg["Menu.ViewSourceMenu"], null, [
                    new Extras.OptionModel("viewsource.main", this._msg["Menu.ViewSourceMain"], null),
                    new Extras.OptionModel("viewsource.ss", this._msg["Menu.ViewSourceStyleSheet"], null),
                    new Extras.OptionModel("viewsource.msg", this._msg["Menu.ViewSourceMessages"], null),
                    new Extras.SeparatorModel(),
                    new Extras.OptionModel("viewsource.html", this._msg["Menu.ViewSourceHtml"], null)
                ]),
                new Extras.SeparatorModel(),
                new Extras.OptionModel("preferences", this._msg["Menu.Preferences"], "image/icon/Icon16Preferences.png"),
                new Extras.MenuModel(null, this._msg["Menu.Locale"], "image/icon/Icon16Flags.png", [
                    new Extras.OptionModel("locale.en", "English/US", null),
                    new Extras.OptionModel("locale.1337", "1337", null)
                ]),
                new Extras.SeparatorModel(),
                new Extras.OptionModel("download", this._msg["Menu.Download"], "image/icon/Icon16ArrowBottom.png")
            ]),
            new Extras.MenuModel(null, this._msg["Menu.HelpMenu"], null, [
                new Extras.OptionModel("about", this._msg["Menu.About"], "image/icon/Icon16About.png")
            ])
        ]);
        return menuModel;
    },
    
    /**
     * Determines which screen is sequentially after the current screen.
     *
     * @return the next screen
     * @type DemoApp.Workspace.ScreenData
     */
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
    
    /**
     * Determines which screen is sequentially before the current screen.
     *
     * @return the previous screen
     * @type DemoApp.Workspace.ScreenData
     */
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
    
    /**
     * Launches a demo screen in the main content area.
     *
     * @param {DemoApp.Workspace.ScreenData} screen the screen to launch
     * @param {Boolean} windowed flag indicating whether the screen should be launched in a window (true) or in the 
     *        main content area (false)
     */
    launchScreen: function(screen, windowed) {
        var screenWindow;
    
        if (windowed) {
            screenWindow = new DemoApp.ScreenWindow(screen);
            this.add(screenWindow);
        } else {
            if (this._activeScreenLaunchButton) {
                this._activeScreenLaunchButton.setStyleName("Workspace.LaunchPanel");
                this._activeScreenLaunchButton = null;
            }

            this._activeScreen = screen;
        }
        
        this.application.client.exec(screen.modules, Core.method(this, function() {
            if (screen.launchFunction) {
                screen.launchFunction(windowed ? screenWindow : this);
            }
            if (!windowed) {
                this._setActiveTab(screen);
            }
        }));
    },
    
    /**
     * Processes a click on a demo launcher button.
     * 
     * @param e the action event recevied from the button
     */
    _processLauncherClick: function(e) {
        if (this._screenMap[e.actionCommand]) {
            this.setTransition(Extras.TransitionPane.TYPE_FADE);
            var screen = this._screenMap[e.actionCommand];
            this.launchScreen(screen);
        }
    },
    
    /**
     * Processes a menu item selection.
     * 
     * @param e the event
     */
    _processMenuAction: function(e) {
        switch (e.modelId) {
        case "about":
            // Display about dialog.
            this.application.client.exec(DemoApp.MODULE_ABOUT, Core.method(this, function() {
                this.add(new DemoApp.AboutDialog());
            }));
            break;
        case "autodemo":
            // Display automatic demo dialog.
            this.application.client.exec(DemoApp.MODULE_AUTOMATIC_DEMO, Core.method(this, function() {
                this.add(new DemoApp.AutomaticDemo.StartDialog(this));
            }));
            break;
        case "download":
            // Display download instructions dialog.
            this.add(new DemoApp.DownloadWindow());
            break;            
        case "perftest":
            // Display performance test dialog.
            this.application.client.exec(DemoApp.MODULE_AUTOMATIC_DEMO, Core.method(this, function() {
                this.add(new DemoApp.AutomaticDemo.PerformanceTestDialog(this));
            }));
            break;
        case "preferences":
            // Display preferences dialog.
            this.application.client.exec(DemoApp.MODULE_PREFERENCES, Core.method(this, function() {
                this.add(new DemoApp.PreferencesDialog(this.application));
            }));
            break;
        case "viewsource":
            // Display source of active screen.
            this.application.client.exec(DemoApp.MODULE_SOURCE_VIEW, Core.method(this, function() {
                this.add(new DemoApp.SourceWindow(this._activeScreen));
            }));
            break;
        case "viewsource.main":
            // Display source of Main.js.
            this.application.client.exec(DemoApp.MODULE_SOURCE_VIEW, Core.method(this, function() {
                this.add(new DemoApp.SourceWindow("app/Main.js"));
            }));
            break;
        case "viewsource.ss":
            // Display source of stylesheet.
            this.application.client.exec(DemoApp.MODULE_SOURCE_VIEW, Core.method(this, function() {
                this.add(new DemoApp.SourceWindow("app/Default.StyleSheet.js"));
            }));
            break;
        case "viewsource.msg":
            // Display source of main resource map.
            this.application.client.exec(DemoApp.MODULE_SOURCE_VIEW, Core.method(this, function() {
                this.add(new DemoApp.SourceWindow("app/Messages.js"));
            }));
            break;
        case "viewsource.html":
            // Display source of index.html.
            this.application.client.exec(DemoApp.MODULE_SOURCE_VIEW, Core.method(this, function() {
                this.add(new DemoApp.SourceWindow("index.html"));
            }));
            break;
        default:
            var screen;
            if (e.modelId.substring(0,2) == "L:") {
                // Launch a demo screen in the main content area.
                screen = this._screenMap[e.modelId.substring(2)];
                this.launchScreen(screen);
            } else if (e.modelId.substring(0,2) == "W:") {
                // Launch a demo screen in a popup window.
                screen = this._screenMap[e.modelId.substring(2)];
                this.launchScreen(screen, true);
            } else if (e.modelId.substring(0,7) == "locale.") {
                // Set the application locale.
                var locale = e.modelId.substring(7);
                this._setLocale(locale);
            }
            break;
        }
    },
    
    /**
     * Process a click event on the next screen button.
     *
     * @param e the event
     */
    _processNext: function(e) {
        this.setTransition(Extras.TransitionPane.TYPE_CAMERA_PAN_RIGHT);
        this.launchScreen(this.getNextScreen());
    },
    
    /**
     * Process a click event on the previous screen button.
     *
     * @param e the event
     */
    _processPrevious: function(e) {
        this.setTransition(Extras.TransitionPane.TYPE_CAMERA_PAN_LEFT);
        this.launchScreen(this.getPreviousScreen());
    },
    
    /**
     * Sets the active tab of the launch panel to contain the specified screen.
     * 
     * @param {DemoApp.Workspace.ScreenData} the screen 
     */
    _setActiveTab: function(screen) {
        for (var i = 0; i < this._launchPanel.children.length && !this._activeScreenLaunchButton; ++i) {
            var column = this._launchPanel.children[i];
            for (var j = 0; j < column.children.length && !this._activeScreenLaunchButton; ++j) {
                var launchButton = column.children[j];
                if (launchButton.get("id") == screen.id) {
                    this._activeScreenLaunchButton = launchButton;
                    this._activeScreenLaunchButton.setStyleName("Workspace.LaunchPanel.Selected");
                    this._launchPanel.set("activeTabId", column.renderId);
                }
            }
        }
        
    },
    
    /**
     * Sets the content of the main content area (invoked by the screen's launch function to configure the window).
     * 
     * @param {Echo.Component} content the component to display
     */
    setContent: function(content) {
        this._contentArea.removeAll();
        this._contentArea.add(content);
    },
    
    /**
     * Sets the locale of the application.
     *
     * @param locale the new locale
     */
    _setLocale: function(locale) {
        DemoApp.locale = locale;
        if (locale in DemoApp.LOCALE_MODULES) {
            this.application.client.exec(["app/Messages." + locale + ".js"], Core.method(this, function() {
                this.application.setLocale(locale);
                // FIXME. Recreate UI.
            }));
        }
    },
    
    /**
     * Sets the transition effect used by the main content area.
     *
     * @param {Number} type the transition type (use transition constants from Extras.TransitionPane)
     * @param {Boolean} overridePreferences flag indicating whether default user preferences should be overridden
     */
    setTransition: function(type, overridePreferences) {
        this._contentArea.set("type", overridePreferences || DemoApp.pref.transitionsEnabled ?
                type : Extras.TransitionPane.TYPE_IMMEDIATE);    
    },
    
    /**
     * Starts an automatic demo/performance test.
     *
     * @param {Boolean} performanceTest flag indicating whether the demo should be a performance test
     * @param {Number} interval delay in milliseconds between automatic progression of screens
     * @param {Boolean} randomOrder flag indicating whether screens should be navigated in sequential 
     *        (false) or random (true) order
     * @param {Array} transitionStyle array of transition styels which may be used
     */
    startAutomaticDemo: function(performanceTest, interval, randomOrder, transitionStyle) {
        if (performanceTest) {
            interval = 0;
            transitionStyle = "None";
        }
    
        if (interval === 0) {
            this._launchPanel.set("animationTime", 0);
        }
        
        this._stopWindow = new DemoApp.AutomaticDemo.StopDialog(performanceTest, interval === 0);
        this._stopWindow.addListener("stop", Core.method(this, function(e) {
            this.stopAutomaticDemo();
        }));
        
        this.add(this._stopWindow);
        
        this._autoDemoRunnable = new DemoApp.AutomaticDemo.Runnable(this, this._stopWindow, this._sections, 
                performanceTest, interval, randomOrder, transitionStyle);
        Core.Web.Scheduler.add(this._autoDemoRunnable);
    },
    
    /**
     * Stops the automatic demo/performance test.
     *
     * @param {Number} performanceTestFps optional value indicating the final measured frames per second of a performance test
     *        (if provided, a dialog will be displayed announcing this value to the user)
     */
    stopAutomaticDemo: function(performanceTestFps) {
        this.remove(this._stopWindow);
        this._stopWindow = null;
        this.fpsLabel = null;
        this._launchPanel.set("animationTime", null);

        Core.Web.Scheduler.remove(this._autoDemoRunnable);
        this._autoDemoRunnable = null;
        
        if (typeof(performanceTestFps) == "number") {
            this.add(new DemoApp.AutomaticDemo.PerformanceTestResultDialog(performanceTestFps));
        }
        
        this.launchScreen(this._sections[0].screens[0]);
    }
});
