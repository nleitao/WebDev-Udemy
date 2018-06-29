var express=require("express");
var app=express();

// "/" => "Hi There!"
app.get("/",function(req,res){
    res.send("Hi there!");
});


// "/bye" => "Goodbye"

app.get("/bye",function(req,res){
   res.send("Good Bye!"); 
});
// "/dog" => "MEOW!"

app.get("/dog",function(req,res){
    res.send("Meow");
});

// app.get("/r/:sub",function(req,res){
//     res.send("todos os subreddits");
// });

app.get("/r/:subredditName",function(req,res){
    var subreddit=req.params.subredditName;
    res.send("Welcome to "+subreddit+" subreddit");
})


app.get("*",function(req,res){
    res.send("you are a star");
});

// Tell Express to listen for requests (Start server)
app.listen(process.env.PORT, process.env.IP,function(){
    console.log("Server has started!");
});

