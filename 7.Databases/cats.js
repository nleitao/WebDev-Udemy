var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema=new mongoose.Schema({
   name:String,
   age: Number,
   temperament:String
});

var Cat=mongoose.model("Cat",catSchema);

// var george = new Cat({
//     name:"Gatinho",
//     age:"1",
//     temperament:"good"
// });

// george.save(function(err,cat){
//     if(err){
//         console.log("Something went wrong")
//     } else{
//         console.log("saved:")
//         console.log(cat);
//     }
// });

//retrieve all cats from DB

// db.Cats.remove({temperament:"Labradoodle"})..

// Cat.create({
//     name:"Snow White",
//     age:15,
//     temperament:"Bland"}, function(err,cat){
//     if(err){
//     console.log(err); }
//     else {
//     console.log(cat);
//     }
//     });

Cat.find({},function(err,cat){
    if(err){
        console.log('Oh no.. error');
        console.log(err);
    } else {
        console.log("All the cats");
        console.log(cat);
    }
});