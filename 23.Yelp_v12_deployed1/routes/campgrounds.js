var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var middleware=require('../middleware');

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


//Create - add new campgroung to DB
router.post("/",middleware.isLoggedIn,function(req,res){
    //get data from form and add to campgrounds array
    var newName=req.body.name;
    var newImage=req.body.image;
    var newDescription=req.body.description;
    var newPrice=req.body.price;
    var author={
        id:req.user._id,
        username:req.user.username
    };
    var newItem={name:newName,price:newPrice, image:newImage,description:newDescription,author:author};
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

//NEW - show form
router.get("/new",middleware.isLoggedIn,function(req,res){
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

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership ,function(req, res) {
        Campground.findById(req.params.id,function(err,foundCampground){
            res.render("campgrounds/edit",{campground:foundCampground});        
    });
});

//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership ,function(req,res){
   //find and update the correct campground
   
   Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else {
           //redirect somewhere(show page)
           res.redirect("/campgrounds/"+req.params.id);
       }
   });
   });

//DESTROY CAMPGROUND ROUTE

router.delete("/:id",middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});


module.exports=router;
