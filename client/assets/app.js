var myApp = angular.module("myApp",["ngRoute","ngCookies"]);
myApp.config(function($routeProvider){
	$routeProvider
		.when("/",{templateUrl:"../partials/index.html",controller:"loginController"})
		.when("/wall",{templateUrl:"../partials/wall.html",controller:"wallController"})
		.when("/topic/:topicId",{templateUrl:"../partials/topic.html",controller:"topicController"})
		.when("/user/:userId",{templateUrl:"../partials/user.html",controller:"userController"})
		.otherwise({redirectTo:"/"})

});
