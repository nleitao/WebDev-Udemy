var faker=require("faker");


for(var i =0;i<10;i++){
    

var randomName = faker.commerce.productName();
var randomPrice = faker.commerce.price(); 

var result=randomName+" - "+randomPrice;
console.log(result);
}