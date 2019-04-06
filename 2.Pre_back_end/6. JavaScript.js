// var fname=prompt("f name?");
// var lname=prompt("l name?");
// var age=prompt("age?");
// console.log("O teu nome e: "+fname+" "+lname);
// console.log("e tens "+age+" anos");

// change body to purple and back to white everytime we click the button
var button2=document.querySelector("button");

button2.addEventListener("click",function(){
	document.body.classList.toggle('some-class');
});

