DemoApp.DNDScreen = Core.extend(Echo.ContentPane, {

    _msg: null,
    _reorder: null,

    $construct: function() {
        this._msg = DemoApp.getMessages(null);
        Echo.ContentPane.call(this, {
            background: "#ffffff",
            children: [
                new Echo.Grid({
                    width: "100%",
                    columnWidth: [ "40%", "60%" ],
                    size: 2,
                    insets: 10,
                    children: [
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
                        }),
                        new Extras.Group({
                            layoutData: {
                                alignment: "top"
                            },
                            title: "DragSource",
                            children: [
                                new Echo.Column({
                                    insets: 10
                                })
                            ]
                        })
                    ]
                })
            ]
        });
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
    }
});
