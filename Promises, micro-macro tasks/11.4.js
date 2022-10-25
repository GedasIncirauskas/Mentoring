// What do you think? Will the .catch trigger? Explain your answer.

new Promise(function (resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);

//ANSWER: no is not trigger, here the error is generated not while the executor is running, but later. So the promise can’t handle it.
