DemoApp.BasicComponentsScreen = Core.extend(Echo.ContentPane, {

    _msg: null,
    _showStyledButton: null,
    _componentsDefault: null,

    $construct: function() {
        var displayModeGroup = Echo.Application.generateUid();
        var primatesGroup = Echo.Application.generateUid();
        this._msg = DemoApp.getMessages(null);
        this._componentsDefault = { };
        
        var listItems = [
            this._msg["BasicComponentsScreen.ListItem.Africa"],
            this._msg["BasicComponentsScreen.ListItem.Antarctica"],
            this._msg["BasicComponentsScreen.ListItem.Asia"],
            this._msg["BasicComponentsScreen.ListItem.Australia"],
            this._msg["BasicComponentsScreen.ListItem.Europe"],
            this._msg["BasicComponentsScreen.ListItem.NorthAmerica"],
            this._msg["BasicComponentsScreen.ListItem.SouthAmerica"]
        ];
        
        Echo.ContentPane.call(this, {
            children: [
                new Echo.SplitPane({
                    styleName: "DefaultResizableLarge",
                    orientation: Echo.SplitPane.ORIENTATION_VERTICAL_BOTTOM_TOP,
                    autoPositioned: true,
                    children: [
                        new Echo.Label({
                            text: this._msg["BasicComponentsScreen.Description"],
                            layoutData: {
                                background: "#fcffc6",
                                insets: "5px 10px"
                            }
                        }),
                        new Echo.SplitPane({
                            orientation: Echo.SplitPane.ORIENTATION_VERTICAL_BOTTOM_TOP,
                            autoPositioned: true,
                            children: [
                                new Echo.Row({
                                    styleName: "ControlPane",
                                    children: [
                                        this._showStyledButton = new Echo.RadioButton({
                                            group: displayModeGroup,
                                            text: this._msg["BasicComponentsScreen.ShowStyled"],
                                            selected: true,
                                            events: {
                                                action: Core.method(this, this._processDisplayModeChange)
                                            }
                                        }),
                                        new Echo.RadioButton({
                                            group: displayModeGroup,
                                            text: this._msg["BasicComponentsScreen.ShowDefault"],
                                            events: {
                                                action: Core.method(this, this._processDisplayModeChange)
                                            }
                                        })
                                    ]
                                }),
                                new Echo.Grid({
                                    styleName: "Layout.Bordered",
                                    layoutData: {
                                        background: "#8eabcc",
                                        insets: "5px 10px"
                                    },
                                    children: [
                                        new Echo.Label({
                                            layoutData: {
                                                backgroundImage: "image/fill/LightBlueLine.png",
                                                columnSpan: 2
                                            },
                                            font: { bold: true, italic: true },
                                            text: this._msg["BasicComponentsScreen.CategoryButton"]
                                        }),
                                        new Echo.Label({
                                            layoutData: {
                                                alignment: "right"
                                            },
                                            text: this._msg["BasicComponentsScreen.ButtonPrompt"]
                                        }),
                                        new Echo.Row({
                                            cellSpacing: 25,
                                            children: [
                                                this._componentsDefault.button1 = new Echo.Button({
                                                    styleName: "Default",
                                                    text: this._msg["BasicComponentsScreen.ButtonText"]
                                                }),
                                                this._componentsDefault.button2 = new Echo.Button({
                                                    styleName: "Default",
                                                    icon: "image/icon/Icon24ArrowRight.png",
                                                    rolloverIcon: "image/icon/Icon24ArrowRightRollover.png"
                                                }),
                                                this._componentsDefault.button3 = new Echo.Button({
                                                    styleName: "Default",
                                                    text: this._msg["BasicComponentsScreen.ButtonText"],
                                                    icon: "image/icon/Icon24ArrowRight.png",
                                                    rolloverIcon: "image/icon/Icon24ArrowRightRollover.png"
                                                })
                                            ]
                                        }),
                                        new Echo.Label({
                                            layoutData: {
                                                alignment: "right"
                                            },
                                            text: this._msg["BasicComponentsScreen.CheckBoxPrompt"]
                                        }),
                                        new Echo.Row({
                                            cellSpacing: 25,
                                            children: [
                                                new Echo.CheckBox({
                                                    text: this._msg["BasicComponentsScreen.CheckBoxJumping"]
                                                }),
                                                new Echo.CheckBox({
                                                    text: this._msg["BasicComponentsScreen.CheckBoxRunning"]
                                                }),
                                                new Echo.CheckBox({
                                                    text: this._msg["BasicComponentsScreen.CheckBoxLaughing"]
                                                })
                                            ]
                                        }),
                                        new Echo.Label({
                                            layoutData: {
                                                alignment: "right"
                                            },
                                            text: this._msg["BasicComponentsScreen.RadioButtonPrompt"]
                                        }),
                                        new Echo.Row({
                                            cellSpacing: 25,
                                            children: [
                                                new Echo.RadioButton({
                                                    group: primatesGroup,
                                                    text: this._msg["BasicComponentsScreen.RadioButtonOrangutan"],
                                                    selected: true
                                                }),
                                                new Echo.RadioButton({
                                                    group: primatesGroup,
                                                    text: this._msg["BasicComponentsScreen.RadioButtonChimpanzee"]
                                                }),
                                                new Echo.RadioButton({
                                                    group: primatesGroup,
                                                    text: this._msg["BasicComponentsScreen.RadioButtonGorilla"]
                                                })
                                            ]
                                        }),
                                        new Echo.Label({
                                            layoutData: {
                                                backgroundImage: "image/fill/LightBlueLine.png",
                                                columnSpan: 2
                                            },
                                            font: { bold: true, italic: true },
                                            text: this._msg["BasicComponentsScreen.CategoryText"]
                                        }),
                                        new Echo.Label({
                                            layoutData: {
                                                alignment: "right"
                                            },
                                            text: this._msg["BasicComponentsScreen.TextFieldPrompt"]
                                        }),
                                        this._componentsDefault.textField = new Echo.TextField({
                                            styleName: "Default",
                                            text: this._msg["BasicComponentsScreen.TextSampleString"],
                                            width: "100%"
                                        }),
                                        new Echo.Label({
                                            layoutData: {
                                                alignment: "right"
                                            },
                                            text: this._msg["BasicComponentsScreen.PasswordFieldPrompt"]
                                        }),
                                        this._componentsDefault.passwordField = new Echo.PasswordField({
                                            styleName: "Default",
                                            text: "!secret!",
                                            width: "100%"
                                        }),
                                        new Echo.Label({
                                            layoutData: {
                                                alignment: "right"
                                            },
                                            text: this._msg["BasicComponentsScreen.TextAreaPrompt"]
                                        }),
                                        this._componentsDefault.textArea = new Echo.TextArea({
                                            styleName: "Default",
                                            text: this._msg["BasicComponentsScreen.TextSampleString"],
                                            width: "100%"
                                        }),
                                        new Echo.Label({
                                            layoutData: {
                                                backgroundImage: "image/fill/LightBlueLine.png",
                                                columnSpan: 2
                                            },
                                            font: { bold: true, italic: true },
                                            text: this._msg["BasicComponentsScreen.CategoryList"]
                                        }),
                                        new Echo.Label({
                                            layoutData: {
                                                alignment: "right"
                                            },
                                            text: this._msg["BasicComponentsScreen.SelectFieldPrompt"]
                                        }),
                                        this._componentsDefault.selectField = new Echo.SelectField({
                                            styleName: "Default",
                                            width: "100%",
                                            items: listItems
                                        }),
                                        new Echo.Label({
                                            layoutData: {
                                                alignment: "right"
                                            },
                                            text: this._msg["BasicComponentsScreen.ListBoxPrompt"]
                                        }),
                                        this._componentsDefault.listBox = new Echo.ListBox({
                                            styleName: "Default",
                                            width: "100%",
                                            items: listItems
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
    
    _processDisplayModeChange: function(e) {
        
        var styled = this._showStyledButton.get("selected");
        for (var name in this._componentsDefault) {
            this._componentsDefault[name].setStyleName(styled ? "Default" : null);
        }
    }
});
