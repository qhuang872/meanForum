var mongoose   = require("mongoose");
var fs		   = require("fs");
var path	   = require("path");
var modelsPath = path.join(__dirname,"../models");
var dbURI      = "mongodb://localhost/discussion";

mongoose.connect(dbURI);
mongoose.connection.on("connected",function(){
	console.log(`Mongoose default connection open to ${ dbURI }`);
});
mongoose.connection.on("error",function(error){
	console.error(`Mongoose default connection error: ${ err }` );
});
mongoose.connection.on("disconnect",function(){
	console.log('Mongoose default connection disconnected');
});

process.on("SIGINT",function(){
	mongoose.connection.close(function(){
		console.log('Mongoose default connection disconnected through app termination');
		process.exit(0);
	});
});


fs.readdirSync(modelsPath).forEach(function(file){
	if (file.indexOf('.js')){
		require(modelsPath+'/'+file);
	}
});

