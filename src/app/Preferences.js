/**
 * Dialog for editing user application preferences.
 */
DemoApp.PreferencesDialog = Core.extend(Echo.WindowPane, {

    _transitionsEnabled: null,
    _sourceViewerForeground: null,
    _sourceViewerBackground: null,
    _windowStyleNameSelect: null,
    
    $construct: function() {
        this._msg = DemoApp.getMessages();
        var groupAnimatedScreenTransitions = Echo.Application.generateUid();
            
        Echo.WindowPane.call(this, {
            styleName: DemoApp.pref.windowStyleName,
            modal: true,
            width: "40em",
            title: this._msg["PrefDialog.WindowTitle"],
            icon: "image/icon/Icon16Preferences.png",
            iconInsets: "6px 10px",
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
                        new Echo.Column({
                            insets: "10px 30px",
                            cellSpacing: 15,
                            children: [
                                new Echo.Column({
                                    styleName: "PreferencesColumn",
                                    children: [
                                        new Echo.Label({
                                            styleName: "PreferencesTitle",
                                            text: this._msg["PrefDialog.PromptAnimations"]
                                        }),
                                        new Echo.Row({
                                            cellSpacing: 40,
                                            children: [
                                                this._transitionsEnabled = new Echo.RadioButton({
                                                    group: groupAnimatedScreenTransitions,
                                                    text: this._msg["Generic.Enabled"],
                                                    selected: DemoApp.pref.transitionsEnabled
                                                }),
                                                new Echo.RadioButton({
                                                    group: groupAnimatedScreenTransitions,
                                                    text: this._msg["Generic.Disabled"],
                                                    selected: !DemoApp.pref.transitionsEnabled
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new Echo.Column({
                                    styleName: "PreferencesColumn",
                                    children: [
                                        new Echo.Label({
                                            styleName: "PreferencesTitle",
                                            text: this._msg["PrefDialog.PromptWindowAppearance"]
                                        }),
                                        this._windowStyleNameSelect = new Echo.SelectField({
                                            items: [
                                                { id: "Default", text: this._msg["PrefDialog.WindowStyle.BlueShadow"] },
                                                { id: "GlassBlue2", text: this._msg["PrefDialog.WindowStyle.GlassBlueDark"] },
                                                { id: "GlassBlue", text: this._msg["PrefDialog.WindowStyle.GlassBlueLight"] },
                                                { id: "TransGreen", text: this._msg["PrefDialog.WindowStyle.TransGreen"] },
                                                { id: "None", text: this._msg["PrefDialog.WindowStyle.Default"] }
                                            ],
                                            selectedId: DemoApp.pref.windowStyleName == null ? "None" : DemoApp.pref.windowStyleName
                                        })
                                    ]
                                }),
                                new Echo.Column({
                                    styleName: "PreferencesColumn",
                                    children: [
                                        new Echo.Label({
                                            styleName: "PreferencesTitle",
                                            text: this._msg["PrefDialog.PromptSourceViewerColors"]
                                        }),
                                        new Echo.Row({
                                            cellSpacing: 40,
                                            children: [
                                                new Echo.Row({
                                                    cellSpacing: 10,
                                                    children: [
                                                        new Echo.Label({
                                                            text: this._msg["PrefDialog.PromptForeground"]
                                                        }),
                                                        this._sourceViewerForeground = new DemoApp.ColorSelectButton(
                                                                DemoApp.pref.sourceViewerForeground)
                                                    ]
                                                }),
                                                new Echo.Row({
                                                    cellSpacing: 10,
                                                    children: [
                                                        new Echo.Label({
                                                            text: this._msg["PrefDialog.PromptBackground"]
                                                        }),
                                                        this._sourceViewerBackground = new DemoApp.ColorSelectButton(
                                                                DemoApp.pref.sourceViewerBackground)
                                                    ]
                                                })
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
    
    _apply: function(e) {
        DemoApp.pref.windowStyleName = this._windowStyleNameSelect.get("selectedId") == "None" ?
                null : this._windowStyleNameSelect.get("selectedId");
        DemoApp.pref.transitionsEnabled = this._transitionsEnabled.get("selected");
        DemoApp.pref.sourceViewerBackground = this._sourceViewerBackground.color;
        DemoApp.pref.sourceViewerForeground = this._sourceViewerForeground.color;
        this.parent.remove(this);
    },
    
    _close: function(e) {
        this.parent.remove(this);
    }
});
