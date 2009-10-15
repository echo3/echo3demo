DemoApp.DNDScreen = Core.extend(Echo.ContentPane, {

    $static: {
        REORDER_START: DemoApp.Util.colorToRgb("#fce1c3"),
        REORDER_END: DemoApp.Util.colorToRgb("#8190c9")
    },
    
    _msg: null,
    _reorder: null,
    _dropRef: null,
    _dropTargetIds: [ "drop1", "drop2" ],

    $construct: function() {
        this._msg = DemoApp.getMessages(null);
        this._dropRef = Core.method(this, this._drop);
        Echo.ContentPane.call(this, {
            background: "#efefef",
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
                            title: "DragSource",
                            children: [
                                new Echo.Grid({
                                    width: "100%",
                                    columnWidth: [ "50%", "50%" ],
                                    insets: 10,
                                    children: [
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
                                                        this._createDragItem("image/emoticon/FaceAngel.png"),
                                                        this._createDragItem("image/emoticon/FaceCool.png"),
                                                        this._createDragItem("image/emoticon/FaceCrying.png"),
                                                        this._createDragItem("image/emoticon/FaceDevilish.png"),
                                                        this._createDragItem("image/emoticon/FaceGlasses.png"),
                                                        this._createDragItem("image/emoticon/FaceGrin.png"),
                                                        this._createDragItem("image/emoticon/FaceKiss.png"),
                                                        this._createDragItem("image/emoticon/FaceMonkey.png")
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
                                                        this._createDragItem("image/emoticon/FacePlain.png"),
                                                        this._createDragItem("image/emoticon/FaceSad.png"),
                                                        this._createDragItem("image/emoticon/FaceSmile.png"),
                                                        this._createDragItem("image/emoticon/FaceSmileBig.png"),
                                                        this._createDragItem("image/emoticon/FaceSurprise.png"),
                                                        this._createDragItem("image/emoticon/FaceWink.png")
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
                            title: "Reorder",
                            children: [
                                new Echo.Column({
                                    insets: 10,
                                    cellSpacing: 10,
                                    children: [
                                        new Echo.Label({
                                            text: "A reorder component allows a user to sort arbitrary components within a column."
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
    
    _createDragItem: function(icon) {
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
        })
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
        if (e.dropTarget != e.source.parent.parent.renderId) {
            var target = this.application.getComponentByRenderId(e.dropTarget + "Container");
            target.add(e.source);
        }
    }
});
