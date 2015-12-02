var routeApp = angular.module('routeApp', ['ngRoute']);

routeApp.config(function($routeProvider){

    $routeProvider.when('/events', {templateUrl:'templates/events.html'});
    $routeProvider.when('/events/:id', {templateUrl:'templates/event_details.html'});

});
