DemoApp.DNDScreen = Core.extend(Echo.ContentPane, {

    $static: {
        REORDER_START: DemoApp.Util.colorToRgb("#fce1c3"),
        REORDER_END: DemoApp.Util.colorToRgb("#8190c9")
    },
    
    _msg: null,
    _reorder: null,
    _dropRef: null,
    _dropTargetIds: [ "drop1", "drop2", "drop3" ],

    $construct: function() {
        this._msg = DemoApp.getMessages(null);
        this._dropRef = Core.method(this, this._drop);
        Echo.ContentPane.call(this, {
            background: "#efefef",
            backgroundImage: {
                url: "image/bgpictures/Clouds.jpg",
                repeat: 0
            },
            children: [
                new Echo.Grid({
                    width: "100%",
                    columnWidth: [ "64%", "36%" ],
                    size: 2,
                    insets: 10,
                    children: [
                        new Extras.Group({
                            layoutData: {
                                alignment: "top"
                            },
                            title: this._msg["DNDScreen.DragSource.Title"],
                            children: [
                                new Echo.Grid({
                                    size: 2,
                                    width: "100%",
                                    columnWidth: [ "50%", "50%" ],
                                    insets: "5 10",
                                    children: [
                                        new Echo.Label({
                                            layoutData: {
                                                columnSpan: -1
                                            },
                                            text: this._msg["DNDScreen.DragSource.Description"]
                                        }),
                                        new Echo.Panel({
                                            renderId: "drop1",
                                            styleName: "DisplayPanel",
                                            insets: 10,
                                            layoutData: {
                                                alignment: "top"
                                            },
                                            children:  [
                                                new Echo.Grid({
                                                    renderId: "drop1Container",
                                                    width: "100%",
                                                    size: 3,
                                                    children: [
                                                        this._createDragIcon("image/emoticon/FaceAngel.png"),
                                                        this._createDragIcon("image/emoticon/FaceCool.png"),
                                                        this._createDragIcon("image/emoticon/FaceCrying.png"),
                                                        this._createDragIcon("image/emoticon/FaceDevilish.png"),
                                                        this._createDragIcon("image/emoticon/FaceGlasses.png"),
                                                        this._createDragIcon("image/emoticon/FaceGrin.png"),
                                                        this._createDragIcon("image/emoticon/FaceKiss.png"),
                                                        this._createDragIcon("image/emoticon/FaceMonkey.png")
                                                    ]
                                                })
                                            ]
                                        }),
                                        new Echo.Panel({
                                            renderId: "drop2",
                                            styleName: "DisplayPanel",
                                            insets: 10,
                                            layoutData: {
                                                alignment: "top"
                                            },
                                            children:  [
                                                new Echo.Grid({
                                                    renderId: "drop2Container",
                                                    width: "100%",
                                                    size: 3,
                                                    children: [
                                                        this._createDragIcon("image/emoticon/FacePlain.png"),
                                                        this._createDragIcon("image/emoticon/FaceSad.png"),
                                                        this._createDragIcon("image/emoticon/FaceSmile.png"),
                                                        this._createDragIcon("image/emoticon/FaceSmileBig.png"),
                                                        this._createDragIcon("image/emoticon/FaceSurprise.png"),
                                                        this._createDragIcon("image/emoticon/FaceWink.png")
                                                    ]
                                                })
                                            ]
                                        }),
                                        new Echo.Panel({
                                            renderId: "drop3",
                                            styleName: "DisplayPanel",
                                            insets: 10,
                                            layoutData: {
                                                columnSpan: -1,
                                                alignment: "top"
                                            },
                                            children: [
                                                new Echo.Grid({
                                                    renderId: "drop3Container",
                                                    width: "100%",
                                                    size: 3,
                                                    insets: 3,
                                                    children: [
                                                        this._createDragComponent(new Echo.TextField({
                                                            styleName: "Default",
                                                            width: 60,
                                                            text: "TextField"
                                                        })),
                                                        this._createDragComponent(new Echo.Button({
                                                            styleName: "Default",
                                                            text: "Button",
                                                            events: {
                                                                action: Core.method(this, function(e) {
                                                                    e.source.set("text", 
                                                                            e.source.get("text") == "Button" ?
                                                                            "[Button]" : "Button");
                                                                })
                                                            }
                                                        })),
                                                        this._createDragComponent(new Echo.CheckBox({
                                                            text: "Check"
                                                        })),
                                                        this._createDragComponent(new Echo.TextArea({
                                                            styleName: "Default",
                                                            width: 60,
                                                            text: "TextArea"
                                                        }))
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        new Extras.Group({
                            layoutData: {
                                alignment: "top"
                            },
                            title: this._msg["DNDScreen.Reorder.Title"],
                            children: [
                                new Echo.Column({
                                    insets: 10,
                                    cellSpacing: 10,
                                    children: [
                                        new Echo.Label({
                                            text: this._msg["DNDScreen.Reorder.Description"]
                                        }),
                                        this._reorder = new Extras.Reorder({
                                            children: [
                                                this._createReorderItem(0, "Alpha"),
                                                this._createReorderItem(0.1, "Beta"),
                                                this._createReorderItem(0.2, "Gamma"),
                                                this._createReorderItem(0.3, "Delta"),
                                                this._createReorderItem(0.4, "Epsilon"),
                                                this._createReorderItem(0.5, "Zeta"),
                                                this._createReorderItem(0.6, "Eta"),
                                                this._createReorderItem(0.7, "Theta"),
                                                this._createReorderItem(0.8, "Iota"),
                                                this._createReorderItem(0.9, "Kappa"),
                                                this._createReorderItem(1.0, "Lambda")
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
    
    _createDragComponent: function(component) {
        return new Extras.DragSource({
            dropTargetIds: this._dropTargetIds,
            events: {
                drop: this._dropRef
            },
            children: [
                component
            ]
        });
    },
    
    _createDragIcon: function(icon) {
        return new Extras.DragSource({
            dropTargetIds: this._dropTargetIds,
            events: {
                drop: this._dropRef
            },
            children: [
                new Echo.Panel({
                    alignment: "center",
                    background: "#abcdef",
                    border: "1px outset #abcdef",
                    insets: 16,
                    children: [
                        new Echo.Label({
                            icon: icon
                        })
                    ]
                })
            ]
        });
    },
    
    _createReorderItem: function(gradientValue, label) {
        var background = DemoApp.Util.rgbToColor(
                DemoApp.Util.mixRgb(DemoApp.DNDScreen.REORDER_START, DemoApp.DNDScreen.REORDER_END, gradientValue));
        return new Echo.Row({
            border: "1px outset " + background,
            background: background,
            insets: "2px 10px",
            cellSpacing: 20,
            children: [
                new Extras.Reorder.Handle({
                }),
                new Echo.Label({
                    text: label
                }),
                new Echo.TextField({
                    styleName: "Default",
                    width: 60,
                    text: label
                })
            ]
        });
    },
    
    _drop: function(e) {
        var target = this.application.getComponentByRenderId(e.dropTarget + "Container");

        var index = -1;
        var insertBefore = this.application.getComponentByRenderId(e.specificTarget);
        while (insertBefore && !(insertBefore instanceof Extras.DragSource)) {
            insertBefore = insertBefore.parent;
        }
        if (insertBefore) {
            index = target.indexOf(insertBefore);
        }
        
        target.add(e.source, index == -1 ? null : index);
    }
});
