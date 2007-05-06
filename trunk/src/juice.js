/***************************************************************************
* Copyright [2006] [Miguel Galves (mgalves ate gmail dot com)] 
* 
* Licensed under the Apache License, Version 2.0 (the "License"); 
* you may not use this file except in compliance with the License. 
* You may obtain a copy of the License at 
* 
* http://www.apache.org/licenses/LICENSE-2.0 
* Unless required by applicable law or agreed to in writing, software 
* distributed under the License is distributed on an "AS IS" BASIS, 
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
* See the License for the specific language governing permissions and 
* limitations under the License.
*
* JUICE Javascript User Interface Component Library
* 
* @creator Miguel Galves
* @version 0.1.3
****************************************************************************/

var juice = {
	info:{
		name: "juice lib", 
		version: "0.1.3",
		creator: "Miguel Galves"
	}
};


/**********************************************************************
*
*                            LOG SYSTEM
*
***********************************************************************/

juice.log = {};

/**
* @class JUICE LOGGER. Provides some basic logging functions, with 3 levels: DEBUG, ERROR and INFO
* @constructor
*/
juice.log.AlertLogger = function(){
	
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
	
};


/**********************************************************************
*
*                            TEXT MANIPULATION
*
***********************************************************************/

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


/**
* ADD SOME NICE FUNCTIONALITIES TO STRING OBJECT
*/

/** 
* Returns a new string, whithout white spaces at the end of the given string
*/
String.prototype.rstrip = function(){
	return this.replace(/\s+$/, "");
};

/**
* Returns a new string, whithout leading white spaces of the given string
*/
String.prototype.lstrip = function(){
	return this.replace(/^\s+/, "");
};

/**
* Returns a new string, whithout  both leading and trailing white spaces of the given string
*/
String.prototype.fstrip = function(){
	return this.rstrip().lstrip();
};

/**
* ADD SOME HTML DOM 
*/

/*
Returns an HTML element list if the string starts with @ (elementsByTagName) or
the element with ID equals to the string value
*/
String.prototype.el = function(){
	if (/^@/.test(this)){
		var elems = document.getElementsByTagName(this.substring(1)); 
		var list = [];
		if (elems) {
			for(i=0; i<elems.length; i++) {
				list.push(elems[i]);
			}
		}
		return list;
	}else if (/^%/.test(this)){
		return document.getElementById(this.substring(1));
	}else{
		return this;
	}
};

String.prototype.apply = function(op){
	var el = this.el();
	if(!el) return;
	try {
		if(el.constructor==Array){
			el.map(op)
		}else{
			op(el);
		}
	}catch(ex){
		alert(ex);
	}
};

String.prototype.block = function(){
	this.apply(juice.html.block)
};

String.prototype.none = function(){
	this.apply(juice.html.none);
};

String.prototype.visible = function(){
	this.apply(juice.html.visible);
};

String.prototype.invisible = function(){
	this.apply(juice.html.invisible);
};

String.prototype.appendHTML = function(html){
	this.apply(function(x){juice.html.appendHTML(x, html)});
};	

String.prototype.setHTML = function(html){
	this.apply(function(x){juice.html.setHTML(x, html)});
};

String.prototype.clearHTML = function(){
	this.apply(juice.html.clearHTML);
};

String.prototype.submit = function(handler){
	this.apply(function(x){juice.html.submit(x, handler)});
};


/**********************************************************************
*
*                            HTML functions
*
***********************************************************************/
juice.html = {
	/* Sets display mode "block" */
	block: function(el){
		el.style.display="block";
	},
	/* Sets display mode "none" */
	none: function(el){
		el.style.display="none";
	},
	/* Sets visibility mode "visible" */
	visible: function(el){
		el.style.visibility="visible";
	},
	/* Sets visibility mode "hidden" */
	invisible: function(el){
		el.style.visibility="hidden";
	},
	/* Appends an HTML snippet to the given node */
	appendHTML: function(el, html){
		el.innerHTML += html;
	},
	/* Set an HTML snippet to the given node */
	setHTML: function(el, html){
		el.innerHTML = html;
	},
	/* Clear html value */
	clearHTML: function(el){
		el.innerHTML = "";
	},
	/* Submits a form using AJAX */
	submit: function(form, handler){
		if(!/form/i.test(form.tagName)) return;
		_formdata = {};
		var add = function(name, value){
			if(_formdata[name]){
				var list = [_formdata[name],value];
				_formdata[name]=list;
			}else{
				_formdata[name] = value;
			}
		};
		for (var x=0; x< form.length; x++){
			// INPUT TAGS
			if (/input/i.test(form[x].tagName) && form[x].getAttribute('type')){
				if (/checkbox/i.test(form[x].getAttribute('type')) ||
					/radio/i.test(form[x].getAttribute('type'))){
					// If its checkbox or radio, adds only checked elements
			   		if ( form[x].checked) add(form[x].name,form[x].value);
			   	}else if (/submit/i.test(form[x].getAttribute('type'))){
			   		// Button, dont add
			    	continue;
			   	}else{
			   		// Other types of inputs
			    	add(form[x].name,form[x].value);
			   	}
			}else{	
				// SELECT and TEXTAREA
				add(form[x].name,form[x].value);
			}				
		}
		// Builds the request string 
		var _req = juice.rpc.buildRequest(_formdata);
		var _url = form.getAttribute("action");
		var _method = form.getAttribute("method");
		if (_method && /post/i.test(_method)) 
			juice.rpc.post(_url, _req, handler);
		else
			juice.rpc.get(_url, _req, handler);
	}
};

/**********************************************************************
*
*                            DATA MANIPULATION
*
***********************************************************************/

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


/**
* ADD SOME NICE FUNCTIONALITIES TO ARRAY OBJECT
*/

/* Reduce function.*/
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
* and returns a new array.
*/
Array.prototype.map = function(func){
	if (!func || typeof func != "function")
		throw "Invalid parameter: func must be a valid function reference"
	var _len = this.length;
	var _list = [];
	for (var i=0; i<_len; i++){
		_list.push(func(this[i]));
	}
	return _list;
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
};

/**********************************************************************
*
*                            AJAX RPC
*
***********************************************************************/

juice.rpc = {
	/* Ajax GET request wrapper */
	get: function(url, params, response, error)	{
		var ajx = new juice.rpc.Ajax(url, response, error);
		ajx.get(params);
	},
	/* Ajax POST request wrapper */
	post: function(url, params, response, error)	{
		var ajx = new juice.rpc.Ajax(url, response, error);
		ajx.post(params);
	},
	/* Sends a message using POST method, does not wait for an answer */
	send: function(url, params)	{
		var ajx = new juice.rpc.Ajax(url);
		ajx.post(params);
	},
	/**
	* Function that builds a query string based on
	* an associative array
	* @param {Dict} dict Associative array containing keys and values
	* @return  URI query string in the form key=value&key=value
	* @type String
	*/
	buildRequest: function(dict){
		var ks  = juice.data.dictKeys(dict);
		var sb = new juice.text.StringBuffer();
		var len = ks.length;
		var append=function(name, value){
			sb.append(encodeURIComponent(name)+"="+encodeURIComponent(value));
		}
		for (var i=0; i<len; i++){
			var val = dict[ks[i]]; 
			if (val.constructor == Array){
				for(var j=0; j<val.length; j++)
					append(ks[i], encodeURIComponent(val[j]));
			}else{
				append(ks[i], encodeURIComponent(val));
			}
		}
		return sb.concat("&");
	}
};
	
/**
* AJAX Class
*/
juice.rpc.Ajax = function(url, response, error){
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
    	
    	if(response_handler || error_handler){
    		/** 
  			* callback handler. Uses closure to check if the response 
  			* is available, and calls the response handler defined by the user
  			* passing the wrapped response object
  			*/
    		req.onreadystatechange = function(){
   				if (req.readyState == 4){
					if (req.status == 200){
 						if(response_handler){
  							response_handler(new Wrapper(req));
  						}
					}
					else{ 
  						if(error_handler){
    						error_handler(new Wrapper(req));
  						}
					}
    			}
    		};
    	}		
    	return req;
  	};
  
	/** 
  	* Response wrapper. An instance of this object is passed to
  	* the response handler
  	*/
  	function Wrapper(responseObject){
  		var r = responseObject;
  		return{
  			/* Returns the XML content */
  			xml: function (){try{return r.responseXML;}catch(e){return null;}},
  			
  			/* Returns the text content */ 
  			text: function(){try{return r.responseText;}catch(e){return null;}}, 
  			
  			/* Returns the json content */
  			json:function(){
    			try{
    				var val = r.responseText.fstrip(); 
   					return eval("("+val+")");
    			}catch(e){
    				return null;
    			}
  			},
  			
  			/* Returns the response status text */
  			statusText: function(){try{return r.statusText;}catch(e){return null;}},
  			
  			/* Returns the response status code */
  			statusCode: function(){try{return r.status;}catch(e){return null;}},
  			
  			/* Returns the response object */
  			responseObject: function(){return r;}
  		} 
  	}	 
  
  	/***************************************
  	*  PUBLIC METHODS
  	****************************************
  	/**
  	* Performs an asynchronous post request
  	*/
  	this.post = function(requestStr){
  		// Creates a new request object
    	var requestObject = _initreq(rh, eh);
    	if(requestObject){
    		// Sends the request
    		try{
      			requestObject.open('POST', u, true);
      			requestObject.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
      			requestObject.setRequestHeader("Connection", "close");
      			if (requestStr != null)
					requestObject.setRequestHeader("Content-length", requestStr.length);
      			requestObject.send(requestStr);
			}catch(e){
      			alert("AJAX ERROR::"+e);
			}
    	}
  	}
  	/**
  	* Performs an asynchronous post request
  	*/
  	this.get = function(requestStr){
  		// Creates a new request object
    	var requestObject = _initreq(rh, eh);
		var furl = u;
		// Creates the final request string
    	if(requestStr != null)
    		furl = furl +'?'+requestStr; 
    	if(requestObject){
    		// Sends the request
    		try{
      			requestObject.open('GET', furl, true);
      			requestObject.send(null);
      		}catch(e){
      			alert("AJAX ERROR::"+e);
      		}
    	}
  	}
};
	

/**********************************************
* AJAX scheduler Class
***********************************************/

juice.rpc.AjaxScheduler = function(url, params){
	
		var f;
		/* Sets parameters */
		var _delay = 5;
		if(params.delay > 0)
			_delay = params.delay;
		
		var _response = params.response;
		var _error = params.error;
		var _method = params.method;
		var _request = params.request;
		
		/* Wraps the handler, and resets the timer after its done */
		function wrap(handler){
			return function(req){
				if(handler)
					handler(req);
				setTimeout(f, _delay);
			}
		};
		
		/* Creates new AJAX object */
		var _xhr = new juice.rpc.Ajax(url, wrap(_response), wrap(_error));
		/* Defines the send method */
		var send;
		if (_method == "POST") send = _xhr.post;
		else send = _xhr.get;
		/* Defines the send function */
		if (typeof _request == "function" )
			f = function(){send(_request());};
		else
			f = function(){send(_request);};
		
		/***************************************
  		*  PUBLIC METHODS
  		****************************************/
		/**
		* Starts the AjaxScheduler
		*/
		this.start = function(){
			setTimeout(f, _delay);
		}
		/**
		* Stops the AjaxScheduler
		*/
		this.stop = function(){
			clearInterval(_time);
		}
};


/**********************************************************************
*
*                            EVENTS HANDLER
*
***********************************************************************/

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
			document.onkeyup= function(e){
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
		};
		
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
				document.onkeyup= function(){};
			},
			/**
			* Turn on the keyboard handler
			*/
			handleKeys: function(){
				_addhandlers();
			}
		};
};
