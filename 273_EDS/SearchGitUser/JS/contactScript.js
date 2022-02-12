// const formElement = document.querySelector(".contact_form");
// const formDataElement = formElement.querySelector(".form");
// const submitInput = formDataElement.querySelector(".btn");
// console.log(submitInput);
// console.log(formDataElement);
// submitInput.addEventListener("click", getFormData);

// function getFormData(e) {
//   let formData = new FormData(formDataElement);
//   // console.log(formData.forEach((ex) => console.log(ex)));
//   alert(document.getElementById(".name"));
// }

// // document.addEventListener(
// //   "DOMContentLoaded",
// //   function () {
// //     submitInput.addEventListener("click", getFormData);
// //   },
// //   false
// // );

document.querySelectorAll(".form input");

Array.from(document.querySelector(".form input")).reduce((acc, input) => ({
  ...acc,
  [input.id]: input.value,
}));
