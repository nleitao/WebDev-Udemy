var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose = require("mongoose");
var passport=require("passport");
var LocalStrategy=require("passport-local");
var Campground=require("./models/campground");
var Comment=require("./models/comment");
var User=require("./models/user");
var seedDB=require("./seeds");




mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+'/public'));
seedDB();

//PASSPORT CONFIG
app.use(require("express-session")({
    secret:"mirror mirror",
    resave: false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    next();
});

app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campgrounds",function(req,res){
    //Get all campgrounds from DB and render file
    Campground.find({},function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds, currentUser:req.user});
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

app.get("/campgrounds/:id/comments/new",isLoggedIn, function(req, res) {
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground:campground});      
        }
    }) ;
});

app.post("/campgrounds/:id/comments",isLoggedIn,function(req,res){
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


// ============
// AUTH ROUTES
// ============

//show register form
app.get("/register",function(req, res) {
    res.render("register");
});

//handle sign up logic
app.post("/register",function(req,res){
    var newUser=new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/campgrounds");
        });
    });
});



//show login form
app.get("/login",function(req, res) {
    res.render("login");
});

//handling login logic
app.post("/login",passport.authenticate("local",
    {
     successRedirect:"/campgrounds",
     failureRedirect:"/login"
    }),function(req, res) {
});

//logout logic route
app.get("/logout",function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
})


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP,function(){
    console.log("YelpCamp Server has started!");
});
