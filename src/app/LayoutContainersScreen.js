DemoApp.LayoutContainersScreen = Core.extend(Echo.ContentPane, {

    $static: {
    
        COLORS: [ "#ffc0c0", "#ffddc0", "#fff7bd", "#ffa9a9", "#ffdc98", "#e9ffca", "#e6f9a4", "#f0f4c1", "#bbffb5",
                  "#e3ffa8", "#9fef84", "#c6e3ff", "#b5ffe7", "#b1f5ff", "#7df1dd", "#c1e4ff", "#b9b4ff", "#bccaff",
                  "#e8d8ff", "#c1bdff", "#ffc2c2", "#e3cdff", "#ecc7f9", "#caa7ff", "#ffb1b1", "#ffc5a1" ]
    },

    _msg: null,

    $construct: function() {
        this._msg = DemoApp.getMessages(null);
        Echo.ContentPane.call(this, {
            children: [
                new Echo.SplitPane({
                    styleName: "DefaultResizableLarge",
                    orientation: Echo.SplitPane.ORIENTATION_VERTICAL_TOP_BOTTOM,
                    separatorPosition: "50%",
                    children: [
                        new Echo.ContentPane({
                            children: [
                                new Echo.Column({
                                    insets: 10,
                                    children: [
                                        this._createGrid()
                                    ]
                                }),
                                new Echo.WindowPane({
                                    styleName: "Default",
                                    title: this._msg["LayoutContainersScreen.GridTitle"],
                                    positionX: "90%",
                                    positionY: "50%",
                                    width: "19em",
                                    closable: false,
                                    resizable: false,
                                    backgroundImage: "image/fill/LightBeigeLine.png",
                                    insets: "1ex",
                                    children: [
                                        new Echo.Label({
                                            text: this._msg["LayoutContainersScreen.GridDescription"]
                                        })
                                    ]
                                })
                            ]
                        }),
                        new Echo.ContentPane({
                            children: [
                                new Echo.Column({
                                    insets: 15,
                                    children: [
                                        new Echo.Column({
                                            border: "3px solid #f2f2af",
                                            cellSpacing: 5,
                                            insets: 5,
                                            children: [
                                                new Echo.Row({
                                                    border: "3px solid #afff7f",
                                                    cellSpacing: 5,
                                                    insets: 5,
                                                    children: [
                                                        new Echo.Label({
                                                            text: "A"
                                                        }),
                                                        new Echo.Label({
                                                            text: "B"
                                                        }),
                                                        new Echo.Label({
                                                            text: "C"
                                                        })
                                                    ]
                                                }),
                                                new Echo.Row({
                                                    layoutData: {
                                                        alignment: "center"
                                                    },
                                                    border: "3px solid #8ca5ef",
                                                    cellSpacing: 5,
                                                    insets: 5,
                                                    children: [
                                                        new Echo.Label({
                                                            text: "D"
                                                        }),
                                                        new Echo.Label({
                                                            text: "E"
                                                        }),
                                                        new Echo.Label({
                                                            text: "F"
                                                        })
                                                    ]
                                                }),
                                                new Echo.Row({
                                                    layoutData: {
                                                        alignment: "center"
                                                    },
                                                    border: "3px solid #a58cef",
                                                    cellSpacing: 5,
                                                    insets: 5,
                                                    children: [
                                                        this._create9x9Matrix("F"),
                                                        new Echo.Column({
                                                            border: "3px solid #8ca5ef",
                                                            cellSpacing: 5,
                                                            insets: 5,
                                                            children: [
                                                                new Echo.Column({
                                                                    border: "3px solid #7fefaf",
                                                                    cellSpacing: 5,
                                                                    insets: 5,
                                                                    children: [
                                                                        this._create9x9Matrix("J")
                                                                    ]
                                                                }),
                                                                new Echo.Column({
                                                                    border: "3px solid #6fefbf",
                                                                    cellSpacing: 5,
                                                                    insets: 5,
                                                                    children: [
                                                                        this._create9x9Matrix("N")
                                                                    ]
                                                                })
                                                            ]
                                                        }),
                                                        this._create9x9Matrix("R")
                                                    ]
                                                }),
                                                new Echo.Row({
                                                    layoutData: {
                                                        alignment: "right"
                                                    },
                                                    border: "3px solid #ffafff",
                                                    cellSpacing: 5,
                                                    insets: 5,
                                                    children: [
                                                        new Echo.Label({
                                                            text: "X"
                                                        }),
                                                        new Echo.Label({
                                                            text: "Y"
                                                        }),
                                                        new Echo.Label({
                                                            text: "Z"
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new Echo.WindowPane({
                                    styleName: "Default",
                                    title: this._msg["LayoutContainersScreen.ColumnRowTitle"],
                                    positionX: "10%",
                                    positionY: "50%",
                                    width: "19em",
                                    closable: false,
                                    resizable: false,
                                    backgroundImage: "image/fill/LightBlueLine.png",
                                    insets: 5,
                                    children: [
                                        new Echo.Label({
                                            text: this._msg["LayoutContainersScreen.ColumnRowDescription"]
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
    
    _create9x9Matrix: function(startLetter) {
        var charCode = startLetter.charCodeAt(0);
        return new Echo.Row({
            cellSpacing: 5,
            insets: 5,
            children: [
                new Echo.Column({
                    border: "3px solid #f7f55f",
                    cellSpacing: 5,
                    insets: 5,
                    children: [
                        new Echo.Label({
                            text: String.fromCharCode(charCode++)
                        }),
                        new Echo.Label({
                            text: String.fromCharCode(charCode++)
                        }),
                        new Echo.Label({
                            text: String.fromCharCode(charCode++)
                        })
                    ]
                }),
                new Echo.Column({
                    border: "3px solid #f7d75f",
                    cellSpacing: 5,
                    insets: 5,
                    children: [
                        new Echo.Label({
                            text: String.fromCharCode(charCode++)
                        }),
                        new Echo.Label({
                            text: String.fromCharCode(charCode++)
                        }),
                        new Echo.Label({
                            text: String.fromCharCode(charCode++)
                        })
                    ]
                }),
                new Echo.Column({
                    border: "3px solid #f7af5f",
                    cellSpacing: 5,
                    insets: 5,
                    children: [
                        new Echo.Label({
                            text: String.fromCharCode(charCode++)
                        }),
                        new Echo.Label({
                            text: String.fromCharCode(charCode++)
                        }),
                        new Echo.Label({
                            text: String.fromCharCode(charCode++)
                        })
                    ]
                })
            ]
        });
    },
    
    _createGrid: function() {
        var grid = new Echo.Grid({
            border: "2px groove #4e7fe3",
            width: "100%",
            insets: "2px 5px",
            size: 4
        });
        
        for (var i = 0; i < 2; ++i) {
            for (var j = 0; j < 26; ++j) {
                grid.add(new Echo.Label({
                    text: String.fromCharCode(65 + j),
                    layoutData: {
                        columnSpan: (Math.random() * 6 < 4) ? 1 : Math.floor(Math.random() * 4 + 1),
                        rowSpan: j % 9 === 0 ? 2 : 1,
                        background: DemoApp.LayoutContainersScreen.COLORS[j  % DemoApp.LayoutContainersScreen.COLORS.length]
                    }
                }));
            }
        }
        
        return grid;
    }
});
