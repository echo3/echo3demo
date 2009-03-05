/**
 * Component rendering peer: TextComponent.
 * This class should not be extended by developers, the implementation is subject to change.
 * 
 * Note that this component has workarounds for issues with percentage-width text fields/areas in various browsers.
 * Percentage widths are reduced based on container size and border width to ensure overall width of component meets
 * user-set percent width specification.  Workaround is also provided for Internet Explorer 6's growing textarea bug. 
 */
Echo.Sync.TextComponent = Core.extend(Echo.Render.ComponentSync, {
    
    $abstract: true,
    
    $static: {
    
        /**
         * Array containing properties that may be updated without full re-render.
         * @type Array
         */
        _supportedPartialProperties: ["text", "editable"]
    },
    
    $virtual: {
        
        /**
         * Invoked to ensure that input meets requirements of text field.  Default implementation ensures input
         * does not exceed maximum length.
         */
        sanitizeInput: function() {
            var maximumLength = this.component.render("maximumLength", -1);
            if (maximumLength >= 0) {
                if (this.input.value && this.input.value.length > maximumLength) {
                    this.input.value = this.input.value.substring(0, maximumLength);
                }
            }
        }
    },
    
    /**
     * The rendered "input" element (may be a textarea).
     * @type Element
     */
    input: null,
    
    /**
     * Container element which wraps the input element.
     * This element is only rendered for text areas, to mitigate IE "growing" text area bug.
     * @type Element
     */
    container: null,
    
    /**
     * Actual focus state of component, based on received DOM focus/blur events.
     * @type Boolean
     */
    _focused: false,
    
    /**
     * The last processed value of the text field, i.e., the last value of the input field
     * that was stored in the component hierarchy.  When input is provided while restrictions
     * are in place, this value is not updated.
     */
    _lastProcessedValue: null,
    
    /**
     * Flag indicating whether width has been set as a percentage.
     * @type Boolean
     */
    percentWidth: false,
    
    /**
     * Renders style information: colors, borders, font, insets, etc.
     * Sets percentWidth flag.
     */
    _renderStyle: function() {
        if (this.component.isRenderEnabled()) {
            Echo.Sync.renderComponentDefaults(this.component, this.input);
            Echo.Sync.Border.render(this.component.render("border"), this.input);
            Echo.Sync.FillImage.render(this.component.render("backgroundImage"), this.input);
        } else {
            Echo.Sync.LayoutDirection.render(this.component.getLayoutDirection(), this.input);
            Echo.Sync.Color.render(Echo.Sync.getEffectProperty(this.component, "foreground", "disabledForeground", true), 
                    this.input, "color");
            Echo.Sync.Color.render(Echo.Sync.getEffectProperty(this.component, "background", "disabledBackground", true), 
                    this.input, "backgroundColor");
            Echo.Sync.Border.render(Echo.Sync.getEffectProperty(this.component, "border", "disabledBorder", true), 
                    this.input);
            Echo.Sync.Font.render(Echo.Sync.getEffectProperty(this.component, "font", "disabledFont", true), 
                    this.input);
            Echo.Sync.FillImage.render(Echo.Sync.getEffectProperty(this.component, 
                    "backgroundImage", "disabledBackgroundImage", true), this.input);
        }
        Echo.Sync.Alignment.render(this.component.render("alignment"), this.input, false, null);
        Echo.Sync.Insets.render(this.component.render("insets"), this.input, "padding");
        var width = this.component.render("width");
        this.percentWidth = Echo.Sync.Extent.isPercent(width);
        if (width) {
            if (this.percentWidth) {
                // Set width very small temporarily, renderDisplay will correct.
                this.input.style.width = "5px";
            } else {
                this.input.style.width = Echo.Sync.Extent.toCssValue(width, true);
            }
        }
        var height = this.component.render("height");
        if (height) {
            this.input.style.height = Echo.Sync.Extent.toCssValue(height, false);
        }
        var toolTipText = this.component.render("toolTipText");
        if (toolTipText) {
            this.input.title = toolTipText;
        }
    },
    
    /**
     * Registers event handlers on the text component.
     */
    _addEventHandlers: function() {
        Core.Web.Event.add(this.input, "click", Core.method(this, this._processClick), false);
        Core.Web.Event.add(this.input, "focus", Core.method(this, this._processFocus), false);
        Core.Web.Event.add(this.input, "blur", Core.method(this, this._processBlur), false);
        Core.Web.Event.add(this.input, "keypress", Core.method(this, this._processKeyPress), false);
        Core.Web.Event.add(this.input, "keyup", Core.method(this, this._processKeyUp), false);
    },
    
    /**
     * Reduces a percentage width by a number of pixels based on the container size.
     * 
     * @param {Number} percentValue the percent span
     * @param {Number} reducePixels the number of pixels by which the percent span should be reduced
     * @param {Number} containerPixels the size of the container element 
     */
    _adjustPercentWidth: function(percentValue, reducePixels, containerPixels) {
        var value = (100 - Math.ceil(100 * reducePixels / containerPixels)) * percentValue / 100;
        return value > 0 ? value : 0;
    },
    
    /**
     * Processes a focus blur event.
     */
    _processBlur: function(e) {
        this._focused = false;
        return this._storeValue();
    },
    
    /**
     * Processes a mouse click event. Notifies application of focus.
     */
    _processClick: function(e) {
        if (!this.client || !this.client.verifyInput(this.component)) {
            return true;
        }
        this.client.application.setFocusedComponent(this.component);
    },

    /**
     * Processes a focus event. Notifies application of focus.
     */
    _processFocus: function(e) {
        this._focused = true;
        if (!this.client || !this.client.verifyInput(this.component)) {
            return true;
        }
        this.client.application.setFocusedComponent(this.component);
    },
    
    /**
     * Processes a key press event.  Prevents input when client is not ready. 
     */
    _processKeyPress: function(e) {
        return this._storeValue(e);
    },
    
    /**
     * Processes a key up event.  
     */
    _processKeyUp: function(e) {
        return this._storeValue(e);
    },
    
    /**
     * Event listener to process input after client input restrictions have been cleared. 
     */
    _processRestrictionsClear: function() {
        if (!this.client) {
            // Component has been disposed, do nothing.
            return;
        }

        if (!this.client.verifyInput(this.component) || this.input.readOnly) {
            // Client is unwilling to accept input or component has been made read-only:
            // Reset value of text field to text property of component.
            this.input.value = this.component.get("text");
            return;
        }

        // All-clear, store current text value.
        this.component.set("text", this.input.value);
    },

    /**
     * Adds the input element to its parent in the DOM.
     * Wraps the element in a special container DIV if necessary to appease Internet Explorer's various text field/area bugs,
     * including percent-based text areas inducing scroll bars and the IE6 percentage width "growing" text area bug.
     * 
     * @param parentElement the parent element
     */
    renderAddToParent: function(parentElement) {
        if (Core.Web.Env.BROWSER_INTERNET_EXPLORER && this.percentWidth) {
            this.container = document.createElement("div");
            this.container.appendChild(this.input);
            parentElement.appendChild(this.container);
        } else {
            parentElement.appendChild(this.input);
        }
    },
    
    /** @see Echo.Render.ComponentSync#renderDisplay */
    renderDisplay: function() {
        var width = this.component.render("width");
        if (width && Echo.Sync.Extent.isPercent(width) && this.input.parentNode.offsetWidth) {
            // If width is a percentage, reduce rendered percent width based on measured container size and border width,
            // such that border pixels will not make the component wider than specified percentage.
            var border = this.component.render("border");
            var borderSize = Echo.Sync.Border.getPixelSize(this.component.render("border", "2px solid #000000"), "left") +
                    Echo.Sync.Border.getPixelSize(this.component.render("border", "2px solid #000000"), "right") + 1;
            if (Core.Web.Env.BROWSER_INTERNET_EXPLORER) {
                // Add default windows scroll bar width to border size for Internet Explorer browsers.
                if (this.container) {
                    this.container.style.width = this._adjustPercentWidth(100, Core.Web.Measure.SCROLL_WIDTH, 
                            this.input.parentNode.offsetWidth) + "%";
                } else {
                    borderSize += Core.Web.Measure.SCROLL_WIDTH;
                }
            }
            this.input.style.width = this._adjustPercentWidth(parseInt(width, 10), borderSize, 
                    this.input.parentNode.offsetWidth) + "%";
        }
    },
    
    /** @see Echo.Render.ComponentSync#renderDispose */
    renderDispose: function(update) {
        Core.Web.Event.removeAll(this.input);
        this._focused = false;
        this.input = null;
        this.container = null;
    },
    
    /** @see Echo.Render.ComponentSync#renderFocus */
    renderFocus: function() {
        if (this._focused) {
            return;
        }
            
        this._focused = true;
        Core.Web.DOM.focusElement(this.input);
    },
    
    /** @see Echo.Render.ComponentSync#renderUpdate */
    renderUpdate: function(update) {
        var fullRender = !Core.Arrays.containsAll(Echo.Sync.TextComponent._supportedPartialProperties, 
                    update.getUpdatedPropertyNames(), true);
    
        if (fullRender) {
            var element = this.container ? this.container : this.input;
            var containerElement = element.parentNode;
            this.renderDispose(update);
            containerElement.removeChild(element);
            this.renderAdd(update, containerElement);
        } else {
            if (update.hasUpdatedProperties()) {
                var textUpdate = update.getUpdatedProperty("text");
                if (textUpdate) {
                    var newValue = textUpdate.newValue == null ? "" : textUpdate.newValue;
                    if (newValue != this._lastProcessedValue) {
                        this.input.value = newValue;
                        this._lastProcessedValue = newValue;
                    }
                }
                var editableUpdate = update.getUpdatedProperty("editable");
                if (editableUpdate != null) {
                    this.input.readOnly = !editableUpdate.newValue;
                }
            }
        }
        
        return false; // Child elements not supported: safe to return false.
    },

    /**
     * Stores the current value of the input field, if the client will allow it.
     * If the client will not allow it, but the component itself is active, registers
     * a restriction listener to be notified when the client is clear of input restrictions
     * to store the value later.
     * 
     * @param keyEvent the user keyboard event which triggered the value storage request (optional)
     */
    _storeValue: function(keyEvent) {
        if (!this.client) {
            return true;
        }

        this.sanitizeInput();
        
        if (!this.client.verifyInput(this.component)) {
            if (!this.component.isActive()) {
                // Component is unwilling to receive input, prevent the input and return.
                if (keyEvent) {
                    Core.Web.DOM.preventEventDefault(keyEvent);
                }
                return true;
            }
            
            // Component is willing to receive input, but client is not ready:  
            // Register listener to be notified when client input restrictions have been removed, 
            // but allow the change to be reflected in the text field temporarily.
            this.client.registerRestrictionListener(this.component, Core.method(this, this._processRestrictionsClear)); 
            return true;
        }

        // Component and client are ready to receive input, set the component property and/or fire action event.
        this.component.set("text", this.input.value);
        this._lastProcessedValue = this.input.value;
        
        if (keyEvent && keyEvent.keyCode == 13) {
            this.component.doAction();
        }

        return true;
    }
});

/**
 * Component rendering peer: TextArea
 */
Echo.Sync.TextArea = Core.extend(Echo.Sync.TextComponent, {

    $load: function() {
        Echo.Render.registerPeer("TextArea", this);
    },

    /** @see Echo.Render.ComponentSync#renderAdd */
    renderAdd: function(update, parentElement) {
        this.input = document.createElement("textarea");
        this.input.id = this.component.renderId;
        if (!this.component.render("editable", true)) {
            this.input.readOnly = true;
        }
        this._renderStyle(this.input);
        this.input.style.overflow = "auto";
        this._addEventHandlers(this.input);
        if (this.component.get("text")) {
            this.input.value = this.component.get("text");
        }
        this.renderAddToParent(parentElement);
    }
});

/**
 * Component rendering peer: TextField
 */
Echo.Sync.TextField = Core.extend(Echo.Sync.TextComponent, {
    
    $load: function() {
        Echo.Render.registerPeer("TextField", this);
    },
    
    $virtual: {
        
        /** 
         * Input element type, either "text" or "password"
         * @type String 
         */
        _type: "text"
    },

    /** @see Echo.Render.ComponentSync#getFocusFlags */
    getFocusFlags: function() {
        return Echo.Render.ComponentSync.FOCUS_PERMIT_ARROW_UP | Echo.Render.ComponentSync.FOCUS_PERMIT_ARROW_DOWN;
    },

    /** @see Echo.Render.ComponentSync#renderAdd */
    renderAdd: function(update, parentElement) {
        this.input = document.createElement("input");
        this.input.id = this.component.renderId;
        if (!this.component.render("editable", true)) {
            this.input.readOnly = true;
        }
        this.input.type = this._type;
        var maximumLength = this.component.render("maximumLength", -1);
        if (maximumLength >= 0) {
            this.input.maxLength = maximumLength;
        }
        this._renderStyle(this.input);
        this._addEventHandlers(this.input);
        if (this.component.get("text")) {
            this.input.value = this.component.get("text");
        }
        
        this.renderAddToParent(parentElement);
    },

    /** 
     * Allows all input.
     * @see Echo.Sync.TextComponent#sanitizeInput
     */
    sanitizeInput: function() {
        // allow all input
    }
});

/**
 * Component rendering peer: PasswordField
 */
Echo.Sync.PasswordField = Core.extend(Echo.Sync.TextField, {
    
    $load: function() {
        Echo.Render.registerPeer("PasswordField", this);
    },
    
    /** @see Echo.Sync.TextField#_type */
    _type: "password"
});
