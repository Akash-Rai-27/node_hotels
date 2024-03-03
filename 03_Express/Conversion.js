console.log("conversion");
const jsonString ='{"name":"John", "age":30, "city":"New York"}';

const jsonObject = JSON.parse(jsonString);
console.log(jsonObject.name)

const objectToConvert ={
    name:"watcher",
    age:25
};

const json = JSON.stringify(objectToConvert);
console.log(json)