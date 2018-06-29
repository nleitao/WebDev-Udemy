var mongoose = require("mongoose");

//schema set up
var commentSchema=new mongoose.Schema({
   text:String,
   author: String,
});

module.exports=mongoose.model("Comment",commentSchema);