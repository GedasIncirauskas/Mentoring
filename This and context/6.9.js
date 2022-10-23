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

// The result of debounce(f, ms) decorator is a wrapper that suspends calls to f
// until there’s ms milliseconds of inactivity (no calls, “cooldown period”),
// then invokes f once with the latest arguments.

// In other words, debounce is like a secretary that accepts “phone calls”,
// and waits until there’s ms milliseconds of being quiet.
// And only then it transfers the latest call information to “the boss” (calls the actual f).

// For instance, we had a function f and replaced it with f = debounce(f, 1000).

// Then if the wrapped function is called at 0ms, 200ms and 500ms,
// and then there are no calls, then the actual f will be only called once, at 1500ms.
// That is: after the cooldown period of 1000ms from the last call.

function debounce(func, ms) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}

let f = debounce(alert, 1000);

f("a");
setTimeout(() => f("b"), 200);
setTimeout(() => f("c"), 500);
// debounced function waits 1000ms after the last call and then runs: alert("c")

// Call debounce function (func, ms), it returns a wrapper.
// When called, it schedules the original function call after given ms and cancel previous timeout.

// _________________________________________________________________________________________

// Create a “throttling” decorator throttle(f, ms) – that returns a wrapper.
// Visually, it will look like this:

// For the first mouse movement the decorated variant immediately passes the call to update.
// That’s important, the user sees our reaction to their move immediately.
// Then as the mouse moves on, until 100ms nothing happens. The decorated variant ignores calls.
// At the end of 100ms – one more update happens with the last coordinates.
// Then, finally, the mouse stops somewhere. The decorated variant waits until 100ms expire
// and then runs update with last coordinates. So, quite important, the final mouse coordinates are processed.
// A code example:

// function f(a) {
//   console.log(a);
// }

// // f1000 passes calls to f at maximum once per 1000 ms
// let f1000 = throttle(f, 1000);

// f1000(1); // shows 1
// f1000(2); // (throttling, 1000ms not out yet)
// f1000(3); // (throttling, 1000ms not out yet)

// // when 1000 ms time out...
// // ...outputs 3, intermediate value 2 was ignored

function throttle(func, ms) {
  return function () {
    func.apply(this, arguments);
  };
}

function f(a) {
  console.log(a);
}

// f1000 passes calls to f at maximum once per 1000 ms
let f10001 = throttle(f, 1000);

f10001(1); // shows 1
f10001(2); // (throttling, 1000ms not out yet)
f10001(3); // (throttling, 1000ms not out yet)

// when 1000 ms time out...
// ...outputs 3, intermediate value 2 was ignored
// NEED HELP HERE
