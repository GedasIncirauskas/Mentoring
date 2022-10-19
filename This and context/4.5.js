Is it possible to create functions A and B so that new A() == new B()?

const person = {name: 'Gedas'}

function A() { return person }
function B() { return person }
let a = new A();
let b = new B();
console.log(a === b) 

// function A() { return {name: 'Gedas'} }
// function B() { return {name: 'Gedas'} }
// let a = new A();
// let b = new B();
// console.log(a === b) ===> false ???
// console.log( new A().name === new B().name ) ===> true 

// ?????????

function A() { ... }
function B() { ... }

let a = new A();
let b = new B();

alert( a == b ); // true
If it is, then provide an example of their code.
// const person = {name: 'Gedas'}

// function A() { return person }
// function B() { return person }
// let a = new A();
// let b = new B();
// console.log(a === b) ==> true
// console.log(new A() === new B()) ==> true

// _________________________________________________________________________________________

// Create a constructor function Calculator that creates objects with 3 methods:

// read() prompts for two values and saves them as object properties with names a and b respectively.
// sum() returns the sum of these properties.
// mul() returns the multiplication product of these properties.
// For instance:

function Calculator() {
    this.read = () => {
        this.a =+prompt('valueA', 0);
        this.b =+prompt('valueB', 0);    
      }
    this.sum = () => {
        return this.a + this.b
      }
    this.mul = () => {
        return this.a * this.b
      }
};

let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );

// Constructor functions should only be called using new. 
// Such a call implies a creation of empty this at the start and 
// returning the populated one at the end.

// _________________________________________________________________________________________


// Create a constructor function Accumulator(startingValue).

// Object that it creates should:

// Store the “current value” in the property value. The starting value is set to the argument of the constructor startingValue.
// The read() method should use prompt to read a new number and add it to value.
// In other words, the value property is the sum of all user-entered values with the initial value startingValue.

// Here’s the demo of the code:

function Accumulator(startingValue) {
    this.value = startingValue

    this.read = () => {
        this.value += +prompt('Value', 0);
      };
}

let accumulator = new Accumulator(1); // initial value 1

accumulator.read(); // adds the user-entered value
accumulator.read(); // adds the user-entered value
accumulator.read(); // adds the user-entered value

alert(accumulator.value); // shows the sum of these values