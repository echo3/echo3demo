DemoApp.RichTextScreen = Core.extend(Echo.ContentPane, {

    $static: {
        CONTENT: 
                "<h1>Echo3 Rich Text Area</h1>" +
                "<h3>Customization</h3>" +
                "<p>The <span style=\"color:#007f00;font-weight:bold\">RichTextArea</span> can be themed to fit the " +
                "look and feel of the " +
                "containing application. Menus, toolbars, and pop-up windows can be configured to use styles from an " +
                "application's stylesheet.  Additionally, features can be enabled or disabled to suit specific " +
                "rich-text editing needs.</p>" +
                "<p>RichTextArea is an example of a component that uses Echo3's " +
                "\"Application Rendered Component\" architecture.  Using this feature, " +
                "a component can be rendered as an Echo application (rather than by " +
                "creating its HTML manually via DOM manipulation).  This feature is quite " +
                "useful for high-level components such as the RichTextArea.  The component " +
                "is able to make use of other Echo components, such as the MenuBarPane, " +
                "WindowPane, and ColorSelect.</p>"
    },
    
    _msg: null,

    $construct: function() {
        this._msg = DemoApp.getMessages(null);
        Echo.ContentPane.call(this, {
            children: [
                new Extras.RichTextArea({
                    styleName: "Default",
                    text: DemoApp.RichTextScreen.CONTENT
                })
            ]
        });
    }
});
