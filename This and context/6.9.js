// Create a decorator spy(func) that should return a wrapper that saves
// all calls to function in its calls property.
// Every call is saved as an array of arguments.
// For instance:

//CODE BELOW:
function spy(func) {
  let argumentList = [];

  function wrapper(...argument) {
    argumentList.push(argument);
    /*   return func.apply(this, argument); */
    return func.call(this, ...argument);
  }

  wrapper.calls = argumentList;
  return wrapper;
}

function work(a, b) {
  alert(a + b); // work is an arbitrary function or method
}

work = spy(work);

work(1, 2); // 3
work(4, 5); // 9

for (let args of work.calls) {
  alert("call:" + args.join()); // "call:1,2", "call:4,5"
}

// _________________________________________________________________________________________

// Create a decorator delay(f, ms) that delays each call of f by ms milliseconds.
// For instance:

function delay(func, delayTime) {
  return function () {
    setTimeout(() => func.apply(this, arguments), delayTime);
  };
}

function f(x) {
  alert(x);
}

// create wrappers
let f1000 = delay(f, 1000);
let f1500 = delay(f, 1500);

f1000("test"); // shows "test" after 1000ms
f1500("test"); // shows "test" after 1500ms

// In other words, delay(f, ms) returns a "delayed by ms" variant of f.
// In the code above, f is a function of a single argument,
// but your solution should pass all arguments and the context this.

// _________________________________________________________________________________________
