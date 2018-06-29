var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2");

var Post=require("./modules/post");
var User=require("./modules/user");

//USER - email,name




//POST - title, content



Post.create({
    title:"How part 4",
    content:"silvia"
}, function(err,post){
    User.findOne({email:"bobdf@sf"},function(err,foundUser){
      if(err){
          console.log(err);
          } else{
              foundUser.posts.push(post);
              foundUser.save(function(err,data){
                  if(err){
                      console.log(err);
                  } else {
                      console.log(data);
                  }});}});});

// User.create({
//     email:"bobdf@sf",
//     name:"bobi"
// });

// User.findOne({email:"bobdf@sf"}).populate("posts").exec(function(err,user){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });