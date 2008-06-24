/**
 * ContextMenu component.
 *
 * @sp {#FillImage} backgroundImage the background image that will be displayed within menus
 * @sp {#Border} border the border that will be displayed around the menus
 * @sp {#Color} disabledBackground the background color used to render disabled menu items
 * @sp {#FillImage} disabledBackgroundImage the background image used to render disabled menu items
 * @sp {#Color} disabledForeground the foreground color used to render disabled menu items
 * @sp {#ImageReference} menuExpandIcon the icon used to expand child menus
 * @sp {#Color} selectionBackground the background color used to highlight the currently selected menu item
 * @sp {#FillImage} selectionBackgroundImage the background image used to highlight the currently selected menu item
 * @sp {#Color} selectionForeground the foreground color used to highlight the currently selected menu item
 */
Extras.ContextMenu = Core.extend(Echo.Component, {

    $load: function() {
        Echo.ComponentFactory.registerType("Extras.ContextMenu", this);
    },

    componentType: "Extras.ContextMenu"
});

/**
 * DropDownMenu component.
 *
 * @sp {Number} animationTime the animation time (in milliseconds) (A value of zero indicates animation is disabled.)
 * @sp {#FillImage} backgroundImage the background image that will be displayed in the drop down box
 *     (This image will also be used in child menus unless a value is specified for the <code>menuBackgroundImage</code> 
 *     property.)
 * @sp {#Border} border the border that will be displayed around the drop down box (This border will also be used around
 *     child menus unless a value is specified for the <code>menuBorder</code> property.)
 * @sp {#Color} disabledBackground the background color used to render disabled menu items
 * @sp {#FillImage} disabledBackgroundImage the background image used to render disabled menu items
 * @sp {#ImageReference} disabledExpandIcon the expand icon displayed in the drop down box
 * @sp {#Color} disabledForeground the foreground color used to render disabled menu items
 * @sp {#ImageReference} expandIcon the expand icon displayed in the drop down box
 * @sp {#ImageReference} expandIconWidth the width of the expand icon displayed in the drop down box
 * @sp {#Extent} height the height of the drop down box
 * @sp {#Insets} insets the insets of the drop down box
 * @sp {Boolean} lineWrap flag indicating whether long lines should be wrapped
 * @sp {#Color} menuBackground the background color that will be shown in child menus
 * @sp {#FillImage} menuBackgroundImage the background image that will be drawn in child menus
 * @sp {#Border} menuBorder the border that will be drawn around child menus
 * @sp {#ImageReference} menuExpandIcon the icon used to expand child menus
 * @sp {#Font} menuFont the font that will be shown in child menus
 * @sp {#Color} menuForeground the foreground color that will be shown in child menus
 * @sp {#Extent} menuHeight the height of the expanded menu
 * @sp {#Extent} menuWidth the width of the expanded menu
 * @sp {#Color} selectionBackground the background color used to highlight the currently selected menu item
 * @sp {#FillImage} selectionBackgroundImage the background image used to highlight the currently selected menu item
 * @sp {#Color} selectionForeground the foreground color used to highlight the currently selected menu item
 * @sp {String} selectionText the text displayed in the drop down box when no item is selected
 * @sp {#Extent} width the width of the drop down box
 */
Extras.DropDownMenu = Core.extend(Echo.Component, {

    $load: function() {
        Echo.ComponentFactory.registerType("Extras.DropDownMenu", this);
    },

    componentType: "Extras.DropDownMenu"
});

/**
 * MenuBarPane component.
 *
 * @sp {Number} animationTime the animation time (in milliseconds) ( A value of zero indicates animation is disabled)
 * @sp {#FillImage} backgroundImage the background image that will be displayed in the menu bar  (This image will also be used in
 *     child menus  unless a value is specified for the <code>menuBackgroundImage</code> property.)
 * @sp  {#Border} border the border that will be displayed around the menu bar (This border will also be used around
 *     child menus unless a value is specified for the <code>menuBorder</code> property.)
 * @sp {#Color} disabledBackground the background color used to render disabled menu items
 * @sp {#FillImage} disabledBackgroundImage the background image used to render disabled menu items
 * @sp {#Color} disabledForeground the foreground color used to render disabled menu items
 * @sp {#Color} menuBackground the background color that will be displayed in child menus
 * @sp {#FillImage} menuBackgroundImage the background image that will be displayed in child menus
 * @sp {#Border} menuBorder the border that will be displayed around child menus
 * @sp {#ImageReference} menuExpandIcon the icon used to expand child menus
 * @sp {#Color} menuForeground the foreground color that will be displayed in child menus
 * @sp {Number} menuOpacity the opacity setting (percent) that will be used for the background
 *     color/image displayed in pulldown menus (Valid values are between
 *     1 and 100.  Some clients may not support this setting and will
 *     always render menus with 100% opacity)
 * @sp {#Color} selectionBackground the background color used to highlight the currently selected menu item
 * @sp {#FillImage} selectionBackgroundImage the background image used to highlight the currently selected menu item
 * @sp {#Color} selectionForeground the foreground color used to highlight the currently selected menu item
 */
Extras.MenuBarPane = Core.extend(Echo.Component, {

    $load: function() {
        Echo.ComponentFactory.registerType("Extras.MenuBarPane", this);
    },

    componentType: "Extras.MenuBarPane"
});

/**
 * Abstract base class for menu model components.
 */
Extras.ItemModel = Core.extend({

    $abstract: true,
    
    /**
     * The id of the item model.
     * @type String
     */
    modelId: null,
    
    /**
     * The parent menu model
     * @type Extras.ItemModel
     */
    parent: null
});

/**
 * Representation of a menu that may contain submenus, options, and separators.
 */
Extras.MenuModel = Core.extend(Extras.ItemModel, {
    
    /**
     * The menu title.
     * @type String
     */
    text: null,
    
    /**
     * The menu icon.
     * @type #ImageReference
     */
    icon: null,
    
    /**
     * The child menu items.
     * @type Array
     */
    items: null,
    
    /**
     * Creates a new menu model
     *
     * @param {String} modelId the id of the menu model
     * @param {String} text the title of the menu model which will appear in its parent menu
     *        when this menu is used as a submenu
     * @param {#ImageReference} icon the icon of the menu model which will appear in its parent menu
     *        when this menu is used as a submenu
     * @param {Array} items the child menu items, an array of <code>ItemModel</code>s (optional)
     */
    $construct: function(modelId, text, icon, items) {
        this.modelId = modelId;
        this.id = Extras.uniqueId++;
        this.parent = null;
        this.text = text;
        this.icon = icon;
        if (items) {
            for (var i = 0; i < items.length; ++i) {
                items[i].parent = this;
            }
        }
        this.items = items ? items : [];
    },
    
    /**
     * Adds an item to the MenuModel.
     *
     * @param {Extras.ItemModel} item the item (must be a MenuModel, OptionModel, or SeparatorModel.
     */
    addItem: function(item) {
        this.items.push(item);
        item.parent = this;
    },
    
    /**
     * Finds an item by id in the <code>MenuModel</code>, searching descendant <code>MenuModel</code>s as necessary.
     * @param id the id of the menu item to find
     * @return Extras.ItemModel the item model, or null if it cannot be found
     */
    findItem: function(id) {
        var i;
        for (i = 0; i < this.items.length; ++i) {
            if (this.items[i].id == id) {
                return this.items[i];
            }
        }
        for (i = 0; i < this.items.length; ++i) {
            if (this.items[i] instanceof Extras.MenuModel) {
                var itemModel = this.items[i].findItem(id);
                if (itemModel) {
                    return itemModel;
                }
            }
        }
        return null;
    },
    
    /**
     * Determines the index of the specified menu item.
     *
     * @param {Extras.ItemModel} item the item to find
     * @return the index of the item, or -1 if it cannot be found
     * @type Number
     */
    indexOfItem: function(item) {
        for (var i = 0; i < this.items.length; ++i) {
            if (this.items[i] == item) {
                return i;
            }
        }
        return -1;
    },
    
    getItemModelFromPositions: function(itemPositions) {
        var menuModel = this;
        for (var i = 0; i < itemPositions.length; ++i) {
            menuModel = menuModel.items[parseInt(itemPositions[i])];
        }
        return menuModel;
    },
    
    /**
     * toString() implementation.
     */
    toString: function() {
        return "MenuModel \"" + this.text + "\" Items:" + this.items.length;
    }
});

/**
 * Representation of a menu option.
 */
Extras.OptionModel = Core.extend(Extras.ItemModel, {
    
    /**
     * The menu title.
     * @type String
     */
    text: null,
    
    /**
     * The menu icon.
     * @type #ImageReference
     */
    icon: null,
    
    /**
     * Creates a new menu option.
     *
     * @param {String} modelId the id of the menu model
     * @param {String} text the menu item title
     * @param {#ImageReference} icon the menu item icon
     */ 
    $construct: function(modelId, text, icon) {
        this.modelId = modelId;
        this.id = Extras.uniqueId++;
        this.parent = null;
        this.text = text;
        this.icon = icon;
    },
    
    /**
     * Returns an array containing the path of this model to its most distant ancestor, consisting of 
     * positions.
     * 
     * @return the array of positions
     * @type Array
     */
    getItemPositionPath: function() {
        var path = [];
        var itemModel = this;
        while (itemModel.parent != null) {
            path.unshift(itemModel.parent.indexOfItem(itemModel));
            itemModel = itemModel.parent;
        }
        return path;
    },
    
    /**
     * toString() implementation.
     */
    toString: function() {
        return "OptionModel \"" + this.text + "\"";
    }
});

/**
 * Representation of a toggle button (checkbox) menu option.
 */
Extras.ToggleOptionModel = Core.extend(Extras.OptionModel, {

    /**
     * Creates a new toggle option.
     *
     * @param {String} modelId the id of the menu model
     * @param {String} text the menu item title
     * @param {Boolean} initial selection state
     */ 
    $construct: function(modelId, text, selected) {
        Extras.OptionModel.call(this, modelId, text, null);
        this.selected = selected;
    }
});

/**
 * Representation of a radio button menu option.
 */
Extras.RadioOptionModel = Core.extend(Extras.ToggleOptionModel, {

    /**
     * Creates a radio option.
     *
     * @param {String} modelId the id of the menu model
     * @param {String} text the menu item title
     * @param {Boolean} initial selection state
     */ 
    $construct: function(modelId, text, selected) {
        Extras.ToggleOptionModel.call(this, modelId, text, selected);
    }
});

/**
 * A representation of a menu separator.
 */
Extras.SeparatorModel = Core.extend(Extras.ItemModel, {

});

/**
 * Representation of menu model state, describing which items are selected and/or disabled.
 */ 
Extras.MenuStateModel = Core.extend({

    /**
     * Disabled menu item ids.
     * @type Array
     */
    _disabledItems: null,
    
    /**
     * Selected menu item ids.
     * @type Array
     */
    _selectedItems: null,

    /**
     * Creates a new <code>MenuStateModel</code>.
     */
    $construct: function() {
        this._disabledItems = [];
        this._selectedItems = [];
    },
    
    /**
     * Determines if the specified menu item is enabled.
     *
     * @param {String} modelId the item model id
     * @return true if the item is enabled
     * @type Boolean
     */
    isEnabled: function(modelId) {
        if (modelId) {
            for (var i = 0; i < this._disabledItems.length; i++) {
                if (this._disabledItems[i] == modelId) {
                    return false;
                }
            }
        }
        return true;
    },
    
    /**
     * Determines if the specified menu item is selected.
     *
     * @param {String} modelId the item model id
     * @return true if the item is selected
     * @type Boolean
     */
    isSelected: function(modelId) {
        if (modelId) {
            for (var i = 0; i < this._selectedItems.length; i++) {
                if (this._selectedItems[i] == modelId) {
                    return true;
                }
            }
        }
        return false;
    },
    
    /**
     * Sets the enabled state of a menu item.
     *
     * @param {String} modelId the item model id
     * @param {Boolean} enabled the enabled state
     */
    setEnabled: function(modelId, enabled) {
        //FIXME allow disablement.
        if (!enabled) {
            this._disabledItems.push(modelId);
        }
    },
    
    /**
     * Sets the selection state of a menu item.
     *
     * @param {String} modelId the item model id
     * @param {Boolean} selected the selection state
     */
    setSelected: function(modelId, selected) {
        //FIXME allow deselection.
        if (selected) {
            this._selectedItems.push(modelId);
        }
    }
});
