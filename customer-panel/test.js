console.log(new Date().setHours(0, 0, 0, 0));
console.log(new Date(new Date().setHours(0, 0, 0, 0)));
console.log(new Date(new Date().setHours(0, 0, 0, 0)).getHours());

console.log(new Date().setHours(0, 0, 0, 0) - (24*3600*1000));
console.log(new Date(new Date().setHours(0, 0, 0, 0) - (24*3600*1000) ));
console.log(new Date(new Date().setHours(0, 0, 0, 0) - (24*3600*1000)).getHours());