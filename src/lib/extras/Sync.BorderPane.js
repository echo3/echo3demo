/**
 * Component rendering peer: BorderPane
 */
Extras.Sync.BorderPane = Core.extend(Echo.Render.ComponentSync, {

    $load: function() {
        Echo.Render.registerPeer("Extras.BorderPane", this);
    },

    $construct: function() {
        this._element = null;
    },
    
    renderAdd: function(update, parentElement) {
        this._element = document.createElement("div");
    
        this._element.style.padding = "0px";
        this._element.style.zIndex = 1;
        this._element.style.overflow = "hidden";
        this._element.style.position = "absolute";
        this._element.style.left = "0px";
        this._element.style.top = "0px";
        this._element.style.width = "100%";
        this._element.style.height = "100%";
        
        this._renderBorder();
        this._renderContent(update);
        
        parentElement.appendChild(this._element);
    },
    
    _renderBorder: function() {
        var border = this.component.render("border", Extras.BorderPane.DEFAULT_BORDER);
        var borderInsets = Echo.Sync.Insets.toPixels(border.borderInsets);
        var flags = this.component.render("ieAlphaRenderBorder") 
                ? Echo.Sync.FillImage.FLAG_ENABLE_IE_PNG_ALPHA_FILTER : 0;
        var cornerElement;
        
        // Render top row
        if (borderInsets.top > 0) {
            // Render top left corner
            if (borderInsets.left > 0) {
                cornerElement = this._renderBorderPart(border, "topLeft", flags, 
                        borderInsets.left, borderInsets.top, 0, null, null, 0);
                this._element.appendChild(cornerElement);
            }
            // Render top side
            this._borderTopElement = this._renderBorderPart(border, "top", flags, 
                    null, borderInsets.top, 0, borderInsets.right, null, borderInsets.left);
            this._element.appendChild(this._borderTopElement);
            // Render top right corner
            if (borderInsets.right > 0) {
                cornerElement = this._renderBorderPart(border, "topRight", flags, 
                        borderInsets.right, borderInsets.top, 0, 0, null, null);
                this._element.appendChild(cornerElement);
            }
        }
        // Render left side
        if (borderInsets.left > 0) {
            this._borderLeftElement = this._renderBorderPart(border, "left", flags, 
                    borderInsets.left, null, borderInsets.top, null, borderInsets.bottom, 0);
            this._element.appendChild(this._borderLeftElement);
        }
        // Render right side
        if (borderInsets.right > 0) {
            this._borderRightElement = this._renderBorderPart(border, "right", flags, 
                    borderInsets.right, null, borderInsets.top, 0, borderInsets.bottom, null);
            this._element.appendChild(this._borderRightElement);
        }
        // Render bottom row
        if (borderInsets.bottom > 0) {
            // Render bottom left corner
            if (borderInsets.left > 0) {
                cornerElement = this._renderBorderPart(border, "bottomLeft", flags, 
                        borderInsets.left, borderInsets.bottom, null, null, 0, 0);
                this._element.appendChild(cornerElement);
            }
            // Render bottom side
            this._borderBottomElement = this._renderBorderPart(border, "bottom", flags, 
                    null, borderInsets.bottom, null, borderInsets.right, 0, borderInsets.left);
            this._element.appendChild(this._borderBottomElement);
            // Render bottom right corner
            if (borderInsets.right > 0) {
                cornerElement = this._renderBorderPart(border, "bottomRight", flags, 
                        borderInsets.right, borderInsets.bottom, null, 0, 0, null);
                this._element.appendChild(cornerElement);
            }
        }
    },
    
    _renderBorderPart: function(border, position, flags, width, height, top, right, bottom, left) {
        var borderDivElement = document.createElement("div");
        
        borderDivElement.style.fontSize = "1px";
        borderDivElement.style.position = "absolute";
        if (width != null) {
            borderDivElement.style.width = width + "px";
        }
        if (height != null) {
            borderDivElement.style.height = height + "px";
        }
        if (top != null) {
            borderDivElement.style.top = top + "px";
        }
        if (right != null) {
            borderDivElement.style.right = right + "px";
        }
        if (bottom != null) {
            borderDivElement.style.bottom = bottom + "px";
        }
        if (left != null) {
            borderDivElement.style.left = left + "px";
        }
        
        if (border.color) {
            Echo.Sync.Color.render(border.color, borderDivElement, "backgroundColor");
        }
        if (border[position]) {
            Echo.Sync.FillImage.render(border[position], borderDivElement, flags);
        }
        
        return borderDivElement;
    },
    
    _renderContent: function(update) {
        this._contentDivElement = document.createElement("div");
        this._contentDivElement.style.position = "absolute";
        this._contentDivElement.style.zIndex = 2;
        this._contentDivElement.style.overflow = "auto";
        
        Echo.Sync.Color.renderFB(this.component, this._contentDivElement);
        Echo.Sync.Font.render(this.component.render("font"), this._contentDivElement);
    
        var border = this.component.render("border", Extras.BorderPane.DEFAULT_BORDER);
        var contentInsets = Echo.Sync.Insets.toPixels(border.contentInsets);
    
        this._contentDivElement.style.top = contentInsets.top + "px";
        this._contentDivElement.style.left = contentInsets.left + "px";
        this._contentDivElement.style.right = contentInsets.right + "px";
        this._contentDivElement.style.bottom = contentInsets.bottom + "px";
        
        var componentCount = this.component.getComponentCount();
        if (componentCount == 1) {
            var child = this.component.getComponent(0);
            var insets = child.pane ? null : this.component.render("insets");
            if (insets) {
                Echo.Sync.Insets.render(insets, this._contentDivElement, "padding");
            }
            Echo.Render.renderComponentAdd(update, child, this._contentDivElement);
        } else if (componentCount > 1) {
            throw new Error("Too many children: " + componentCount);
        }
        
        this._element.appendChild(this._contentDivElement);
    },
    
    renderDisplay: function() {
        Core.Web.VirtualPosition.redraw(this._contentDivElement);
        Core.Web.VirtualPosition.redraw(this._element);
        if (this._borderTopElement) {
            Core.Web.VirtualPosition.redraw(this._borderTopElement);
        }
        if (this._borderLeftElement) {
            Core.Web.VirtualPosition.redraw(this._borderLeftElement);
        }
        if (this._borderRightElement) {
            Core.Web.VirtualPosition.redraw(this._borderRightElement);
        }
        if (this._borderBottomElement) {
            Core.Web.VirtualPosition.redraw(this._borderBottomElement);
        }
    },
    
    renderUpdate: function(update) {
        var element = this._element;
        var containerElement = element.parentNode;
        Echo.Render.renderComponentDispose(update, update.parent);
        containerElement.removeChild(element);
        this.renderAdd(update, containerElement);
        return true;
    },
    
    renderDispose: function(update) {
        this._contentDivElement = null;
        this._element = null;
        this._borderLeftElement = null;
        this._borderRightElement = null;
        this._borderTopElement = null;
        this._borderBottomElement = null;
    }
});
