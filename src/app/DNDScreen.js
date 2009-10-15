DemoApp.DNDScreen = Core.extend(Echo.ContentPane, {

    _msg: null,

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
                            title: "Reorder",
                            children: [
                                new Echo.Column({
                                })
                            ]
                        }),
                        new Extras.Group({
                            title: "DragSource",
                            children: [
                                new Echo.Column({
                                })
                            ]
                        })
                    ]
                })
            ]
        });
    }
});
