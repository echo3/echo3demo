// FIXME TriCellTable orientations
// FIXME alignment

/**
 * Component rendering peer: Button
 */
Echo.Sync.Button = Core.extend(Echo.Render.ComponentSync, {

    $static: {
        _createPrototypeButton: function() {
            var div = document.createElement("div");
            div.tabIndex = "0";
            div.style.outlineStyle = "none";
            div.style.cursor = "pointer";
            return div;
        },

        _defaultIconTextMargin: 5
    },
    
    $load: function() {
        this._prototypeButton = this._createPrototypeButton();
        Echo.Render.registerPeer("Button", this);
    },
    
    _prototypeButton: null,
    
    _processRolloverExitRef: null,
    
    _processInitEventRef: null,
    
    $construct: function() { 
        this._processInitEventRef = Core.method(this, this._processInitEvent);
    },
    
    $virtual: {
        
        doAction: function() {
            this.component.doAction();
        },
        
        renderContent: function() {
            var text = this.component.render("text");
            var icon = Echo.Sync.getEffectProperty(this.component, "icon", "disabledIcon", !this._enabled);
            if (text != null) {
                if (icon) {
                    // Text and icon.
                    var iconTextMargin = this.component.render("iconTextMargin", 
                            Echo.Sync.Button._defaultIconTextMargin);
                    var orientation = Echo.Sync.TriCellTable.getOrientation(this.component, "textPosition");
                    var tct = new Echo.Sync.TriCellTable(orientation, 
                            Echo.Sync.Extent.toPixels(iconTextMargin));
                    this._renderButtonText(tct.tdElements[0], text);
                    this._iconImg = this._renderButtonIcon(tct.tdElements[1], icon);
                    this._div.appendChild(tct.tableElement);
                } else {
                    // Text only.
                    this._renderButtonText(this._div, text);
                }
            } else if (icon) {
                // Icon only.
                this._iconImg = this._renderButtonIcon(this._div, icon);
            }
        }
    },
    
    /**
     * Registers listners on the button.  This method is invoked lazily, i.e., the first time the button
     * is focused or moused over.  The initial focus/mouseover listeners are removed by this method.
     * This strategy is used for performance reasons due to the fact that many buttons may be present 
     * on the screen, and each button has many event listeners.
     */
    _addEventListeners: function() {
        this._processRolloverExitRef = Core.method(this, this._processRolloverExit);
    
        // Remove initialization listeners.
        Core.Web.Event.remove(this._div, "focus", this._processInitEventRef);
        Core.Web.Event.remove(this._div, "mouseover", this._processInitEventRef);
        
        Core.Web.Event.add(this._div, "click", Core.method(this, this._processClick), false);
        Core.Web.Event.add(this._div, "keypress", Core.method(this, this._processKeyPress), false);
        if (this.component.render("rolloverEnabled")) {
            var mouseEnterLeaveSupport = Core.Web.Env.PROPRIETARY_EVENT_MOUSE_ENTER_LEAVE_SUPPORTED;
            var enterEvent = mouseEnterLeaveSupport ? "mouseenter" : "mouseover";
            var exitEvent = mouseEnterLeaveSupport ? "mouseleave" : "mouseout";
            Core.Web.Event.add(this._div, enterEvent, 
                    Core.method(this, this._processRolloverEnter), false);
            Core.Web.Event.add(this._div, exitEvent, 
                    Core.method(this, this._processRolloverExit), false);
        }
        if (this.component.render("pressedEnabled")) {
            Core.Web.Event.add(this._div, "mousedown", Core.method(this, this._processPress), false);
            Core.Web.Event.add(this._div, "mouseup", Core.method(this, this._processRelease), false);
        }
        Core.Web.Event.add(this._div, "focus", Core.method(this, this._processFocus), false);
        Core.Web.Event.add(this._div, "blur", Core.method(this, this._processBlur), false);
        
        Core.Web.Event.Selection.disable(this._div);
    },
    
    getFocusFlags: function() {
        return Echo.Render.ComponentSync.FOCUS_PERMIT_ARROW_ALL;
    },
    
    _processBlur: function(e) {
        if (!this.client.verifyInput(this.component)) {
            return;
        }
        this._setFocusState(false);
    },
    
    _processClick: function(e) {
        if (!this.client.verifyInput(this.component)) {
            return;
        }
        this.component.application.setFocusedComponent(this.component);
        this.doAction();
    },
    
    _processFocus: function(e) {
        if (!this.client.verifyInput(this.component)) {
            return;
        }
        this._setFocusState(true);
    },
    
    /**
     * Initial focus/mouseover listener.
     * This listener is invoked the FIRST TIME the button is focused or moused over.
     * It invokes the addListeners() method to lazily add the full listener set to the button.
     */
    _processInitEvent: function(e) {
        this._addEventListeners();
        switch (e.type) {
        case "focus":
            this._processFocus(e);
            break;
        case "mouseover":
            if (this.component.render("rolloverEnabled")) {
                this._processRolloverEnter(e);
            }
            break;
        }
    },
    
    _processKeyPress: function(e) {
        if (!this.client.verifyInput(this.component)) {
            return true;
        }
        if (e.keyCode == 13) { // FIXME This will fail in IE (I think)
            this.doAction();
            return false;
        } else {
            return true;
        }
    },
    
    _processPress: function(e) {
        if (!this.client.verifyInput(this.component)) {
            return;
        }
        Core.Web.DOM.preventEventDefault(e);
        this._setPressedState(true);
    },
    
    _processRelease: function(e) {
        if (!this.client.verifyInput(this.component)) {
            return;
        }
        this._setPressedState(false);
    },
    
    _processRolloverEnter: function(e) {
        if (!this.client.verifyInput(this.component) || Core.Web.dragInProgress) {
            return;
        }
        this.component.application.addListener("focus", this._processRolloverExitRef);
        this._setRolloverState(true);
    },
    
    _processRolloverExit: function(e) {
        if (!this.client.verifyInput(this.component)) {
            return;
        }
        if (this._processRolloverExitRef) {
            this.component.application.removeListener("focus", this._processRolloverExitRef);
        }
        this._setRolloverState(false);
    },
    
    renderAdd: function(update, parentElement) {
        this._enabled = this.component.isRenderEnabled();
        
        this._div = Echo.Sync.Button._prototypeButton.cloneNode(false); 
        this._div.id = this.component.renderId;
    
        if (this._enabled) {
            Echo.Sync.Color.render(this.component.render("foreground"), this._div, "color");
            Echo.Sync.Color.render(this.component.render("background"), this._div, "backgroundColor");
            Echo.Sync.Border.render(this.component.render("border"), this._div);
            Echo.Sync.Font.render(this.component.render("font"), this._div);
            Echo.Sync.FillImage.render(this.component.render("backgroundImage"), this._div);
        } else {
            Echo.Sync.Color.render(Echo.Sync.getEffectProperty(this.component, "foreground", "disabledForeground", true), 
                    this._div, "color");
            Echo.Sync.Color.render(Echo.Sync.getEffectProperty(this.component, "background", "disabledBackground", true), 
                    this._div, "backgroundColor");
            Echo.Sync.Border.render(Echo.Sync.getEffectProperty(this.component, "border", "disabledBorder", true), 
                    this._div);
            Echo.Sync.Font.render(Echo.Sync.getEffectProperty(this.component, "font", "disabledFont", true), 
                    this._div);
            Echo.Sync.FillImage.render(Echo.Sync.getEffectProperty(this.component, 
                    "backgroundImage", "disabledBackgroundImage", true), this._div);
        }
        
        Echo.Sync.Insets.render(this.component.render("insets"), this._div, "padding");
        Echo.Sync.Alignment.render(this.component.render("alignment"), this._div, true, this.component);
        
        var toolTipText = this.component.render("toolTipText");
        if (toolTipText) {
            this._div.title = toolTipText;
        }
        var width = this.component.render("width");
        if (width) {
            this._div.style.width = Echo.Sync.Extent.toCssValue(width, true, true);
        }
        var height = this.component.render("height");
        if (height) {
            this._div.style.height = Echo.Sync.Extent.toCssValue(height, false);
            this._div.style.overflow = "hidden";
        }
        
        this.renderContent();
        
        if (this._enabled) {
            // Add event listeners for focus and mouseover.  When invoked, these listeners will register the full gamut
            // of button event listeners.  There may be a large number of such listeners depending on how many effects
            // are enabled, and as such we do this lazily for performance reasons.
            Core.Web.Event.add(this._div, "focus", this._processInitEventRef, false);
            Core.Web.Event.add(this._div, "mouseover", this._processInitEventRef, false);
        }
    
        parentElement.appendChild(this._div);
    },
    
    _renderButtonText: function(element, text) {
        var textAlignment = this.component.render("textAlignment") 
        if (textAlignment) {
            Echo.Sync.Alignment.render(textAlignment, element, true, this.component);
        }
        element.appendChild(document.createTextNode(text));
        if (!this.component.render("lineWrap", true)) {
            element.style.whiteSpace = "nowrap";
        }
    },
    
    _renderButtonIcon: function(element, icon) {
        var alignment = this.component.render("alignment") 
        if (alignment) {
            Echo.Sync.Alignment.render(alignment, element, true, this.component);
        }
        var imgElement = document.createElement("img");
        Echo.Sync.ImageReference.renderImg(icon, imgElement);
        element.appendChild(imgElement);
        return imgElement;
    },
    
    renderDispose: function(update) {
        if (this._processRolloverExitRef) {
            this.client.application.removeListener("focus", this._processRolloverExitRef);
        }
        Core.Web.Event.removeAll(this._div);
        this._iconImg = null;
    },

    renderFocus: function() {
        Core.Web.DOM.focusElement(this._div);
        this._setFocusState(true);
    },
    
    renderUpdate: function(update) {
        var element = this._div;
        var containerElement = element.parentNode;
        this.renderDispose(update);
        containerElement.removeChild(element);
        this.renderAdd(update, containerElement);
        return false; // Child elements not supported: safe to return false.
    },
    
    _setFocusState: function(focusState) {
        if (!this.component.render("focusedEnabled")) {
            // Render default focus aesthetic.
            var background = this.component.render("background");
            if (background != null) {
                var newBackground = focusState ? Echo.Sync.Color.adjust(background, 0x20, 0x20, 0x20) : background;
                Echo.Sync.Color.render(newBackground, this._div, "backgroundColor");
            }
            return;
        } else {
            var foreground = Echo.Sync.getEffectProperty(this.component, "foreground", "focusedForeground", focusState);
            var background = Echo.Sync.getEffectProperty(this.component, "background", "focusedBackground", focusState);
            var backgroundImage = Echo.Sync.getEffectProperty(
                    this.component, "backgroundImage", "focusedBackgroundImage", focusState);
            var font = Echo.Sync.getEffectProperty(this.component, "font", "focusedFont", focusState);
            var border = Echo.Sync.getEffectProperty(this.component, "border", "focusedBorder", focusState);
            
            Echo.Sync.Color.renderClear(foreground, this._div, "color");
            Echo.Sync.Color.renderClear(background, this._div, "backgroundColor");
            Echo.Sync.FillImage.renderClear(backgroundImage, this._div, "backgroundColor");
            Echo.Sync.Font.renderClear(font, this._div);
            Echo.Sync.Border.renderClear(border, this._div);
        
            if (this._iconImg) {
                var iconUrl = Echo.Sync.ImageReference.getUrl(
                        Echo.Sync.getEffectProperty(this.component, "icon", "focusedIcon", focusState));
                if (iconUrl != this._iconImg.src) {
                    this._iconImg.src = iconUrl;
                }
            }
        }
    },
    
    _setPressedState: function(pressedState) {
        var foreground = Echo.Sync.getEffectProperty(this.component, "foreground", "pressedForeground", pressedState);
        var background = Echo.Sync.getEffectProperty(this.component, "background", "pressedBackground", pressedState);
        var backgroundImage = Echo.Sync.getEffectProperty(
                this.component, "backgroundImage", "pressedBackgroundImage", pressedState);
        var font = Echo.Sync.getEffectProperty(this.component, "font", "pressedFont", pressedState);
        var border = Echo.Sync.getEffectProperty(this.component, "border", "pressedBorder", pressedState);
        
        Echo.Sync.Color.renderClear(foreground, this._div, "color");
        Echo.Sync.Color.renderClear(background, this._div, "backgroundColor");
        Echo.Sync.FillImage.renderClear(backgroundImage, this._div, "backgroundColor");
        Echo.Sync.Font.renderClear(font, this._div);
        Echo.Sync.Border.renderClear(border, this._div);
        
        if (this._iconImg) {
            var iconUrl = Echo.Sync.ImageReference.getUrl(
                    Echo.Sync.getEffectProperty(this.component, "icon", "pressedIcon", pressedState));
            if (iconUrl != this._iconImg.src) {
                this._iconImg.src = iconUrl;
            }
        }
    },
    
    _setRolloverState: function(rolloverState) {
        var foreground = Echo.Sync.getEffectProperty(this.component, "foreground", "rolloverForeground", rolloverState);
        var background = Echo.Sync.getEffectProperty(this.component, "background", "rolloverBackground", rolloverState);
        var backgroundImage = Echo.Sync.getEffectProperty(
                this.component, "backgroundImage", "rolloverBackgroundImage", rolloverState);
        var font = Echo.Sync.getEffectProperty(this.component, "font", "rolloverFont", rolloverState);
        var border = Echo.Sync.getEffectProperty(this.component, "border", "rolloverBorder", rolloverState);
        
        Echo.Sync.Color.renderClear(foreground, this._div, "color");
        Echo.Sync.Color.renderClear(background, this._div, "backgroundColor");
        Echo.Sync.FillImage.renderClear(backgroundImage, this._div, "backgroundColor");
        Echo.Sync.Font.renderClear(font, this._div);
        Echo.Sync.Border.renderClear(border, this._div);
    
        if (this._iconImg) {
            var iconUrl = Echo.Sync.ImageReference.getUrl(
                    Echo.Sync.getEffectProperty(this.component, "icon", "rolloverIcon", rolloverState));
            if (iconUrl != this._iconImg.src) {
                this._iconImg.src = iconUrl;
            }
        }
    }
});

/**
 * Component rendering peer: ToggleButton
 */
Echo.Sync.ToggleButton = Core.extend(Echo.Sync.Button, {
    
    $load: function() {
        Echo.Render.registerPeer("ToggleButton", this);
    },
    
    _selected: false,

    _stateElement: null,
    
    $abstract: {
        createStateElement: function() { },
    
        updateStateElement: function() { }
    },
    
    $virtual: {
        doAction: function() {
            this.setSelected(!this._selected);
            Echo.Sync.Button.prototype.doAction.call(this);
        }
    },
    
    renderAdd: function(update, parentElement) {
        this._selected = this.component.render("selected");
        
        Echo.Sync.Button.prototype.renderAdd.call(this, update, parentElement);
    },
    
    getStateIcon: function() {
        var icon;
        if (this._selected) {
            icon = Echo.Sync.getEffectProperty(this.component, "selectedStateIcon", "disabledSelectedStateIcon", 
                    !this._enabled);
        }
        if (!icon) {
            icon = Echo.Sync.getEffectProperty(this.component, "stateIcon", "disabledStateIcon", !this._enabled);
        }
        return icon;
    },
    
    renderContent: function() {
        var text = this.component.render("text");
        var icon = this.component.render("icon");
        this._stateElement = this.createStateElement();
        
        var entityCount = (text ? 1 : 0) + (icon ? 1 : 0) + (this._stateElement ? 1 : 0);
        if (entityCount == 1) {
            if (text != null) {
                this._renderButtonText(this._div, text);
            } else if (icon) {
                this._iconImg = this._renderButtonIcon(this._div, icon);
            } else {
                this._div.appendChild(this._stateElement);
            }
        } else if (entityCount == 2) {
            var orientation = Echo.Sync.TriCellTable.getOrientation(this.component, "textPosition");
            var margin;
            if (this._stateElement) {
                margin = this.component.render("stateMargin", Echo.Sync.Button._defaultIconTextMargin);
            } else {
                margin = this.component.render("iconTextMargin", Echo.Sync.Button._defaultIconTextMargin);
            }
            var tct = new Echo.Sync.TriCellTable(orientation, Echo.Sync.Extent.toPixels(margin));
            if (text != null) {
                this._renderButtonText(tct.tdElements[0], text);
                if (icon) {
                    this._iconImg = this._renderButtonIcon(tct.tdElements[1], icon);
                } else {
                    tct.tdElements[1].appendChild(this._stateElement);
                }
            } else {
                this._iconImg = this._renderButtonIcon(tct.tdElements[0], icon);
                tct.tdElements[1].appendChild(this._stateElement);
            }
            this._div.appendChild(tct.tableElement);
        } else if (entityCount == 3) {
            var orientation = Echo.Sync.TriCellTable.getOrientation(this.component, "textPosition");
            var margin = this.component.render("iconTextMargin", Echo.Sync.Button._defaultIconTextMargin);
            var stateOrientation = Echo.Sync.TriCellTable.TRAILING_LEADING;
            var stateMargin = this.component.render("stateMargin", Echo.Sync.Button._defaultIconTextMargin);
            var tct = new Echo.Sync.TriCellTable(orientation, 
                Echo.Sync.Extent.toPixels(margin), stateOrientation, Echo.Sync.Extent.toPixels(stateMargin));
            this._renderButtonText(tct.tdElements[0], text);
            this._iconImg = this._renderButtonIcon(tct.tdElements[1], icon);
            tct.tdElements[2].appendChild(this._stateElement);
            this._div.appendChild(tct.tableElement);
        }
    },
    
    renderDispose: function(update) {
        Echo.Sync.Button.prototype.renderDispose.call(this, update);
        if (this._stateElement) {
            Core.Web.Event.removeAll(this._stateElement);
            this._stateElement = null;
        }
    },
    
    /**
     * Selects or deselects this button.
     * 
     * @param newState {Boolean} the new selection state
     */
    setSelected: function(newState) {
        if (this._selected == newState) {
            return;
        }
        this._selected = newState;
        this.component.set("selected", newState);
        
        this.updateStateElement();
    }
});

/**
 * Component rendering peer: CheckBox
 */
Echo.Sync.CheckBox = Core.extend(Echo.Sync.ToggleButton, {
    
    $load: function() {
        Echo.Render.registerPeer("CheckBox", this);
    },
    
    createStateElement: function() {
        var stateIcon = this.getStateIcon();
        var stateElement;
        if (stateIcon) {
            stateElement = document.createElement("img");
            Echo.Sync.ImageReference.renderImg(stateIcon, stateElement);
        } else {
            stateElement = document.createElement("input");
            stateElement.type = "checkbox";
            stateElement.defaultChecked = this._selected ? true : false;
            Core.Web.Event.add(stateElement, "change", Core.method(this, this._processStateChange), false);
        }
        return stateElement;
    },
    
    _processStateChange: function(e) {
        this.updateStateElement();
    },
        
    updateStateElement: function() {
        var stateIcon = this.getStateIcon();
        if (stateIcon) {
            this._stateElement.src = Echo.Sync.ImageReference.getUrl(stateIcon);
        } else {
            this._stateElement.checked = this._selected ? true : false;
        }
    }
});

/**
 * Component rendering peer: RadioButton
 */
Echo.Sync.RadioButton = Core.extend(Echo.Sync.ToggleButton, {

    $static: {
    
        _nextNameId: 0,
        
        /**
         * Contains mappings from RadioButton render ids to Echo.Sync.RadioButton.Group objects.
         * 
         * @type Core.Arrays.LargeMap
         */
        _groups: new Core.Arrays.LargeMap()
    },

    $load: function() {
        Echo.Render.registerPeer("RadioButton", this);;
    },
    
    _group: null,

    $construct: function() {
        Echo.Sync.ToggleButton.call(this);
    },

    doAction: function() {
        if (this._group) {
            this._group.deselect();
        }
        Echo.Sync.ToggleButton.prototype.doAction.call(this);
    },
    
    renderAdd: function(update, parentElement) {
        var groupId = this.component.render("group");
        if (groupId != null) {
            var group = Echo.Sync.RadioButton._groups.map[groupId];
            if (!group) {
                group = new Echo.Sync.RadioButton.Group(groupId);
                Echo.Sync.RadioButton._groups.map[groupId] = group;
            }
            group.add(this);
            this._group = group;
        }
        Echo.Sync.ToggleButton.prototype.renderAdd.call(this, update, parentElement);
    },
    
    createStateElement: function() {
        var stateIcon = this.getStateIcon();
        var stateElement;
        if (stateIcon) {
            stateElement = document.createElement("img");
            Echo.Sync.ImageReference.renderImg(stateIcon, stateElement);
        } else {
            stateElement = document.createElement("input");
            stateElement.type = "radio";
            stateElement.name = "__echo_" + Echo.Sync.RadioButton._nextNameId++;
            stateElement.defaultChecked = this._selected ? true : false;
            Core.Web.Event.add(stateElement, "change", Core.method(this, this._processStateChange), false);
        }
        return stateElement;
    },
    
    _processStateChange: function(e) {
        this.updateStateElement();
    },
    
    renderDispose: function(update) {
        Echo.Sync.ToggleButton.prototype.renderDispose.call(this, update);
        if (this._group) {
            this._group.remove(this);
            if (this._group.size() == 0) {
                Echo.Sync.RadioButton._groups.remove(this._group.id);
            }
            this._group = null;
        }
    },
    
    updateStateElement: function() {
        var stateIcon = this.getStateIcon();
        if (stateIcon) {
            this._stateElement.src = Echo.Sync.ImageReference.getUrl(stateIcon);
        } else {
            this._stateElement.checked = this._selected ? true : false;
        }
    }
});

Echo.Sync.RadioButton.Group = Core.extend({

    id: null,
    
    _buttons: null,

    /**
     * Creates a RadioButton group.
     * 
     * @param id {String} the id
     */
    $construct: function(id) {
        this.id = id;
        this._buttons = [];
    },
    
    /**
     * Adds the specified button to this button group.
     *
     * @param button {Echo.Render.ComponentSync.ToggleButton} the button
     */
    add: function(button) {
        this._buttons.push(button);
    },
    
    /**
     * Deselects all buttons in this button group.
     */
    deselect: function() {
        for (var i = 0; i < this._buttons.length; ++i) {
            this._buttons[i].setSelected(false);
        }
    },
    
    /**
     * Removes the specified button from this button group.
     * 
     * @param button {Echo.Render.ComponentSync.ToggleButton} the button
     */
    remove: function(button) {
        // Find index of button in array.
        var buttonIndex = -1;
        for (var i = 0; i < this._buttons.length; ++i) {
            if (this._buttons[i] == button) {
                buttonIndex = i;
                break;
            }
        }
        
        if (buttonIndex == -1) {
            // Button does not exist in group.
            throw new Error("No such button: " + button.component.renderId);
        }
        
        if (this._buttons.length == 1) {
            // Array will now be empty.
            this._buttons = [];
        } else {
            // Buttons remain, remove button from button group.
            this._buttons[buttonIndex] = this._buttons[this._buttons.length - 1];
            this._buttons.length = this._buttons.length - 1;
        }
    },

    /**
     * Gets the amount of buttons contained by this button group.
     * 
     * @return the number of buttons.
     * @type {Number}
     */
    size: function() {
        return this._buttons.length;
    }
});
