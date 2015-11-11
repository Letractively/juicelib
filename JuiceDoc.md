# Package juice.rpc #

## Ajax ##

(Since 0.1.1)

Performs asynchronous get/post requests and handles response.

### Constructor ###

`var ajax = new juice.rpc.Ajax(url, response, error);`

**Parameters:**

  * **url**: URL string, without request parameters. Example: "http://www.myurl.com/".

  * **response** (optional): reference to the function that will handle response. If response is null or undefined, the response will not be considered.

  * **error** (optional): reference to the function that will handle any request error. If the error function is null or undefined, the request will fail silently.

### Methods ###

  * **get(string)**: performs a get request, sending `string` as request parameters. If string is undefined or null, the no parameters will be sent. Example: `ajax.get("name=ajax&id=2")` or `ajax.get()`.

  * **post(string)**: performs a post request, sending `string` as request parameters. If string is undefined or null, the no parameters will be sent. Example: `ajax.get("name=ajax&id=2")` or `ajax.get()`.

### Response wrapper ###

The ajax object will pass to the handler a wrapper object that encapsulates the response object. This wrapper is created by the ajax object.

  * **xml()**: returns the xml content.
  * **text()**: returns the response text content.
  * **json()**: return the response json content.
  * **statusText()**: returns the response status text.
  * **statusCode()**: returns the response status code.
  * **responseObject()**: returns the response object.

### Description ###

The ajax object will handle all assynchrounous, sending the request using get or post, and calling the appropriate response handler when needed. The object will pass to the handler a wrapper object that encapsulates the response object. The code above show an example:

```
var ajax = new juice.rpc.Ajax("my_test_url", response_handler);

function response_handler(req){
	sb = new juice.text.StringBuffer();
	sb.append("OK:");
	sb.append("txt::"+req.text());
	sb.append("xml::"+req.xml());
	sb.append("json::"+req.json());
	sb.append("status::"+req.statusText());
	sb.append("status code::"+req.statusCode());
	sb.append("obj::"+req.responseObject());
	alert(sb.concat('\n'));
}
```

## AjaxScheduler ##

(Since 0.1.2)

Performs asynchronous get/post requests at regular intervals and handles response.

### Constructor ###

`var sched = new juice.rpc.AjaxScheduler(url, params);`

**Parameters:**

  * **url**: URL string, without request parameters. Example: "http://www.myurl.com/".

  * **params** (optional): associative array that wraps a list of parameters used to setup the AjaxScheduler. The following parameters are allowed:
    * **delay**: delay between each request, in milliseconds.
    * **response** (optional): reference to the function that will handle response. If response is null or undefined, the response will not be considered.
    * **error** (optional): reference to the function that will handle any request error. If the error function is null or undefined, the request will fail silently.
    * **method** (optional): string representing the send method. Values can be "GET" or "POST". Default value is "GET".
    * **request** (optional): can be either a request parameter string, or a reference to a function that returns a parameter string (useful when the parameters can change over time).

### Methods ###

  * **start()**: starts the scheduler.

  * **stop()**: stops the scheduler.

### Description ###

The AjaxScheduler object perform asynchronous requests, calling the appropriate response handler when needed. As with the Ajax object, the scheduler will pass to the handler a wrapper object that encapsulates the response object. The code above show an example:

**Example 1:**

```
var sched = new juice.rpc.AjaxScheduler("url",
					 {response: response_handler,
					 delay: 7000});
					 
function response_handler(req){
	sb = new juice.text.StringBuffer();
	sb.append("OK:");
	sb.append("txt::"+req.text());
	sb.append("xml::"+req.xml());
	sb.append("json::"+req.json());
	sb.append("status::"+req.statusText());
	sb.append("status code::"+req.statusCode());
	sb.append("obj::"+req.responseObject());
	alert(sb.concat('\n'));
}
```

**Example 2:**

```
var sched = new juice.rpc.AjaxScheduler("url",
					 {response: function(){alert("OK");},
					 request: function(){return "id=2";},
					 delay: 7000,
					 method: "GET"});
```

**Example 3:**

```
var sched = new juice.rpc.AjaxScheduler("url",
					 {response: function(){alert("OK");},
					 error: function(){alert("ERROR");},
					 request: "id=2",
					 delay: 7000});
```

## get(url, params, response, error) ##

(Since 0.2)

Function that wraps ans Ajax GET request.

**Parameters:**
  * **url**: URL string, without request parameters. Example: "http://www.myurl.com/".

  * **params**: request parameters.

  * **response** (optional): reference to the function that will handle response. If response is null or undefined, the response will not be considered.

  * **error** (optional): reference to the function that will handle any request error. If the error function is null or undefined, the request will fail silently.

## post(url, params, response, error) ##

(Since 0.2)

Function that wraps ans Ajax POST request.

**Parameters:**
  * **url**: URL string, without request parameters. Example: "http://www.myurl.com/".

  * **params**: request parameters.

  * **response** (optional): reference to the function that will handle response. If response is null or undefined, the response will not be considered.

  * **error** (optional): reference to the function that will handle any request error. If the error function is null or undefined, the request will fail silently.

## send(url, params) ##

(Since 0.2)

Function that sends an Ajax POST request without waiting for a response.

**Parameters:**
  * **url**: URL string, without request parameters. Example: "http://www.myurl.com/".

  * **params**: request parameters.

# Package juice.html #

### buildRequestString(dict) ###

(Since 0.1.2)

Builds a request string based on data stored in an associative array.

Example: `juice.html.buildRequestString({"id":2, "name":"ajax"})` returns "id=2&name=ajax".


# Package juice.data #

### dictKeys(dict) ###

(Since 0.1.1)

Returns an array containing all the keys stored in an associative array.

Example: `juice.data.dictKeys({"a":1,"b":2,"c":3})` returns ["a","b","c"].

### dictValue(dict) ###

(Since 0.1.1)

Returns an array containing all the values stored in an associative array.

Example: `juice.data.dictKeys({"a":1,"b":2,"c":3})` returns [1,2,3].

### Array functions ###

(Since 0.1.1)

Juice Lib adds some useful functions to the native javascript array object.

  * **map(func)**: Returns a new array A where, for each element of the original array B, A[i](i.md)=func(B[i](i.md)). Example: `[1,2,3].map(func(x){return 2*x;})` returns `[2,4,6]`.

  * **filter(func)**: Returns a new array A where, for each element of the original array B, A[i](i.md) exists if func(B[i](i.md))==true. Example: `[1,2,3].filter(func(x){return x%2==0;})` returns `[2]`.

  * **reduce(func)**: Reduces the array, using func, and returns a scalar. func must receive two parameters. Example: `[1,2,3].reduce(function(x, y){returns x+y;})` returns 6.

# Package juice.text #

## StringBuffer ##

(Since 0.1.1)

`juice.text.StringBuffer` offers a buffer to build strings. Very useful if you need to concatenate small pieces of text to build a sentence. Some comparison tests showed that the use of string buffer is much more efficient than using str = str1 + str2.

**Constructor:**

`var buffer = new juice.text.StringBuffer()`

**Methods:**

  * **append(string)**: appends a string to the end of the current buffer. Returns a reference to the buffer, allowing to append in sequence. Example: `buffer.append("Hello").append(" ").append("World")`

  * **toString()**: join all the strings appended and returns a string. Example: `buffer.toString()` returns "Hello World".

  * **concat(char)**: join all the strings and puts char between strings. Example: `buffer.concat("#")` returns "Hello# #World#".


## String functions ##

(Since 0.1.1)

Juice lib adds some functions to the native javascript String, that can be used in any string.

Example: `"Hello World   ".rstrip()` returns "Hello World".

  * **rstrip()**: Returns a new string, without trailing white spaces.

  * **lstrip()**: Returns a new string, without leading white spaces.

  * **fstrip()**: Returns a new string, without  both leading and trailing white spaces.


# Package juice.events #

(Since 0.1.1)

## juice.events.onload ##

(Since 0.1.1)

Provides some facilites to create on load events.

### add(func) ###

(Since 0.1.1)

Registers a function to be executed after document loading.

**Parameters:**
  * **func**: Function to be executed or string to be evaluated after document loading

Example 1:
```
	juice.events.onload.add(function(){alert("Document loaded");});
```

Example 2:
```
	function myfunc = {
		alert("document loaded");
	};
	
	juice.events.onload.add(myfunc);
```

### exec() ###

(Since 0.1.1)

Method for body.onload attribute registration,  in case the automatic behaviour does not work.

Example: ` juice.events.exec();`

## juice.events.key ##

(Since 0.1.1)

Keyboard event manager. Fires action based on key pressed outside input widgets (textfield, textarea, input).
DOES NOT WORK FOR SAFARI

### unhandleKeys() ###

(Since 0.1.1)

Turn off the keyboard handler.

## handleKeys() ##

(Since 0.1.1)

Turn on the keyboard handler.

### add(symbol, func) ###

(Since 0.1.1)

Registers a function to be executed when the given char is pressed

**Parameters**:
  * **symbol**: char event trigger
  * **func**: Function to be executed

Example: `juice.events.key.add("A", function(){daler("Key A pressed");});`

### left(func) ###

(Since 0.1.1)

Registers a function to be executed when the left key is pressed

**Parameters**:
  * **func**: Function to be executed

Example: `juice.events.key.left(function(){alert("left")});`

### right(func) ###

(Since 0.1.1)

Registers a function to be executed when the right key is pressed

**Parameters**:
  * **func**: Function to be executed

Example: `juice.events.key.right(function(){alert("right")});`

### up(func) ###

(Since 0.1.1)

Registers a function to be executed when the up key is pressed

**Parameters**:
  * **func**: Function to be executed

Example: `juice.events.key.up(function(){alert("up")});`

### down(func) ###

(Since 0.1.1)

Registers a function to be executed when the down key is pressed

**Parameters**:
  * **func**: Function to be executed

Example: `juice.events.down.left(function(){alert("down")});`




