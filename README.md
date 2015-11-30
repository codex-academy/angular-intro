# Angular intro

Angular JS is a Javascript framework for creating client side applications.

## Intro

There is a good [introduction video](https://www.youtube.com/watch?v=uFTFsKmkQnQ) on the Angular JS web site, but it is for Angular version 1.3 and older. To follow along with the video you will need to do a few things differently. Those are specified below.

I created this repository that contains an `index.html` file configured with all dependencies. You should write your client-side Javascript in the `app.js` file. To be able to create the example application as in the video make the changes as specified below.

It's configures as and Express JS application as we will need a backend eventually for RESTFULL API calls from the client to the server. All initial code will be running on the client side.

Start by doing a : `npm install` and then run the application using `nodemon index.js` - there is an `index.html` file in the `./public` folder.

Open `index.html` in a browser there should be no errors if you open `Google Developer Tools`, `Firebug` or `Firefox Developer Tools` (I recommend installing the Firebug add-on when using Firefox).

## Changes required

### Create an Angular `module` and `controller`

Since Angular version 1.3 one need to create a module for ones application.

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

We will also look into how to create backend for you application using `ngResource`. We will create  and simple RESTFULL api using Express JS, which store data in MongoDB.

> [Angular CRUD using ngResource](http://www.sitepoint.com/creating-crud-app-minutes-angulars-resource/)
