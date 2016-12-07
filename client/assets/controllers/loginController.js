myApp.controller("loginController",function($scope,discussFactory,$location,$cookies){
	$scope.login = function(){
		if(/^[a-z0-9_]{5,20}$/.test($scope.user.username.toLowerCase())){
			discussFactory.login($scope.user,function(returnedUser){
				$cookies.put("user",returnedUser.username);
				$cookies.put("userId",returnedUser._id);
				$location.url("/wall");

			})
			$scope.validate=false;
		}else{
			$scope.validate=true;
		}
	}	
});
