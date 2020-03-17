# Angular Component Demo
An angular 1.x template for developing demo example for angular libraries.

## How to Install

    bower install --save-dev angular-component-demo

## How to use

The demo application has only this lines of code:

```javascript
angular
    .module('app', [ 'component.demo' ])
    .run(function ($rootScope) {
        $rootScope.config = {
            tabs: [
                { title: 'Home', template: 'demo/home.html' },
                { title: 'Docs', template: 'demo/docs.html' }
            ]
        };
    });
```

and the index file has the following code

```html
<!DOCTYPE html>
<html ng-app="app">

<head>
    <meta charset="UTF-8">
    <title>Angular Demo</title>
</head>

<body>
    <component-demo config="config"></component-demo>
</body>

</html>
```

## How it works

The component-demo read the **package.json** and add the information to the template you can be add properties to package.json or can specify by using the config attribute.  
The injection testing serving are done using the [angular-component-tasks](https://github.com/klajd/angular-component-tasks)
