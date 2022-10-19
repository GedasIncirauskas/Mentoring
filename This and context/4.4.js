// // Here the function makeUser returns an object.
// // What is the result of accessing its ref? Why?

// function makeUser() {
//   return {
//     name: "John",
//     ref: this,
//   };
// }

// let user = makeUser();

// alert(user.ref.name); // What's the result?

Answer is undefined, because this can be used only in methods. 
Methods can reference the object as this

// _________________________________________________________________________________________

// Create an object calculator with three methods:

// read() prompts for two values and saves them as object properties with names a and b respectively.
// sum() returns the sum of saved values.
// mul() multiplies saved values and returns the result.

let calculator = {
  read() {
    this.a =+prompt('valueA', 0);
    this.b =+prompt('valueB', 0);
     
  },
  sum() {
    return this.a + this.b
  },
  mul() {
    return this.a * this.b
  }
};

calculator.read();
alert(calculator.sum());
alert(calculator.mul());

The effect of +promt("...") is that the result of the promt command will be cast to a number.
Putting + before any data type converts it into a number. 
// _________________________________________________________________________________________


// There’s a ladder object that allows to go up and down:
let ladder = {
  step: 0,
  up() {
    this.step++;
  },
  down() {
    this.step--;
  },
  showStep: function () {
    // shows the current step
    alert(this.step);
  },
};

// Now, if we need to make several calls in sequence, can do it like this:
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
ladder.down();
ladder.showStep(); // 0

// Modify the code of up, down and showStep to make the calls chainable, like this:
let ladders = {
    step: 0,
    up() {
      this.step++;
      return this
    },
    down() {
      this.step--;
      return this
    },
    showStep: function () {
      // shows the current step
      alert(this.step);
      return this
    },
  };
ladders.up().up().down().showStep().down().showStep(); // shows 1 then 0

This works because: when a function is called in the “method” syntax: object.method(), 
the value of this during the call is object (return object).
