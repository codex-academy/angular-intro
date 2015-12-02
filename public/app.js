var routeApp = angular.module('routeApp', ['ngRoute']);

routeApp.controller('EventController', function($scope){
    $scope.name = "Ola!";
});

routeApp.controller('EventDetailsController', function($scope, $routeParams){
    $scope.name = "Ola Details : " + $routeParams.id;
});


routeApp.config(function($routeProvider){

    $routeProvider.when('/events', {
        templateUrl:'templates/events.html',
        controller : 'EventController'
    });
    $routeProvider.when('/events/:id', {
        templateUrl:'templates/event_details.html',
        controller : 'EventDetailsController'
    });

});
