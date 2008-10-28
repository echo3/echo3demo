DemoApp.ExtrasWidgetsScreen = Core.extend(Echo.ContentPane, {
    
    _msg: null,

    $construct: function() {
        this._msg = DemoApp.getMessages(null);
        Echo.ContentPane.call(this, {
            insets: 15,
            children: [
                new Extras.CalendarSelect({
                })
            ]
        });
    }
});
