var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");

router.get("/",function(req,res){
    //Get all campgrounds from DB and render file
    Campground.find({},function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds, currentUser:req.user});
        }});
// res.render("campgrounds",{campgrounds:campgrounds});        
});


router.post("/",function(req,res){
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

router.get("/new",function(req,res){
   res.render("campgrounds/new"); 
    
});


//SHOW
router.get("/:id",function(req,res){
    
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        } else {
        res.render("campgrounds/show",{campground:foundCampground});     
        }
    });
});


module.exports=router;