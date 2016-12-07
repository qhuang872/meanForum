myApp.controller("topicController",function($scope,discussFactory,$location,$routeParams,$cookies){
	discussFactory.showTopic($routeParams.topicId,function(returnedData){
		console.log(returnedData);
		$scope.topic = returnedData;
		getPost();

	});
	var getPost = function(){
		discussFactory.getPost($scope.topic._id,function(data){
			$scope.posts = data;		
		})
	};
	if($cookies.get("user")){
		$scope.user = $cookies.get("user");
	}else{
		$location.url("/");
	}
	$scope.submit=function(){
		var post = {'post':$scope.post,'_user':$cookies.get("userId"),'_topic':$scope.topic._id}; 
		discussFactory.post(post,function(returnedData){		
			$scope.post="";
			getPost();
		});
	};
	$scope.like = function(id){
		discussFactory.likePost(id,function(returnedData){
			getPost();
		})
	};
	$scope.dislike = function(id){
		discussFactory.dislikePost(id,function(returnedData){
			getPost();
		})
	};
	$scope.createComment = function(reply,id){
		var comment = {'_post':id,'comment':reply,'_user':$cookies.get("userId")};
		discussFactory.createComment(comment,function(returnedData){
			$scope.reply="";
			getPost();
		})
	};

});
