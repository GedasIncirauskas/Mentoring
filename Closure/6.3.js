// The function sayHi uses an external variable name. When the function runs, which value is it going to use?
let name = "John";

function sayHi() {
  alert("Hi, " + name);
}
name = "Pete";

sayHi(); // what will it show: "John" or "Pete"?
//ANSWER show Pete

// Such situations are common both in browser and server-side development.
// A function may be scheduled to execute later than it is created, for instance after a user action or a network request.
// So, the question is: does it pick up the latest changes?

//ANSWER Old variable values are not saved anywhere.
// When a function wants a variable, it takes the current value from its own Lexical Environment or the outer one.

// _________________________________________________________________________________________

// The function makeWorker below makes another function and returns it.
// That new function can be called from somewhere else.

// Will it have access to the outer variables from its creation place,
// or the invocation place, or both?

function makeWorker() {
  let name = "Pete";

  return function () {
    alert(name);
  };
}

let name = "John";

// create a function
let work = makeWorker();

// call it
work(); // what will it show?

//ANSWER will output Pete

// _________________________________________________________________________________________

// Here we make two counters: counter and counter2 using the same makeCounter function.
// Are they independent? What is the second counter going to show? 0,1 or 2,3 or something else?

function makeCounter() {
  let count = 0;

  return function () {
    return count++;
  };
}

let counter = makeCounter();
let counter2 = makeCounter();

alert(counter()); // 0
alert(counter()); // 1

alert(counter2()); // ?
alert(counter2()); // ?

//ANSWER output will be 0 and 1, because each one has its own count variable

// _________________________________________________________________________________________

// Here a counter object is made with the help of the constructor function.
// Will it work? What will it show?

function Counter() {
  let count = 0;

  this.up = function () {
    return ++count;
  };
  this.down = function () {
    return --count;
  };
}

let counter = new Counter();

alert(counter.up()); // ?
alert(counter.up()); // ?
alert(counter.down()); // ?

//ANSWER output will be 1, 2, 1, both functions created in the same scope

// _________________________________________________________________________________________

// Look at the code. What will be the result of the call at the last line?

let phrase = "Hello";

if (true) {
  let user = "John";

  function sayHi() {
    alert(`${phrase}, ${user}`);
  }
}

sayHi();

//ANSWER: ReferenceError: sayHi is not defined. The function sayHi is declared inside the if, so it only lives inside it. We cannot call sayHi().

// _________________________________________________________________________________________

// Write function sum that works like this: sum(a)(b) = a+b.
// Yes, exactly this way, using double parentheses (not a mistype).

// For instance:

function sum(a) {
  return (b) => {
    return console.log(a + b);
  };
}

sum(1)(2); //= 3
sum(5)(-1); //= 4

// _________________________________________________________________________________________

// What will be the result of this code?
let x = 1;

function func() {
  console.log(x); // ?

  let x = 2; //if we change and up to top it will work, output will be 2
}
func();

// P.S. There’s a pitfall in this task. The solution is not obvious.
//ANSWER: ReferenceError: Cannot access 'x' before initialization"

// _________________________________________________________________________________________

// We have a built-in method arr.filter(f) for arrays.
// It filters all elements through the function f.
//  If it returns true, then that element is returned in the resulting array.

// Make a set of “ready to use” filters:

// inBetween(a, b) – between a and b or equal to them (inclusively).
// inArray([...]) – in the given array.
// The usage must be like this:

// arr.filter(inBetween(3,6)) – selects only values between 3 and 6.
// arr.filter(inArray([1,2,3])) – selects only elements matching with one of the members of [1,2,3].
// For instance:

/* .. your code for inBetween and inArray */
let arr = [1, 2, 3, 4, 5, 6, 7];

function inBetween(a, b) {
  return (argument) => argument >= a && argument <= b;
}
function inArray(arr) {
  return (argument) => arr.includes(argument);
}
alert(arr.filter(inBetween(3, 6))); // 3,4,5,6
alert(arr.filter(inArray([1, 2, 10]))); // 1,2
// _________________________________________________________________________________________

// We’ve got an array of objects to sort:

let users = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" },
];
// The usual way to do that would be:

// by name (Ann, John, Pete)
users.sort((a, b) => (a.name > b.name ? 1 : -1));

// by age (Pete, Ann, John)
users.sort((a, b) => (a.age > b.age ? 1 : -1));
// Can we make it even less verbose, like this?

//ANSWER:
function byField(fieldName) {
  return (a, b) => (a[fieldName] > b[fieldName] ? 1 : -1);
}

console.log(users.sort(byField("name")));
console.log(users.sort(byField("age")));
// So, instead of writing a function, just put byField(fieldName).
// Write the function byField that can be used for that.

// _________________________________________________________________________________________

// The following code creates an array of shooters.
// Every function is meant to output its number. But something is wrong…

// function makeArmy() {
//   let shooters = [];

//   let i = 0;
//   while (i < 10) {
//     let shooter = function () {
//       // create a shooter function,
//       alert(i); // that should show its number
//     };
//     shooters.push(shooter); // and add it to the array
//     i++;
//   }

//   // ...and return the array of shooters
//   return shooters;
// }

// let army = makeArmy();

// ANSWER:
function makeArmy() {
  let shooters = [];

  for (let i = 0; i < 10; i++) {
    let shooter = () => console.log(i);
    shooters.push(shooter);
  }

  return shooters;
}

let army = makeArmy();

// all shooters show 10 instead of their numbers 0, 1, 2, 3...
army[0](); // 10 from the shooter number 0
army[1](); // 10 from the shooter number 1
army[2](); // 10 ...and so on.
army[3](); // 10 ...and so on.
army[4](); // 10 ...and so on.
army[5](); // 10 ...and so on.
army[6](); // 10 ...and so on.
army[7](); // 10 ...and so on.
// Why do all of the shooters show the same value?
// Fix the code so that they work as intended.
