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
            icon: "image/icon/Icon16About.png",
            modal: true,
            closable: true,
            events: {
                close: function(e) {
                    e.source.parent.remove(e.source);
                }
            },
            children: [
                new Echo.ContentPane({
                    backgroundImage: {
                        url: "image/fill/Silver.png",
                        y: -135
                    },
                    children: [
                        new Extras.TabPane({
                            styleName: "Default.Top.Surround",
                            children: [
                                new Echo.Column({
                                    layoutData: {
                                        title: this._msg["About.GeneralTab"],
                                        icon: "image/icon/Icon24Help.png"
                                    },
                                    insets: "15px 25px",
                                    cellSpacing: 10,
                                    children: [
                                        new Echo.Label({
                                            icon: "image/logo/NextApp.png"
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
                                    layoutData: {
                                        title: this._msg["About.ArtworkTab"],
                                        icon: "image/icon/Icon24Image.png"
                                    },
                                    insets: "15px 25px",
                                    cellSpacing: 10,
                                    children: [
                                        new DemoApp.HtmlLabel({
                                            html: this._msg["About.Artwork1"]
                                        }),
                                        new DemoApp.HtmlLabel({
                                            html: this._msg["About.Artwork2"]
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
