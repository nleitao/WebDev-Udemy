var express=require("express");
var methodOverride = require("method-override");
var app=express();
var bodyParser=require("body-parser");
var mongoose = require("mongoose");
var expressSanitizer=require("express-sanitizer");


//Mongoose config
//APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine","ejs"); 
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    created: {type:Date, default: Date.now}
});

//mine
//nome,pos,team,data,opp,projection,REAL
//equipa
//
var playerEntrySchema= new mongoose.Schema({
    name:String,
    pos:String,
    team:String,
    date:Date,
    opp:String,
    projection:Number,
    real:Number
})

var Blog = mongoose.model("Blog", blogSchema);
var PlayerEntry = mongoose.model("Entry", playerEntrySchema);


// Blog.create({
//     title:"test title",
//     image:"https://images.unsplash.com/photo-1509196845084-633821d238d9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=56b720a146ea1f9fa251716ea938dfbd&auto=format&fit=crop&w=1834&q=80",
//     body:"hello b test",
// })



//RESTFUL ROUTES
app.get('/',function(req, res) {
   res.redirect('/blogs'); 
});

//Index Route
app.get('/blogs',function(req,res){
    
    Blog.find({},function(err,blogs){
    if(err){
        console.log('Oh no.. error');
        // console.log(err);
    } else {
        res.render("index",{blogs:blogs});
        // console.log("All the cats");
        // console.log(blogs);
    }
});
});


//New Route
app.get('/blogs/new', function(req, res) {
   res.render("new");
});


//Create Route
app.post("/blogs",function(req,res){
    //create blog
    req.body.blog.body=req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog,function(err,newBlog){
        if(err){
            res.render('new'); }
            else {
                //then, redirect to the index
                res.redirect("/blogs");
            }
        });
});


//Show route

app.get('/blogs/:id',function(req, res) {
     Blog.findById(req.params.id,function(err,foundBlog){
         if(err){
             res.redirect("/blogs");
         }
         else{
              res.render("show",{blog:foundBlog});  
         }
     });
});


//EDIT ROUTE

app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            res.redirect("/blogs");
        } else{
            res.render("edit",{blog:foundBlog});
        }
    })
})

//UPDATE ROUTE
app.put('/blogs/:id',function(req,res){
    req.body.blog.body=req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedBlog){
        if(err){
            res.redirect("/blogs");
        } else{
            res.redirect("/blogs/"+ req.params.id);
        }
    });
});


//DELETE ROUTE
app.delete("/blogs/:id", function(req, res){
   //destroy blog
   Blog.findByIdAndRemove(req.params.id,function(err){
    if(err){
        res.redirect("/blogs");
    }   else{
        res.redirect("/blogs");
    }
   })
   //redirect somewhere
});



app.listen(process.env.PORT, process.env.IP,function(){
    console.log("Server is running");
});