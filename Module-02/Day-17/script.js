// function greeting(student){
//     console.log(`"Good afternoon " + $(student`)
// }
// greeting()

// function greet(...params) {
//     console.log(params);
//     console.log(`Good afternoon ${params[0]} ${params[1]}`);
// }
// const greet=greet("John", "Doe");
// console.log(greet);

// function greet(name){
//     return "hello,"+name;

// }
// console.log(greet("nohi"));


// const add = (a, b) => a + b; 
// const result=add(10,69);
// console.log(result)



// const multiply=(c,d)=>c*d;
// const multi=multiply(10,20);
// console.log(multi);

// function discountBy(percent){
//     return price=>price*(1-percent);

// }


// const myfn=()=>{
//     let inner=()=>{
//         console.log("inner function");
//     }
//     return inner;
// }
// let innerFunction=myfn();
// innerFunction();
// console.log(myfn()());
 // 2
// function makeCounter(){
//     let count=0;
//     return function(){
//         count++;
//         return count;
//     };
// }
// const counter=makeCounter();
// console.log(counter());
// console.log(counter());
// console.log(counter());


// function adder(num1,num2,fun){
//     fun(num1,num2);
// }
// function sum(a,b){
//     return a+b;
// }
// sum(10,45);
// console.log(adder(10,45,sum));
// Higher-Order Function
// function calculator(operation) {
//   return function(num1, num2) {
//     return operation(num1, num2);
//   };
// }
// const add = (a, b) => a + b;
// const subtract = (a, b) => a - b;


// const addCalculator = calculator(add);
// const subtractCalculator = calculator(subtract);

// console.log(addCalculator(10, 5));      // 15
// console.log(subtractCalculator(10, 5)); // 5

function calculator(operation) {
    return function(num1,num2){
        return operation(num1,num2);
    };
}
const add=(a,b)=>a+b;
const subtract=(a,b)=>a-b;
const addCalculator=calculator(add);
const subtractCalculator=calculator(subtract);
console.log(addCalculator(10,5));
console.log(subtractCalculator(10,5));