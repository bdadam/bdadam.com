---
layout:         post.hbs
date:           2014-02-02 22:10
title:          Demystifying AngularJS' dependency injection
description:    Dependency injection in JavaScript - the AngularJS way
abstract:       Many people think that it is some kind of magic, how AngularJS resolves dependencies given as function arguments.
                But it isn't any magic. I'll show you, how they achieve it. This technique can be used everywhere, not just with AngularJS.
tags:
- javascript
- angularjs
- dependency injection
---

If you don't know what does dependency injection look like with AngularJS, here is an example:
```html
<div ng-controller="GreetCtrl">
    Hello {{name}}!
</div>
<script>
function GreetCtrl($scope, $rootScope) {
    $scope.name = 'World';
    $rootScope.department = 'Angular';
}
</script>
```

We just have to put `$scope` and `$rootScope` into the function arguments, and when Angular calls the controller (`GreetCtrl`)
it knows with parameters it has to call the function.

## How do they do it?

It's fairly easy in JavaScript to get the source code of the every function. We just have to call the `.toString()` method of the function objects.
```JavaScript
function sum(x, y) {
    alert(x + y);
}

console.log(sum.toString()); // prints the complete code of the function
```

Here we go. We just have to find a way to extract the argument list of our function.

```JavaScript
// The following simplified code is partly taken from the AngularJS source code:
// https://github.com/angular/angular.js/blob/master/src/auto/injector.js#L63

function inject(fn, variablesToInject) {
    var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
    var FN_ARG_SPLIT = /,/;
    var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

    if (typeof fn === 'function' && fn.length) {
        var fnText = fn.toString(); // getting the source code of the function
        fnText = fnText.replace(STRIP_COMMENTS, ''); // stripping comments like function(/*string*/ a) {}

        var matches = fnText.match(FN_ARGS); // finding arguments
        var argNames = matches[1].split(FN_ARG_SPLIT); // finding each argument name

        var newArgs = [];
        for (var i = 0, l = argNames.length; i < l; i++) {
            var argName = argNames[i].trim();

            if (!variablesToInject.hasOwnProperty(argName)) {
                // the argument cannot be injected
                throw new Error("Unknown argument: '" + argName + "'. This cannot be injected.");
            }

            newArgs.push(variablesToInject[argName]);
        }

        fn.apply(window, newArgs);
    }
}

function sum(x, y) {
    console.log(x + y);
}

inject(sum, {
    x: 5,
    y: 6
}); // should print 11

inject(sum, {
    x: 13,
    y: 45
}); // should print 58

inject(sum, {
    x: 33,
    z: 1 // we are missing 'y'
}); // should throw an error: Unknown argument: 'y'. This cannot be injected.
```

So it's really not a big deal, is it?