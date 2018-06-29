var express=require("express");
var app=express();

var request=require("request");

app.set("view engine","ejs"); 



app.get("/",function(req,res){
   res.render("search");
});

app.get("/results",function(req,res){
    var query=req.query.search;
    var url="http://www.omdbapi.com/?s="+query+"&apikey=thewdb";
    request(url, function(error, response, body) {
if(!error && response.statusCode==200){
var data = JSON.parse(body);
res.render("results", {data:data});
}})
});

// var bodyParser=require("body-parser");
// app.use(bodyParser.urlencoded({extended: true}));

// app.post("/search",function(req,res){
//   var movie=req.body.movie;
   
// //   console.log(movie);
   
//   request("http://www.omdbapi.com/?s="+movie+"&apikey=thewdb", function(error, response, body) {
//     if(!error && response.statusCode==200){

//     var data = JSON.parse(body);

//     res.render("results", {data:data});
    
// }})
// });



app.listen(process.env.PORT, process.env.IP,function(){
    console.log("Movie App has started!");
});





// var request = require('request');
// var cheerio = require('cheerio');

// request('https://www.kayak.com/flights/MAN-LIS/weekend/2018-09-21?sort=price_a', function (error, response, html) {
//   if (!error && response.statusCode == 200) {
//     var $ = cheerio.load(html);
//     console.log(1);
//     $('div.result-column').each(function(i, element){
//     //   var a = $(this).prev();
//     //   console.log(a.text());
//     console.log("1");
//     console.log(element);
//     console.log(i);
    
//     $(html).find('div').each(function(i,element){
//     console.log(element);
        
//     });

// });
// }});


