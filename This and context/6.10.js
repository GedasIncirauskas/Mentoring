// What will be the output?

function f() {
  alert(this); // ?
}

let user = {
  g: f.bind(null),
};

user.g();

// Amswer will be null. When we call function user.g() => f.bind(this = null)
// _________________________________________________________________________________________

// Can we change this by additional binding?
// What will be the output?

function f() {
  alert(this.name);
}

f = f.bind({ name: "John" }).bind({ name: "Ann" });
f();

//ANSWER: in this case this = { name: "John" }, so output = John.
// It is because function cannot be rebinded.

// _________________________________________________________________________________________

// There’s a value in the property of a function. Will it change after bind? Why, or why not?

function sayHi() {
  alert(this.name);
}
sayHi.test = 5;

let bound = sayHi.bind({
  name: "John",
});

alert(bound.test); // what will be the output? why?

//ANSWER: output will be undefined, where is another object. No test property binded.

// _________________________________________________________________________________________

// The call to askPassword() in the code below should check the password and then call
// user.loginOk/loginFail depending on the answer.
// But it leads to an error. Why?
// Fix the highlighted line for everything to start working
// right (other lines are not to be changed).

function askPassword(ok, fail) {
  let password = prompt("Password?", "");
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: "John",

  loginOk() {
    alert(`${this.name} logged in`);
  },

  loginFail() {
    alert(`${this.name} failed to log in`);
  },
};

askPassword(user.loginOk.bind(user), user.loginFail.bind(user));

//ANSWER: error was because we need to bind USER object

// _________________________________________________________________________________________

// The user object was modified. Now instead of two functions loginOk/loginFail,
// it has a single function user.login(true/false).

// What should we pass askPassword in the code below, so that it calls
// user.login(true) as ok and user.login(false) as fail?

function askPassword(ok, fail) {
  let password = prompt("Password?", "");
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: "John",

  login(result) {
    alert(this.name + (result ? " logged in" : " failed to log in"));
  },
};

// askPassword(?, ?); // ?
// Your changes should only modify the highlighted fragment.
askPassword(user.login.bind(user, true), user.login.bind(user, false));
//ANSWER : askPassword(user.login.bind(user, true), user.login.bind(user, false)); now passed good object context and work

// _________________________________________________________________________________________
