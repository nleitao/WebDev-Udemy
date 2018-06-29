//import packages
var express=require("express");
var app=express();


app.use(express.static("public"));

//routes
app.get("/",function(req,res){
    res.send("Hi there, welcome to my assignment");
});


app.get("/speak/:animal",function(req,res){
   var who=req.params.animal.toLowerCase();
   var sound="";
   
   if(who==="pig"){
       sound="Oink";
   }
   else if(who==="cow"){
       sound="Moo";
   }
   else if(who==="dog"){
       sound="Woof Woof";
   }
   else{
       sound="whaaaaaaaaaa?";
   }
   
   res.send("The "+who+" says "+sound);
    
});

app.get("/repeat/:something/:number",function(req, res) {
    var something=req.params.something;
    var number=req.params.number;
    var saywhat="";
    
    for(var i=0;i<Number(number);i++){
        saywhat+=something+" ";
    };
    
    res.send(saywhat);
})

app.get("/fallinlovewith/:thing",function(req,res){
    var thing=req.params.thing;
    res.render("love.ejs",{thingVar:thing});
})


app.get("/posts",function(req,res){
    var posts=[{com:"cooool",author:"ze"},{com:"outro",author:"vani"}];
    res.render("train.ejs",{posts:posts});
})







app.get("*",function(req,res){
    res.send("Sorry, page not found");
});

// Tell Express to listen for requests (Start server)
app.listen(process.env.PORT, process.env.IP,function(){
    console.log("Server has started!");
});