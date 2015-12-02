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

We will also look into how to create a backend for your application using `ngResource`. We will create a simple RESTful API using Express JS, which stores data in MongoDB.

Your todo app should be working well by now. You can create new todos, finish them, and clear completed todos. Once you restart your application all todos are gone, though: your application is not persisting the todos. We are about to fix that. Will also fix the fact that other people can't see which todos you've already completed, as all the action has been in your browser.

Angular is a **client-side framework**, which is good at displaying and manipulating data in the browser. If it needs data from the server it needs an API, to fetch or send data to and from the server. It uses AJAX (XMLHttpRequest) to do this. An API is different from a web page: it only contains data, no layout. The API we will create uses JSON (JavaScript Object Notation) to send data using Javascript lists and maps.

Angular has two objects that allow server side access: `$http` and the `$ngResource`. We will be focussing on `$ngResource`. We will need to create a RESTful HTTP API to use.

### Create an API

Our API will need to look like this:

| Action         |HTTP Verb | URL            |
| :------------- |:---------| :------------- |
| Add todo       | POST     | /api/todos     |
| Get all todos  | GET      | /api/todos     |
| Get a todo     | GET      | /api/todos/:id |
| Update a todo  | PUT      | /api/todos/:id |
| Delete a todo  | DELETE   | /api/todos/:id |

You will need to create these routes in our Express Server's `index.js` file. Make sure that each route returns the Action string, using `res.send('')`;

Once you have created the API, use a browser to test the `GET` routes. For the `PUT`, `DELETE` and `POST` routes things are more complicated. We'll use [Postman](https://www.getpostman.com/) to test them. Each API call should return the Action text such as `Add todo` or `Get all todos`.

### Persist data using MongoDB

You will persist your data using MongoDB, a NOSQL database, using the [MongoDB module](https://www.npmjs.com/package/mongodb) for Node JS. Here are more details about the [Node JS API for Mongo on the mongodb site](https://docs.mongodb.org/getting-started/node/)

We will be using these functions from the MongoDB Module:

| Action         |Mongo function to use   |
| :------------- |:----------------|
| Add todo       |  `insertOne()`  |
| Get all todos  |  `find()`       |
| Get a todo     |  `findOne()`    |
| Update a todo  |  `updateOne()`  |
| Delete a todo  |  `deleteOne()`  |

The module support both callbacks and the Promise syntax. We will use the Promise syntax as it separates data and error handling properly.

You now need to extend the API you created earlier to use MongoDB to persist data.

Here is an example of the API route which add a todo:

```javascript
// the mongodb url
var url = 'mongodb://localhost:27017/todos';

app.post('/api/todos', function(req, res){

  // get the todo data from the request object.
  var todo = req.body;

  MongoClient.connect(url, function(err, db) {
        var todos = db.collection('todos');
        todos
            .insertOne(todo)
            .then(function(todo){
                res.send(todo);
            })
            .catch(function(err){
                // log the error to the console for now
                console.log(err);
                res.send({});
            });
    });
});

```

Now extend all the API calls to use MongoDB persist/retrieve data:

| Action         |HTTP Verb | URL            | Mongo function |
| :------------- |:---------| :------------- |----------------|
| Add todo       | POST     | /api/todos     | `insertOne()`  |
| Get all todos  | GET      | /api/todos     | `find()`       |
| Get a todo     | GET      | /api/todos/:id | `findOne()`    |
| Update a todo  | PUT      | /api/todos/:id | `updateOne()`  |
| Delete a todo  | DELETE   | /api/todos/:id | `deleteOne()`  |

As you change your API calls, write tests using mocha. Use Postman to test the calls.

### ngResource

Now that your API is properly integrated with MongoDB you will change your TODO app to use it using Angular's `ngResource` module.

> [Angular CRUD using ngResource](http://www.sitepoint.com/creating-crud-app-minutes-angulars-resource/)

The `ngResource` module makes it easy to call RESTful APIs. To be able to use `ngResource` you will need to:

* reference the ngResources library in your javascript
* configure Angular to use it
* add and configure a todo factory to use andinstance of `ngResource`
* pass an instance of the todo factory into the Controller, and use the `ngResource` todo instance

To reference it, add an entry like this in your html file and make sure you have a copy of the `angular-resource.min.js` file in the right location:

```html
<script src="angular-resource.min.js" charset="utf-8"></script>
```

Configure Angular to use it:

```javascript
var todoApp = angular.module('todoApp', ['ngResource'])
```

Add a todo factory:

```javascript
var todoApp = angular.module('todoApp', ['ngResource'])
    .factory('Todo', function($resource, $http){
        return $resource('/api/todos/:id',
            { id: '@_id' },
            {
              //need this to support update
              update: {
                method: 'PUT'
              }
            });
    })
```

Pass a todo factory into the `TodoController`:

```javascript
    .controller('TodoCtrl', function($scope, Todo){
```

### Change your todo App client side

You are now ready to change your application to access the API you just created using the `ngResource` module. The examples below are the building blocks you need to add MongoDB persistence to your API. Be sure to test as you change each bit of functionality.

#### Get all todos:

```javascript
  $scope.todos = Todo.query();
```

#### Add todo:

```javascript
Todo.save({text : $scope.todoText, done : false}, function(){
  // new todo added  
});
```

#### Update todo:

```javascript
todo.text = "still learning about Angular";

todo.$update(function(){
    //delete successfully completed
});
```

#### Delete a todo:

```javascript

// todo was retrieved using query/get

todo.$delete(function(){
  //
});
```
