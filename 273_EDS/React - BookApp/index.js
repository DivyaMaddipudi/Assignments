console.log("Start app");

setTimeout(() => {
  console.log("2000 Inside of callback");
}, 2000);

setTimeout(() => {
  console.log("Inside of callback");
}, 3000);

console.log("Finishing up");
