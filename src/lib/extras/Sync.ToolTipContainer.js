/**
 * Component rendering peer: ToolTipContainer.
 * This class should not be extended by developers, the implementation is subject to change.
 */
Extras.Sync.ToolTipContainer = Core.extend(Echo.Render.ComponentSync, {
    
    $load: function() {
        Echo.Render.registerPeer("Extras.ToolTipContainer", this);
    },
    
    /**
     * Main container DIV element.
     * @type Element
     */
    _div: null,
    
    /**
     * DIV container for component to which tool tip is being applied.
     * @type Element
     */
    _applyDiv: null,
    
    /**
     * DIV container for tool tip component.
     * @type Element
     */
    _toolTipDiv: null,
    
    /**
     * Renders container element for the applied-to component and the applied-to component itself.
     * 
     * @param {Echo.Update.ComponentUpdate} update the update 
     */
    _createApplyTo: function(update) {
        var applyToComponent = this.component.getComponent(0);
        
        var div = document.createElement("div");
        div.style.cursor = "default";
        Echo.Render.renderComponentAdd(update, applyToComponent, div);
        
        if (this.component.getComponentCount() > 1) {
            Core.Web.Event.add(div,
                    Core.Web.Env.PROPRIETARY_EVENT_MOUSE_ENTER_LEAVE_SUPPORTED ? "mouseenter" : "mouseover", 
                    Core.method(this, this._processRolloverEnter), true);
            Core.Web.Event.add(div,
                    Core.Web.Env.PROPRIETARY_EVENT_MOUSE_ENTER_LEAVE_SUPPORTED ? "mouseleave" : "mouseout", 
                    Core.method(this, this._processRolloverExit), true);
            Core.Web.Event.add(div, "mousemove", Core.method(this, this._processMove), true);
        }
        
        return div;
    },
    
    /**
     * Renders tool tip container element, contained component.
     * 
     * @param {Echo.Update.ComponentUpdate} update the update 
     */
    _createToolTip: function(update) {
        var div = document.createElement("div");
        div.style.zIndex = 32767;
        div.style.position = "absolute";
        var width = this.component.render("width");
        if (width) {
            div.style.width = Echo.Sync.Extent.toCssValue(width);
        }
        Echo.Render.renderComponentAdd(update, this.component.getComponent(1), div);
        return div;
    },
    
    /**
     * Positions tool tip over applied-to component based on mouse position.
     * 
     * @param e a mouse event containing mouse cursor positioning information
     */
    _positionToolTip: function(e) {
        // Determine cursor position.
        var cursorX = (e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft)));
        var cursorY = (e.pageY || (e.clientY + (document.documentElement.scrollTop || document.body.scrollTop)));
        
        // Determine size of window and tip.
        var bodyBounds = new Core.Web.Measure.Bounds(document.body);
        var tipBounds = new Core.Web.Measure.Bounds(this._toolTipDiv);
        
        // Load default tip position.
        var tipX = cursorX + 10;
        var tipY = cursorY + 10;
        
        // Ensure tip is on screen vertically.
        if (tipY + tipBounds.height > bodyBounds.height) {
            tipY = bodyBounds.height - tipBounds.height;
            if (tipY < 0) {
                tipY = 0;
            }
        }
        
        // Ensure tip is on screen horizontally (but never position it under cursor).
        if (cursorY < tipY && (tipX + tipBounds.width > bodyBounds.width)) {
            tipX = bodyBounds.width - tipBounds.width;
            if (tipX < 0) {
                tipX = 0;
            }
        }
        
        // Render tip position.
        this._toolTipDiv.style.left = tipX + "px";
        this._toolTipDiv.style.top = tipY + "px";
    },
    
    /**
     * Processes a mouse move event.
     * 
     * @param e the event
     */
    _processMove: function(e) {
        if (!this.client || !this.client.verifyInput(this.component) || Core.Web.dragInProgress) {
            return;
        }
        this._positionToolTip(e);
        return true;
    },
    
    /**
     * Processes a mouse rollover enter event.
     * 
     * @param e the event
     */
    _processRolloverEnter: function(e) {
        if (!this.client || !this.client.verifyInput(this.component) || Core.Web.dragInProgress) {
            return;
        }
        
        if (this._toolTipDiv.parentNode !== document.body) {
            document.body.appendChild(this._toolTipDiv);
            this._positionToolTip(e);
        }
        return true;
    },
    
    /**
     * Processes a mouse rollover exit event.
     * 
     * @param e the event
     */
    _processRolloverExit: function(e) {
        if (!this.client || !this.client.verifyInput(this.component)) {
            return;
        }
        if (this._toolTipDiv.parentNode === document.body) {
            document.body.removeChild(this._toolTipDiv);
        }
        return true;
    },

    /** @see Echo.Render.ComponentSync#renderAdd */
    renderAdd: function(update, parentElement) {
        this._div = document.createElement("div");
        this._div.id = this.component.renderId;
        var componentCount = this.component.getComponentCount();
        
        if (componentCount > 0) {
            this._applyDiv = this._createApplyTo(update);
            this._div.appendChild(this._applyDiv);
        }
        
        if (componentCount > 1) {
            this._toolTipDiv = this._createToolTip(update);
        }
        
        parentElement.appendChild(this._div);
    },
    
    /** @see Echo.Render.ComponentSync#renderDispose */
    renderDispose: function(update) {
        this._div = null;
        
        if (this._applyDiv) {
            Core.Web.Event.removeAll(this._applyDiv);
            this._applyDiv = null;
        }
        
        if (this._toolTipDiv && this._toolTipDiv.parentNode === document.body) {
            document.body.removeChild(this._toolTipDiv);
            this._toolTipDiv = null;
        }
    },
    
    /** @see Echo.Render.ComponentSync#renderUpdate */
    renderUpdate: function(update) {
        var element = this._div;
        var containerElement = element.parentNode;
        Echo.Render.renderComponentDispose(update, update.parent);
        containerElement.removeChild(element);
        this.renderAdd(update, containerElement);
        return true;
    }
});
