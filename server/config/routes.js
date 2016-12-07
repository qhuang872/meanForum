var mongoose   = require("mongoose");
var controller = require("../controllers/controller.js");
module.exports = function(app){
	app.post("/login",controller.login);
	app.get("/categories",controller.getCategories);
	app.post("/topic",controller.createTopic);
	app.get("/topics",controller.getTopic);
	app.get("/topic/:topicId",controller.showTopic);
	app.post("/post",controller.newPost);
	app.get("/:topicId/post",controller.getPost);
	app.put("/post/:postId/:action",controller.updatePost);
	app.post("/comment",controller.newComment);
	app.get("/user/:userId",controller.getUser);
}
