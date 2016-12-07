var mongoose  = require("mongoose");
var Comment   = mongoose.model("Comment");
var Post      = mongoose.model("Post");
var Topic     = mongoose.model("Topic");
var Category  = mongoose.model("Category");
var User      = mongoose.model("User");
module.exports={
	login:function(request,response){
		User.findOne({username:request.body.username},function(error,user){
			if(error){
					console.log(error)
			}else{
				if(user==null){
					var newUser = new User();
		            newUser.username=request.body.username;
		            newUser.save(function(error,user){
						if (error){
							console.log(error);
						}else{
							response.json(user);
						}
				    })
				}else{
					response.json(user);
				}
			}
		})
		},
	getCategories:function(request,response){
		Category.find({},function(error,categories){
			if(error){
				console.log("can't get categories from mongo: ",error)
			}else{
				response.json(categories);
			}	
		
		})
	
	},
	createTopic:function(request,response){
		var newTopic = new Topic(request.body);
		newTopic.save(function(error,topic){
			if(error){
				console.log("error during saving new topic: ",error);
			}else{
				User.findOne({_id:request.body._user},function(error,user){
					if(error){
						console.log(error);
					}else{
						if(user.topics){
							user.topics.push(topic);
						}else{
							user.topics=[topic];
						}
						user.save();
					}
				})
				response.json(topic);
			}
		})
	},
	getTopic:function(request,response){
		var topics = Topic.find({},function(error,topics){
			if(error){
				console.log("error when retrieving topics: ",error);
			}else{
				Topic.find({})
					 .populate('_user','username')
					 .populate('_category','category')
					 .populate('comments')	
					 .exec(function(error,topics){
						if(error){
							console.log("error during populating: ",error);
						}else{
							response.json(topics);
						}
					 })
			}
		})	
	},
	showTopic:function(request,response){
		Topic.findOne({_id:request.params.topicId})
			 .populate('_user','username')
			 .exec(function(error,populatedTopic){
				if(error){
					console.log("error when populating one ",error);
				}else{
					response.json(populatedTopic);
				}
			 })
	},
	newPost:function(request,response){
		var newPost = new Post(request.body);
		newPost.save(function(error,post){
			if(error){
				console.log("error when creating new post: ",error);
			}else{
                User.findOne({_id:request.body._user},function(error,user){
					if(error){
						console.log(error);
					}else{
						if(user.posts){
							user.posts.push(post);
						}else{
							user.posts=[post];
						}
						user.save();
					}
				})
				Topic.findOne({_id:request.body._topic},function(error,topic){
					if(error){
						console.log(error);
					}else{
						if(topic.posts){
							topic.posts.push(post);
						}else{
							topic.posts=[post];
						}
						topic.save();
					}
				})
				response.json(post);
			}
		})
	},
	getPost:function(request,response){
		Post.find({_topic:request.params.topicId})
			.populate('_user','username')
			.populate({
			    path:"comments",
				populate:{path:"_user"},
			})
			.exec(function(error,posts){
				if(error){
					console.log("error from getPost method: ",error);
				}else{
					response.json(posts);
				}
			});
		
	},
	updatePost:function(request,response){
		Post.findOne({_id:request.params.postId},function(error,post){
			if(error){
				console.log("error from updatePost: ",error);
			}else{
				if(request.params.action=="like"){
					post.likes++;
				}else{
					post.dislikes++;
				}
				post.save(function(error,post){
					if(error){
						console.log(error);
					}else{
						response.json(post);
					}
				})
			}
		})
	
	},
	newComment:function(request,response){
		var comment = new Comment(request.body);
		comment.save(function(error,comment){
			if(error){
				console.log("error from new comment: ",error);
			}else{
				var postId = request.body._post;
				Post.findOne({_id:postId},function(error,post){
					if(error){
						console.log(error);
					}else{
						if(post.comments){
							post.comments.push(comment._id);
						}else{
							post.comments=[comment._id];
						}
						post.save();
					}
				})
				User.findOne({_id:request.body._user},function(error,user){
					if(error){
						console.log(error);
					}else{
						if(user.comments){
							user.comments.push(comment);
						}else{
							user.comments=[comment];
						}
						user.save();
					}
				})
				response.json(comment);
			}
		})
		
	},
	getUser:function(request,response){
	    User.findOne({_id:request.params.userId})
		    .populate("comments")
		    .populate("posts")
		    .populate("blogs")
		    .exec(function(error,returnedUser){
			    if(error){
			 		console.log("error in get User",error);
			    }else{
			 		response.json(returnedUser);
			    }
		    })
	},
}
