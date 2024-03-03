

// console.log("i am working")

// function add(a,b){
//     return a + b;
// }

// const add = function(a,b){
//     return a+b;
// }

// const add = (a,b)=>{
//     return a+b;
// }

// let result = add(9,9);
// console.log(result);


// function callback(){
//     console.log('prince is calling a callback function')
// }

// const add = (callback)=>{
    
//     callback();

// }

// add(()=>(console.log("hey rama ")))

// let fs = require('fs');
// let os = require('os');


// const user = os.userInfo()

// console.log(user)

// const version = os.version();
// console.log(version)

// // fs create files
// const text = 'hi '+ user.username +' !';
// fs.appendFile('greeting.txt',text,()=>(console.log('file is created')));


const notes = require('./notes.js');

const age = notes.age;
console.log(age)

const result = notes.addNumber(5,5);
console.log(result)

const _ = require('lodash');

let data = ["person","person",1 ,2 ,1 ,2 ,'name','age','2'];

let filter = _.uniq(data);
console.log(filter)
console.log(_.isString(true));