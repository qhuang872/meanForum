var express    = require("express");
var app		   = express();
var path	   = require("path");
var mongoose   = require("mongoose");
var bodyParser = require("body-parser");

app.use(express.static(path.join(__dirname,"/client")));
app.use(express.static(path.join(__dirname,"/bower_components")));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
mongoose.Promise = global.Promise;
require("./server/config/mongoose.js");
require("./server/config/routes.js")(app);

app.listen(8000,function(){
	console.log("listening to port 8000");
})
