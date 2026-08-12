// let cart=document.createElement('strong');
// cart.innerHTML='Cart';
// document.body.appendChild(cart);
// console.log(cart);
// let newDiv=document.createElement('div');
// newDiv.innerHTML='This is a new div';
// document.body.appendChild(newDiv);
// console.log(newDiv);
// let newPara=document.createElement('p');
// newPara.innerHTML="THIS IS NEW PARAGRAPH";
// document.body.appendChild(newPara);
// console.log(newPara);
// const items = document.getElementsByClassName("item");
// console.log(items);
// document.addEventListener("click", myFunction);
// function myFunction() {
//   document.getElementById("demo").innerHTML = "Hello World";
// }
const button = document.getElementById("myBtn");
button.addEventListener("click", function() {
    alert("Button 1 was clicked!");
  });


  const button2=document.getElementById("button2");
  button2.addEventListener("click",function(){
alert("Button 2 was clicked!");
  });
const form1 = document.querySelector('#myForm');
const usernameInput = document.querySelector('#username');

form1.addEventListener('submit', function(event) {
    event.preventDefault(); // Stop page from reloading
    
    // Grab the value when submitted
    const usernameValue = usernameInput.value;
    
    console.log("Username Form Value:", usernameValue);
    
    form1.reset(); // Clear the form
});
 const form2 = document.querySelector('#myForm2');
const emailInput = document.querySelector('#email');

form2.addEventListener('submit', function(event) {
    event.preventDefault(); // Stop page from reloading
    
    // Grab the value when submitted
    const emailValue = emailInput.value;
    
    console.log("Email Form Value:", emailValue);
    
    form2.reset(); // Clear the form
});



