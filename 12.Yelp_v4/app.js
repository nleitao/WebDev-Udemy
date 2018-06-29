var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose = require("mongoose");
var Campground=require("./models/campground");
var seedDB=require("./seeds");
var Comment=require("./models/comment");

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
seedDB();


app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campgrounds",function(req,res){
    //Get all campgrounds from DB and render file
    Campground.find({},function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }});
// res.render("campgrounds",{campgrounds:campgrounds});        
});


app.post("/campgrounds",function(req,res){
    //get data from form and add to campgrounds array
    var newName=req.body.name;
    var newImage=req.body.image;
    var newDescription=req.body.description;
    
    var newItem={name:newName,image:newImage,description:newDescription};
    // campgrounds.push(newItem);
    
    //create a new campground and save to DB
    
    Campground.create(newItem,function(err, newlyCreated){
        
        if(err){
            console.log(err);
            } else {
                res.redirect("/campgrounds");
            }
        
    });
});

app.get("/campgrounds/new",function(req,res){
   res.render("campgrounds/new"); 
    
});


//SHOW
app.get("/campgrounds/:id",function(req,res){
    
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        } else {
        res.render("campgrounds/show",{campground:foundCampground});     
        }
    });
});

//================
//COMMENTS ROUTES
//================

app.get("/campgrounds/:id/comments/new",function(req, res) {
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground:campground});      
        }
    }) ;
});

app.post("/campgrounds/:id/comments",function(req,res){
    //lookup campground using ID
    //create new comment
    //connect new comment to campground
    //redirect campground show page
    Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
       } else {
           Comment.create(req.body.comment,function(err,comment){
               if(err){
                   console.log(err);
               } else {
                   campground.comments.push(comment);
                   campground.save();
                   res.redirect('/campgrounds/'+campground._id);
               }
               });  
       }
    });
});


app.listen(process.env.PORT, process.env.IP,function(){
    console.log("YelpCamp Server has started!");
});
