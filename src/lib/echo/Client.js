/**
 * Abstract base class for Echo clients.
 * @namespace
 */
Echo.Client = Core.extend({
    
    $static: {
    
        /**
         * Global array containing all active client instances in the current browser window.
         * @type Array
         */
        _activeClients: [],

        /**
         * Global listener to respond to resizing of browser window.
         * Invokes _windowResizeListener() method on all active clients.
         * 
         * @param e the DOM resize event
         */
        _globalWindowResizeListener: function(e) {
            for (var i = 0; i < Echo.Client._activeClients.length; ++i) {
                Echo.Client._activeClients[i]._windowResizeListener(e);
            }
        }
    },
    
    $load: function() {
        // Register resize listener on containing window one time.
        Core.Web.DOM.addEventListener(window, "resize", this._globalWindowResizeListener, false);
    },

    /**
     * Flag indicating the user interface should be rendered in design-mode, where all rendered component elements are
     * assigned an id.
     * @type Boolean
     */
    designMode: false,
    
    /**
     * The root DOM element in which the application is contained.
     * @type Element
     */
    domainElement: null,
    
    /**
     * The application being managed by this client.
     * @type Echo.Application
     */
    application: null,
    
    /**
     * Id of last issued input restriction id (incremented to deliver unique identifiers). 
     * @type Number
     */
    _lastInputRestrictionId: 0,
    
    /**
     * Number of currently registered input restrictions.
     * @type Number
     */
    _inputRestrictionCount: 0,
    
    /** 
     * Echo.Component renderId-to-restriction listener mapping.
     */
    _inputRestrictionListeners: null,
    
    /**
     * Id (String) map containing input restrictions.
     * Values are booleans, true indicating property updates are NOT restricted, and false
     * indicated all updates are restricted.
     */
    _inputRescriptionMap: null,
    
    /**
     * Method reference to this._processKeyPressRef().
     * @type Function
     */
    _processKeyPressRef: null,
    
    /**
     * Method reference to this._processApplicationFocus().
     * @type Function
     */
    _processApplicationFocusRef: null,
    
    /**
     * The parent client.
     * @type Echo.Client
     */
    parent: null,
    
    /**
     * Wait indicator.
     * @type Echo.Client.WaitIndicator
     */
    _waitIndicator: null,
    
    /**
     * Restriction time before raising wait indicator, in milliseconds.
     * @type Number
     */
    _preWaitIndicatorDelay: 500,
    
    /**
     * Runnable that will trigger initialization of wait indicator.
     * @type Core.Web.Scheduler.Runnable
     */
    _waitIndicatorRunnable: null,
    
    /**
     * Creates a new Client instance.  Derived classes must invoke.
     */
    $construct: function() { 
        this._inputRestrictionMap = { };
        this._processKeyPressRef = Core.method(this, this._processKeyPress);
        this._processApplicationFocusRef = Core.method(this, this._processApplicationFocus);
        this._waitIndicator = new Echo.Client.DefaultWaitIndicator();
        this._waitIndicatorRunnable = new Core.Web.Scheduler.MethodRunnable(Core.method(this, this._waitIndicatorActivate), 
                this._preWaitIndicatorDelay, false);
    },
    
    $abstract: true,
    
    $virtual: {

        /**
         * Returns the URL of a resource based on package name / 
         * resource name information.
         * Derived implementations should generally override this
         * method, and delegate to superclass if they are unable
         * to provide a resource for a specific URL.
         * Default implementation delegates to parent client
         * (if one is present) or otherwise returns null.
         * 
         * @param {String} packageName the package name in which the resource is contained
         * @param {String} resourceName the resource name
         * @return the full URL
         * @type String
         */
        getResourceUrl: function(packageName, resourceName) {
            if (this.parent) {
                return this.parent.getResourceUrl(packageName, resourceName);
            } else {
                return null;
            }
        },

        /**
         * Determines if the specified component and containing application is ready to receive input.
         * This method should be overridden by client implementations as needed, returning the value
         * from this implementation if the client has no other reason to disallow input.
         * 
         * @param {Echo.Component} component optional parameter indicating the component to query (if omitted, only the
         *        application's readiness state will be investigated)
         * @return true if the application/component are ready to receive input
         * @type Boolean
         */
        verifyInput: function(component) {
            // Check for input restrictions.
            if (this._inputRestrictionCount !== 0) {
                return false;
            }
        
            if (component) {
                return component.isActive();
            } else {
                return this.application.isActive();
            }
        },
        
        /**
         * Default dispose implementation.
         * Invokes configure(null, null) to deconfigure the client. 
         */
        dispose: function() {
            this.configure(null, null);
        }
    },
    
    /**
     * Configures/Deconfigures the client.  This method must be invoked
     * with the supported application/containing domain element before
     * the client is used, and invoked with null values before it is
     * disposed (in order to clean up resources).
     * 
     * @param {Echo.Application} application the application the client will support (if configuring)
     *        or null (if deconfiguring)
     * @param {Element} domainElement the DOM element into which the client will be rendered (if configuring),
     *        or null (if deconfiguring)
     */
    configure: function(application, domainElement) {
        if (this.application) {
            Core.Arrays.remove(Echo.Client._activeClients, this);
            Core.Web.Event.remove(this.domainElement, 
                    Core.Web.Env.QUIRK_IE_KEY_DOWN_EVENT_REPEAT ? "keydown" : "keypress", this._processKeyPressRef, false);
            this.application.removeListener("focus", this._processApplicationFocusRef);
        }
        
        this.application = application;
        this.domainElement = domainElement;
    
        if (this.application) {
            this.application.addListener("focus", this._processApplicationFocusRef);
            Core.Web.Event.add(this.domainElement, 
                    Core.Web.Env.QUIRK_IE_KEY_DOWN_EVENT_REPEAT ? "keydown" : "keypress", this._processKeyPressRef, false);
            Echo.Client._activeClients.push(this);
        }
    },
    
    /**
     * Registers a new input restriction.  Input will be restricted until this and all other
     * input restrictions are removed.
     *
     * @return a handle identifier for the input restriction, which will be used to unregister
     *         the restriction by invoking removeInputRestriction()
     */
    createInputRestriction: function() {
        Core.Web.Scheduler.add(this._waitIndicatorRunnable);

        var id = (++this._lastInputRestrictionId).toString();
        ++this._inputRestrictionCount;
        this._inputRestrictionMap[id] = true;
        return id;
    },
    
    /**
     * Handles an application failure, refusing future input and displaying an error message over the entirety of the domain 
     * element.
     * 
     * @param {String} msg the message to display (a generic message will be used if omitted) 
     */
    fail: function(msg) {
        // Block future input.
        this.createInputRestriction(false);
        
        // Default message.
        msg = msg || "This application has been stopped due to an error. Press the reload or refresh button.";
        
        // Darken screen.
        if (!Core.Web.Env.NOT_SUPPORTED_CSS_OPACITY) {
            var blackoutDiv = document.createElement("div");
            blackoutDiv.style.cssText = "position:absolute;z-index:32766;width:100%;height:100%;background-color:#000000;" +
                    "opacity:0.75;";
            this.domainElement.appendChild(blackoutDiv);
        }

        // Display fail message.
        var div = document.createElement("div");
        div.style.cssText = "position:absolute;z-index:32767;width:100%;height:100%;";
        this.domainElement.appendChild(div);
        var msgDiv = document.createElement("div");
        msgDiv.style.cssText = "border:#5f1f1f outset 1px;background-color:#5f1f1f;color:#ffffff;padding:2px 10px;";
        msgDiv.appendChild(document.createTextNode(msg));
        div.appendChild(msgDiv);
        var xDiv = document.createElement("div");
        xDiv.style.cssText = "color:red;line-height:90%;font-size:" + 
                (new Core.Web.Measure.Bounds(this.domainElement).height || 100) + 
                "px;text-align:center;overflow:hidden;";
        xDiv.appendChild(document.createTextNode("X"));
        div.appendChild(xDiv);
        
        // Attempt to dispose.
        this.dispose();
    },
    
    /**
     * Forces IE browser to re-render entire document if the height of the application's domain element measures zero.
     * This is a workaround for an Internet Explorer bug where the browser's rendering engine fundamentally fails and simply
     * displays a blank screen (commonly referred to on bug-tracker/forum as the "blank screen of death"/BSOD).
     * This bug appears to be most prevalent in IE7. 
     */
    _forceIERedraw: function() {
        if (Core.Web.Env.BROWSER_INTERNET_EXPLORER && this.domainElement.offsetHeight === 0) {
            var displayState = document.documentElement.style.display;
            if (!displayState) {
                displayState = "";
            }
            document.documentElement.style.display = "none";
            document.documentElement.style.display = displayState;
        }
    },
    
    /**
     * Listener for application change of component focus:
     * invokes focus() method on focused component's peer.
     * 
     * @param e the event
     */
    _processApplicationFocus: function(e) {
        var focusedComponent = this.application.getFocusedComponent();
        if (focusedComponent && focusedComponent.peer && focusedComponent.peer.renderFocus) {
            focusedComponent.peer.renderFocus();
        }
    },
    
    /**
     * Root KeyDown event handler.
     * Specifically processes tab key events for focus management.
     * 
     * @param e the event
     */
    _processKeyPress: function(e) {
        if (e.keyCode == 9) { // Tab
            this.application.focusNext(e.shiftKey);
            Core.Web.DOM.preventEventDefault(e);
            return false; // Stop propagation.
        }
        return true; // Allow propagation.
    },
    
    /**
     * Processes updates to the component hierarchy.
     * Invokes <code>Echo.Render.processUpdates()</code>.
     */
    processUpdates: function() {
        var ir = null;
        try {
            ir = this.createInputRestriction();
            Echo.Render.processUpdates(this);
        } finally {
            this.removeInputRestriction(ir);
            this._forceIERedraw();
        }
    },
    
    /**
     * Registers a listener to be notified when all input restrictions have been removed.
     * 
     * @param {Echo.Component} component the component for which the restriction listener is being registered
     * @param {Function} l the method to notify when all input restrictions have been cleared 
     */
    registerRestrictionListener: function(component, l) {
        if (!this._inputRestrictionListeners) {
            this._inputRestrictionListeners = { };
        }
        this._inputRestrictionListeners[component.renderId] = l;
    },
    
    /**
     * Removes an input restriction.
     *
     * @param {String} id the id (handle) of the input restriction to remove
     */
    removeInputRestriction: function(id) {
        if (this._inputRestrictionMap[id] === undefined) {
            return;
        }
        delete this._inputRestrictionMap[id];
        --this._inputRestrictionCount;
        
        if (this._inputRestrictionCount === 0) {
            // Last input restriction removed.

            // Remove wait indicator from scheduling (if wait indicator has not been presented yet, it will not be).
            Core.Web.Scheduler.remove(this._waitIndicatorRunnable);
            
            // Disable wait indicator.
            if (this._waitIndicatorActive) {
                this._waitIndicatorActive = false;
                this._waitIndicator.deactivate();
            }
            
            if (this._inputRestrictionListeners) {
                // Notify input restriction listeners.
                for (var x in this._inputRestrictionListeners) {
                    this._inputRestrictionListeners[x]();
                }
                
                // Clear input restriction listeners.
                this._inputRestrictionListeners = null;
            }
        }
    },
    
    /**
     * Sets the wait indicator that will be displayed when a client-server action takes longer than
     * a specified period of time.
     * 
     * @param {Echo.Client.WaitIndicator} waitIndicator the new wait indicator 
     */
    setWaitIndicator: function(waitIndicator) {
        if (this._waitIndicator) {
            this._waitIndicator.deactivate();
        }
        this._waitIndicator = waitIndicator;
    },
    
    /**
     * Activates the wait indicator.
     */
    _waitIndicatorActivate: function() {
        this._waitIndicatorActive = true;
        this._waitIndicator.activate();
    },

    /**
     * Instance listener to respond to resizing of browser window.
     * 
     * @param e the DOM resize event
     */
    _windowResizeListener: function(e) {
        Echo.Render.notifyResize(this.application.rootComponent);
    }
});

/**
 * Provides a debugging tool for measuring performance of the Echo3 client engine.
 * This is generally best used to measure performance before/after modifications. 
 */
Echo.Client.Timer = Core.extend({

    /** Array of times. */
    _times: null,
    
    /** Array of labels. */
    _labels: null,
    
    /**
     * Creates a new debug timer.
     * 
     * @constructor
     */
    $construct: function() {
        this._times = [new Date().getTime()];
        this._labels = ["Start"];
    },
    
    /**
     * Marks the time required to complete a task.  This method should be invoked
     * when a task is completed with the 'label' specifying a description of the task.
     * 
     * @param {String} label a description of the completed task.
     */
    mark: function(label) {
        this._times.push(new Date().getTime());
        this._labels.push(label);
    },
    
    /**
     * Returns a String representation of the timer results, showing how long
     * each task required to complete (and included a total time).
     * 
     * @return the timer results
     * @type String
     */
    toString: function() {
        var out = "";
        for (var i = 1; i < this._times.length; ++i) {
            var time = this._times[i] - this._times[i - 1];
            out += this._labels[i] + ":" + time + " ";
        }
        out += "TOT:" + (this._times[this._times.length - 1] - this._times[0]) + "ms";
        return out;
    }
});

/**
 * Abstract base class for "Wait Indicators" which are displayed when the
 * application is not available (e.g., due to in-progress client/server
 * activity. A single wait indicator will be used by the application.
 */
Echo.Client.WaitIndicator = Core.extend({

    $abstract: {
        
        /**
         * Wait indicator activation method. Invoked when the wait indicator
         * should be activated. The implementation should add the wait indicator
         * to the DOM and begin any animation (if applicable).
         */
        activate: function() { },
        
        /**
         * Wait indicator deactivation method. Invoked when the wait indicator
         * should be deactivated. The implementation should remove the wait
         * indicator from the DOM, cancel any animations, and dispose of any
         * resources.
         */
        deactivate: function() { }
    }
});

/**
 * Default wait indicator implementation.
 */
Echo.Client.DefaultWaitIndicator = Core.extend(Echo.Client.WaitIndicator, {

    /** Creates a new DefaultWaitIndicator. */
    $construct: function() {
        this._divElement = document.createElement("div");
        this._divElement.style.cssText = "display: none;z-index:32767;position:absolute;top:30px;right:30px;" +
                 "width:200px;padding:20px;border:1px outset #abcdef;background-color:#abcdef;color:#000000;text-align:center;";
        this._divElement.appendChild(document.createTextNode("Please wait..."));
        this._fadeRunnable = new Core.Web.Scheduler.MethodRunnable(Core.method(this, this._tick), 50, true);
        document.body.appendChild(this._divElement);
    },
    
    /** @see Echo.Client.WaitIndicator#activate */
    activate: function() {
        this._divElement.style.display = "block";
        Core.Web.Scheduler.add(this._fadeRunnable);
        this._opacity = 0;
    },
    
    /** @see Echo.Client.WaitIndicator#deactivate */
    deactivate: function() {
        this._divElement.style.display = "none";
        Core.Web.Scheduler.remove(this._fadeRunnable);
    },
    
    /**
     * Runnable-invoked method to animate (fade in/out) wait indicator.
     */
    _tick: function() {
        ++this._opacity;
        // Formula explained:
        // this._opacity starts at 0 and is incremented forever.
        // First operation is to modulo by 40 then subtract 20, result ranges from -20 to 20.
        // Next take the absolute value, result ranges from 20 to 0 to 20.
        // Divide this value by 30, so the range goes from 2/3 to 0 to 2/3.
        // Subtract that value from 1, so the range goes from 1/3 to 1 and back.
        var opacityValue = 1 - (Math.abs((this._opacity % 40) - 20) / 30);
        if (!Core.Web.Env.PROPRIETARY_IE_OPACITY_FILTER_REQUIRED) {
            this._divElement.style.opacity = opacityValue;
        }
    }
});

