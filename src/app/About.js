/**
 * Help/About Dialog.  Displays general application information, credits, and copyrights.
 */
DemoApp.AboutDialog = Core.extend(Echo.WindowPane, {

    _msg: null,
    
    $construct: function() {
        this._msg = DemoApp.getMessages();
        
        Echo.WindowPane.call(this, {
            styleName: DemoApp.pref.windowStyleName,
            width: "40em",
            height: "30em",
            title: this._msg["About.WindowTitle"],
            iconInsets: "6px 10px",
            icon: "image/Icon16Info.gif",
            modal: true,
            closable: true,
            events: {
                close: function(e) {
                    e.source.parent.remove(e.source);
                }
            },
            children: [
                new Echo.ContentPane({
                    backgroundImage: "image/BlueLineBackground.png",
                    children: [
                        new Extras.TabPane({
                            tabActiveBackground: "#ffffff",
                            tabInactiveBackground: "#afafef",
                            background: "#ffffff",
                            children: [
                                new Echo.Column({
                                    insets: "15px 25px",
                                    cellSpacing: 10,
                                    layoutData: {
                                        title: this._msg["About.GeneralTab"]
                                    },
                                    children: [
                                        new Echo.Label({
                                            icon: "image/NextApp.png"
                                        }),
                                        new Echo.Label({
                                            text: this._msg["About.General1"]
                                        }),
                                        new DemoApp.HtmlLabel({
                                            html: this._msg["About.General2"]
                                        }),
                                        new DemoApp.HtmlLabel({
                                            html: this._msg["About.General3"]
                                        })
                                    ]
                                }),
                                new Echo.Column({
                                    insets: "15px 25px",
                                    cellSpacing: 10,
                                    layoutData: {
                                        title: this._msg["About.PhotographyTab"]
                                    },
                                    children: [
                                        new DemoApp.HtmlLabel({
                                            html: this._msg["About.Photography1"]
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                })
            ]
        });
    }
});
