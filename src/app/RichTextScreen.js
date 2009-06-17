DemoApp.RichTextScreen = Core.extend(Echo.ContentPane, {

    $static: {
        CONTENT: 
                "<h1>Echo3 <font color=\"#a32d2d\">Rich</font> <font color=\"#b74f4f\">Text</font> " +
                "<font color=\"#8e3030\">Area</font></h1>" +
                "<p><img src=\"image/richtext/Office.png\"></p>" +
                "<h3>Customization</h3>" +
                "<p>The <span style=\"color:#007f00;font-weight:bold\">RichTextArea</span> can be themed to fit the " +
                "look and feel of the " +
                "containing application. Menus, toolbars, and pop-up windows can be configured to use styles from an " +
                "application's stylesheet.  Additionally, features can be enabled or disabled to suit specific " +
                "rich-text editing needs.</p>" +
                "<table border=\"1\" cellpadding=\"1\" cellspacing=\"0\" width=\"100%\"><tbody>" +
                "<tr><td>Tables</td><td>South</td><td>Northeast</td><td>Midwest</td></tr>" +
                "<tr><td>January</td><td>1,432,958</td><td>5,323,187</td><td>1,854,122</td></tr>" +
                "<tr><td>February</td><td><p><span style=\"color:#7f0000;\">(243,409)</span></p></td>" + 
                "<td>493,332</td><td>933,865</td></tr>" +
                "<tr><td>March</td><td>584,231</td><td>5,399,231</td><td>983,220</td></tr>" +
                "<tr><td>April</td><td>1,043,127</td><td>1,542,361</td><td>2,742,586</td></tr>" +
                "</tbody></table>" +
                "<p>RichTextArea is an example of a component that uses Echo3's " +
                "\"Application Rendered Component\" architecture.  Using this feature, " +
                "a component can be rendered as an Echo application (rather than by " +
                "creating its HTML manually via DOM manipulation).  This feature is quite " +
                "useful for high-level components such as the RichTextArea.  The component " +
                "is able to make use of other Echo components, such as the MenuBarPane, " +
                "WindowPane, and ColorSelect.</p>" +
                "<ul><li><u>Bulleted lists</u></li><li>are supported</li><li>by the text area</li></ul>" +
                "<ol><li><u>Numbered lists</u></li><li>are also supported</li><li>by the text area</li></ol>"
                
    },
    
    _msg: null,

    $construct: function() {
        this._msg = DemoApp.getMessages(null);
        Echo.ContentPane.call(this, {
            backgroundImage: "image/bgpictures/Airplane.jpg",
            insets: 15,
            children: [
                new Extras.BorderPane({
                    background: "#ffffff",
                    border: {
                        contentInsets: "8px 14px 14px 8px",
                        borderInsets: "17px 23px 23px 17px",
                        topLeft: "image/window/simple/BorderTopLeft.png",
                        top: "image/window/simple/BorderTop.png",
                        topRight: "image/window/simple/BorderTopRight.png",
                        left: "image/window/simple/BorderLeft.png",
                        right: "image/window/simple/BorderRight.png",
                        bottomLeft: "image/window/simple/BorderBottomLeft.png",
                        bottom: "image/window/simple/BorderBottom.png",
                        bottomRight: "image/window/simple/BorderBottomRight.png"
                    },
                    children: [
                        new Extras.RichTextArea({
                            styleName: "Default",
                            text: DemoApp.RichTextScreen.CONTENT
                        })
                    ]
                })
            ]
        });
    }
});
