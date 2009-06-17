DemoApp.StyleSheet = new Echo.StyleSheet({
    "ControlPane": {
        "Row": {
            layoutData: {
                backgroundImage: {
                    url: "image/ControlPaneFill.png",
                    y: "50%"
                },
                overflow: Echo.SplitPane.OVERFLOW_HIDDEN
            },
            cellSpacing: 3,
            insets: "0px 9px"
        }
    },
    "ControlPane.Button": {
        "Button": {
            insets: "3px 15px",
            lineWrap: false,
            foreground: "#000000",
            rolloverForeground: "#ffffff",
            rolloverBackground: "#3939d6",
            rolloverBackgroundImage: {
                url: "image/ControlPaneHighlight.png",
                y: "50%"
            },
            rolloverEnabled: true,
            pressedForeground: "#dfffff",
            pressedBackground: "#3939d6",
            pressedBackgroundImage: {
                url: "image/ControlPaneHighlightLight.png",
                y: "50%"
            },
            pressedEnabled: true
        }
    },
    "Default": {
        "AbstractButton": {
            border: "1px outset #709bcd",
            foreground: "#000000",
            backgroundImage: {
                url: "image/InputFieldBackground.png",
                y: "50%"
            },
            pressedBackgroundImage: {
                url: "image/InputFieldBackgroundPressed.png",
                y: "50%"
            },
            pressedBorder: "1px inset #709bcd",
            rolloverBackgroundImage: {
                url: "image/InputFieldBackgroundHighlight.png",
                y: "50%"
            },
            rolloverBorder: "1px outset #bcd6f4",
            pressedEnabled: true,
            rolloverEnabled: true,
            insets: "1px 4px",
            disabledForeground: "#93bed5"
        },
        "AbstractListComponent": {
            border: "2px groove #cfdfff",
            background: "#cfdfff"
        },
        "Extras.AccordionPane": {
            tabBorder: { 
                top: "1px solid #817f88",
                bottom: "1px solid #312f38"
            },
            tabForeground: "#ffffff",
            tabBackground: "#514f58",
            tabBackgroundImage: {
                url: "image/TabBackground.png",
                y: "50%"
            },
            tabRolloverEnabled: true,
            tabRolloverBackground: "#86899a",
            tabRolloverBackgroundImage: {
                url: "image/TabBackgroundRollover.png",
                y: "50%"
            }
        },
        "Extras.CalendarSelect": {
            background: "#6f87af",
            dateBackground: "#bcbcbc",
            dateBackgroundImage: {
                url: "image/CalendarSelectGradient.png",
                repeat: "repeat-x"
            },
            headerForeground: "#ffffff",
            headerBackgroundImage: {
                url: "image/CalendarHeaderBackground.png",
                y: "50%"
            },
            rolloverDateBackground: "#ffffff",
            selectedDateBackground: "#1579c7",
            selectedDateBackgroundImage: "image/CalendarSelectSelectedDateFill.png",
            selectedDateBorder:  {
                left: "1px solid #0e4f82",
                top: "1px solid #0e4f82",
                right: "1px solid #1472bc",
                bottom: "1px solid #1472bc"
            }
        },
        "Extras.ContextMenu": {
            animationTime: 350,
            backgroundImage: {
                url: "image/LightBlueLineBackground.png",
                y: "50%"
            },
            menuBackgroundIamge: "image/LightBlueLineBackground.png",
            menuBorder: {
                top: "1px solid #dfdfef",
                left: "1px solid #dfdfef",
                right: "1px solid #7f7f8f",
                bottom: "1px solid #7f7f8f"
            },
            menuOpacity: 80,
            selectionBackgroundImage: "image/ShadowBackgroundDarkBlue2.png"
        },
        "Extras.DropDownMenu": {
            animationTime: 350,
            backgroundImage: {
                url: "image/LightBlueLineBackground.png",
                y: "50%"
            },
            border: {
                top: "1px solid #dfdfef",
                left: "1px solid #dfdfef",
                right: "1px solid #7f7f8f",
                bottom: "1px solid #7f7f8f"
            },
            insets: "2px 10px",
            menuBackgroundIamge: "image/LightBlueLineBackground.png",
            menuBorder: {
                top: "1px solid #dfdfef",
                left: "1px solid #dfdfef",
                right: "1px solid #7f7f8f",
                bottom: "1px solid #7f7f8f"
            },
            menuOpacity: 80,
            selectionBackgroundImage: "image/ShadowBackgroundDarkBlue2.png"
        },
        "Extras.MenuBarPane": {
            animationTime: 150,
            border: "0px solid #000000",
            backgroundImage: {
                url: "image/PulldownMenuBackground.png",
                y: "50%"
            },
            foreground: "#ffffff",
            menuBackground: "#000000",
            menuOpacity: 92,
            menuBackgroundImage: "image/GreyMenuBackground.png",
            menuBorder: {
                top: "1px solid #3f3f3f",
                left: "1px solid #3f3f3f",
                right: "1px solid #1f1f1f",
                bottom: "1px solid #1f1f1f"
            },
            selectionBackground: "#fffac1",
            selectionBackgroundImage: { 
                url:"image/BeigeLightedBackground.png",
                x: "50%", 
                y: "50%"
            },
            selectionForeground: "#000000"
        },
        "Extras.RichTextArea": {
            controlPaneSplitPaneStyleName: "ControlPane.Container.Bottom",
            controlPaneRowStyleName: "ControlPane",
            controlPaneButtonStyleName: "ControlPane.Button", 
            menuStyleName: "RichTextArea.Menu",
            toolbarButtonStyleName: "RichTextArea.Toolbar",
            toolbarPanelStyleName: "RichTextArea.Toolbar",
            windowPaneStyleName: "Default"
        },
        "TextComponent": {
            background: "#cfdfff",
            border: "2px groove #cfdfff",
            backgroundImage: {
                url: "image/InputFieldBackground.png",
                repeat: "repeat-x",
                y: "50%"
            }
        },
        "WindowPane": {
            ieAlphaRenderBorder: true,
            titleForeground: "#ffffff",
            titleBackground: "#2f2f4f",
            titleInsets: "5px 10px",
            controlsInsets: "-1px 5px",
            closeIcon: "image/window/simple/ControlClose.png",
            closeRolloverIcon: "image/window/simple/ControlCloseRollover.png",
            maximizeIcon: "image/window/simple/ControlMaximize.png",
            maximizeRolloverIcon: "image/window/simple/ControlMaximizeRollover.png",
            minimizeIcon: "image/window/simple/ControlMinimize.png",
            minimizeRolloverIcon: "image/window/simple/ControlMinimizeRollover.png",
            titleBackgroundImage: {
                url: "image/window/simple/Header.png",
                repeat: "repeat-x",
                y: "50%"
            },
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
            }
        }
    },
    "Default.Top": {
        "Extras.TabPane": {
            insets: 0,
            tabIconTextMargin: 3,
            tabCloseIconTextMargin: 8,
            background: "#ffffff",
            tabSpacing: -20,
            border: "1px solid #7f7faf",
            tabActiveBackground: "#ffffff",
            tabActiveBackgroundInsets: "8px 14px 0px 8px",
            tabActiveImageBorder: {
                contentInsets: "8px 14px 0px 8px",
                borderInsets: "17px 23px 0px 17px",
                topLeft: "image/window/simple/BorderTopLeft.png",
                top: "image/window/simple/BorderTop.png",
                topRight: "image/window/simple/BorderTopRight.png",
                left: "image/window/simple/BorderLeft.png",
                right: "image/window/simple/BorderRight.png",
                bottomLeft: null,
                bottom: null,
                bottomRight: null
            },
            tabActiveInsets: "4px 10px",
            tabInactiveBackground: "#e7e7e7",
            tabInactiveBackgroundInsets: "8px 14px 0px 8px",
            tabInactiveImageBorder: {
                contentInsets: "8px 14px 0px 8px",
                borderInsets: "17px 23px 0px 17px",
                topLeft: "image/window/simple/BorderTopLeft.png",
                top: "image/window/simple/BorderTop.png",
                topRight: "image/window/simple/BorderTopRight.png",
                left: "image/window/simple/BorderLeft.png",
                right: "image/window/simple/BorderRight.png",
                bottomLeft: null,
                bottom: null,
                bottomRight: null
            },
            tabInactiveBackgroundImage: {
                url: "image/SilverLightedBackground.png",
                repeat: "repeat-x",
                y: "53%"
            },
            tabInactiveInsets: "4px 10px",
            tabCloseIcon: "image/Icon16TabClose.png",
            tabRolloverEnabled: true,
            tabRolloverForeground: "#ffffff",
            tabRolloverBackgroundImage: {
                url: "image/ControlPaneHighlight.png",
                y: "50%"
            },
            tabRolloverCloseIcon: "image/Icon16TabCloseRollover.png"
        }
    },
    "Default.Top.Surround": {
        "Extras.TabPane": {
            insets: 0,
            tabIconTextMargin: 3,
            tabCloseIconTextMargin: 8,
            background: "#ffffff",
            tabSpacing: -20,
            imageBorder: {
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
            tabActiveBackground: "#ffffff",
            tabActiveBackgroundInsets: "8px 14px 0px 8px",
            tabActiveHeightIncrease: 3,
            tabActiveImageBorder: {
                contentInsets: "8px 14px 0px 8px",
                borderInsets: "17px 23px 0px 17px",
                topLeft: "image/window/simple/BorderTopLeft.png",
                top: "image/window/simple/BorderTop.png",
                topRight: "image/window/simple/BorderTopRight.png",
                left: "image/window/simple/BorderLeft.png",
                right: "image/window/simple/BorderRight.png",
                bottomLeft: null,
                bottom: null,
                bottomRight: null
            },
            tabActiveInsets: "4px 10px",
            tabInactiveBackground: "#e7e7e7",
            tabInactiveBackgroundInsets: "8px 14px 1px 8px",
            tabInactiveImageBorder: {
                contentInsets: "8px 14px 1px 8px",
                borderInsets: "17px 23px 1px 17px",
                topLeft: "image/window/simple/BorderTopLeft.png",
                top: "image/window/simple/BorderTop.png",
                topRight: "image/window/simple/BorderTopRight.png",
                left: "image/window/simple/BorderLeft.png",
                right: "image/window/simple/BorderRight.png",
                bottomLeft: null,
                bottom: null,
                bottomRight: null
            },
            tabInactiveBackgroundImage: {
                url: "image/SilverLightedBackground.png",
                repeat: "repeat-x",
                y: "53%"
            },
            tabInactiveInsets: "4px 10px",
            tabCloseIcon: "image/Icon16TabClose.png",
            tabRolloverEnabled: true,
            tabRolloverForeground: "#ffffff",
            tabRolloverBackgroundImage: {
                url: "image/ControlPaneHighlight.png",
                y: "50%"
            },
            tabRolloverCloseIcon: "image/Icon16TabCloseRollover.png"
        }
    },
    "DefaultResizableLarge": {
        "SplitPane" : {
            separatorHeight: 12,
            separatorWidth: 12,
            resizable: true,
            separatorHorizontalImage: {
                url: "image/SplitPaneHorizontalSeparatorLarge.png",
                y: "50%"
            },
            separatorHorizontalRolloverImage: {
                url: "image/SplitPaneHorizontalSeparatorLargeRollover.png",
                y: "50%"
            },
            separatorVerticalImage: {
                url: "image/SplitPaneVerticalSeparatorLarge.png",
                x: "50%"
            },
            separatorVerticalRolloverImage: {
                url: "image/SplitPaneVerticalSeparatorLargeRollover.png",
                x: "50%"
            }
        }
    },
    "LaunchPanel": {
        "Button": {
            alignment: "center",
            background: "#1f1f1f",
            textAlignment: "center",
            textPosition: "bottom",
            rolloverEnabled: true,
            rolloverBackgroundImage: "image/DemoSelectButtonRolloverBackground.png",
            rolloverBorder: { 
                top: "1px solid #1d1d1d",
                left: "1px solid #1d1d1d",
                bottom: "1px solid #5d5d5d",
                right: "1px solid #5d5d5d"
            },
            backgroundImage: "image/DemoSelectButtonBackground.png",
            foreground: "#ffffff",
            font: { size: "9pt" },
            iconTextMargin: 2,
            insets: 10,
            pressedEnabled: true,
            border: { 
                top: "1px solid #0d0d0d",
                left: "1px solid #0d0d0d",
                bottom: "1px solid #3d3d3d",
                right: "1px solid #3d3d3d"
            },
            pressedBackgroundImage: "image/DemoSelectButtonSelectedBackground.png",
            pressedBorder: {
                top: "1px solid #2b2b2b",
                left: "1px solid #2b2b2b",
                bottom: "1px solid #9e9e9e",
                right: "1px solid #9e9e9e"
            }
        },
        "Column": {
            cellSpacing: 1
        }
    },
    "LaunchPanel.Selected": {
        "Button": {
            alignment: "center",
            textAlignment: "center",
            textPosition: "bottom",
            foreground: "#ffffff",
            backgroundImage: "image/DemoSelectButtonSelectedBackground.png",
            font: { size: "9pt" },
            iconTextMargin: 2,
            insets: 10,
            border: { 
                top: "1px solid #9e9e9e",
                left: "1px solid #9e9e9e",
                bottom: "1px solid #2b2b2b",
                right: "1px solid #2b2b2b"
            }
        }
    },
    "GlassBlue": {
        "WindowPane": {
            ieAlphaRenderBorder: true,
            titleFont: {
                size: "10pt",
                bold: true,
                italic: true
            },
            titleForeground: "#ffffff",
            titleInsets: "5px 10px",
            titleBackgroundImage: {
                url: "image/window/glassblue/Header.png",
                repeat: "repeat-x",
                y: "100%"
            },
            border: {
                contentInsets: "6px 15px 15px 12px",
                borderInsets: "34px 20px 20px 20px",
                topLeft: "image/window/glassblue/BorderTopLeft.png",
                top: "image/window/glassblue/BorderTop.png",
                topRight: "image/window/glassblue/BorderTopRight.png",
                left: "image/window/glassblue/BorderLeft.png",
                right: "image/window/glassblue/BorderRight.png",
                bottomLeft: "image/window/glassblue/BorderBottomLeft.png",
                bottom: "image/window/glassblue/BorderBottom.png",
                bottomRight: "image/window/glassblue/BorderBottomRight.png"
            }
        }
    },
    "GlassBlue2": {
        "WindowPane": {
            ieAlphaRenderBorder: true,
            titleFont: {
                size: "10pt",
                bold: true,
                italic: true
            },
            titleForeground: "#ffffff",
            titleInsets: "5px 10px",
            titleBackgroundImage: {
                url: "image/window/glassblue2/Header.png",
                repeat: "repeat-x",
                y: "100%"
            },
            border: {
                contentInsets: "6px 15px 15px 12px",
                borderInsets: "34px 20px 20px 20px",
                topLeft: "image/window/glassblue2/BorderTopLeft.png",
                top: "image/window/glassblue2/BorderTop.png",
                topRight: "image/window/glassblue2/BorderTopRight.png",
                left: "image/window/glassblue2/BorderLeft.png",
                right: "image/window/glassblue2/BorderRight.png",
                bottomLeft: "image/window/glassblue2/BorderBottomLeft.png",
                bottom: "image/window/glassblue2/BorderBottom.png",
                bottomRight: "image/window/glassblue2/BorderBottomRight.png"
            }
        }
    },
    "Layout.Bordered": {
        "Grid": {
            width: "100%",
            insets: "3px 8px",
            background: "#ffffff",
            border: "2px groove #7ea4d3"
        }
    },
    "Junior": {
        "Extras.ColorSelect": {
            hueWidth: 10,
            saturationHeight: 60,
            valueWidth: 60
        }
    },
    "Photo.Countryside": {
        "ContentPane": {
            backgroundImage: {
                url: "image/bgpictures/Countryside.jpg",
                x: -1,
                y: "100%"
            }
        }
    },
    "Photo.Coral": {
        "ContentPane": {
            backgroundImage: {
                url: "image/bgpictures/Coral.jpg",
                x: 300,
                y: "50%"
            }
        }
    },
    "Photo.EarthEast": {
        "ContentPane": {
            background: "#000000",
            backgroundImage: {
                url: "image/bgpictures/EarthEast.jpg",
                y: "100%",
                repeat: "no-repeat"
            }
        }
    },
    "Photo.EarthWest": {
        "ContentPane": {
            background: "#000000",
            backgroundImage: {
                url: "image/bgpictures/EarthWest.jpg",
                y: "100%",
                repeat: "no-repeat"
            }
        }
    },
    "Photo.Fern": {
        "ContentPane": {
            backgroundImage: {
                url: "image/bgpictures/Fern.jpg",
                x: "50%",
                y: "50%"
            }
        }
    },
    "Photo.Leaf": {
        "ContentPane": {
            backgroundImage: {
                url: "image/bgpictures/Leaf.jpg",
                x: "50%",
                y: "50%"
            }
        }
    },
    "Photo.Moonlight": {
        "ContentPane": {
            backgroundImage: {
                url: "image/bgpictures/Moonlight.jpg",
                x: -1,
                y: -1
            }
        }
    },
    "Photo.Poinsettia": {
        "ContentPane": {
            backgroundImage: {
                url: "image/bgpictures/Poinsettia.jpg",
                x: -1,
                y: "70%"
            }
        }
    },
    "Photo.Winter": {
        "ContentPane": {
            backgroundImage: {
                url: "image/bgpictures/Winter.jpg",
                x: -1,
                y: -1
            }
        }
    },
    "PhotoAlbum": {
        "Button": {
            insets: 3,
            foreground: "#ffffff",
            rolloverEnabled: true,
            rolloverBackground: "#000000",
            rolloverForeground: "#fffed0",
            alignment: "center",
            textAlignment: "center",
            textPosition: "bottom",
            iconTextMargin: 1,
            layoutData: {
                alignment: "center"
            }
        }
    },
    "PreferencesColumn": {
        "Column": {
            border: {
                left: "1px solid #afafaf",
                top: "1px solid #afafaf",
                right: "1px solid #dfdfdf",
                bottom: "1px solid #dfdfdf"
            },
            cellSpacing: 8,
            insets: "8px 20px"
        }
    },
    "PreferencesTitle": {
        "Label": {
            foreground: "#2f2faf",
            font: { bold: true }
        }
    },
    "RichTextArea.Menu": {
        "Extras.MenuBarPane": {
            border: "0px solid #000000",
            backgroundImage: {
                url: "image/RichTextMenuBackground.png",
                repeat: "x",
                y: "100%"
            },
            menuBackgroundImage: "image/LightBlueLineBackground.png",
            selectionBackgroundImage: "image/ShadowBackgroundDarkBlue2.png"
        }
    },
    "RichTextArea.Toolbar": {
        "Button": {
            background: "#abcdef",
            backgroundImage: "image/RichTextToolbarBackground.png",
            foreground: "#000000",
            border: "1px outset #cfcfdf",
            rolloverEnabled: true,
            rolloverBackgroundImage: "image/RichTextMenuBackground.png",
            rolloverBorder: "1px outset #efefff",
            pressedEnabled: true,
            pressedBorder: "1px inset #afafbf",
            insets: "1px 3px"
        },
        "Panel": {
            backgroundImage: {
                url: "image/RichTextToolbarBackground.png",
                y: "50%"
            }
        }
    },
    "TransGreen": {
        "WindowPane": {
            ieAlphaRenderBorder: true,
            titleFont: {
                size: "10pt",
                bold: true,
                italic: true
            },
            titleForeground: "#ffffff",
            titleInsets: "5px 10px",
            titleBackgroundImage: {
                url: "image/window/transgreen/Header.png",
                repeat: "repeat-x",
                y: 0
            },
            border: {
                contentInsets: "6px 15px 15px 12px",
                borderInsets: "34px 20px 20px 20px",
                topLeft: "image/window/transgreen/BorderTopLeft.png",
                top: "image/window/transgreen/BorderTop.png",
                topRight: "image/window/transgreen/BorderTopRight.png",
                left: "image/window/transgreen/BorderLeft.png",
                right: "image/window/transgreen/BorderRight.png",
                bottomLeft: "image/window/transgreen/BorderBottomLeft.png",
                bottom: "image/window/transgreen/BorderBottom.png",
                bottomRight: "image/window/transgreen/BorderBottomRight.png"
            }
        }
    }
});
