DemoApp.JSDevelopmentScreen = Core.extend(Echo.ContentPane, {

    $static: {
    
        HIERARCHAL_EXAMPLE:
                "var label;\n" +
                "var content = new Echo.ContentPane({\n" +
                "    children: [\n" +
                "        new Echo.SplitPane({ \n" +
                "            styleName: \"DefaultResizableLarge\",\n" +
                "            orientation: Echo.SplitPane.ORIENTATION_HORIZONTAL,\n" +
                "            children: [\n" +
                "                new Echo.Column({\n" +
                "                    layoutData: {\n" +
                "                        background: \"#4f4f5f\",\n" +
                "                        insets: 5\n" +
                "                    },\n" +
                "                    children: [\n" +
                "                        new Echo.Button({\n" +
                "                            styleName: \"Default\",\n" +
                "                            text: \"Alpha\",\n" +
                "                            events: {\n" +
                "                                action: function(e) {\n" +
                "                                    label.set(\"text\", \"A\");\n" +
                "                                }\n" +
                "                            }\n" +
                "                        }),\n" +
                "                        new Echo.Button({\n" +
                "                            styleName: \"Default\",\n" +
                "                            text: \"Bravo\",\n" +
                "                            events: {\n" +
                "                                action: function(e) {\n" +
                "                                    label.set(\"text\", \"B\");\n" +
                "                                }\n" +
                "                            }\n" +
                "                        })\n" +
                "                    ]\n" +
                "                }),\n" +
                "                label = new Echo.Label({\n" +
                "                    layoutData: {\n" +
                "                        alignment: \"center\"\n" +
                "                    },\n" +
                "                    font: { size: 200 },\n" +
                "                    text: \"?\"\n" +
                "                })\n" +
                "            ]\n" +
                "        })\n" +
                "    ]\n" +
                "});\n" 
    },

    _msg: null,
    
    $construct: function() {
        this._msg = DemoApp.getMessages(null);
        
        var simpleCode = [
            this._code(["Example.Alpha", " = ", "Core.extend", "({"],
                    [this._msg["JSDevelopmentScreen.ClassNameAlpha"], null, this._msg["JSDevelopmentScreen.CoreExtend"]]),
            this._code(),
            this._code(["    _internalField", ": null,"],
                    [this._msg["JSDevelopmentScreen.InternalField"]]),
            this._code(),
            this._code(["    publicField", ": null,"],
                    [this._msg["JSDevelopmentScreen.PublicField"]]),
            this._code(),
            this._code(["    $construct", ": function(a) {"],
                    [this._msg["JSDevelopmentScreen.Constructor"]]),
            this._code(["        this._internalField = a;"]),
            this._code(["    },"]),
            this._code(),
            this._code(["    _internalMethod", ": function(x, y) {"],
                    [this._msg["JSDevelopmentScreen.InternalMethod"]]),
            this._code(["        return x * y - 2;"]),
            this._code(["    },"]),
            this._code(),
            this._code(["    publicMethod", ": function(x, y) {"],
                    [this._msg["JSDevelopmentScreen.PublicMethod"]]),
            this._code(["        return this._internalField * x / (y + 3);"]),
            this._code(["    }"]),
            this._code(["});"])
        ];
        
        var advancedCode = [
            this._code(["Example.Beta", " = ", "Core.extend", "(", "Example.Gamma", ", {"], 
                    [this._msg["JSDevelopmentScreen.ClassNameBeta"], null, this._msg["JSDevelopmentScreen.CoreExtend"], null, 
                    this._msg["JSDevelopmentScreen.BaseClass"]]),
            this._code(),
            this._code(["    $static", ": {"], [this._msg["JSDevelopmentScreen.StaticBlock"]]),
            this._code(),
            this._code(["        staticField", ": \"Foo\","], [this._msg["JSDevelopmentScreen.StaticField"]]),
            this._code(),
            this._code(["        staticMethod", ": function(x, y) {"], [this._msg["JSDevelopmentScreen.StaticMethod"]]),
            this._code(["            return this.staticField.length + x - y;"]),
            this._code(["        }"]),
            this._code(["    },"]),
            this._code(),
            this._code(["    $load", ": function() {"], [this._msg["JSDevelopmentScreen.StaticInitializer"]]),
            this._code(["        this.staticField = this.staticField + \"ooo\";"]),
            this._code(["    },"]),
            this._code(),
            this._code(["    $virtual", ": {"], [this._msg["JSDevelopmentScreen.VirtualBlock"]]),
            this._code(),
            this._code(["        virtualField", ": null,"], [this._msg["JSDevelopmentScreen.VirtualField"]]),
            this._code(),
            this._code(["        virtualMethod", ": function(x, y) {"], [this._msg["JSDevelopmentScreen.VirtualMethod"]]),
            this._code(["            return this._internalField + x - y;"]),
            this._code(["        }"]),
            this._code(["    },"]),
            this._code(),
            this._code(["    $abstract", ": {"], [this._msg["JSDevelopmentScreen.AbstractBlock"]]),
            this._code(),
            this._code(["        abstractMethod", ": function(x, y) { }"], [this._msg["JSDevelopmentScreen.AbstractMethod"]]),
            this._code(["    },"]),
            this._code(),
            this._code(["    $include", ": [ Mixin1, Mixin2 ],"], [this._msg["JSDevelopmentScreen.IncludeBlock"]]),
            this._code(),
            this._code(["    _internalField", ": null,"], [this._msg["JSDevelopmentScreen.InternalField"]]),
            this._code(),
            this._code(["    publicField", ": null,"], [this._msg["JSDevelopmentScreen.PublicField"]]),
            this._code(),
            this._code(["    $construct", ": function(a, b) {"], [this._msg["JSDevelopmentScreen.Constructor"]]),
            this._code(["        Example.Gamma.call(this, a);"], [this._msg["JSDevelopmentScreen.SuperConstructorCall"]]),
            this._code(["        this._internalField = a + b;"]),
            this._code(["    },"]),
            this._code(),
            this._code(["    _internalMethod", ": function(x, y) {"], [this._msg["JSDevelopmentScreen.InternalMethod"]]),
            this._code(["        return x * y - 2;"]),
            this._code(["    },"]),
            this._code(),
            this._code(["    publicMethod", ": function(x, y) {"], [this._msg["JSDevelopmentScreen.PublicMethod"]]),
            this._code(["        return this._internalField * x / (y + 3);"]),
            this._code(["    }"]),
            this._code(["});"])
        ];
        
        Echo.ContentPane.call(this, {
            backgroundImage: {
                url: "image/bgpictures/Moonlight.jpg",
                x: "50%",
                y: "50%"
            },
            children: [
                new Extras.TabPane({
                    borderType: Extras.TabPane.BORDER_TYPE_SURROUND,
                    tabPosition: Extras.TabPane.TAB_POSITION_BOTTOM,
                    insets: 20,
                    tabInset: 30,
                    tabActiveBorder: "1px inset #3b67b4",
                    tabInactiveBorder: "1px inset #819488",
                    tabActiveBackground: "#0f0f1f",
                    tabActiveForeground: "#ffdfaf",
                    tabInactiveBackground: "#0f0f0f",
                    tabInactiveForeground: "#af7f6f",
                    children: [
                        new Echo.ContentPane({
                            background: "#0f0f1f",
                            layoutData: {
                                title: this._msg["JSDevelopmentScreen.Tab.CoreJS"]
                            },
                            children: [
                                new Echo.Column({
                                    insets: 20,
                                    cellSpacing: 10,
                                    children: [
                                        new Echo.Label({ 
                                            layoutData: {
                                                insets: "15px 15px",
                                                background: "#000000"
                                            },
                                            foreground: "#00ff00",
                                            font: {
                                                typeface: "Courier New, Courier, Monospace",
                                                size: 24,
                                                bold: true
                                            },
                                            text: this._msg["JSDevelopmentScreen.CoreJS.0"]
                                        }),
                                        new DemoApp.HtmlLabel({ 
                                            layoutData: {
                                                insets: "0px 0px 0px 580px"
                                            },
                                            foreground: "#ffcf9f",
                                            html: this._msg["JSDevelopmentScreen.CoreJS.1"]
                                        }),
                                        new DemoApp.HtmlLabel({ 
                                            layoutData: {
                                                insets: "0px 0px 0px 580px"
                                            },
                                            foreground: "#ffcf9f",
                                            html: this._msg["JSDevelopmentScreen.CoreJS.2"]
                                        })
                                    ]
                                }),
                                new Echo.WindowPane({
                                    styleName: "Default",
                                    title: this._msg["JSDevelopmentScreen.CoreJS.WindowTitle"],
                                    background: "#ffffff",
                                    positionX: 0,
                                    positionY: 86,
                                    width: 600,
                                    height: 450,
                                    closable: false,
                                    children: [
                                        new Echo.SplitPane({
                                            orientation: Echo.SplitPane.ORIENTATION_VERTICAL_TOP_BOTTOM,
                                            separatorPosition: 50,
                                            separatorHeight: 1,
                                            separatorColor: "#3f3f4f",
                                            children: [
                                                new Echo.Label({
                                                    layoutData: {
                                                        insets: 15,
                                                        backgroundImage: "image/LightBlueLineBackground.png"
                                                    },
                                                    text: this._msg["JSDevelopmentScreen.CoreJS.RolloverDirection"]
                                                }),
                                                new Extras.AccordionPane({
                                                    styleName: "Default",
                                                    children: [
                                                        new Echo.Column({
                                                            layoutData: {
                                                                title: this._msg["JSDevelopmentScreen.CoreJS.Simple"]
                                                            },
                                                            insets: 8,
                                                            children: simpleCode
                                                        }),
                                                        new Echo.Column({
                                                            layoutData: {
                                                                title: this._msg["JSDevelopmentScreen.CoreJS.Advanced"]
                                                            },
                                                            insets: 8,
                                                            children: advancedCode
                                                        })
                                                    ]
                                                })
                                                
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        new Echo.ContentPane({
                            background: "#0f0f1f",
                            layoutData: {
                                title: this._msg["JSDevelopmentScreen.Tab.HierarchalConstruction"]
                            },
                            children: [
                                new Echo.SplitPane({
                                    orientation: Echo.SplitPane.ORIENTATION_VERTICAL_TOP_BOTTOM,
                                    autoPositioned: true,
                                    children: [
                                        new Echo.Column({
                                            layoutData: {
                                                insets: 20
                                            },
                                            children: [
                                                new Echo.Label({ 
                                                    layoutData: {
                                                        insets: "15px 15px",
                                                        background: "#000000"
                                                    },
                                                    foreground: "#ffcf3f",
                                                    font: {
                                                        typeface: "Courier New, Courier, Monospace",
                                                        size: 24,
                                                        bold: true
                                                    },
                                                    text: this._msg["JSDevelopmentScreen.Hierarchal.0"]
                                                }),
                                            ]
                                        }),
                                        new Echo.SplitPane({
                                            orientation: Echo.SplitPane.ORIENTATION_HORIZONTAL_RIGHT_LEFT,
                                            separatorPosition: "35%",
                                            children: [
                                                new Echo.Column({
                                                    insets: 20,
                                                    cellSpacing: 10,
                                                    children: [
                                                        new DemoApp.HtmlLabel({ 
                                                            foreground: "#ffcf9f",
                                                            html: this._msg["JSDevelopmentScreen.Hierarchal.1"]
                                                        }),
                                                        new DemoApp.HtmlLabel({ 
                                                            foreground: "#ffcf9f",
                                                            html: this._msg["JSDevelopmentScreen.Hierarchal.2"]
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new Echo.WindowPane({
                                    styleName: "GlassBlue",
                                    title: this._msg["JSDevelopmentScreen.Hierarchal.WindowTitle"],
                                    background: "#ffffff",
                                    positionX: 0,
                                    positionY: "100%",
                                    width: "65%",
                                    height: "80%",
                                    closable: false,
                                    children: [
                                        new Echo.ContentPane({
                                            backgroundImage: {
                                                url: "image/LogoBackground.png",
                                                repeat: "repeat-x"
                                            },
                                            background: "#383838",
                                            children: [
                                                new Extras.TabPane({
                                                    background: "#ffffff",
                                                    tabActiveBackground: "#ffffff",
                                                    tabInactiveBackground: "#afafaf",
                                                    borderType: Extras.TabPane.BORDER_TYPE_SURROUND,
                                                    tabPosition: Extras.TabPane.TAB_POSITION_BOTTOM,
                                                    insets: 10,
                                                    tabInset: 30,
                                                    children: [
                                                        new Echo.ContentPane({
                                                            layoutData: {
                                                                title: this._msg["JSDevelopmentScreen.Tab.HierarchalCode"]
                                                            },
                                                            background: "#ffffff",
                                                            foreground: "#00006f",
                                                            children: [
                                                                new DemoApp.SourceView({
                                                                    code: DemoApp.JSDevelopmentScreen.HIERARCHAL_EXAMPLE
                                                                })
                                                            ]
                                                        }),
                                                        new Echo.ContentPane({
                                                            layoutData: {
                                                                title: this._msg["JSDevelopmentScreen.Tab.ComponentHierarchy"]
                                                            },
                                                            backgroundImage: {
                                                                x: "50%",
                                                                y: "50%",
                                                                repeat: "no-repeat",
                                                                url: "image/Hierarchy.png"
                                                            }

                                                        }),
                                                        this._createHierarchalExample()
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
    
    _code: function(codeElements, comments) {
        var row = new Echo.Row();

        if (codeElements != null) {
            for (var i = 0; i < codeElements.length; ++i) {
                var codeElement = codeElements[i];
                var comment = comments ? (i < comments.length ? comments[i] : null) : null;
                
                var leadingSpaces = DemoApp.Util.countLeadingSpaces(codeElements[i]);
                var trailingSpaces = DemoApp.Util.countTrailingSpaces(codeElements[i]);
                var layoutData = {
                    insets: "0px " + trailingSpaces + "ex 0px " +  leadingSpaces + "ex"
                };

                var component;
                if (comment) {
                    row.add(new Extras.ToolTipContainer({
                        layoutData: layoutData,
                        width: 400,
                        children: [
                            new Echo.Button({
                                foreground: "#007f00",
                                font: { bold: true },
                                text: codeElement,
                                rolloverEnabled: true,
                                rolloverBackground: "#000000",
                                rolloverForeground: "#00ff00"
                            }),
                            new Echo.Row({
                                border: "1px outset #ffffaf",
                                background: "#ffffaf",
                                insets: "3px 8px",
                                children: [
                                    new Echo.Button({
                                        layoutData: {
                                            alignment: "top",
                                            insets: "5px 8px 0px 3px"
                                        },
                                        width: 6,
                                        height: 6,
                                        background: "#cf0000"
                                    }),
                                    new Echo.Label({
                                        text: comment
                                    })
                                ]
                            })
                        ]
                    }))
                } else {
                    row.add(new Echo.Label({
                        layoutData: layoutData,
                        text: codeElement
                    }));
                }
            }
        }
        
        if (codeElements == null) {
            row.set("layoutData", {
                insets: "1em 0px 0px 0px"
            });
        }

        return row;
    },
    
    _createHierarchalExample: function() {
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
        
        content.set("layoutData", {
            title: this._msg["JSDevelopmentScreen.Tab.RenderedComponents"]
        });
        
        return content;
    }
});
