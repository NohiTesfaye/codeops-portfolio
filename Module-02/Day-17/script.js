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




// function calculator(operation) {
//     return function(num1,num2){
//         return operation(num1,num2);
//     };
// }
// const add=(a,b)=>a+b;
// const subtract=(a,b)=>a-b;
// const addCalculator=calculator(add);
// const subtractCalculator=calculator(subtract);
// console.log(addCalculator(10,5));
// console.log(subtractCalculator(10,5));

// 1. Subtotal: pure function using rest + reduce
const subtotal = (...prices) => prices.reduce((sum, p) => sum + p, 0);

// 2. discountBy: function factory (HOF + closure)
const discountBy = (rate) => {
  return (amount) => amount - amount * rate;
};

// 3. withVat: pure arrow function
const withVat = (amount, vatRate = 0.15) => amount + amount * vatRate;

// 4. toETB: pure arrow function (formatting)
const toETB = (amount) => `${amount.toFixed(2)} ETB`;
// 5. makeReceiptMaker: closure with private orderNo
const makeReceiptMaker = () => {
  let orderNo = 0; // private state

  return (items) => {
    orderNo++; // increment each time
    const rawSubtotal = subtotal(...items);
    const discounted = discountBy(0.1)(rawSubtotal); // example: 10% discount
    const finalAmount = withVat(discounted);
    return `Order #${orderNo}: ${toETB(finalAmount)}`;
  };
};
console.log(subtotal(100, 200)); 
// → 300

const tenPercentOff = discountBy(0.1);
console.log(tenPercentOff(300)); 
// → 270

console.log(withVat(100)); 
// → 115

console.log(toETB(115)); 
// → "115.00 ETB"

const receiptMaker = makeReceiptMaker();
console.log(receiptMaker([100, 200, 300])); 
// → "Order #1: 517.50 ETB"
console.log(receiptMaker([50, 50])); 
// → "Order #2: 115.00 ETB"
