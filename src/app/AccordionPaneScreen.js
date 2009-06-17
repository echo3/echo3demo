DemoApp.AccordionPaneScreen = Core.extend(Echo.ContentPane, {

    _photoBrowser: null,
    _msg: null,
    
    $construct: function() {
        this._msg = DemoApp.getMessages(null);
        Echo.ContentPane.call(this, {
            backgroundImage: {
                url:"image/bgpictures/Airplane.jpg",
                x: 0,
                y: "50%"
            },
            children: [
                new Echo.SplitPane({
                    orientation: Echo.SplitPane.ORIENTATION_VERTICAL_TOP_BOTTOM,
                    separatorPosition: 100,
                    children: [
                        new Echo.Column({
                            layoutData: {
                                insets: "15px 15px 15px 240px"
                            },
                            children: [
                                new Echo.Label({
                                    foreground: "#ffffff",
                                    text: this._msg["AccordionPaneScreen.Description"]
                                })
                            ]
                        }),
                        new Echo.SplitPane({
                            orientation: Echo.SplitPane.ORIENTATION_HORIZONTAL_LEFT_RIGHT,
                            separatorPosition: 220,
                            children: [
                                new Echo.Column({
                                    layoutData: {
                                        insets: 20,
                                        backgroundImage: "image/bgpictures/SunsetRepeatBright.jpg"
                                    },
                                    border: "1px solid #000000",
                                    background: "#cfcfff",
                                    insets: 20,
                                    children: [
                                        new Echo.Label({
                                            text: this._msg["AccordionPaneScreen.Animation"]
                                        })
                                    ]
                                }),
                                new Echo.Label({
                                    layoutData: {
                                        backgroundImage: {
                                            url: "image/bgpictures/SunsetRepeat.jpg",
                                            x: 220,
                                            y: 0
                                        }
                                    }
                                })
                            ]
                        })
                    ]
                }),
                new Echo.WindowPane({
                    styleName: "GlassBlue",
                    width: 650,
                    height: 500,
                    positionX: 235,
                    positionY: 155,
                    maximizeEnabled: true,
                    title: "Photo Album",
                    closable: false,
                    children: [
                        this._photoBrowser = new DemoApp.AccordionPaneScreen.PhotoBrowser()
                    ]
                })
            ]
        });
        
        var thumb = "image/photoalbum/120/";
        var photo = "image/photoalbum/480/";
        
        var column;

        column = this._photoBrowser.addCategory("Nature");
        this._photoBrowser.addPhoto(column, "American Marigold", thumb + "AmericanMarigold.jpg", photo + "AmericanMarigold.jpg");
        this._photoBrowser.addPhoto(column, "Daisy", thumb + "Daisy.jpg", photo + "Daisy.jpg");
        this._photoBrowser.addPhoto(column, "FlowerBuds", thumb + "FlowerBuds.jpg", photo + "FlowerBuds.jpg");
        this._photoBrowser.addPhoto(column, "Holly", thumb + "Holly.jpg", photo + "Holly.jpg");
        this._photoBrowser.addPhoto(column, "Mushroom", thumb + "Mushroom.jpg", photo + "Mushroom.jpg");
        this._photoBrowser.addPhoto(column, "Rose", thumb + "Rose.jpg", photo + "Rose.jpg");
        this._photoBrowser.addPhoto(column, "Thistle with Bumblebee", thumb + "ThistleWithBumblebee.jpg", 
                photo + "ThistleWithBumblebee.jpg");
        
        column = this._photoBrowser.addCategory("Architecture");
        this._photoBrowser.addPhoto(column, "Cathedral Of Sevilla", thumb + "CathedralOfSevilla.jpg", 
                photo + "CathedralOfSevilla.jpg");
        this._photoBrowser.addPhoto(column, "Gate at Fountains Abbey", thumb + "FountainsAbbeyGate.jpg", 
                photo + "FountainsAbbeyGate.jpg");
        this._photoBrowser.addPhoto(column, "Fountains Abbey", thumb + "FountainsAbbey.jpg", photo + "FountainsAbbey.jpg");
        this._photoBrowser.addPhoto(column, "Hluboka Castle", thumb + "HlubokaCastle.jpg", photo + "HlubokaCastle.jpg");
        this._photoBrowser.addPhoto(column, "Statue in Cesky Krumlov", thumb + "StatueInCeskyKrumlov.jpg", 
                photo + "StatueInCeskyKrumlov.jpg");
        this._photoBrowser.addPhoto(column, "Tower", thumb + "Tower.jpg", photo + "Tower.jpg");
        this._photoBrowser.addPhoto(column, "Whitby Abbey (1)", thumb + "WhitbyAbbey.jpg", photo + "WhitbyAbbey.jpg");
        this._photoBrowser.addPhoto(column, "Whitby Abbey (2)", thumb + "WhitbyAbbey2.jpg", photo + "WhitbyAbbey2.jpg");

        column = this._photoBrowser.addCategory("Landscape");
        this._photoBrowser.addPhoto(column, "Coast", thumb + "Coast.jpg", photo + "Coast.jpg");
        this._photoBrowser.addPhoto(column, "Limestone Rocks", thumb + "LimestoneRocks.jpg", photo + "LimestoneRocks.jpg");
        this._photoBrowser.addPhoto(column, "Pasture", thumb + "Pasture.jpg", photo + "Pasture.jpg");
        this._photoBrowser.addPhoto(column, "Road to the Mountains", thumb + "RoadToTheMountains.jpg", 
                photo + "RoadToTheMountains.jpg");
        this._photoBrowser.addPhoto(column, "Sunrise", thumb + "Sunrise.jpg", photo + "Sunrise.jpg");
        this._photoBrowser.addPhoto(column, "Tree on Coast", thumb + "TreeOnCoast.jpg", photo + "TreeOnCoast.jpg");
        this._photoBrowser.addPhoto(column, "Valley Gardens", thumb + "ValleyGardens.jpg", photo + "ValleyGardens.jpg");
    }
});

DemoApp.AccordionPaneScreen.PhotoBrowser = Core.extend(Echo.SplitPane, {

    _displayPane: null,
    _accordion: null,
    _images: null,
    _activeButton: null,
    _firstPhoto: true,

    $construct: function() {
        this._images = {};
        Echo.SplitPane.call(this, {
            styleName: "DefaultResizableLarge",
            separatorPosition: 140,
            resizable: true,
            children: [
                this._accordion = new Extras.AccordionPane({
                    background: "#494857",
                    tabBackgroundImage: {
                        url: "image/fill/InputField.png",
                        y: "50%"
                    },
                    tabRolloverBackgroundImage: {
                        url: "image/fill/InputFieldHighlight.png",
                        y: "50%"
                    }
                }),
                this._displayPane = new Extras.TransitionPane({
                    layoutData: {
                        background: "#000000"
                    },
                    type: Extras.TransitionPane.TYPE_CAMERA_PAN_DOWN              
                })
            ]
        });
    },
    
    addCategory: function(name) {
        var column = new Echo.Column({
            layoutData: {
                title: name
            }
        });
        this._accordion.add(column);
        return column;
    },
    
    addPhoto: function(containerColumn, name, thumbnailUrl, photoUrl) {
        var id = Echo.Application.generateUid();
        this._images[id] = photoUrl;
        
        var button = new Echo.Button({
            actionCommand: id,
            styleName: "PhotoAlbum",
            text: name,
            icon: thumbnailUrl,
            events: {
                action: Core.method(this, this._displayPhoto)
            }
        });
        
        containerColumn.add(button);
        
        if (this._firstPhoto) {
            this._setPhoto(photoUrl);
            this._firstPhoto = false;
            this._activeButton = button;
        }
    },
    
    _displayPhoto: function(e) {
        var oldButton = this._activeButton;
        var newButton = e.source;

        if (oldButton == null) {
            this._displayPane.set("type", Extras.TransitionPane.TYPE_FADE); 
        } else if (oldButton == newButton) {
            return;
        } else if (oldButton.parent == newButton.parent) {
            if (oldButton.parent.indexOf(oldButton) > oldButton.parent.indexOf(newButton)) {
                this._displayPane.set("type", Extras.TransitionPane.TYPE_CAMERA_PAN_UP); 
            } else {
                this._displayPane.set("type", Extras.TransitionPane.TYPE_CAMERA_PAN_DOWN); 
            }
        } else {
            this._displayPane.set("type", Extras.TransitionPane.TYPE_FADE); 
        }
    
        this._setPhoto(this._images[e.actionCommand]);
        
        this._activeButton = newButton;
    },
    
    _setPhoto: function(imageUrl) {
        this._displayPane.removeAll();
        this._displayPane.add(new Echo.ContentPane({
            background: "#000000",
            backgroundImage: {
                url: imageUrl,
                x: "50%",
                y: "50%",
                repeat: "no-repeat"
            }
        }));
    }
});
