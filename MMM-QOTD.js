/* Magic Mirror
 * Module: MMM-QOTD
 *
 * By philavedzenge
 *
 */
Module.register("MMM-QOTD", {

    // Module config defaults.
    defaults: {
        useHeader: true, // false if you don't want a header
        header: "Quote of the Day", // Any text you want
        maxWidth: "250px",
        rotateInterval: 0,
        animationSpeed: 1000000, // fade in and out speed
        initialLoadDelay: 0,
        retryDelay: 2500,
        updateInterval: 60 * 60 * 1000,

    },

    getStyles: function() {
        return ["MMM-QOTD.css"];
    },

    start: function() {
        Log.info("Starting module: " + this.name);

        requiresVersion: "2.1.0",

        // Set locale.
        this.UFO = {};
        this.activeItem = 0;         // <-- starts rotation at item 0 (see Rotation below)
        this.rotateInterval = null;  // <-- sets rotation time (see below)
        this.scheduleUpdate();       // <-- When the module updates (see below)
    },

    getDom: function() {
		
		// creating the wrapper
        var wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        wrapper.style.maxWidth = this.config.maxWidth;
	    wrapper.innerHTML = "Daily Bread";
            wrapper.classList.add("bright", "light", "small");
	    
	    var scripture = document.createElement("div");
            scripture.classList.add("scripture");
            scripture.innerHTML = "("+this.UFO.scripture+")  "+this.UFO.scriptureText;
            wrapper.appendChild(scripture);
	    
	    var messageDate = document.createElement("div");
            messageDate.classList.add("messageDate");
            messageDate.innerHTML = this.UFO.messageTitle+"   ("+this.UFO.messageDate+")";
            wrapper.appendChild(messageDate);
	    
	    var messageText = document.createElement("div");
            messageText.classList.add("messageText");
            messageText.innerHTML = this.UFO.messageText;
            wrapper.appendChild(messageText);
		
        return wrapper;
		
    }, // <-- closes the getDom function from above

	// this processes your data
    processQuote: function(data) { 
        this.UFO = data; 
        this.loaded = true;
    },
	
	
	
// this tells module when to update
    scheduleUpdate: function() { 
        setInterval(() => {
            this.getQuote();
        }, this.config.updateInterval);
        this.getQuote(this.config.initialLoadDelay);
        var self = this;
    },
	
	
	// this asks node_helper for data
    getQuote: function() { 
        this.sendSocketNotification('GET_QUOTE');
	Log.info("Starting module: getQuote");
    },
	
	
	// this gets data from node_helper
    socketNotificationReceived: function(notification, payload) { 
        if (notification === "QUOTE_RESULT") {
	    Log.info("Notification received: socketNotificationReceived"+payload.messageText);
            this.processQuote(payload);
            this.updateDom(this.animationSpeed);
        }
        this.updateDom(this.config.initialLoadDelay);
    },
});
