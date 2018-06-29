function average(arr){
    var total=0;
    for(var i=0;i<arr.length;i++){
        total+=arr[i];
    }
    
    total/=arr.length;
    return Math.round(total);
}

console.log(average([90,98,89,100,100,86,94]));

console.log(average([40,65,77,82,80,54,73,63,95,49]));