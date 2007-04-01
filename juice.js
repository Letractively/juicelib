
/**
* JUICE Javascript User Interface Component Library
* Code licensed under the BSD License:
* @creator Miguel Galves
* @version 0.1
*/

var juice = {};

/**
* @class JUICE LOGGER. Provides some basic logging functions, with 3 levels: DEBUG, ERROR and INFO
* @constructor
*/
juice.Logger = function(){
	
	/**	
	* Default logger: show alert messages
	* @private
	*/
	function alert_log(message){alert(message);}
	
	/**
	* DEBUG LEVEL
	* @private
	* @final
	*/
	var debug_level= 3;
	
	/**
	* ERROR LEVEL
	* @private
	* @final
	*/
	var error_level= 2;
	
	/**
	* INFO LEVEL
	* @private
	* @final
	*/
	var info_level= 1;
	
	/**
	* NONE LEVEL
	* @private
	* @final
	*/
	var none= 0;
	
	/**
	* current level
	* @private
	*/
	var current_level = 0;
	
	/**
	* current logger
	* @private
	* @final
	*/
	var log = alert_log;
	
	this.setNone = function(){
		current_level = none;
	}
	
	this.setDebugLevel = function(){
		current_level = debug_level;
	}
	
	this.setErrorLevel = function(){
		current_level = error_level;
	}
	
	this.setInfoLevel = function(){
		current_level = info_level;
	}
	
	this.setAlertLogger =  function(){
		log = alert_log;
	}
	
	this.setCustomLogger = function(logger){
		log = logger;
	}
	
	this.debug = function(message){
		if(log && current_level >= debug_level)
			log("[JUICE DEBUG]"+message);
	}
	
	this.info = function(message){
		if(log && current_level >= info_level)
			log("[JUICE INFO]"+message);
	}
	
	this.error = function(message){
		if(log && current_level >= error_level)
			log("[JUICE ERROR]"+message);
	}
	
}


//#################################################

/**
* ADD SOME NICE FUNCTIONALITIES TO STRING OBJECT
*/

/** 
* Returns a new string, whithout white spaces at the end of the given string
*/
String.prototype.rstrip = function(){
	return this.replace(/\s+$/, "");
}

/**
* Returns a new string, whithout leading white spaces of the given string
*/
String.prototype.lstrip = function(){
	return this.replace(/^\s+/, "");
}

/**
* Returns a new string, whithout  both leading and trailing white spaces of the given string
*/
String.prototype.fstrip = function(){
	return this.rstrip().lstrip();
}

/**
* Juice.text: provides some basic string functionalities
*/
juice.text = {
	/**
	* Creates a new empty StringBuffer.
	* @class StringBuffer: String buffer object. Should be used
	* for string concatenation instead of + operator
	* @constructor
	*/
	StringBuffer: function(){
		var _buffer = []; 
	
		/**
		* Appends a new string at the end of the current
		* string buffer
		* @param {String} string String to be appended
		*/	
		this.append = function(string) {
			if(string && typeof string == "string")
  				_buffer.push(string); 
  			return this; 
		}
	
		/**
		* Returns a string representation of the current buffer
		* @type String
		*/
		this.toString = function() {
  			return _buffer.join(""); 
		}
		
		/**
		* Returns a string representation of the current buffer,
		* joining each string appended using c
		* @param {char} c character used to append each string
		* @type St{ring
		*/
		this.concat = function(c) {
  			return _buffer.join(c); 
		}
	}
};

//#################################################

/**
* ADD SOME NICE FUNCTIONALITIES TO ARRAY OBJECT
*/

/**
* Reduce function.
*/
Array.prototype.reduce = function(func){
	if (!func || typeof func != "function")
		throw "Invalid parameter: func must be a valid function reference"
	var _len = this.length;
	if (_len == 0) return null;
	if (_len == 1) return this[0];
	var _result = func(this[0], this[1]);
	for (var i=2; i<_len; i++){
		_result = func(this[i], _result);
	}
	return _result;
}

/**
* Map function. Apply a function f to all elements of an array
* modifying the original array.
*/
Array.prototype.map = function(func){
	if (!func || typeof func != "function")
		throw "Invalid parameter: func must be a valid function reference"
	var _len = this.length;
	for (var i=0; i<_len; i++){
		this[i] = func(this[i]);
	}
	return this;
}
	
/**
* Filter function. Returns a list of elements of the original array
* such as func(x) = true. Returns a new array
*/
Array.prototype.filter = function(func){
	if (!func || typeof func != "function")
		throw "Invalid parameter: func must be a valid function reference"
	var _len = this.length;
	var _list = [];
	for (var i=0; i<_len; i++){
		var tmp = this[i];
		if(func(tmp)) {
			_list.push(tmp)
		}
	}
	return _list;
}

juice.data = {
    /**
    * Returns an array containing the keys stored in 
	* an associative array (dict). Returns an
	* empty list if dict is null
	*/
	dictKeys: function(dict){
		var ks = [];
		if (dict)
			for (var i in dict) ks.push(i);
		return ks;
	},
	/**
    * Returns an array containing the values stored in
	* an associative array (dict). Returns an
	* empty list if dict is null
	*/
	dictValues: function(dict){
		var vs = [];
		if (dict){
			for (var i in dict) vs.push(dict[i]);
		}
		return vs;
	}
};

// ################################################

juice.rpc = {
	/**
	* Function that builds a query string based on
	* an associative array
	* @param {Dict} dict Associative array containing keys and values
	* @return  URI query string in the form key=value&key=value
	* @type String
	*/
	buildRequestStr: function(dict){
		var ks  = juice.data.dictKeys(dict);
		var sb = new juice.text.StringBuffer();
		var isfirst = true;
		var len = ks.length;
		for (var i=0; i<len; i++){
			if (isfirst) isfirst = false;
			else sb.append("&");
			sb.append(encodeURIComponent(ks[i]));
			sb.append("=");
			sb.append(encodeURIComponent(dict[ks[i]]));
		}
		return sb.toString();
	},
	
	/**
	* AJAX Class
	*/
	Ajax: function(url, response, error){
		var eh = error;
  		var rh = response;
  		var u = url;
 
  		/**
  		* Create a new request object
  		*/
  		function _initreq(response_handler, error_handler){
  			var req;
    		if (window.XMLHttpRequest){
    			req = new XMLHttpRequest();
    		} else {
      			if (window.ActiveXObject){
					req =  new ActiveXObject('Microsoft.XMLHTTP');
      			}else{
					return null;
      			}
    		}
    		if(response_handler)
    			req.onreadystatechange = _callback(req, response_handler, error_handler);
    		return req;
  		}
  
  		/** 
  		* _callback handler. Uses closure to check if the response 
  		*  is available, and calls the response handler defined by the user
  		* passing the wrapped response object
  		*/
  		function _callback(requestObject, response_handler, error_handler){
  			var req = requestObject;
    		var response = response_handler;
    		var error = error_handler;
    		var cb	=  function(){
   				if (req.readyState == 4){
					if (req.status == 200){
	  					if(response){
	  						response(new Wrapper(req));
	  					}
					}
					else{ 
	  					if(error){
	    					error(new Wrapper(req));
	  					}else{	
	    					juice.logger.error('HTTP ERROR: ' + req.statusText + ' ' + r.status);
	  					}
					}
      			}
    		}
    		return cb; 
  		}

  		function Wrapper(responseObject){
  			var r = responseObject;
  			return{
  				xml: function (){try{return r.responseXML;}catch(e){return null;}}, 
  				text: function(){try{return r.responseText;}catch(e){return null;}}, 
  				json:function(){
    				try{
    					var val = juice.text.fstrip(r.responseText); 
   						return eval("("+val+")");
    				}catch(e){
    					return null;
    				}
  				},
  				statusText: function(){try{return r.statusText;}catch(e){return null;}},
  				statusCode: function(){try{return r.status;}catch(e){return null;}},
  				requestObject: function(){return r;}
  			} 
  		}	 
  
  		// PUBLIC METHODS
  		/**
  		* Performs an asynchronous post request
  		*/
  		this.post = function(parameters){
    		var requestObject = _initreq(rh, eh);
    		if(requestObject){
      			try{
      				requestObject.open('POST', u, true);
      				requestObject.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
      				requestObject.setRequestHeader("Connection", "close");
      				if (parameters != null)
						requestObject.setRequestHeader("Content-length", parameters.length);
      				requestObject.send(parameters);
				}catch(e){
      				juice.logger.error("AJAX ERROR::"+e);
				}
    		}
  		}
  	
  		/**
  		* Performs an asynchronous post request
  		*/
  		this.get = function(parameters){
    		var requestObject = _initreq(rh, eh);
			var furl = u;
    		if(parameters != null)
    			furl = furl +'?'+parameters; 
    		if(requestObject){
      			try{
      				requestObject.open('GET', furl, true);
      				requestObject.send(null);
      			}catch(e){
      				juice.logger.error("AJAX ERROR::"+e);
      			}
    		}
  	 	}
	}
};

// ################################################
juice.events = {};

juice.events.onload = new function(){
	
		/** @private */
		/* Function pointer list */
		var _flist = [];
		/* function name list */
		var _strlist = []
	
		// SOLUTION FOR SAFARI. NOT MINE
		if (/WebKit/i.test(navigator.userAgent)) {
    		var _timer = setInterval(function() {
        		if (/loaded|complete/.test(document.readyState)) {
            		clearInterval(_timer);
            		_run(); // call the onload handler
        		}
   	 		}, 10);
		}else{
			var oldonload = window.onload;
			if(oldonload==null || typeof oldonload != "function"){
				window.onload = _run;
			}else{
				window.onload = new function (){
					oldonload();
					_run();
				}
			}
		}
	
		/**
		* Executes each registered function
		*/
		function _run(){
			var len = _flist.length;
			for (var i=0; i<len; i++){
				_flist[i]();	
			}
			len = _strlist.length;
			for (var i=0; i<len; i++){
				try{
					eval(_strlist[i]);	
				}catch(e){}
			}
		}
	
		/* PUBLIC FUNCTIONS */
	
		return {
			/**
			* Registers a function to be executed after document loading
			* @param {object} func Function pointer to be executed or 
			*		string to be evaluated after document loading
			* @member juice.events.OnLoadEventManager
			*/
			add: function(func){
				if (typeof func == "function")
					_flist.push(func);
				else if(typeof func == "string")
					_strlist.push(func);
				else 
					throw "Argument must be function pointer or string"
			},
	
			/**
			* Removes all registered functions
			* @member juice.events.OnLoadEventManager
			*/
			reset: function(){
				_flist = [];
				_strlist = [];
			},
	
			/**
			* Provides a method for body.onload attribute,
			* in case the automatic behaviour does not work
			* properly
			* @member juice.events.OnLoadEventManager
			*/
			exec: function(){
				_run();
			}
			
		};
};

/**
* KEYBOARD EVENT MANAGER. Fires action based on key pressed
* outside input wodgets (textfield, textarea, input).
* DOES NOT WORK FOR SAFARI
*/
juice.events.key = new function(){
	
		/** @private */
		/* function name list */
		var _selist = {};
		
		/**
		* Turn handlers ons. They are turned off by default
		*/
		function _addhandlers(){
			// Single events handler
			document.onkeyup=_handler;
		}
		
		function _removehandlers(){
			// Single events handler
			document.onkeyup=undefined;
		}
		
	
		var _handler = function(e){
				var code;
				if (!e) var e = window.event;
				// Detecta o target da tecla
				var targ;
				if (e.target) targ = e.target;
				else if (e.srcElement) targ = e.srcElement;
				if (targ.nodeType == 3) // defeat Safari bug
					targ = targ.parentNode;
		
				tag = targ.tagName.toUpperCase();
	
				if (tag == "SELECT")
					return;
				if (tag == "INPUT")
					return;
				if (tag == "TEXTAREA")
					return;
		
				// Detecta o codigo da tecla
				if (e.keyCode) code = e.keyCode;
				else if (e.which) code = e.which;
					
				if (_selist[code]){
					_selist[code](e);
				}
		}
		
	
		/* PUBLIC FUNCTIONS */
		
		return {
			/**
			* Registers a function to be executed when the given char is pressed
			* @param char event trigger
			* @param func Function pointer to be executed 
			*/
			add: function(symbol,func){
				_selist[symbol.charCodeAt(0)] = func;
			},
			/**
			* Registers a function to be executed when the left key is pressed
			* @param func Function pointer to be executed 
			*/
			left: function(func){
				_selist[37] = func;
			},
			/**
			* Registers a function to be executed when the right key is pressed
			* @param func Function pointer to be executed 
			*/
			right: function(func){
				_selist[39] = func;
			},	
			/**
			* Registers a function to be executed when the up key is pressed
			* @param func Function pointer to be executed 
			*/
			up: function(func){
				_selist[38] = func;
			},
			/**
			* Registers a function to be executed when the down key is pressed
			* @param func Function pointer to be executed 
			*/	
			down: function(func){
				_selist[40] = func;
			},	
			/**
			* Turn off the keyboard handler
			*/
			unhandleKeys: function(){
				_removehandlers();
			},
			/**
			* Turn on the keyboard handler
			*/
			handleKeys: function(){
				_addhandlers();
			}
			
		};
};
