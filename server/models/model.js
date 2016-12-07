var mongoose = require ("mongoose");
var commentSchema = new mongoose.Schema({
	comment: {type:String,required:true},
	_user:   {type:mongoose.Schema.Types.ObjectId, ref:'User'},
	_post:   {type:mongoose.Schema.Types.ObjectId, ref:'Post'},
},{timestamps:true});

var postSchema = new mongoose.Schema({
	post:    {type:String,required:true},
	_user:   {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    _topic:  {type:mongoose.Schema.Types.ObjectId, ref:'Topic'},
	comments:[{type:mongoose.Schema.Types.ObjectId, ref:'Comment'}],
	likes:   {type:Number,default:0},
	dislikes:{type:Number,default:0},
},{timestamps:true});

var topicSchema = new mongoose.Schema({
	topic:      {type:String,required:true},
	description:{type:String,required:true},
	_user:      {type:mongoose.Schema.Types.ObjectId, ref:'User'},
	_category:  {type:mongoose.Schema.Types.ObjectId, ref:'Category'},
	posts:      [{type:mongoose.Schema.Types.ObjectId, ref:'Post'}],
},{timestamps:true});

var categorySchema = new mongoose.Schema({
	category:{type:String,required:true},
	topics:  [{type:mongoose.Schema.Types.ObjectId, ref:'Topic'}],
},{timestamps:true});

var userSchema = new mongoose.Schema({
	username:{type:String,required:true,unique:true},
	comments:[{type:mongoose.Schema.Types.ObjectId, ref:'Comment'}],
	posts:   [{type:mongoose.Schema.Types.ObjectId, ref:'Post'}],
	topics:  [{type:mongoose.Schema.Types.ObjectId, ref:'Topic'}],
},{timestamps:true});

var Comment  = mongoose.model("Comment",commentSchema),
	Post     = mongoose.model("Post",postSchema),
	Topic    = mongoose.model("Topic",topicSchema),
	Category = mongoose.model("Category",categorySchema),
	User     = mongoose.model("User",userSchema);
