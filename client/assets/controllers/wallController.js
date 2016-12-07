myApp.controller("wallController",function($scope,discussFactory,$location,$cookies){
	if($cookies.get("user")){
		$scope.user = $cookies.get("user");
	}else{
		$location.url("/");
	}
	discussFactory.getCategories(function(data){
		$scope.categories=data;	
		$scope.selected = $scope.categories[0]

	});
	var getTopic = function(){
		discussFactory.getTopic(function(data){
			$scope.topics = data;	
		});
	};
	getTopic();
	$scope.submit = function(){
		var topic = {'topic':$scope.topic,'description':$scope.description,'_user':$cookies.get("userId"),'_category':$scope.selected._id};
		discussFactory.createTopic(topic,function(){
			$scope.topic = "";
			$scope.selected = $scope.categories[0];
			$scope.description = "";
			getTopic();
		});
	};
	$scope.logout = function(){
		$cookies.remove("user");
		$cookies.remove("userId");
		$location.url("/");
	}

});
