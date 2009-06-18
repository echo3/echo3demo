/**
 * Color selection button widget.  Colored button launches a color select window when clicked.
 */
DemoApp.ColorSelectButton = Core.extend(Echo.Button, {

    _msg: null,
    _color: null,
    _window: null,
    _colorSelect: null,

    $construct: function(color) {
        this._msg = DemoApp.getMessages();
        this.color = color ? color : "#000000";
        Echo.Button.call(this, {
            width: 50,
            height: 20,
            border: "1px outset " + this.color,
            background: this.color,
            events: {
                action: Core.method(this, this._processAction)
            }
        });
    },
    
    _apply: function(e) {
        this.color = this._colorSelect.get("color");
        this.set("border", "1px outset " + this.color);
        this.set("background", this.color);
        this._window.parent.remove(this._window);
        this._window = null;
        this._colorSelect = null;
    },
    
    _close: function(e) {
        this._window.parent.remove(this._window);
        this._window = null;
        this._colorSelect = null;
    },
    
    _processAction: function() {
        var contentPane = this;
        while (!(contentPane instanceof Echo.ContentPane)) {
            contentPane = contentPane.parent;
        }
        
        this._window = new Echo.WindowPane({
            styleName: DemoApp.pref.windowStyleName,
            title: "Select Color",
            width: 220,
            modal: true,
            events: {
                close: Core.method(this, this._close)
            },
            children: [
                new Echo.SplitPane({
                    autoPositioned: true,
                    orientation: Echo.SplitPane.ORIENTATION_VERTICAL_BOTTOM_TOP,
                    children: [
                        new Echo.Row({
                            styleName: "ControlPane",
                            children: [
                                new Echo.Button({
                                    styleName: "ControlPane.Button",
                                    text: this._msg["Generic.Ok"],
                                    icon: "image/icon/Icon24Ok.png",
                                    events: {
                                        action: Core.method(this, this._apply)
                                    }
                                }),
                                new Echo.Button({
                                    styleName: "ControlPane.Button",
                                    text: this._msg["Generic.Cancel"],
                                    icon: "image/icon/Icon24Cancel.png",
                                    events: {
                                        action: Core.method(this, this._close)
                                    }
                                })
                            ]
                        }),
                        this._colorSelect = new Extras.ColorSelect({
                            layoutData: {
                                insets: "5px 10px"
                            },
                            color: this.color,
                            hueWidth: 16,
                            saturationHeight: 128,
                            valueWidth: 128
                        })
                    ]
                })
            ]
        });
        
        contentPane.add(this._window);
    }
});

/**
 * Label component which renders arbitrary HTML.
 */
DemoApp.HtmlLabel = Core.extend(Echo.Component, {
    componentType: "DemoApp.HtmlLabel"
});

/**
 * Synchronization peer for HtmlLabel component.
 */
DemoApp.HtmlLabelSync = Core.extend(Echo.Render.ComponentSync, {

    $load: function() {
        Echo.Render.registerPeer("DemoApp.HtmlLabel", this);
    },

    renderAdd: function(update, parentElement) {
        this._spanElement = document.createElement("span");
        Echo.Sync.Font.render(this.component.render("font"), this._spanElement);
        Echo.Sync.Color.renderFB(this.component, this._spanElement);
        this._spanElement.innerHTML = this.component.render("html", "");
        parentElement.appendChild(this._spanElement);
    },

    renderDispose: function(update) {
        this._spanElement = null;
    },
    
    renderUpdate: function(update) {
        var element = this._spanElement;
        var containerElement = element.parentNode;
        this.renderDispose(update);
        containerElement.removeChild(element);
        this.renderAdd(update, containerElement);
        return false; // Child elements not supported: safe to return false.
    }
});

/**
 * Utility methods.
 */
DemoApp.Util = {

    _LEADING_SPACES: /^(\s*)/,
    _TRAILING_SPACES: /(\s*)$/,
    _BLOCK_COMMENT_START: /^\/\*/,
    _BLOCK_COMMENT_END: /\*\//,
    _LINE_COMMENT: /^\/\//,
    BLANK_LINE: /^\s*$/,

    /**
     * Determiens the number of leading spaces in a string.
     *
     * @param s the string to evaluate
     * @return the number of leading spaces
     * @type Number
     */
    countLeadingSpaces: function(s) {
        return this._LEADING_SPACES.exec(s)[1].length;
    },

    /**
     * Determiens the number of trailing spaces in a string.
     *
     * @param s the string to evaluate
     * @return the number of trailing spaces
     * @type Number
     */
    countTrailingSpaces: function(s) {
        return this._TRAILING_SPACES.exec(s)[1].length;
    },

    /**
     * Returns a random item from an array.
     *
     * @param array the array to evaluate
     * @return a random item
     */
    randomItem: function(array) {
        return array[Math.floor(Math.random() * array.length)];
    },

    /**
     * Trims leading and trailing spaces from a string.
     *
     * @param s the string to evaluate
     * @return the string with no leading/trailing spaces
     */
    trim: function(s) {
        var leading = this._LEADING_SPACES.exec(s)[1].length;
        var trailing = this._TRAILING_SPACES.exec(s)[1].length;
        return s.substring(leading);
    }
};

