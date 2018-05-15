---
title: Adding tab support to textareas
description: Some example JavaScript code which detects when user presses TAB or SHIFT+TAB
date: 2014-01-30T22:56:00.000Z
tags:
  - javascript
  - browser
---

Have you ever wondered how is it possible to support tabs in a textarea? Normally when you press the tab key, the focus jumps to the next element. But with some JavaScript 'magic' it's possible to indent or unindent the text.

<!-- readmore -->

The code detects when the user presses TAB or SHIFT+TAB - the current line gets indented or unindented.
Source code for the example can be found here: <a href="https://gist.github.com/bdadam/8721698" rel="external,nofollow">gist.github.com/bdadam/8721698</a>.

```html
<!doctype html>
<html>
<head>
    <meta name="charset" content="utf-8"/>
    <title></title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta name="author" content="Adam Beres-Deak"/>
    <meta name="viewport" content="width=device-width"/>
    <style>
    	body {
    		padding: 40px;
    	}
    	textarea {
    		width: 100%;
    		height: 350px;
    		font-family: CourierNew, Courier;
    	}
    </style>
</head>
<body>
	<textarea id="tx"></textarea>
	<script>
	function enableTab(id) {
		var shiftPressed = false;
		var ctrlPressed = false;
		var tabChar = '    ';

		function checkSpecialKeys(e) {
			switch(e.keyCode) {
				case 16:
					shiftPressed = !shiftPressed;
					break;
				case 17:
					ctrlPressed = !ctrlPressed;
			}
		}

		document.addEventListener('keydown', checkSpecialKeys);
		document.addEventListener('keyup', checkSpecialKeys);

		function addTab(textarea) {
			// caching some values, because they are changing as text changes
            var value = textarea.value,
                start = textarea.selectionStart,
                end = textarea.selectionEnd;

            // adding tab character to actual cursor position
            textarea.value = value.substring(0, start) + tabChar + value.substring(end);

            // putting cursor back to its original position
            textarea.selectionStart = textarea.selectionEnd = start + tabChar.length;
		}

		function removeTab(textarea) {
			var curPos = textarea.selectionStart,
				lines = textarea.value.split('\n'),
				newValue = '',
				done = false,
				cnt = 0;

			for (var i = 0, l = lines.length; i < l; i++) {
				// iterating through each line
				var line = lines[i];
				cnt += line.length;
				if (cnt >= curPos && !done) {
					// cursor is in this line
					var newLine = line.replace(new RegExp('^' + tabChar, ''), '');

					if (newLine !== line) {
						// there was a tab at the beginning of the line, replace was succesfull, cursor must be moved backwards some
						line = newLine;
						curPos -=tabChar.length;
					}

					done = true; // only one substitution per run
				}

				newValue += line + '\n';
			}

			// setting new value
			textarea.value = newValue;

			// putting cursor back to its original position
			textarea.selectionStart = textarea.selectionEnd = curPos;
		}

	    var textArea = document.getElementById(id);
	    textArea.addEventListener('keydown', function(e) {
	        if (e.keyCode === 9) {

	        	if (!shiftPressed) {
	            	addTab(this);
	            } else {
	            	removeTab(this);
	            }

	            return false; // preventing losing focus
	        }
	    });
	}

	enableTab('tx');
	</script>
</body>
```
