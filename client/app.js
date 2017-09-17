var myApp = angular.module('myApp',['ngRoute']);
myApp.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl:'templates/list.html',
			controller:'compController'
		})
		.when('/companies', {
			templateUrl:'templates/list.html',
			controller:'compController'
		})
		.when('/companies/create', {
			templateUrl:'templates/add.html',
			controller:'compController'
		})
		.when('/companies/:id/edit', {
			templateUrl:'templates/edit.html',
			controller:'compController'
		})
		.when('/companies/:id/show', {
			templateUrl:'templates/show.html',
			controller:'compController'
		});
});