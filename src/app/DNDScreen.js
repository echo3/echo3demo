DemoApp.DNDScreen = Core.extend(Echo.ContentPane, {

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
                                        new Echo.Grid({
                                            renderId: "drop1",
                                            layoutData: {
                                                alignment: "top"
                                            },
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
                                        }),
                                        new Echo.Grid({
                                            renderId: "drop2",
                                            layoutData: {
                                                alignment: "top"
                                            },
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
                        }),
                        new Extras.Group({
                            layoutData: {
                                alignment: "top"
                            },
                            title: "Reorder",
                            children: [
                                new Echo.Column({
                                    insets: 10,
                                    children: [
                                        this._reorder = new Extras.Reorder({
                                            children: [
                                                this._createReorderItem("Alpha"),
                                                this._createReorderItem("Beta"),
                                                this._createReorderItem("Gamma"),
                                                this._createReorderItem("Delta"),
                                                this._createReorderItem("Epsilon"),
                                                this._createReorderItem("Zeta")
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
    
    _createReorderItem: function(label) {
        return new Echo.Row({
            border: "1px outset #abcdef",
            background: "#abcdef",
            insets: "5px 10px",
            cellSpacing: 20,
            children: [
                new Extras.Reorder.Handle({
                }),
                new Echo.Label({
                    text: label
                })
            ]
        });
    },
    
    _drop: function(e) {
        if (e.dropTarget != e.source.parent.renderId) {
            var target = this.application.getComponentByRenderId(e.dropTarget);
            target.add(e.source);
        }
    }
});
