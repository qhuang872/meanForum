myApp.controller("userController",function($scope,discussFactory,$location,$cookies,$routeParams){
	if($cookies.get("user")){
		$scope.user = $cookies.get("user");
	}else{
		$location.url("/");
	}
	discussFactory.showUser($routeParams.userId,function(data){
		console.log(data);
		$scope.userToShow = data;
		
	});
});
