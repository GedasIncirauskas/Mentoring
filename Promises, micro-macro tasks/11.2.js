// What’s the output of the code below?

let promise = new Promise(function (resolve, reject) {
  resolve(1);

  setTimeout(() => resolve(2), 1000);
});

promise.then(alert);

//ANSWER: output will be 1. Second resolve wouldn't be callded, because only first called.
// The executor should call only one resolve or one reject. Any state change is final. All further calls of resolve and reject are ignored:

// _________________________________________________________________________________________

// The built-in function setTimeout uses callbacks. Create a promise-based alternative.
// The function delay(ms) should return a promise. That promise should resolve after ms milliseconds,
// so that we can add .then to it, like this:

//ANSWER:
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

delay(3000).then(() => alert("runs after 3 seconds"));

// _________________________________________________________________________________________

// Rewrite the showCircle function in the solution of the task Animated circle with callback
// so that it returns a promise instead of accepting a callback.
// The new usage:

{
  /* <style>
.message-ball {
  font-size: 20px;
  line-height: 200px;
  text-align: center;
}
.circle {
  transition-property: width, height;
  transition-duration: 2s;
  position: fixed;
  transform: translateX(-50%) translateY(-50%);
  background-color: red;
  border-radius: 50%;
}
</style> */
}

function showCircle(cx, cy, radius) {
  let div = document.createElement("div");
  div.style.width = 0;
  div.style.height = 0;
  div.style.left = `${cx}px`;
  div.style.top = `${cy}px`;
  div.className = "circle";
  document.body.append(div);

  return new Promise((resolve) => {
    setTimeout(() => {
      div.style.width = `${radius * 3}px`;
      div.style.height = `${radius * 3}px`;
      resolve(div);
    }, 0);
  });
}

showCircle(150, 150, 100).then((div) => {
  div.classList.add("message-ball");
  div.append("Hello, world!");
});

// _________________________________________________________________________________________
