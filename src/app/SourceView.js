DemoApp.SourcePane = Core.extend(Echo.ContentPane, {

    _msg: null,
    
    $construct: function(data) {
        this._msg = DemoApp.getMessages();
        Echo.ContentPane.call(this, data);
        var url = this.render("url");
        if (url) {
            var conn = new Core.Web.HttpConnection("src/" + url, "GET");
            conn.addResponseListener(Core.method(this, this._responseListener));
            try {
                conn.connect();
            } catch (ex) {
                this.add(new Echo.Label({
                    text: this._msg["SourcePane.XHRError"]
                }));
            }
        }
    },
    
    _responseListener: function(e) {
        this.add(new DemoApp.SourceView({
            code: e.source.getResponseText()
        }));
    }
});

/**
 * SourceView component.  Displays formatted source code.
 * Optionally supports settings syntax colors for
 * C-style comments.
 */
DemoApp.SourceView = Core.extend(Echo.Component, {

    componentType: "DemoApp.SourceView"
});

/**
 * SourceView synchronization peer.
 */
DemoApp.SourceViewSync = Core.extend(Echo.Render.ComponentSync, {

    $load: function() {
        Echo.Render.registerPeer("DemoApp.SourceView", this);
    },
    
    renderAdd: function(update, parentElement) {
        var code = this.component.render("code", "");
        var lines = code.split("\n");
        var inBlockComment = false;

        this._divElement = document.createElement("div");
        this._divElement.style.padding = "2px 1ex 2px 9ex";
        for (var i = 0; i < lines.length; ++i) {
            var line = lines[i];
            var trimmedLine = DemoApp.Util.trim(line);
            
            if (DemoApp.Util._BLOCK_COMMENT_START.test(trimmedLine)) {
                inBlockComment = true;
            }
            
            if (DemoApp.Util.BLANK_LINE.test(line)) {
                var blankDiv = document.createElement("div");
                blankDiv.style.height = "1em";
                this._divElement.appendChild(blankDiv);
                continue;
            }
            
            var lineDiv = document.createElement("div");
            if (DemoApp.Util._LINE_COMMENT.test(trimmedLine)) {
                Echo.Sync.Color.render(this.component.render("lineCommentColor"), lineDiv, "color");
            } else if (inBlockComment) {
                Echo.Sync.Color.render(this.component.render("blockCommentColor"), lineDiv, "color");
            }
            lineDiv.style.paddingLeft = DemoApp.Util.countLeadingSpaces(line) + "ex";
            lineDiv.style.textIndent = "-8ex";
            lineDiv.appendChild(document.createTextNode(trimmedLine));
            this._divElement.appendChild(lineDiv);

            if (DemoApp.Util._BLOCK_COMMENT_END.test(trimmedLine)) {
                inBlockComment = false;
            }
        }        
        
        parentElement.appendChild(this._divElement);
    },

    renderDispose: function(update) {
        this._divElement = null;
    },

    renderUpdate: function(update) {
        var element = this._divElement;
        var containerElement = element.parentNode;
        this.renderDispose(update);
        containerElement.removeChild(element);
        this.renderAdd(update, containerElement);
        return false; // Child elements not supported: safe to return false.
    }
});

/**
 * Source code viewing window.
 * Retrieves arbitrary source code from URL.
 */
DemoApp.SourceWindow = Core.extend(Echo.WindowPane, {

    _msg: null,

    $construct: function(screen) {
        this._msg = DemoApp.getMessages();

        var title, icon, url;
        if (screen instanceof DemoApp.Workspace.ScreenData) {
            title = screen.title;
            icon = screen.icon16;
            url = screen.sourceUrl;
        } else {
            title = screen;
            icon = null;
            url = screen;
        }
    
        Echo.WindowPane.call(this, {
            icon: icon,
            iconInsets: "6px 10px",
            title: this._msg["SourceWindow.TitlePrompt"] + " \"" + title + "\"",
            styleName: DemoApp.pref.windowStyleName,
            width: "50em",
            height: "40em",
            maximizeEnabled: true,
            events: {
                close: function(e) {
                    e.source.parent.remove(e.source);
                }
            },
            children: [
                new DemoApp.SourcePane({
                    background: DemoApp.pref.sourceViewerBackground,
                    foreground: DemoApp.pref.sourceViewerForeground,
                    font: { typeface: ["Courier New", "courier", "monospace"] },
                    url: url
                })
            ]
        });
    }
});

