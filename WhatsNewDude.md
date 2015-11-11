## 06/05/2007 ##

Version 0.3 released, with HMTL DOM manipulation functions and form submition using AJAX added. HTML DOM elements can be manipulated using _juice.html_ package or by using "%elementID" or "@tagname".

Examples:

  * `"%mydiv".setHTML("HTML SNIPPED")`: sets the innerHTML of DIV mydiv
  * `"@div".invisible()`: sets all DIVs with visibility hidden
  * `"%myform".submit(handler)`: submits the form myform using AJAX. The response is handled by the function handler.

## 14/04/2007 ##

Some basic documentation added. Check JuiceDoc.

## 10/04/2007 ##

Version 0.1.2 released, with AJAX polling system feature added.
