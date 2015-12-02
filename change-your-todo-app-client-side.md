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
