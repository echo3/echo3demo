/**
 * Component rendering peer: CalendarSelect
 */
Extras.Sync.CalendarSelect = Core.extend(Echo.Render.ComponentSync, {

    $static: {
    
        DEFAULT_FOREGROUND: "#000000",
        DEFAULT_BACKGROUND: "#ffffff",
        DEFAULT_BORDER: "2px groove #5f5faf",
        DEFAULT_SELECTED_DATE_FOREGROUND: "#000000",
        DEFAULT_SELECTED_DATE_BACKGROUND: "#ffffaf",
        DEFAULT_ADJACENT_MONTH_DATE_FOREGROUND: "#7f7f7f",

        _DAYS_IN_MONTH: [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        
        resource: new Core.ResourceBundle({
            "DayOfWeek.0":     "Sunday",
            "DayOfWeek.1":     "Monday",
            "DayOfWeek.2":     "Tuesday",
            "DayOfWeek.3":     "Wednesday",
            "DayOfWeek.4":     "Thursday",
            "DayOfWeek.5":     "Friday",
            "DayOfWeek.6":     "Saturday",
            "Month.0":         "January",
            "Month.1":         "February",
            "Month.2":         "March",
            "Month.3":         "April",
            "Month.4":         "May",
            "Month.5":         "June",
            "Month.6":         "July",
            "Month.7":         "August",
            "Month.8":         "September",
            "Month.9":         "October",
            "Month.10":        "November",
            "Month.11":        "December",
            "FirstDayOfWeek":  "0"
        }),
        
        /**
         * Determines the number of days in a specific month.
         *
         * @param year the year of the month
         * @param month the month
         * @return the number of days in the month
         */
        getDaysInMonth: function(year, month) {
            if (month == 1) {
                if (year % 400 === 0) {
                    return 29;
                } else if (year % 100 === 0) {
                    return 28;
                } else if (year % 4 === 0) {
                    return 29;
                } else {
                    return 28;
                }
            } else {
                return this._DAYS_IN_MONTH[month];
            }
        }
    },

    $load: function() {
        Echo.Render.registerPeer("Extras.CalendarSelect", this);
    },
    
    _element: null,
    _monthSelect: null,
    _yearField: null,
    _dayTdElements: null,
    
    _year: null,
    _month: null,
    _day: null,
    
    _msg: null,
    
    // FIXME temporary
    _icons: { },
    
    _calculateCalendarInformation: function() {
        var firstDate = new Date(this._year, this._month, 1);
        this._firstDayOfMonth = firstDate.getDay();
        
        this._daysInMonth = Extras.Sync.CalendarSelect.getDaysInMonth(this._year, this._month);
        if (this._month == 0) {
            this._daysInPreviousMonth = Extras.Sync.CalendarSelect.getDaysInMonth(this._year - 1, 11);
        } else {
            this._daysInPreviousMonth = Extras.Sync.CalendarSelect.getDaysInMonth(this._year, this._month - 1);
        }
    },
    
    _processDateSelect: function(e) {
        if (!this.client.verifyInput(this.component, Echo.Client.FLAG_INPUT_PROPERTY)) {
            return;
        }
        if (e.target._cellIndex == null) {
            return;
        }
        var cellIndex = e.target._cellIndex;
        
        var selectedDay, selectedMonth, selectedYear;
        if (cellIndex < this._firstDayOfMonth) {
            if (this._month == 0) {
                selectedMonth = 11;
                selectedYear = this._year - 1;
            } else {
                selectedMonth = this._month - 1;
                selectedYear = this._year;
            }
            selectedDay = this._daysInPreviousMonth - this._firstDayOfMonth + cellIndex + 1;
        } else if (cellIndex >= (this._firstDayOfMonth + this._daysInMonth)) {
            if (this._month == 11) {
                selectedMonth = 0;
                selectedYear = this._year + 1;
            } else {
                selectedMonth = this._month + 1;
                selectedYear = this._year;
            }
            selectedDay = cellIndex - this._firstDayOfMonth - this._daysInMonth + 1;
        } else {
            selectedMonth = this._month;
            selectedYear = this._year;
            selectedDay = cellIndex - this._firstDayOfMonth + 1;
        }
        
        this._setDate(selectedYear, selectedMonth, selectedDay);
        this._updateCalendarDisplay();
        this._storeValue();
    },
    
    _processMonthSelect: function(e) {
        if (!this.client.verifyInput(this.component, Echo.Client.FLAG_INPUT_PROPERTY)) {
            this._monthSelect.selectedIndex = this._month;
            return;
        }
        
        this._month = this._monthSelect.selectedIndex;
        this._updateCalendarDisplay();
        this._storeValue();
    },
    
    _processYearChange: function(e) {
        if (!this.client.verifyInput(this.component, Echo.Client.FLAG_INPUT_PROPERTY)) {
            this._yearField.value = this._year;
            return;
        }
        this._year = parseInt(this._yearField.value);
        this._updateCalendarDisplay();
        this._storeValue();
    },
    
    _processYearDecrement: function(e) {
        if (!this.client.verifyInput(this.component, Echo.Client.FLAG_INPUT_PROPERTY)) {
            return;
        }
        --this._year;
        this._yearField.value = this._year;
        this._updateCalendarDisplay();
        this._storeValue();
    },

    _processYearIncrement: function(e) {
        if (!this.client.verifyInput(this.component, Echo.Client.FLAG_INPUT_PROPERTY)) {
            retrun;
        }
        ++this._year;
        this._yearField.value = this._year;
        this._updateCalendarDisplay();
        this._storeValue();
    },

    renderAdd: function(update, parentElement) {
        // Load localization data.
        this._msg = Extras.Sync.CalendarSelect.resource.get(this.component.getRenderLocale());

        var enabled = this.component.isRenderEnabled()
    
        var i, j, tdElement, trElement;
        var dayOfWeekNameAbbreviationLength = parseInt(this.component.render("dayOfWeekNameAbbreviationLength", 2));
        var firstDayOfWeek = this._msg["FirstDayOfWeek"];
        if (!firstDayOfWeek) {
            firstDayOfWeek = 0;
        }
    
        this._element = document.createElement("div");
        this._element.style.whiteSpace = "nowrap";
        
        this._monthSelect = document.createElement("select");
        for (var i = 0; i < 12; ++i) {
            var optionElement = document.createElement("option");
            optionElement.appendChild(document.createTextNode(this._msg["Month." + i]));
            this._monthSelect.appendChild(optionElement);
        }
        if (!enabled) {
            this._monthSelect.disabled = true;
        }
        this._element.appendChild(this._monthSelect);
        
        this._element.appendChild(document.createTextNode(" "));
        
        this._yearDecrementElement = document.createElement("span");
        this._yearDecrementElement.style.cursor = "pointer";
        if (this._icons.decrement) {
            var imgElement = document.createElement("img");
            imgElement.src = this._icons.decrement;
            this._yearDecrementElement.appendChild(imgElement);
        } else {
            this._yearDecrementElement.appendChild(document.createTextNode("<"));
        }
        this._element.appendChild(this._yearDecrementElement);
        
        this._yearField = document.createElement("input");
        this._yearField.type = "text";
        this._yearField.maxLength = 4;
        this._yearField.size = 5;
        if (!enabled) {
            this._yearField.readOnly = true;
        }
        this._element.appendChild(this._yearField);

        this._yearIncrementElement = document.createElement("span");
        this._yearIncrementElement.style.cursor = "pointer";
        if (this._icons.increment) {
            var imgElement = document.createElement("img");
            imgElement.src = this._icons.increment;
            this._yearIncrementElement.appendChild(imgElement);
        } else {
            this._yearIncrementElement.appendChild(document.createTextNode(">"));
        }
        this._element.appendChild(this._yearIncrementElement);
        
        this._tableElement = document.createElement("table");
        this._tableElement.style.borderCollapse = "collapse";
        this._tableElement.style.margin = "1px";
        Echo.Sync.Border.render(this.component.render("border", 
                Extras.Sync.CalendarSelect.DEFAULT_BORDER), this._tableElement);
        Echo.Sync.Color.render(this.component.render("foreground",
                Extras.Sync.CalendarSelect.DEFAULT_FOREGROUND), this._tableElement); 
        Echo.Sync.FillImage.render(this.component.render("backgroundImage"), this._tableElement); 
        
        var tbodyElement = document.createElement("tbody");
        
        trElement = document.createElement("tr");
        for (j = 0; j < 7; ++j) {
            tdElement = document.createElement("td");
            var dayOfWeekName = this._msg["DayOfWeek." + ((firstDayOfWeek + j) % 7)];
            if (dayOfWeekNameAbbreviationLength > 0) {
                dayOfWeekName = dayOfWeekName.substring(0, dayOfWeekNameAbbreviationLength);
            }
            tdElement.appendChild(document.createTextNode(dayOfWeekName));
            trElement.appendChild(tdElement);
        }
        tbodyElement.appendChild(trElement);
        
        this._dayTdElements = [];
        
        var prototypeTdElement = document.createElement("td");
        prototypeTdElement.style.cursor = "pointer";
        prototypeTdElement.style.textAlign = "right";
        prototypeTdElement.style.borderWidth = "0";
        prototypeTdElement.style.padding = "0px 5px";
        
        for (i = 0; i < 6; ++i) {
            this._dayTdElements[i] = [];
            trElement = document.createElement("tr");
            for (j = 0; j < 7; ++j) {
                this._dayTdElements[i][j] = prototypeTdElement.cloneNode(false);
                this._dayTdElements[i][j]._cellIndex = i * 7 + j;
                trElement.appendChild(this._dayTdElements[i][j]);
            }
            tbodyElement.appendChild(trElement);
        }
        
        this._tableElement.appendChild(tbodyElement);
        this._element.appendChild(this._tableElement);
        
        parentElement.appendChild(this._element);
        

        Core.Web.Event.add(this._monthSelect, "change", Core.method(this, this._processMonthSelect), false);
        Core.Web.Event.add(this._yearField, "change", Core.method(this, this._processYearChange), false);
        Core.Web.Event.add(this._yearDecrementElement, "click", Core.method(this, this._processYearDecrement), false);
        Core.Web.Event.add(this._yearIncrementElement, "click", Core.method(this, this._processYearIncrement), false);
        Core.Web.Event.add(this._tableElement, "click", Core.method(this, this._processDateSelect), false);

        var date = this.component.get("date");
        if (!date) {
            date = new Date();
        }
        this._setDate(date.getFullYear(), date.getMonth(), date.getDate());
        
        this._updateCalendarDisplay();
    },
    
    renderDispose: function(update) {
        Core.Web.Event.removeAll(this._monthSelect);
        Core.Web.Event.removeAll(this._yearField);
        Core.Web.Event.removeAll(this._yearDecrementElement);
        Core.Web.Event.removeAll(this._yearIncrementElement);
        Core.Web.Event.removeAll(this._tableElement);
    
        this._dayTdElements = null;
        this._element = null;
        this._monthSelect = null;
        this._yearField = null;
    },
    
    renderUpdate: function(update) {
        var element = this._element;
        var containerElement = element.parentNode;
        Echo.Render.renderComponentDispose(update, update.parent);
        containerElement.removeChild(element);
        this.renderAdd(update, containerElement);
        return false;
    },
    
    _setDate: function(year, month, day) {
        this._year = year;
        this._month = month;
        this._day = day;
    },
    
    _storeValue: function() {
        this.component.set("date", new Date(this._year, this._month, this._day));
    },
    
    _updateCalendarDisplay: function() {
        this._yearField.value = this._year;
        this._monthSelect.selectedIndex = this._month;

        this._calculateCalendarInformation();
        var day = 1 - this._firstDayOfMonth;
        
        var adjacentMonthDateForeground = this.component.render("adjacentMonthDateForeground",
                Extras.Sync.CalendarSelect.DEFAULT_ADJACENT_MONTH_DATE_FOREGROUND);
        var foreground = this.component.render("foreground", 
                Extras.Sync.CalendarSelect.DEFAULT_FOREGROUND);
        var selectedForeground = this.component.render("selectedForeground", 
                Extras.Sync.CalendarSelect.DEFAULT_SELECTED_DATE_FOREGROUND);
        var selectedBackground = this.component.render("selectedBackground", 
                Extras.Sync.CalendarSelect.DEFAULT_SELECTED_DATE_BACKGROUND);
        
        for (var i = 0; i < 6; ++i) {
            for (var j = 0; j < 7; ++j) {
                var tdElement = this._dayTdElements[i][j];
                
                while (tdElement.hasChildNodes()) {
                    tdElement.removeChild(tdElement.firstChild);
                }
                
                var renderedText;
                var styleText;
                if (day < 1) {
                    renderedText = this._daysInPreviousMonth + day;
                    Echo.Sync.Color.renderClear(adjacentMonthDateForeground, tdElement, "color");
                    Echo.Sync.Color.renderClear(null, tdElement, "backgroundColor");
                } else if (day > this._daysInMonth) {
                    renderedText = day - this._daysInMonth;
                    Echo.Sync.Color.renderClear(adjacentMonthDateForeground, tdElement, "color");
                    Echo.Sync.Color.renderClear(null, tdElement, "backgroundColor");
                } else {
                    renderedText = day;
                    if (day == this._day) {
                        Echo.Sync.Color.renderClear(selectedForeground, tdElement, "color");
                        Echo.Sync.Color.renderClear(selectedBackground, tdElement, "backgroundColor");
                    } else {
                        Echo.Sync.Color.renderClear(foreground, tdElement, "color");
                        Echo.Sync.Color.renderClear(null, tdElement, "backgroundColor");
                    }
                }
                var textNode = document.createTextNode(renderedText);
                tdElement.appendChild(textNode);
                ++day;
            }
        }
    }
});    