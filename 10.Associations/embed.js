var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");

//USER - email,name
var postSchema= new mongoose.Schema({
    title:String,
    content:String
});

var Post=mongoose.model('Post',postSchema);

var userSchema= new mongoose.Schema({
    email:String,
    name:String,
    posts:[postSchema]
});

var User=mongoose.model("User",userSchema);

//POST - title, content





//===========================//

// var newUser=new User({
//     email:'hermione@brown.edu',
//     name:'Hermione Granger'
// });

// newUser.posts.push({
//     title:"how to brewww",
//     content:"Just Kiddd"
// });

// newUser.save(function(err,user){
//     if(err){
//         console.log(err);
//     } else{
//         console.log(user);
//     }
// });

// User.create({
//     email:'charloe@brown.edu',
//     name:'Charlie Brown'},
//  function(err,user){
//     if(err){
//     console.log(err); } else {
//     console.log(user);}});

// Post.create({
//     title:'Reflections on Apples',
//     content:'They are delivius'},
//  function(err,post){
//     if(err){
//     console.log(err); } else {
//     console.log(post);}});


User.findOne({name:"Hermione Granger"},function(err,user){
    if(err){
        console.log(err);
    } else {
     user.posts.push({
         title:"3 things",
         content:"voldemort"
     });
     user.save(function(err,user){
         if(err){
             console.log(err);
             } else {
                 console.log(user);
             }
     });
    }
});