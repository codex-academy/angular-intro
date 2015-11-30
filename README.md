# Angular intro

Angular JS is a Javascript framework for creating client side applications.

## Intro

There is a good [introduction video](https://www.youtube.com/watch?v=uFTFsKmkQnQ) on the Angular JS web site, but it is for Angular version 1.3 and older. To follow along with the video you will need to do a few things differently. To be able to create the example application as in the video make the [changes as specified below](#changes-required).

This repository contains an `index.html` file configured with all the dependencies. You should write your client-side Javascript in the `app.js` file.

It's configured as an Express JS application as we will need a backend eventually for RESTful API calls from the client to the server. All initial code will be running on the client side.

Start by doing an `npm install` and then run the application using `nodemon index.js`. There is an `index.html` file in the `public` folder.

Open `index.html` in a browser. There should be no errors if you open `Google Developer Tools`, `Firebug` or `Firefox Developer Tools`. We recommend installing the Firebug add-on when using Firefox.

## Changes required

### Create an Angular `module` and `controller`

Since Angular version 1.3 you needs to create a module for your application.

```javascript
var todoApp = angular.module('todoApp', []);

var todoApp.controller('TodoCtrl', function($scope){

});
```

In your html file you need to reference the application name.

```html
<div clas="container" ng-app="todoApp">

</div>
```

## Backend

We will also look into how to create a backend for you application using `ngResource`. We will create a simple RESTful API using Express JS, which stores data in MongoDB.

> [Angular CRUD using ngResource](http://www.sitepoint.com/creating-crud-app-minutes-angulars-resource/)
